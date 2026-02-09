import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { users } from "../login/route";

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "your-secret-key";
const refreshTokenSecret =
  process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET_KEY || "your-refresh-secret-key";

const generateTokens = (user: {
  id: number;
  name: string;
  email: string;
  role: string;
}) => {
  const accessToken = jwt.sign(
    { userId: user.id, name: user.name, email: user.email, role: user.role },
    secretKey,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    refreshTokenSecret,
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken };
};

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, image, provider } = body;

  if (!email || !name) {
    return NextResponse.json(
      { success: false, message: "Name and email are required." },
      { status: 400 },
    );
  }

  let user = users.find((u) => u.email === email && u.provider === provider);

  if (!user) {
    if (provider === "google") {
      user = {
        id: users.length + 1,
        name,
        email,
        image: image || null,
        role: "applicant",
        provider: "google",
      };
    } else if (provider === "credentials") {
      if (!password) {
        return NextResponse.json(
          { success: false, message: "Password is required for credentials." },
          { status: 400 },
        );
      }
      user = {
        id: users.length + 1,
        name,
        email,
        password,
        role: "applicant",
        provider: "credentials",
      };
    } else {
      return NextResponse.json(
        { success: false, message: "Unknown provider." },
        { status: 400 },
      );
    }

    users.push(user);
  } else {
    console.log(`User ${email} already exists, skipping registration.`);
  }

  const { accessToken, refreshToken } = generateTokens(user);

  return NextResponse.json(
    {
      success: true,
      message: "Login/Register successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image || null,
        role: user.role,
        provider: user.provider,
      },
      tokens: { accessToken, refreshToken },
    },
    { status: 200 },
  );
}

export function GET() {
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 },
  );
}

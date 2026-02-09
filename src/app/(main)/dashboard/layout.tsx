import { Metadata } from "next";
import MainLayout from "@/layout/mainLayout";

export const metadata: Metadata = {
  title: "Dashboard | Wedding Invitation",
  description: "Manage your wedding invitations",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}

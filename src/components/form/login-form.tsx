"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FormInput } from "../ui/form-input";
import { Form } from "../ui/form";
import { useTranslation } from "react-i18next";
import { loginSchema } from "@/schemas";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isPending, setisPending] = useState(false);

  let { t } = useTranslation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSubmit = form.handleSubmit(async (values) => {
    setisPending(true);

    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
      .then((data: any) => {
        setisPending(false);
        if (data?.status === 200) {
          router.push("/dashboard");
        } else {
          console.log(data);
          toast.error("Something went wrong.");
        }
      })
      .catch(() => {
        setisPending(false);
        toast.error("Something went wrong.");
      });
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5 relative">
            <FormInput
              control={form.control}
              name="email"
              label="E-mail"
              type="email"
              placeholder="Masukkan E-mail"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Masukkan Kata Sandi"
              isPending={isPending}
              required
              noShowError
            />

            <div className="flex justify-end w-full -mt-2">
              <Link
                href="/forgot"
                className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                {t("Forgot your password?")}
              </Link>
            </div>

            <Button
              type="submit"
              disabled={!form.formState.isValid}
              loading={isPending}
              className="w-full rounded-full h-11 font-medium text-base"
            >
              {t("Masuk")}
            </Button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">
                {t("or")}
              </span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <Button
              type="button"
              variant="outline"
              loading={isPending}
              className="w-full rounded-full h-11 font-medium bg-card hover:bg-muted text-foreground border-border"
              onClick={() => signIn("google")}
            >
              <Image
                src={"/img/googleIcon.png"}
                alt={"Google"}
                width={20}
                height={20}
                className="mr-2"
              />
              {t("Masuk Dengan Google")}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              {t("Don’t have an account? Let’s")}
              <Link
                className="font-bold ml-1 text-primary hover:underline underline-offset-4 transition-colors"
                href={"/register"}
              >
                {t("Sign up")}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

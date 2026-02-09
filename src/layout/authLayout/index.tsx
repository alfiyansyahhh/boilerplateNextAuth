"use client";

import i18n from "@/config/i18n";
import React, { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import LanguageTabs from "@/components/ui/LanguageTabs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AuthLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">
        <div className="hidden lg:block lg:w-1/2 relative bg-zinc-900">
          {/* <img
            src=""
            alt="Wedding background"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-12 left-12 right-12 text-white z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4">{t("judul")}</h2>
              <p className="text-zinc-200 text-lg leading-relaxed"></p>
            </motion.div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col relative">
          <div className="absolute top-6 right-6 flex items-center gap-4 z-20">
            <ModeToggle />
            <LanguageTabs />
          </div>

          <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-24">
            <div className="w-full max-w-md space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-10 text-center lg:text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {t(title)}
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    {t("welcome back")}
                  </p>
                </div>

                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default AuthLayout;

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Palette, Bell, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageTabs from "@/components/ui/LanguageTabs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";

const SettingsPage = () => {
  const { t } = useTranslation();
  const { status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const [emailNotif, setEmailNotif] = React.useState(false);
  const [pushNotif, setPushNotif] = React.useState(true);
  const [marketingEmail, setMarketingEmail] = React.useState(false);

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("Dashboard")}
          </Link>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">
              {t("Settings")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your preferences and account settings
            </p>
          </div>

          <div className="space-y-6">
            {/* Appearance Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {t("Theme")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Customize your interface appearance
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t("Theme")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {theme === "dark"
                      ? t("Dark Mode")
                      : theme === "light"
                        ? t("Light Mode")
                        : "System"}
                  </p>
                </div>
                <ModeToggle />
              </div>
            </motion.div>

            {/* Language Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {t("Language")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t("Language")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select your display language
                  </p>
                </div>
                <LanguageTabs />
              </div>
            </motion.div>

            {/* Notifications Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    Notifications
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Manage how you receive updates
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Receive email updates about your invitations
                    </p>
                  </div>
                  <ToggleSwitch checked={emailNotif} onChange={setEmailNotif} />
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Push Notifications
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Get notified about important updates
                    </p>
                  </div>
                  <ToggleSwitch checked={pushNotif} onChange={setPushNotif} />
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Marketing Emails
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Receive tips and promotional content
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={marketingEmail}
                    onChange={setMarketingEmail}
                  />
                </div>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="bg-card border border-destructive/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-destructive">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Irreversible actions
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SettingsPage;

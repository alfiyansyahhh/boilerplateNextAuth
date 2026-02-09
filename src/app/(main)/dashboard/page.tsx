"use client";

import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FileText, Eye, TrendingUp, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const stats = [
    {
      title: t("Total Invitations"),
      value: "12",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: t("Active"),
      value: "8",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: t("Views"),
      value: "1,234",
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  const recentInvitations = [
    {
      id: 1,
      title: "Wedding of John & Jane",
      date: "2026-03-15",
      views: 234,
      status: "active",
    },
    {
      id: 2,
      title: "Anniversary Celebration",
      date: "2026-04-20",
      views: 156,
      status: "active",
    },
    {
      id: 3,
      title: "Birthday Party",
      date: "2026-02-28",
      views: 89,
      status: "draft",
    },
  ];

  return (
    <>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t("Welcome")}, {session?.user?.name || "User"}! 👋
        </h1>
        <p className="text-muted-foreground">
          {t("Overview")} - {new Date().toLocaleDateString()}
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.bgColor} rounded-full p-3 flex items-center justify-center`}
              >
                <stat.icon className="h-6 w-6 text-foreground" />
              </div>
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State if no invitations */}
      {recentInvitations.length !== 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center py-12 rounded-lg border border-dashed border-border bg-card"
        >
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t("No invitations yet")}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t("Create your first invitation to get started")}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("Create New")}
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default DashboardPage;

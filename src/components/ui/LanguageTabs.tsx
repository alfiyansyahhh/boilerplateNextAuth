"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const LanguageTabs = () => {
  type Lang = "INA" | "ENG";
  type LangProp = { code: Lang; label: string; flag: string };

  const language: LangProp[] = [
    { code: "INA", label: "ID", flag: "/icons/Group 24.svg" },
    { code: "ENG", label: "EN", flag: "/icons/Group 27.svg" },
  ];

  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState<Lang>("INA");

  const handleLanguageChange = (lang: Lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    localStorage.setItem("appLanguage", lang);
  };

  React.useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage");
    if (savedLang === "ENG" || savedLang === "INA") {
      i18n.changeLanguage(savedLang);
      setSelectedLanguage(savedLang);
    }
  }, []);

  React.useEffect(() => {
    setSelectedLanguage(i18n.language === "ENG" ? "ENG" : "INA");
  }, [i18n.language]);

  return (
    <div className="flex border rounded-md overflow-hidden w-max">
      {language.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium ${
            selectedLanguage === lang.code ? "bg-[#212126] text-white " : ""
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageTabs;

import { useState } from "react"
import { HiBars3, HiChevronDown } from "react-icons/hi2"
import { MdQuiz } from "react-icons/md"
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Navbar({ onMenuToggle }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const location = useLocation();
  const { t } = useTranslation();

  const routeTitles: Record<string, string> = {
    "/dashboard": t("dashboard"),
    "/groups": t("groups"),
    "/quizzes": t("quizzes"),
    "/results": t("results"),
  };

  const pageTitle = routeTitles[location.pathname] || "";

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="inline-flex items-center justify-center p-2 bg-transparent text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <HiBars3 className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-xl font-semibold">{pageTitle}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:flex"
            aria-label="Create new quiz"
          >
            <MdQuiz className="w-4 h-4" aria-hidden="true" />
            <span>{t("newQuiz")}</span>
          </button>

          <button
            className="px-4 py-1 bg-gray-300 text-black rounded"
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")}
          >
            {i18n.language === "en" ? "عربي" : "English"}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="text-right hidden sm:block">
                <div className="font-medium text-sm">Nwabuikwu Chizuruoke</div>
                <div className="text-xs text-green-600">{t("tutor")}</div>
              </div>
              <HiChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

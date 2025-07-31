import { useEffect, useState } from "react"
import { HiBars3, HiChevronDown } from "react-icons/hi2"
import { MdQuiz } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Navbar({ onMenuToggle }: HeaderProps) {


  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const location = useLocation();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.LogData);


  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const routeTitles: Record<string, string> = {
    "/dashboard": t("sidebar.dashboard"),
    "/groups": t("sidebar.groups"),
    "/quizes": t("sidebar.quizzes"),
    "/results": t("sidebar.results"),
    "/students": t("sidebar.students"),
  };




  const pageTitle = routeTitles[location.pathname] || "";

  return (
    <header className="bg-white border-b border-gray-200 px-4  sm:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="inline-flex items-center justify-center p-2 bg-transparent text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 lg:hidden"
            aria-label={t("toggleMenu")}
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
            aria-label={t("newQuiz")}
          >
            <MdQuiz className="w-4 h-4" aria-hidden="true" />
            <span>{t("newQuiz")}</span>
          </button>

          <button
            className="px-4 dark:bg-black py-1 bg-gray-300 text-black rounded"
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
              <div className=" hidden sm:block text-start">
                <div className="font-medium text-sm">{user?.first_name}</div>
                <div className="text-xs text-green-600">{t(`${user?.role}`)}</div>
              </div>
              <HiChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 z-50 w-40 bg-white divide-y divide-gray-100 rounded-md shadow-md">
                <ul className="py-1 text-sm text-gray-700">
                  
                  <li>
                    <button
                      onClick={logOut}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                    >
                      {t("logout") || "Logout"}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}

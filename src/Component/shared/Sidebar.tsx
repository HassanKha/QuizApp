

import { HiHome, HiUsers, HiDocumentText, HiBars3, HiQuestionMarkCircle } from "react-icons/hi2"
import { FaUserGraduate } from "react-icons/fa";
import { MdQuiz } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/Log-icon.png"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onMenuToggle: () => void
  isSidebarOpen: boolean
}

const navigationItems = [
  {
    icon: HiHome,
    label: "Dashboard",
    href: "/dashboard",
    badge: null,
    iconBg: "bg-orange-100",
    iconColor: "text-black",
  },
  {
    icon: HiUsers,
    label: "Groups",
    href: "/groups",
    badge: null,
    iconBg: "bg-orange-100",
    iconColor: "text-black",
  },
  {
    icon: FaUserGraduate,
    label: "Students",
    href: "/students",
    badge: "2",
    iconBg: "bg-orange-100",
    iconColor: "text-black",
  },
   {
    icon: MdQuiz,
    label: "Quizes",
    href: "/quizes",
    badge: null,
    iconBg: "bg-orange-100",
    iconColor: "text-black",
  },
  {
    icon: HiDocumentText,
    label: "Results",
    href: "/results",
    badge: null,
    iconBg: "bg-orange-100",
    iconColor: "text-black",
  },
]

export default function Sidebar({ isOpen, onClose, onMenuToggle, isSidebarOpen }: SidebarProps) {
  const location = useLocation()

  // Function to check if current path matches the navigation item
  const isActiveItem = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isSidebarOpen ? "w-64" : "w-16 lg:w-20"}
        `}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? "p-6" : "p-2 lg:p-4"}`}>
          <div className="flex items-center justify-center lg:justify-start">
            <div className={`flex items-center transition-all duration-300 ${isSidebarOpen ? "gap-4" : "gap-0"}`}>
              <button
                onClick={onMenuToggle}
                className="inline-flex cursor-pointer items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 flex-shrink-0"
                aria-label="Toggle navigation menu"
              >
                <HiBars3 className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>

              {/* Logo - only show when expanded */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isSidebarOpen ? "w-16 opacity-100 ml-4" : "w-0 opacity-0 ml-0"
                }`}
              >
                <img src={logo || "/placeholder.svg"} alt="logo" className="w-16 h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`space-y-1 transition-all duration-300 ${isSidebarOpen ? "px-4" : "px-2"}`} role="navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = isActiveItem(item.href)

            return (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  onClick={() => {
                    // Close mobile sidebar when item is clicked
                    if (window.innerWidth < 1024) {
                      onClose()
                    }
                  }}
                  className={`
                    flex items-center rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 w-full
                    ${isSidebarOpen ? "gap-4 px-4 py-4" : "gap-0 px-2 py-3 justify-center"}
                    ${
                      isActive
                        ? "bg-gray-900 text-white focus-visible:ring-white focus-visible:ring-offset-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Icon container - always centered when collapsed */}
                  <div className={`relative flex-shrink-0 ${!isSidebarOpen ? "mx-auto" : ""}`}>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActive ? "bg-white" : item.iconBg
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-gray-900" : item.iconColor}`} aria-hidden="true" />
                    </div>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] z-10">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Label - animate in/out */}
                  {isSidebarOpen && (
                    <span
                      className={`font-medium whitespace-nowrap transition-all duration-300 ${
                        isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>

                {/* Tooltip for collapsed state - only on desktop */}
                {!isSidebarOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Help section at bottom */}
        <div
          className={`absolute bottom-4 lg:bottom-8 w-full transition-all duration-300 ${isSidebarOpen ? "px-4" : "px-2"}`}
        >
          <div className="relative group">
            <Link
              to="/help"
              onClick={() => {
                // Close mobile sidebar when help is clicked
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`
                flex items-center rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 text-gray-700 hover:bg-gray-50 w-full
                ${isSidebarOpen ? "gap-4 px-4 py-4" : "gap-0 px-2 py-3 justify-center"}
              `}
            >
              <div
                className={`w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 ${!isSidebarOpen ? "mx-auto" : ""}`}
              >
                <HiQuestionMarkCircle className="w-5 h-5 text-black" aria-hidden="true" />
              </div>

              {isSidebarOpen && (
                <span
                  className={`font-medium whitespace-nowrap transition-all duration-300 ${
                    isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                >
                  Help
                </span>
              )}
            </Link>

            {/* Tooltip for collapsed state - only on desktop */}
            {!isSidebarOpen && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                Help
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

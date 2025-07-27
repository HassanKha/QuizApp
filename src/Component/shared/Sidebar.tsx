import { HiHome, HiUsers, HiDocumentText, HiBars3, HiQuestionMarkCircle } from "react-icons/hi2"
import { MdQuiz } from "react-icons/md"
import { Link } from "react-router-dom"
import logo from "../../assets/Log-icon.png"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onMenuToggle: () => void
  isSidebarOpen: Boolean
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
    icon: MdQuiz,
    label: "Students",
    href: "/students",
    badge: "2",
    active: true,
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

export default function Sidebar({ isOpen, onClose, onMenuToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        aria-label="Main navigation"
      >
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 ml-8 flex gap-4 items-center justify-center">
              <button
                onClick={onMenuToggle}
                className="inline-flex cursor-pointer items-center justify-center p-2 text-gray-600 hover:bg-gray-100 duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                aria-label="Toggle navigation menu"
              >
                <HiBars3 className="w-8 h-8" />
              </button>
              <img src={logo || "/placeholder.svg"} alt="logo" className="w-16" />
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-1" role="navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.href}
                className={
                  item.active
                    ? "flex items-center gap-4 px-4 py-4 bg-gray-900 text-white rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                    : "flex items-center gap-4 px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                }
                aria-current={item.active ? "page" : undefined}
              >
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.active ? "bg-white" : item.iconBg}`}
                  >
                    <Icon className={`w-5 h-5 ${item.active ? "text-gray-900" : item.iconColor}`} aria-hidden="true" />
                  </div>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Help section at bottom */}
        <div className="absolute bottom-8 px-4 w-full">
          <Link
            to="/help"
            className="flex items-center gap-4 px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          >
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiQuestionMarkCircle className="w-5 h-5 text-black" aria-hidden="true" />
            </div>
            <span className="font-medium">Help</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
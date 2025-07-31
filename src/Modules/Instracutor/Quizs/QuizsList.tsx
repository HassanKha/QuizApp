
import { HiComputerDesktop, HiArrowRight } from "react-icons/hi2"
import { MdQuiz } from "react-icons/md"
import img1 from "../../../assets/img1.png"
import { useState } from "react"
import QuizSetupModal from "./AddModel/QuizSetupModal"
import { useNavigate } from "react-router-dom"
interface Quiz {
  id: number
  title: string
  date: string
  time: string
  enrolledStudents: number
  image: string
  status: "upcoming" | "completed"
}

interface CompletedQuiz {
  id: number
  title: string
  groupName: string
  participants: number
  date: string
}

const upcomingQuizzes: Quiz[] = [
  {
    id: 1,
    title: "Introduction to computer programming",
    date: "12/03/2023",
    time: "09:00 AM",
    enrolledStudents: 32,
    image: "/placeholder.svg?height=100&width=100&text=💻",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Psychology 101",
    date: "27/03/2023",
    time: "12:00 PM",
    enrolledStudents: 17,
    image: "/placeholder.svg?height=100&width=100&text=🧠",
    status: "upcoming",
  },
]

const completedQuizzes: CompletedQuiz[] = [
  {
    id: 1,
    title: "Assembly language",
    groupName: "Group 1",
    participants: 23,
    date: "12/02/2023",
  },
  {
    id: 2,
    title: "C programming",
    groupName: "Group 2",
    participants: 17,
    date: "12/02/2023",
  },
  {
    id: 3,
    title: "Python",
    groupName: "Group 3",
    participants: 38,
    date: "12/02/2023",
  },
]



export default function QuizsList() {
     const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
const navigate = useNavigate();
  return (
    <div className="p-4 sm:p-6 max-w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column - Action Cards */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            <button   onClick={() => setIsQuizModalOpen(true)} className="flex cursor-pointer flex-col items-center justify-center p-6 lg:p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group min-h-[200px]">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-gray-100 transition-colors duration-200">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MdQuiz className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
                </div>
              </div>
              <span className="text-base lg:text-lg font-semibold text-gray-900 text-center">Set up a new quiz</span>
            </button>

            <button onClick={()=> navigate("/questions")} className="flex cursor-pointer flex-col items-center justify-center p-6 lg:p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group min-h-[200px]">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-gray-100 transition-colors duration-200">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <HiComputerDesktop className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
                </div>
              </div>
              <span className="text-base lg:text-lg font-semibold text-gray-900 text-center">Question Bank</span>
            </button>
          </div>
        </div>

        {/* Right Column - Upcoming and Completed Quizzes */}
        <div className="space-y-6">
          {/* Upcoming Quizzes */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Upcoming quizzes</h2>
            <div className="space-y-3 bg-white sm:space-y-4">
              {upcomingQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6  bg-white rounded-2xl border border-orange-100 hover:shadow-md transition-all duration-200"
                >
                  {/* Quiz Illustration */}
                  <div className="w-16 h-16  bg-orange-50 sm:w-20 sm:h-20 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <img
                      src={img1}
                      alt={`${quiz.title} illustration`}
                      className="w-full h-full sm:w-12 sm:h-12 lg:w-full lg:h-full object-contain"
                    />
                  </div>

                  {/* Quiz Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-xl mb-1 sm:mb-2 line-clamp-2">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">
                      {quiz.date} | {quiz.time}
                    </p>
                    <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                      <span className="font-medium">No. of student's enrolled:</span> {quiz.enrolledStudents}
                    </p>
                  </div>

                  {/* Open Button */}
                  <button className="flex items-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-shrink-0">
                    <span className="font-medium text-xs sm:text-sm lg:text-base">Open</span>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#C5D86D] rounded-full flex items-center justify-center">
                      <HiArrowRight className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Quizzes */}
          <div className="bg-white w-full rounded-2xl  border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Completed Quizzes</h2>
              <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-lg px-2 sm:px-3 py-2">
                <span className="text-sm sm:text-base text-gray-900">Results</span>
                <HiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#C5D86D]" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="overflow-hidden rounded-xl border border-gray-200 min-w-full">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-900 ">
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                        Title
                      </th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                        Group name
                      </th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                        No. of persons in group
                      </th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedQuizzes.map((quiz, index) => (
                      <tr
                        key={quiz.id}
                        className={`border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-900 text-sm sm:text-base">
                          {quiz.title}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                          {quiz.groupName}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                          {quiz.participants} persons
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{quiz.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
         {/* Quiz Setup Modal */}
      <QuizSetupModal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} />
    </div>
  )
}

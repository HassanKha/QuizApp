
import { useState, useMemo, useEffect } from "react"
import { HiMagnifyingGlass, HiClock, HiQuestionMarkCircle, HiScale, HiUsers, HiArrowRight } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { axiosInstance, Quizzes_URLS } from "../../../../Server/baseUrl"
import { FaSpinner } from "react-icons/fa"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../Redux/store"
import type { Quiz, QuizSectionProps } from "../../../../Interfaces/Quizzes/Interfaces"


export default function QuizSection({ showTitle = true, embedded = true }: QuizSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const [QuizzsData, setQuizzsData] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(false);


  const filteredQuizzes = useMemo(() => {
    if (loading || !QuizzsData.length) return []
    if (!searchTerm) return QuizzsData

    const lower = searchTerm.toLowerCase()
    return QuizzsData.filter(
      (q) =>
        [q.title, q.description, q.code, q.status, q.group, q.type, q.difficulty].some((val) =>
          val.toLowerCase().includes(lower),
        ) || new Date(q.schadule).toLocaleDateString().toLowerCase().includes(lower),
    )
  }, [searchTerm, QuizzsData, loading])


  const handleViewDetails = (code: string) => {
    navigate(`/quizes/${code}`)
  }




  async function fetchQuestion() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Quizzes_URLS.SetUP_Quizz);
      setQuizzsData(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }

  const user = useSelector((state: RootState) => state.auth.LogData);
  if (user?.role === "Student") {
    navigate('/dashboard')
  }

  useEffect(() => {
    fetchQuestion();
  }, []);


  return (
    <section className={embedded ? "rounded-xl bg-white shadow-sm border p-4 sm:p-6" : "p-4 sm:p-6 max-w-7xl mx-auto"}>
      {showTitle && <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Available Quizzes</h2>}
      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          aria-label="Search quizzes"
        />
      </div>
      {loading ? (
        <div className="flex justify-center py-12">
          <FaSpinner className="text-3xl text-gray-500 animate-spin" />
        </div>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-orange-50 rounded-xl border border-orange-100 p-4 flex flex-col shadow hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{quiz.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{quiz.description}</p>

              <div className="flex flex-col gap-1 text-sm text-gray-700 mb-4">
                <p className="flex items-center gap-2">
                  <HiClock className="w-4 h-4 text-gray-500" />
                  <span>
                    Scheduled:{" "}
                    <span className="font-medium">
                      {new Date(quiz.schadule).toLocaleDateString()} at{" "}
                      {new Date(quiz.schadule).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <HiClock className="w-4 h-4 text-gray-500" />
                  <span>
                    Duration: <span className="font-medium">{quiz.duration} min</span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <HiQuestionMarkCircle className="w-4 h-4 text-gray-500" />
                  <span>
                    Questions: <span className="font-medium">{quiz.questions_number}</span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <HiScale className="w-4 h-4 text-gray-500" />
                  <span>
                    Difficulty: <span className="font-medium capitalize">{quiz.difficulty}</span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <HiUsers className="w-4 h-4 text-gray-500" />
                  <span>
                    Participants: <span className="font-medium">{quiz.participants}</span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Type:</span>{" "}
                  <span className="font-medium">{quiz.type}</span>
                </p>
              </div>

              <div className="mt-auto gap-2 flex items-center justify-between pt-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${quiz.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  Status: {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                </span>
                <button
                  onClick={() => handleViewDetails(quiz._id)}
                  className="flex cursor-pointer items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  aria-label={`View details for ${quiz.title}`}
                >
                  <span className="text-sm">View Details</span>
                  <HiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No quizzes found matching your search.</div>
      )}
    </section>
  )
}

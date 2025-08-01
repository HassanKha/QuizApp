
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { HiCalendarDays, HiClock, HiPencilSquare, HiChevronRight, HiTrash } from "react-icons/hi2"
import type { Quiz, QuizFormData } from "../../../../Interfaces/Quizzes/Interfaces"
import { axiosInstance, Quizzes_URLS } from "../../../../Server/baseUrl"
import QuizSetupModal from "../AddModel/QuizSetupModal"
import ConfirmationModal from "../../../../Component/shared/ConfirmationModal"
import { toast } from "react-toastify"


export default function QuizDetailsPage() {
  const { id } = useParams<{ id: string }>() // Use 'code' as the parameter name
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const fetchQuiz = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(Quizzes_URLS.Get_QuizzID(id || ""))
      setQuiz(res.data)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch quiz details:", err)
      setError("Failed to fetch quiz details.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchQuiz()
    }
  }, [id])

//   const handleEditClick = () => {
//     setIsEditModalOpen(true)
//   }


  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!quiz) return

    try {
      await axiosInstance.delete(Quizzes_URLS.delete_QuizzID(quiz._id))
      setIsDeleteConfirmOpen(false)
    toast.success("deleting quiz successfully")

      navigate("/quizes") // Redirect to all quizzes page after deletion
    } catch (err) {
      console.error("Error deleting quiz:", err)

    }
  }

  if (loading) return <div className="p-6 text-center text-gray-600">Loading quiz details...</div>
  if (error || !quiz) return <div className="p-6 text-center text-red-500">{error || "Quiz not found."}</div>

  const scheduledDate = new Date(quiz.schadule).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const scheduledTime = new Date(quiz.schadule).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format as in screenshot
  })

  // Prepare default values for the edit modal
  const defaultEditValues: QuizFormData | undefined = quiz
    ? {
        title: quiz.title,
        duration: quiz.duration,
        numberOfQuestions: quiz.questions_number,
        scorePerQuestion: quiz.score_per_question,
        description: quiz.description,
        scheduleDate: new Date(quiz.schadule).toISOString().split("T")[0],
        scheduleTime: new Date(quiz.schadule).toTimeString().slice(0, 5),
        difficultyLevel: quiz.difficulty,
        categoryType: quiz.type,
        groupName: quiz.group,
      }
    : undefined

  return (
    <>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/quizes" className="hover:underline">
                Quizzes
              </Link>
            </li>
            <li>
              <HiChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="font-medium text-gray-900" aria-current="page">
              {quiz.title}
            </li>
          </ol>
        </nav>

        {/* Main Quiz Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>

          {/* Date and Time */}
          <div className="flex items-center gap-4 text-gray-700 text-base sm:text-lg mb-6">
            <div className="flex items-center gap-2">
              <HiCalendarDays className="w-5 h-5 text-gray-500" />
              <span>{scheduledDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiClock className="w-5 h-5 text-gray-500" />
              <span>{scheduledTime}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
              <span className="text-gray-700 font-medium">Duration</span>
              <span className="text-gray-900 font-semibold">{quiz.duration} minutes</span>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
              <span className="text-gray-700 font-medium">Number of questions</span>
              <span className="text-gray-900 font-semibold">{quiz.questions_number}</span>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
              <span className="text-gray-700 font-medium">Score per question</span>
              <span className="text-gray-900 font-semibold">{quiz.score_per_question}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
            <h3 className="text-gray-700 font-medium mb-2">Description</h3>
            <p className="text-gray-900 text-sm leading-relaxed">{quiz.description}</p>
          </div>

          {/* Question Bank and Randomize */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
              <span className="text-gray-700 font-medium">Question bank used</span>
              <span className="text-gray-900 font-semibold">{quiz.title || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 p-4">
              <input
                type="checkbox"
                id="randomize-questions"
                checked={true}
                readOnly // Since this is a display page, it's read-only
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                aria-checked={true}
              />
              <label htmlFor="randomize-questions" className="text-gray-900 font-medium cursor-pointer">
                Randomize questions
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleDeleteClick}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200"
              aria-label="Delete quiz"
            >
              <HiTrash className="w-5 h-5" />
              <span>Delete</span>
            </button>
            <button
            //   onClick={handleEditClick}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all duration-200"
              aria-label="Edit quiz details"
            >
              <HiPencilSquare className="w-5 h-5" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Setup Modal for Editing */}
      {isEditModalOpen && defaultEditValues && (
        <QuizSetupModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          defaultValues={defaultEditValues} // Pass default values for editing
        />
      )}

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the quiz "${quiz.title}"? This action cannot be undone.`}
        confirmText="Delete"
      />
    </>
  )
}

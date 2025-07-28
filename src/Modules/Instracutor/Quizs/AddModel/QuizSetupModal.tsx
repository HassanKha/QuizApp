import { useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { HiXMark , HiCheck } from "react-icons/hi2"
import type { QuizFormData, QuizSetupModalProps } from "../../../../Interfaces/Quizzes/Interfaces"



const durationOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 45, label: "45" },
  { value: 60, label: "60" },
]

const questionOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
]

const scoreOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
]

const difficultyOptions = [
  { value: "entry", label: "Entry" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
]

const categoryOptions = [
  { value: "FE", label: "Frontend (FE)" },
  { value: "BE", label: "Backend (BE)" },
  { value: "FS", label: "Full Stack (FS)" },
  { value: "DS", label: "Data Science (DS)" },
  { value: "ML", label: "Machine Learning (ML)" },
]

const groupOptions = [
  { value: "JSB", label: "JavaScript Basics (JSB)" },
  { value: "RCT", label: "React (RCT)" },
  { value: "NJS", label: "Node.js (NJS)" },
  { value: "PYT", label: "Python (PYT)" },
  { value: "JAV", label: "Java (JAV)" },
]

export default function QuizSetupModal({ isOpen, onClose }: QuizSetupModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<QuizFormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      duration: 10,
      numberOfQuestions: 15,
      scorePerQuestion: 1,
      description: "",
      scheduleDate: "",
      scheduleTime: "",
      difficultyLevel: "entry",
      categoryType: "FE",
      groupName: "JSB",
    },
  })

  // Focus management
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])



  const onSubmit = async (data: QuizFormData) => {
    console.log("Quiz data submitted:", data)

  }

  const handleFormSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      reset()
      onClose()
    } catch (error) {
      console.error("Error submitting quiz:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        role="document"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 id="modal-title" className="text-xl sm:text-2xl font-semibold text-gray-900">
            Set up a new quiz
          </h1>
          <div className="flex items-center gap-2">
            <button
            
              type="submit"
              form="quiz-form"
              disabled={!isValid || isSubmitting}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Save quiz"
            >
              <HiCheck className="w-6 h-6" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
              aria-label="Close modal"
            >
              <HiXMark className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form id="quiz-form" onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Details Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Details</h2>

   <div className="mb-4 flex items-stretch">
  <label
    htmlFor="title"
    className="min-w-[100px] text-sm text-center font-medium text-gray-700 px-4 py-3 bg-[#FFEDDF] rounded-l-xl flex items-center justify-center"
  >
    Title:
  </label>
  <div className="flex-1">
    <input
      {...register("title", {
        required: "Title is required",
        minLength: { value: 3, message: "Title must be at least 3 characters" },
        maxLength: { value: 100, message: "Title must be less than 100 characters" },
      })}
      ref={firstInputRef}
      type="text"
      id="title"
      className="w-full h-full px-4 py-3 bg-orange-50 border  border-none rounded-r-xl focus:outline-none "
      placeholder="Enter quiz title"
      aria-invalid={errors.title ? "true" : "false"}
      aria-describedby={errors.title ? "title-error" : undefined}
    />
    {errors.title && (
      <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
        {errors.title.message}
      </p>
    )}
  </div>
</div>

            {/* Duration, Questions, Score Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="flex items-stretch mb-4">
  <label
    htmlFor="duration"
    className="min-w-[180px] text-center px-4 py-3 bg-[#FFEDDF] rounded-l-xl flex items-center justify-center text-sm font-medium text-gray-700"
  >
    Duration (in minutes)
  </label>
  <Controller
    name="duration"
    control={control}
    rules={{ required: "Duration is required" }}
    render={({ field }) => (
      <select
        {...field}
        id="duration"
        className="w-full h-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-r-xl border-none focus:outline-none transition-all duration-200"
        aria-invalid={errors.duration ? "true" : "false"}
      >
        {durationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )}
  />
</div>

           <div className="flex items-stretch mb-4">
  <label
    htmlFor="numberOfQuestions"
    className="min-w-[180px] text-center px-4 py-3 bg-[#FFEDDF] rounded-l-xl flex items-center justify-center text-sm font-medium text-gray-700"
  >
    No. of questions
  </label>
  <Controller
    name="numberOfQuestions"
    control={control}
    rules={{ required: "Number of questions is required" }}
    render={({ field }) => (
      <select
        {...field}
        id="numberOfQuestions"
        className="w-full h-full px-4 py-3 border-none bg-orange-50 border border-orange-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
        aria-invalid={errors.numberOfQuestions ? "true" : "false"}
      >
        {questionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )}
  />
</div>

            <div className="flex items-stretch mb-4">
  <label
    htmlFor="scorePerQuestion"
    className="min-w-[180px] text-center px-4 py-3  bg-[#FFEDDF] rounded-l-xl flex items-center justify-center text-sm font-medium text-gray-700"
  >
    Score per question
  </label>
  <Controller
    name="scorePerQuestion"
    control={control}
    rules={{ required: "Score per question is required" }}
    render={({ field }) => (
      <select
        {...field}
        id="scorePerQuestion"
        className="w-full h-full px-4 py-3 bg-orange-50 border-none border-orange-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
        aria-invalid={errors.scorePerQuestion ? "true" : "false"}
      >
        {scoreOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )}
  />
</div>

            </div>

            {/* Description */}
           <div className="mb-6 flex items-stretch">
  <label
    htmlFor="description"
    className="min-w-[100px] text-center px-4 py-3 bg-[#FFEDDF] rounded-l-xl flex items-center justify-center text-sm font-medium text-gray-700"
  >
    Description
  </label>
  <div className="flex-1">
    <textarea
      {...register("description", {
        maxLength: {
          value: 500,
          message: "Description must be less than 500 characters",
        },
      })}
      id="description"
      rows={4}
      className="w-full h-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
      placeholder="Enter quiz description (optional)"
      aria-invalid={errors.description ? "true" : "false"}
      aria-describedby={errors.description ? "description-error" : undefined}
    />
    {errors.description && (
      <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
        {errors.description.message}
      </p>
    )}
  </div>
</div>

            {/* Schedule */}
        <div className="flex items-center mb-4 w-fit rounded-xl border border-gray-300 overflow-hidden text-sm font-medium text-gray-800 shadow-sm">
  {/* Label */}
  <div className="bg-[#FFEDDF] px-4 py-2 h-10 flex items-center justify-center">
    Schedule
  </div>

  {/* Date */}
  <div className="flex items-center gap-2 px-4 py-2 border-l border-gray-300">
    <input
      type="date"
      {...register("scheduleDate", { required: "Schedule date is required" })}
      className="bg-transparent focus:outline-none w-[110px] text-black"
    />
  </div>

  {/* Time */}
  <div className="flex items-center gap-2 px-4 py-2 border-l border-gray-300">
    <input
      type="time"
      {...register("scheduleTime", { required: "Schedule time is required" })}
      className="bg-transparent focus:outline-none w-[60px] text-black"
    />
  </div>
</div>



            {/* Bottom Row - Difficulty, Category, Group */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
  {/* Difficulty Level */}
  <div className="flex items-stretch rounded-xl overflow-hidden border border-orange-200 bg-orange-50">
    <div className="min-w-[100px] px-4 py-2 flex items-center justify-center bg-[#FFEDDF] text-sm font-medium text-gray-700">
      Difficulty
    </div>
    <Controller
      name="difficultyLevel"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          id="difficultyLevel"
          className="w-full px-4 py-2 border-none  bg-transparent focus:outline-none"
        >
          {difficultyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  </div>

  {/* Category Type */}
  <div className="flex items-stretch rounded-xl overflow-hidden border border-orange-200 bg-orange-50">
    <div className="min-w-[100px] px-4 py-2 flex items-center justify-center bg-[#FFEDDF] text-sm font-medium text-gray-700">
      Category
    </div>
    <Controller
      name="categoryType"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          id="categoryType"
          className="w-full px-4 py-2 border-none  bg-transparent focus:outline-none"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  </div>

  {/* Group Name */}
  <div className="flex items-stretch rounded-xl overflow-hidden border border-orange-200 bg-orange-50">
    <div className="min-w-[100px] px-4 py-2 flex items-center justify-center bg-[#FFEDDF] text-sm font-medium text-gray-700">
      Group
    </div>
    <Controller
      name="groupName"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          id="groupName"
          className="w-full px-4 py-2 border-none bg-transparent focus:outline-none"
        >
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  </div>
</div>

          </div>

          {/* Submit Button for Mobile */}
          <div className="flex justify-end pt-4 border-t border-gray-200 sm:hidden">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? "Creating..." : "Create Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

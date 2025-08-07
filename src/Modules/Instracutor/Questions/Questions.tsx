import { useState, useMemo, useEffect } from "react";
import { HiEye, HiPencilSquare, HiTrash, HiPlus, HiMagnifyingGlass } from "react-icons/hi2";
import QuestionSetupModal, { type QuestionFormData } from "./AddModel/QuestionSetupModal";
import { toast } from "react-toastify";
import { axiosInstance, Questions_URLS } from "../../../Server/baseUrl";
import { FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import DeleteModal from "../../../Component/shared/Delete";
import { useForm } from "react-hook-form";
import QuestionViewModal, { type QuestionData } from "./ViewModal/QuestionDetailsModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

interface UpdatedQuestion {
  answer: "A" | "B" | "C" | "D";
}

interface Question {
  _id: string;
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  difficulty: string;
  hasActions: boolean;
  answer: string;
  points: number;
}

export default function QuestionBankPage() {
  const [showModal, setShowModal] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData | null>(null);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalLoading, setmodalLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { register, formState: { errors }, handleSubmit, setValue } = useForm<UpdatedQuestion>();

  const handleViewQuestion = (question: Question) => {
    // Map Question to QuestionData, adding a default or derived 'type'
    setSelectedQuestion({
      title: question.title,
      description: question.description,
      options: question.options,
      answer: question.answer as "A" | "B" | "C" | "D",
      difficulty: question.difficulty as "easy" | "medium" | "hard",
      type: "FE", // Replace "FE" with the correct value if available in your data
      points: question.points
    });
    setIsModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const showModalUpdate = (question: Question) => {
    setQuestionId(question._id);
    // Assertion is needed because `question.answer` is `string` but `setValue` expects a literal type
    setValue("answer", question.answer as "A" | "B" | "C" | "D");
    setShowModal(true);
  };

  const closeModalUpdate = () => {
    setShowModal(false);
  };

  const openDeleteModal = (question: Question) => {
    setQuestionId(question._id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const updateQuestionAnswer = async (data: UpdatedQuestion) => {
    if (!questionId) {
      toast.error("Question ID is missing. Cannot update.");
      return;
    }

    try {
      setmodalLoading(true);
      const res = await axiosInstance.put(Questions_URLS.Update_Question(questionId), data);
      toast.success(res?.data?.message);
      fetchQuestion();
      closeModalUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred.");
    } finally {
      setmodalLoading(false);
    }
  };
  const user = useSelector((state: RootState) => state.auth.LogData);

  let navigate = useNavigate()
  if (user?.role === "Student") {
    navigate('/dashboard')
  }
  const handleDeleteQuestion = async () => {
    if (!questionId) {
      toast.error("Question ID is missing. Cannot delete.");
      return;
    }

    try {
      setmodalLoading(true);
      const res = await axiosInstance.delete(Questions_URLS.Delete_Question(questionId));
      toast.success(res?.data?.message);
      closeDeleteModal();
      fetchQuestion();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setmodalLoading(false);
    }
  };

  const handleAddQuestion = async (payload: QuestionFormData) => {
    try {
      await axiosInstance.post(Questions_URLS.SetUP_Questions, payload);
      toast.success("Question added successfully");
      fetchQuestion();
    } catch (error) {
      toast.error("Failed to add question");
      console.error(error);
    }
  };

  const filteredQuestions = useMemo(() => {
    if (!searchTerm) {
      return questionsData;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return questionsData.filter(
      (question) =>
        question.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        question.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        question.difficulty.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [questionsData, searchTerm]);

  async function fetchQuestion() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Questions_URLS.SetUP_Questions);
      setQuestionsData(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{t("questions.title")}</h1>
            <button
              onClick={() => setIsQuestionModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all duration-200"
              aria-label="Add new question"
            >
              <HiPlus className="w-5 h-5" />
              <span>{t("questions.addQuestion")}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
             placeholder={t("questions.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              aria-label="Search questions"
            />
          </div>

          <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-xl border border-gray-200 min-w-full">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                     {t("questions.titleCol")}
                    </th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                     {t("questions.descriptionCol")}
                    </th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                      {t("questions.difficultyCol")}
                    </th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                      {t("questions.actionsCol")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question, index) => (
                      <tr
                        key={question._id}
                        className={`border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                      >
                        <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-900 text-sm sm:text-base">
                          {question.title}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                          {question.description}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                          {question.difficulty}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewQuestion(question)}
                              className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                              aria-label={`View ${question.title}`}
                            >
                              <HiEye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => showModalUpdate(question)}
                              className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                              aria-label={`Edit ${question.title}`}
                            >
                              <HiPencilSquare className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(question)}
                              className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                              aria-label={`Delete ${question.title}`}
                            >
                              <HiTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500">
                        {loading ? (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <FaSpinner className="animate-spin text-xl" />
                            Loading questions...
                          </div>
                        ) : (
                          "No questions found."
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[800px] rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(updateQuestionAnswer)}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">{t("questions.updateTitle")}</h3>
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {modalLoading ? <FaSpinner className="animate-spin" /> : <FaCheck className="text-xl" />}
                  </button>
                  <button
                    type="button"
                    onClick={closeModalUpdate}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="relative flex border border-gray-200 rounded-lg focus-within:border-gray-200">
                  <label
                    htmlFor="groupName"
                    className="flex items-center justify-center flex-shrink-0 bg-[#f8ebd9] text-lg font-bold text-black px-4 py-3 rounded-l-lg"
                    style={{ minWidth: "110px" }}
                  >
                    {t("questions.answerLabel")}
                  </label>
                  <input
                    id="groupName"
                    {...register("answer", { required: "Answer is required" })}
                    type="text"
                    className="flex-grow px-4 py-3 rounded-r-lg focus:outline-none text-gray-800"
                  />
                </div>
                {errors.answer && <p className="text-red-600 text-sm mt-1">{errors.answer.message}</p>}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Setup Modal */}
      <QuestionSetupModal isOpen={isQuestionModalOpen} onClose={() => setIsQuestionModalOpen(false)} onSubmit={handleAddQuestion} />

      <DeleteModal show={showDeleteModal} onClose={closeDeleteModal} onDeleteConfirm={handleDeleteQuestion} title="Delete Question" loading={modalLoading} />

      <QuestionViewModal isOpen={isModalOpen} onClose={handleCloseViewModal} question={selectedQuestion} />
    </>
  );
}
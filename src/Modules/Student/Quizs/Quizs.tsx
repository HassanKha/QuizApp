import React, { useEffect, useState } from 'react';
import { axiosInstance, Students_Quizes } from '../../../Server/baseUrl';
import { GiAlarmClock } from 'react-icons/gi';
import { HiArrowRight } from 'react-icons/hi';
import img1 from '../../../assets/img1.png';
import { t } from 'i18next';
import Loader from '../../../Component/shared/Loader';
import { useForm } from 'react-hook-form';
import { FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface JoinQuiz {
  code:string
}

 interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  type: string; 
  difficulty: string; 
  duration: number; 
  group: string; 
  instructor: string; 
  questions: string[]; 
  questions_number: number;
  score_per_question: number;
  schadule: string; 
  participants: number;
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string; 
  __v: number;
}

export default function Quizs() {
  const [FirstFiveIncommingQuizes, setFirstFiveIncommingQuiz] = useState<Quiz[]>([]);
  const [LastFiveCompletedQuizes, setLastFiveCompletedQuiz] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setmodalLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const showModalJoinQuiz = () => {
    setShowModal(true);
  };

  const closeModalJoinQuiz = () => {
    setShowModal(false);
    setValue('code','')
  };


  const { register, formState: { errors }, handleSubmit ,setValue} = useForm<JoinQuiz>();
  

  const getFirstFiveIncommingQuizz = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(Students_Quizes.First_Five_Incomming_Quizz);
      console.log(res.data);
      setFirstFiveIncommingQuiz(res?.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLastFiveCompletedQuizz = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(Students_Quizes.Last_Five_Completed_Quizz);
      console.log(res.data);
      setLastFiveCompletedQuiz(res?.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinQuiz = async(data:JoinQuiz)=>{
      try{
        setmodalLoading(true)
        let res = await axiosInstance.post(Students_Quizes.Join_Quizz,data)
        console.log(res.data);
        toast.success(res?.data?.message)
        navigate('/Quiz')
      }
      catch(error:any){
        console.log(error);
         toast.error(error.response.data.message || "An error occurred.");
        
      }
      finally{
        setmodalLoading(false)
      }
  }

  useEffect(() => {
    getFirstFiveIncommingQuizz();
    getLastFiveCompletedQuizz();
  }, []);

  

  return (
    <>
      <div className="space-y-6">
        
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <button onClick={()=>{showModalJoinQuiz()}} className="flex cursor-pointer flex-col items-center justify-center p-6 lg:p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group min-h-[200px]">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <GiAlarmClock className="w-5 h-5 lg:w-10 lg:h-10 text-black" />
              </div>
            </div>
            <span className="text-base lg:text-lg font-semibold text-gray-900 text-center">
              {t("quizPage.joinQuiz")}
            </span>
          </button>

          
          <div className="flex flex-col mt-6 lg:flex-row gap-6">
           
            <div className="lg:w-6/12 w-full">
              <div className="bg-white w-full rounded-2xl border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                 {t("quizPage.upcoming")}
                </h2>
              {isLoading ? (
  <Loader />
) : FirstFiveIncommingQuizes.length < 0 ? (
  <div className="text-center py-4 text-gray-500 text-sm sm:text-base">
     {t("quizPage.noData")}
  </div>
) : (
  <>
    {FirstFiveIncommingQuizes.map((quiz) => (
      <div key={quiz?._id} className="space-y-3 bg-white sm:space-y-4 mt-4">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-orange-100 hover:shadow-md transition-all duration-200">
          <div className="w-16 h-16 bg-orange-50 sm:w-20 sm:h-20 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center flex-shrink-0">
            <img
              src={img1}
              alt="Quiz illustration"
              className="w-full h-full sm:w-12 sm:h-12 lg:w-full lg:h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-xl mb-1 sm:mb-2 line-clamp-2">
              {t("quizPage.title")}: {quiz?.title}
            </h3>
            <p className="text-black mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">
              {t("quizPage.date")}: {quiz?.createdAt && new Date(quiz?.createdAt).toLocaleString()}
            </p>
            <p className="text-black mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">
             {t("quizPage.code")}: {quiz?.code}
            </p>
            <p className="text-black mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">
              {t("quizPage.status")}: <span className={quiz.status == 'open' ?'bg-green-600 inline-block rounded-xl font-semibold  text-white py-1 px-3':'bg-red-600 rounded-xl inline-block py-1 px-3 font-semibold text-white'}>{quiz?.status}</span>
            </p>
          </div>
          <button onClick={()=>{showModalJoinQuiz()}} className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-shrink-0">
            <span className="font-medium text-xs sm:text-sm lg:text-base">{t("quizPage.opened")}:</span>
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#C5D86D] rounded-full flex items-center justify-center">
              <HiArrowRight className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
            </div>
          </button>
        </div>
      </div>
    ))}
  </>
)}

                
               
              </div>
            </div>

          
            <div className="lg:w-6/12 w-full">
              <div className="bg-white w-full rounded-2xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t("quizPage.completed")}</h2>
                  <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-lg px-2 sm:px-3 py-2">
                    <span className="text-sm sm:text-base text-gray-900">{t("quizPage.results")}</span>
                    <HiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#C5D86D]" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <div className="overflow-hidden rounded-xl border border-gray-200 min-w-full">
                    {isLoading?(<Loader/>):(<table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-900">
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                            {t("quizPage.title")}
                          </th>
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                            {t("quizPage.groupName")}
                          </th>
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                           {t("quizPage.numOfPersons")}
                          </th>
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white text-sm sm:text-base">
                            {t("quizPage.date")}
                          </th>
                        </tr>
                      </thead>
                      {LastFiveCompletedQuizes.length >0 ?(<>{LastFiveCompletedQuizes.map((quiz)=>( <tbody>
                        <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-900 text-sm sm:text-base">
                            {quiz?.title}
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                            {quiz?.group}
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                            {quiz?.participants}
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                            {quiz.createdAt && new Date(quiz?.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>))}</>):(<tbody>
                            <tr>
                              <td colSpan={4} className="text-center py-4 text-gray-500">
                                {t("quizPage.noData")}
                              </td>
                            </tr>
                          </tbody>)}   
                    </table>)}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


        {showModal && (
              <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-[800px] rounded-lg shadow-lg">
                  <form onSubmit={handleSubmit(joinQuiz)}>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800">{t("quizPage.modal.title")}</h3>
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
                          onClick={closeModalJoinQuiz}
                          className="text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <FaTimes className="text-xl" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="relative flex border border-gray-200 rounded-lg focus-within:border-gray-200">
                        <label
                          htmlFor="code"
                          className="flex items-center justify-center flex-shrink-0 bg-[#f8ebd9] text-lg font-bold text-black px-4 py-3 rounded-l-lg"
                          style={{ minWidth: "110px" }}
                        >
                           {t("quizPage.code")}
                        </label>
                        <input
                          id="groupName"
                          {...register("code", { required: "Code is required" })}
                          type="text"
                          className="flex-grow px-4 py-3 rounded-r-lg focus:outline-none text-gray-800"
                        />
                      </div>
                      {errors.code && <p className="text-red-600 text-sm mt-1">{t("quizPage.modal.codeRequired")}</p>}
                    </div>
                  </form>
                </div>
              </div>
            )}
    </>
  );
}

export interface QuizSetupModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate?: (data: QuizFormData) => Promise<string>  // ✅ now optional
  defaultValues?: QuizFormData
  setGeneratedQuizCode?: (code: string) => void
  setIsQuizSuccessModalOpen?: (isOpen: boolean) => void

}

 export interface QuizFormData {
  title: string
  duration: number
  numberOfQuestions: number
  scorePerQuestion: number
  description: string
  scheduleDate: string
  scheduleTime: string
  difficultyLevel: string
  categoryType: string
  groupName: string
}

export interface Quiz {
  _id: string
  code: string
  title: string
  description: string
  status: "open" | "closed"
  instructor: string
  group: string
  questions_number: number
  questions: string[]
  schadule: string
  duration: number
  score_per_question: number
  type: string
  difficulty: string
  updatedAt: string
  createdAt: string
  __v: number
  participants: number
}

export interface UpdatedQuiz{
  title:string
}
export interface Question {
  _id: string;
  title: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    [key: string]: string;
  };
}
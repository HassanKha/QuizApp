export interface QuizSetupModalProps {
  isOpen: boolean
  onClose: () => void
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
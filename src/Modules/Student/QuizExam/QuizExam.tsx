import React from 'react'
import { useLocation } from 'react-router-dom'

export default function QuizExam() {
    const location = useLocation()
    console.log(location.state);
    const quizId = location?.state
    console.log(quizId);
    
  return (
    <div>
      
    </div>
  )
}

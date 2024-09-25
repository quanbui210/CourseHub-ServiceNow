import axios from "axios"
import { useState, useEffect } from "react"
import { Course } from "../types"
const username = import.meta.env.VITE_SERVICENOW_USERNAME
const password = import.meta.env.VITE_SERVICENOW_PASSWORD
export const useLearners = () => {
  const [learners, setLearners] = useState<Course[]>([])
  useEffect(() => {
    axios.get("https://dev183695.service-now.com/api/now/table/x_1540387_course_s_learner?sysparm_limit=10", {
      auth: {
        username,
        password,
      }
    }).then((response) => setLearners(response.data.result))
  }, [])
  return learners
}

export const useCourse = (learnerId: string) => {
    const [learner, setLearner] = useState<Course>()
    useEffect(() => {
      axios.get(`https://dev183695.service-now.com/api/now/table/x_1540387_course_s_learner/${learnerId}`, {
        auth: {
            username,
            password,
        }
      }).then((response) => setLearner(response.data.result))
    }, [learnerId])
    return learner
}
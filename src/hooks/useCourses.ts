import axios from "axios"
import { useState, useEffect } from "react"
import { Course } from "../types"
const username = import.meta.env.VITE_SERVICENOW_USERNAME
const password = import.meta.env.VITE_SERVICENOW_PASSWORD
export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  useEffect(() => {
    axios.get("https://dev183695.service-now.com/api/now/table/x_1540387_course_s_course?sysparm_limit=10", {
      auth: {
        username,
        password,
      }
    }).then((response) => setCourses(response.data.result))
  }, [])
  return courses
}

export const useCourse = (courseId: string) => {
    const [course, setCourse] = useState<Course>()
    useEffect(() => {
      axios.get(`https://dev183695.service-now.com/api/now/table/x_1540387_course_s_course/${courseId}`, {
        auth: {
            username,
            password,
        }
      }).then((response) => setCourse(response.data.result))
    }, [courseId])
    return course
}
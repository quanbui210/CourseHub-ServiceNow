import { useState, useEffect } from "react"
import { Subscription } from "../types"
import axios from "axios"

const username = import.meta.env.VITE_SERVICENOW_USERNAME
const password = import.meta.env.VITE_SERVICENOW_PASSWORD

export const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  useEffect(() => {
    axios.get("https://dev183695.service-now.com/api/now/table/x_1540387_course_s_course_subscription?sysparm_limit=10", {
      auth: {
        username,
        password
      }
    }).then((response) => setSubscriptions(response.data.result))
  }, [])
  return subscriptions
}
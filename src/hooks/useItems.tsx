import axios from "axios"
import { useState, useEffect } from "react"
import { Course, Subscription, Learner } from "../types"
const username = import.meta.env.VITE_SERVICENOW_USERNAME
const password = import.meta.env.VITE_SERVICENOW_PASSWORD


type Item = "learner" | "course" | "course_subscription"
type ItemType = Course | Learner | Subscription

export const useItems =  <T extends ItemType>(type: Item) => {
    const [items, setItems] = useState<T[]>([]);

    useEffect(() => {
      axios
        .get(`https://dev183695.service-now.com/api/now/table/x_1540387_course_s_${type}?sysparm_limit=10`, {
          auth: {
            username,
            password,
          },
        })
        .then((response) => setItems(response.data.result))
        .catch((error) => console.error("Error fetching items:", error));
    }, [type]);
  
    return items;
  
}

export const useItem =  <T extends ItemType>(type: Item, itemId: string) => {
    const [item, setItem] = useState<T>();

  useEffect(() => {
    if (!itemId) return;

    axios
      .get(`https://dev183695.service-now.com/api/now/table/x_1540387_course_s_${type}/${itemId}`, {
        auth: {
          username,
          password,
        },
      })
      .then((response) => setItem(response.data.result))
      .catch((error) => console.error("Error fetching item by ID:", error));
  }, [itemId, type]);

  return item;
}
import axios from "axios"
import { Course, Subscription, Learner } from "../types"
import useSWR from "swr"
const username = import.meta.env.VITE_SERVICENOW_USERNAME
const password = import.meta.env.VITE_SERVICENOW_PASSWORD


type Item = "learner" | "course" | "course_subscription"
type ItemType = Course | Learner | Subscription


export const baseUrl = "https://dev183695.service-now.com/api/now/table"

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
      auth: {
          username,
          password,
      },
  });
  return response.data.result; // Adjust based on your response structure
};

export const useItems = <T extends ItemType>(type: string) => {
  const { data, error, mutate } = useSWR<T[]>(
      `${baseUrl}/x_1540387_course_s_${type}?sysparm_limit=10`,
      fetcher
  );

  return {
      items: data || [], // Default to an empty array
      error,
      isLoading: !error && !data,
      mutate,
  };
};
//${baseUrl}/x_1540387_course_s_${type}/${itemId}
export const useItem =  <T extends ItemType>(type: Item, itemId: string) => {
  const { data, error, mutate } = useSWR<T>(
    `${baseUrl}/x_1540387_course_s_${type}/${itemId}`,
    fetcher
);

  return {data, error, mutate};
}
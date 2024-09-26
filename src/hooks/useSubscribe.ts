import axios from "axios";
import { useEffect, useState } from "react";
import { Subscription } from "../types";

const username = import.meta.env.VITE_SERVICENOW_USERNAME;
const password = import.meta.env.VITE_SERVICENOW_PASSWORD;

export const useSubscribe= <T extends Subscription>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<T | null>(null);
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const createSubscription = async (courseId: string, learnerId: string) => {
    if (!courseId || !learnerId) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://dev183695.service-now.com/api/now/table/x_1540387_course_s_course_subscription",
        {
          course: courseId,
          learner: learnerId,
          subscription_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          auth: {
            username,
            password,
          }
        }
      );
      setSubscription(response.data.result);
      setSubscribed(true)
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { subscription, loading, error, createSubscription, subscribed };
};



export const useCheckSubscription = (courseId: string, learnerId: string) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkSubscription = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dev183695.service-now.com/api/now/table/x_1540387_course_s_course_subscription?sysparm_query=course=${courseId}^learner=${learnerId}`,
          {
            auth: {
              username,
              password,
            },
          }
        );

        // If there are results, user is subscribed
        setIsSubscribed(response.data.result.length > 0);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && learnerId) {
      checkSubscription();
    }
  }, [courseId, learnerId]);

  return { isSubscribed, loading };
};


export const useUnsubscribe = () =>{
    const [loading, setLoading] = useState<boolean>(false)
    const [unSubscribed, setUnsubscribed] = useState<boolean>(false)

        const unSubscribe = async (subId: string) => {
          setLoading(true);
          try {
            await axios.delete(
              `https://dev183695.service-now.com/api/now/table/x_1540387_course_s_course_subscription/${subId}`,
              {
                auth: {
                  username,
                  password,
                },
              }
            ).then(response => console.log(response.data))
            setUnsubscribed(true)
          } finally {
            setLoading(false);
          }
        }
      return {loading, unSubscribed, unSubscribe}
}
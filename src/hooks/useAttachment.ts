import { useState, useEffect } from "react"
import { Attachment } from "../types"
import axios from "axios";
import { baseUrl } from "./useItems";
const username = import.meta.env.VITE_SERVICENOW_USERNAME
const password = import.meta.env.VITE_SERVICENOW_PASSWORD
export const useAttachment = <T extends Attachment> (attachmentId: string) => {
    const [attachment, setAttachment] = useState<T>()
    useEffect(() => {
        if (!attachmentId) return;
    
        axios
          .get(`${baseUrl}/attachment/${attachmentId}`, {
            auth: {
              username,
              password,
            },
          })
          .then((response) => setAttachment(response.data.result))
          .catch((error) => console.error("Error fetching item by ID:", error));
      }, [ attachmentId]);
      return attachment
}   
import { Attachment } from "../types"
import { baseUrl, fetcher } from "./useItems";
import useSWR from "swr";

export const useAttachment =  <T extends Attachment> (attachmentId: string) => {
  const { data, error, mutate } = useSWR<T>(
    `${baseUrl}/attachment/${attachmentId}`,
    fetcher
  )
  return {data, error, mutate};
}
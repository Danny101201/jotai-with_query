import { useQuery } from "@tanstack/react-query"
import { commentKeys } from "../constants/key"
import { atom, useSetAtom, useAtomValue } from "jotai"
import { atomsWithQuery } from "jotai-tanstack-query"


export const useComment = () => {
  const commentDataQuery = useQuery({
    queryKey: commentKeys.lists(),
    queryFn: async () => {

      if (Math.random() > 0.5) {

        throw new Error('error')
      }
      const data = await fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json())
      return data
    },
    onError() {
      console.log('error')
    }
    // Infinity 代表data 只會fetch一次不會因為 windowOnfocus 就重新 fetch 只能透過 queryClient.invalidateQuery
    // staleTime: Infinity
  })
  return {
    query: commentDataQuery
  }
}

const commentId = atom(1)
export const useCommentWithJotai = () => {

  // const setPage = useSetAtom(commentId)
  // const Page = useAtomValue(commentId)
  const [commentAtom] = atomsWithQuery((get) => ({
    queryKey: commentKeys.list(get(commentId).toString()),
    queryFn: async ({ signal, queryKey }) => {
      const [type, id] = queryKey
      // const data = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, { signal }).then(res => res.json())
      const data = await fetch(`https://jsonplaceholder.typicode.com/comments`, { signal }).then(res => res.json())
      return data
    }
  }))

  return {
    query: commentAtom,
  }
}
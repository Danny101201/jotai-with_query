import { MutationFunction, MutationOptions } from '@tanstack/query-core';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomsWithQuery, atomsWithMutation } from 'jotai-tanstack-query';
import React from 'react'

type UserType = {
  id: number;
  name: string;
  username: string;
  phone: string;
};
const userId = atom(1)
const [userAtom, userAtomStatus] = atomsWithQuery((get) => ({
  queryKey: ['users', get(userId).toString()],
  queryFn: async ({ signal, queryKey }) => {
    const [_, id] = queryKey
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal }).then(res => res.json());
    return data as UserType;
  }
}))
const mutatepost: MutationFunction<any, { title: string, body: string }> = async ({ title, body }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, body }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  return res.json()
}
const [_, postAtom] = atomsWithMutation((get) => ({
  mutationKey: ['users'],
  mutationFn: mutatepost
}))
export const AtomWithQuery = () => {
  const [user, dispatch] = useAtom(userAtom);
  const [post, mutate] = useAtom(postAtom);
  const usersStatus = useAtomValue(userAtomStatus)
  const setPage = useSetAtom(userId)
  const page = useAtomValue(userId)
  return (
    <div>
      <p>status : {usersStatus.status}</p>
      <button onClick={() => dispatch({ type: 'refetch' })}>refetch</button>
      <div>{user.id} {user.name}</div>
      <button onClick={() => setPage(p => p - 1)}>prev</button>
      <span>{page}</span>
      <button onClick={() => setPage(p => p + 1)}>next</button>
      <hr />
      <p>post</p>
      <button onClick={() => mutate([{ title: 'title', body: 'body' }])}>post data</button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  )
}

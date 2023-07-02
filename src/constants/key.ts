export const commentKeys = {
  lists: () => ['comments'],
  list: (id: string) => [...commentKeys.lists(), id]
}
import React, { useState } from 'react'
import { useComment } from '../hooks/useComment'

export const State = () => {
  const { query } = useComment()
  return (
    <div>
      State: {query.status}
      <button onClick={() => query.refetch()}>retry</button>
    </div>
  )
}

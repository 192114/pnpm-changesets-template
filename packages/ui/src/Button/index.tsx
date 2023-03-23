// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'

export default function Button(): JSX.Element {
  const [count, setCount] = useState(0)
  return (
    <>
      <button
        onClick={() => {
          setCount(pre => pre + 1)
        }}
      >
        {count}
      </button>
    </>
  )
}

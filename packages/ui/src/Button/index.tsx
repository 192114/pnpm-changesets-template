import { useState } from 'react'

export default function Button(): JSX.Element {
  const [count, setCount] = useState(0)
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setCount(pre => pre + 1)
        }}
      >
        {count}-add
      </button>
    </>
  )
}

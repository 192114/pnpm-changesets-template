import { useState } from 'react'
import { buttonCss } from './style'

export default function Button(): JSX.Element {
  const [count, setCount] = useState(0)
  return (
    <>
      <button
        css={buttonCss}
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

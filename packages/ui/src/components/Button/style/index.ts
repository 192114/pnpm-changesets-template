import { css } from '@emotion/react'

const buttonBaseCss = css({
  outline: 'none',
  border: 'none',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  textAlign: 'center',
  touchAction: 'manipulation',
  userSelect: 'none',
  cursor: 'pointer',
})

// export const genButtonCss = (): SerializedStyles => {
//   return css(buttonBaseCss, {})
// }
export const genButtonCss = css([buttonBaseCss])

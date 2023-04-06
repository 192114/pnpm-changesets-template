import { css, type SerializedStyles } from '@emotion/react'
import { presetColor } from '../../style'
import type { IButtonPropsType } from '../index'

export const buttonBaseCss = css({
  outline: 'none',
  border: 'none',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  textAlign: 'center',
  touchAction: 'manipulation',
  userSelect: 'none',
  cursor: 'pointer',
})

export const genStyleByType = (
  type: Exclude<IButtonPropsType['type'], null | undefined>
): SerializedStyles => {
  return css({
    backgroundColor: presetColor[type],
    color: presetColor.white100,
  })
}

// export const genStyleBySize = (size: string): SerializedStyles => {
//   return css({})
// }

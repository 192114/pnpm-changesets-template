import { css, keyframes, type SerializedStyles } from '@emotion/react'
import { presetColor } from '../../style'
import type { IButtonBasePropsType } from '../index'

type NotUndefined<T> = Exclude<T, null | undefined>

export const buttonBaseCss = css({
  outline: 'none',
  border: 'none',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  touchAction: 'manipulation',
  userSelect: 'none',
  cursor: 'pointer',
  position: 'relative',
  flexWrap: 'nowrap',
  '&:hover': {
    opacity: 0.7,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
  },
})

const genStyleByTypeAndFill = (
  type: NotUndefined<IButtonBasePropsType['type']>,
  fill: NotUndefined<IButtonBasePropsType['fill']>
): SerializedStyles => {
  const baseColor = presetColor[type]
  const textColor = fill !== 'solid' ? baseColor : presetColor.white100
  const backgroundColor = fill !== 'solid' ? 'transparent' : baseColor
  const borderColor = fill !== 'none' ? baseColor : 'transparent'
  const activeStyleStart =
    fill !== 'none'
      ? {
          opacity: 0,
          boxShadow: `0 0 0 6px ${baseColor}`,
          transition: '0.4s',
        }
      : null
  const activeStyleEnd =
    fill !== 'none'
      ? {
          opacity: 0.6,
          boxShadow: 'none',
          transition: '0s',
        }
      : null

  return css({
    backgroundColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    '&:after': activeStyleStart,
    '&:active:after': activeStyleEnd,
  })
}

const genStyleBySize = (size: NotUndefined<IButtonBasePropsType['size']>): SerializedStyles => {
  const sizeStyleMap = {
    mini: {
      borderRadius: '2px',
      padding: '0px 7px',
      fontSize: 12,
      height: 20,
      lineHeight: '20px',
    },
    small: {
      borderRadius: '2px',
      padding: '0px 10px',
      fontSize: 12,
      height: 24,
      lineHeight: '24px',
    },
    middle: {
      borderRadius: '4px',
      padding: '0px 10px',
      height: '30px',
      lineHeight: '30px',
      fontSize: 14,
    },
    large: {
      borderRadius: '6px',
      padding: '0px 14px',
      height: '34px',
      lineHeight: '34px',
      fontSize: 16,
    },
  }
  return css(sizeStyleMap[size])
}

const genStyleByBlock = (block: NotUndefined<IButtonBasePropsType['block']>): SerializedStyles => {
  if (block) {
    return css({
      display: 'flex',
      width: '100%',
    })
  }

  return css({
    display: 'inline-flex',
  })
}

const genStyleByDisabled = (disabled: NotUndefined<IButtonBasePropsType['disabled']>) => {
  return css({
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  })
}

export const genStyleByProps = (payload: IButtonBasePropsType): SerializedStyles => {
  const {
    block = false,
    size = 'middle',
    fill = 'solid',
    type = 'primary',
    disabled = false,
    loading = false,
  } = payload

  return css([
    buttonBaseCss,
    genStyleByBlock(block),
    genStyleBySize(size),
    genStyleByTypeAndFill(type, fill),
    genStyleByDisabled(disabled || loading),
  ])
}

export const iconStyle = css({
  display: 'inline-flex',
  color: 'inherit',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
  verticalAlign: '-0.125em',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
})

const loadingCircle = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

export const iconSpinStyle = css({
  animation: `${loadingCircle} 1s infinite linear`,
  marginInlineEnd: 8,
})

export const loadingIconStyle = css([iconStyle, iconSpinStyle])

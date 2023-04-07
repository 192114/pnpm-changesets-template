import { type ReactNode } from 'react'
import { genStyleByProps } from './style'

export interface IButtonPropsType {
  block?: boolean
  size?: 'mini' | 'small' | 'middle' | 'large'
  htmlType?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  type?: 'primary' | 'success' | 'danger' | 'warn'
  fill?: 'solid' | 'outlined' | 'none'
  disabled?: boolean
  loading?: boolean
}

export default function Button(props: IButtonPropsType): JSX.Element {
  const { children = null, htmlType = 'button', disabled = false, loading = false } = props

  return (
    <>
      <button css={genStyleByProps(props)} type={htmlType} disabled={disabled || loading}>
        {children}
      </button>
    </>
  )
}

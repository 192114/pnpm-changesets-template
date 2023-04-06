import { type ReactNode } from 'react'
import { buttonBaseCss, genStyleByType } from './style'

export interface IButtonPropsType {
  block?: boolean
  size?: 'mini' | 'small' | 'middle' | 'large'
  htmlType?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  type?: 'primary' | 'success' | 'danger' | 'warn'
}

export default function Button(props: IButtonPropsType): JSX.Element {
  const { children, htmlType = 'button', type = 'primary' } = props

  return (
    <>
      <button css={[buttonBaseCss, genStyleByType(type)]} type={htmlType}>
        {children}
      </button>
    </>
  )
}

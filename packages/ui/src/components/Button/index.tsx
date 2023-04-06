import { type ReactNode } from 'react'
import { genButtonCss } from './style'

export interface IButtonPropsType {
  block?: boolean
  size?: 'mini' | 'small' | 'middle' | 'large'
  htmlType?: 'button' | 'submit' | 'reset'
  color?: string
  children?: ReactNode
}

console.log(genButtonCss)

export default function Button(props: IButtonPropsType): JSX.Element {
  const { children, htmlType = 'button' } = props

  return (
    <>
      <button css={genButtonCss} type={htmlType}>
        {children}
      </button>
    </>
  )
}

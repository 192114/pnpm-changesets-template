import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../index'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    type: 'primary',
    htmlType: 'button',
    size: 'middle',
    block: false,
    children: '按钮',
    fill: 'solid',
    disabled: false,
  },
  parameters: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const primary: Story = {
  args: {
    htmlType: 'button',
    children: '按钮',
    type: 'primary',
  },
}

export const disabled: Story = {
  args: {
    htmlType: 'button',
    children: '按钮',
    type: 'primary',
    disabled: true,
  },
}

export const loading: Story = {
  args: {
    htmlType: 'button',
    children: '按钮',
    type: 'primary',
    loading: true,
  },
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeWidth="4"
        d="M6 24.008V42h36V24"
      ></path>
      <path
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeWidth="4"
        d="M33 23l-9 9-9-9M23.992 6v26"
      ></path>
    </svg>
  )
}

export const iconButton: Story = {
  args: {
    htmlType: 'button',
    children: '按钮',
    type: 'primary',
    icon: <Icon />,
  },
}

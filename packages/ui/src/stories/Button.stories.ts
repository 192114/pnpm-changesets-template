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

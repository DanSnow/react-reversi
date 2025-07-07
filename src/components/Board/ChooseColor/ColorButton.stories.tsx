import type { Meta, StoryObj } from '@storybook/react-vite'

import { expect, fn, userEvent } from 'storybook/test'

import { Player } from '~/types'
import { ColorButton } from './ColorButton'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ColorButton',
  component: ColorButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <svg height="200px" width="200px">
        <rect fill="green" width={200} height={200} />
        <Story />
      </svg>
    ),
  ],
  args: { onClick: fn() },
} satisfies Meta<typeof ColorButton>

export default meta
type Story = StoryObj<typeof meta>

export const White: Story = {
  args: {
    color: 'white',
    background: 'black',
    x: 100,
    y: 100,
    value: Player.WHITE,
    children: 'White',
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: args.children as string })
    await userEvent.click(button)
    await expect(args.onClick).toBeCalledWith(args.value)
  },
}

export const Black: Story = {
  args: {
    color: 'black',
    background: 'white',
    x: 100,
    y: 100,
    value: Player.BLACK,
    children: 'Black',
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: args.children as string })
    await userEvent.click(button)
    await expect(args.onClick).toBeCalledWith(args.value)
  },
}

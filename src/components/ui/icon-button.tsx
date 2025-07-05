import * as React from 'react'
import { cn } from '~/lib/utils'
import { Button } from './button'

export interface IconButtonProps extends React.ComponentProps<typeof Button> {
  icon: React.ReactNode
}

function IconButton({ className, variant, size, icon, children, ref, ...props }: IconButtonProps) {
  return (
    <Button ref={ref} className={cn(className, 'gap-1')} {...props}>
      <span>{icon}</span>
      {children}
    </Button>
  )
}

IconButton.displayName = 'IconButton'

export { IconButton }

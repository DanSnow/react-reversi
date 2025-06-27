import type { ButtonProps } from './button'

import * as React from 'react'
import { cn } from '~/lib/utils'
import { Button } from './button'

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn(className, 'gap-1')} {...props}>
        <span>{icon}</span>
        {children}
      </Button>
    )
  },
)
IconButton.displayName = 'IconButton'

export { IconButton }

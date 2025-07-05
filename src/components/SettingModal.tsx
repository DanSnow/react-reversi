import type { ReactElement } from 'react'
import type { AIVersions } from '~/lib/ai/core'
import type { Setting } from '~/schemas/settings'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { m } from '~/paraglide/messages'
import { SettingSchema } from '~/schemas/settings'
import { Checkbox } from './ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface Props {
  isOpen: boolean
  onClose: () => void
  onHintChange: (value: boolean) => void
  onRetractChange: (value: boolean) => void
  onVersionChange: (value: AIVersions) => void
}

const AI: [key: string, display: string][] = [
  ['v1', 'V1'],
  ['v2', 'V2'],
  ['v3', 'V3 (V2 + min-max)'],
  ['v3OverviewBoost', 'V4.5 (V2 + min-max * overview boost)'],
  ['v3IteratedOverview', 'V4.4 (V2 + min-max * 3 * overview boost)'],
  ['v3OverviewIterated', 'V4.3 (V2 + min-max * 3 + overview boost)'],
  ['v3OverviewLatestIterated', 'V4.2 (V2 + min-max * 3 + overview boost applied latest)'],
  ['v3OverviewLatest', 'V4.1 (V2 + min-max + overview boost applied latest)'],
  ['v3Overview', 'V4 (V2 + min-max + overview boost)'],
  ['v2Overview', 'V2 + overview'],
  ['v1MinMax', 'V1 + min-max'],
  ['v1Overview', 'V1 + min-max + overview'],
]

export function SettingModal({ isOpen, onClose, onHintChange, onRetractChange, onVersionChange }: Props): ReactElement {
  const onOpenChange = useCallback(
    (val: boolean) => {
      if (!val) onClose()
    },
    [onClose],
  )

  const form = useForm<Setting>({
    resolver: standardSchemaResolver(SettingSchema),
    defaultValues: {
      version: 'v3Overview',
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{m.settings()}</DialogTitle>
        <Form {...form}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="hint"
              render={() => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                  <FormControl>
                    <Checkbox onCheckedChange={onHintChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{m.hint()}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retract"
              render={() => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                  <FormControl>
                    <Checkbox onCheckedChange={onRetractChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{m.allow_retract()}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={() => (
                <FormItem>
                  <FormLabel>{m.ai_version()}</FormLabel>
                  <FormControl>
                    <Select name="version" defaultValue="v3Overview" onValueChange={onVersionChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AI.map(([value, display]) => (
                          <SelectItem key={value} value={value}>
                            {display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="field">
              <Button className="button is-primary" onClick={onClose}>
                OK
              </Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

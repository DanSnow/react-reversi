import type { ReactElement } from 'react'
import type { AIVersions } from '~/lib/ai/core'
import { useForm } from '@tanstack/react-form'
import { useCallback } from 'react'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { m } from '~/paraglide/messages'
import { SettingSchema } from '~/schemas/settings'
import { Checkbox } from '../ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

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

  const form = useForm({
    defaultValues: {
      hint: false,
      retract: false,
      version: 'v3Overview',
    },
    validators: {
      onChange: SettingSchema,
    },
    listeners: {
      onChange: ({ formApi }) => {
        const { hint, retract, version } = formApi.state.values
        onHintChange(hint)
        onRetractChange(retract)
        onVersionChange(version as AIVersions)
      },
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.settings()}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <div className="flex flex-col gap-2">
            <FieldGroup>
              <form.Field
                name="hint"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onBlur={field.handleBlur}
                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                      />
                      <div className="leading-none">
                        <FieldLabel htmlFor={field.name}>{m.hint()}</FieldLabel>
                      </div>
                    </Field>
                  )
                }}
              />
            </FieldGroup>

            <FieldGroup>
              <form.Field
                name="retract"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onBlur={field.handleBlur}
                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                      />
                      <div className="leading-none">
                        <FieldLabel htmlFor={field.name}>{m.allow_retract()}</FieldLabel>
                      </div>
                    </Field>
                  )
                }}
              />
            </FieldGroup>
            <FieldGroup>
              <form.Field
                name="version"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>{m.ai_version()}</FieldLabel>
                      <Select
                        name={field.name}
                        defaultValue="v3Overview"
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
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
                    </Field>
                  )
                }}
              />
            </FieldGroup>
            <DialogFooter>
              <Button onClick={onClose}>OK</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

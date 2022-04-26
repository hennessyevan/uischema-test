import React from 'react'
import { WidgetProps, WidgetRendererProps } from '@ui-schema/ui-schema'
import { Checkbox } from '@glasscanvas/elephantkit'

export function BooleanWidget({
  ownKey,
  storeKeys,
  onChange,
  schema,
  errors,
  valid,
  t,
  ...props
}: WidgetProps & WidgetRendererProps) {
  return (
    <Checkbox
      {...props}
      label={t(ownKey.toString()) as string}
      onChange={(selected) => {
        onChange({
          storeKeys,
          scopes: ['value'],
          type: 'set',
          data: {
            value: selected,
          },
          schema,
          required: props.required,
        })
      }}
    />
  )
}

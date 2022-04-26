import React from 'react'
import { WidgetRendererProps } from '@ui-schema/ui-schema'
import { Text, TextInput } from '@glasscanvas/elephantkit'

export function FormTextWidget({
  ownKey,
  storeKeys,
  onChange,
  schema,
  errors,
  valid,
  t,
  ...props
}: WidgetRendererProps & { size?: any }) {
  return (
    <TextInput
      {...props}
      placeholder={schema.get('placeholder') as string}
      size={schema.getIn(['view', 'size'], 'regular') as any}
      label={
        schema.getIn(['view', 'label'], true) && t(ownKey.toString()).toString()
      }
      invalid={!valid}
      onChange={(value) => {
        onChange({
          storeKeys,
          scopes: ['value'],
          type: 'set',
          data: {
            value,
          },
          schema,
          required: props.required,
        })
      }}
    />
  )
}

export function DisplayTextWidget({
  ownKey,
  schema,
  t,
  value,
}: WidgetRendererProps & { size?: any }) {
  return (
    <Text
      id={ownKey.toString()}
      size={schema.getIn(['view', 'size'], 'regular') as any}
    >
      {value}
    </Text>
  )
}

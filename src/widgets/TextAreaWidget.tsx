import React from 'react'
import { WidgetRendererProps } from '@ui-schema/ui-schema'
import { Paragraph, TextArea } from '@glasscanvas/elephantkit'

export function FormTextAreaWidget({
  ownKey,
  storeKeys,
  onChange,
  schema,
  errors,
  valid,
  t,
  value,
  required,
}: WidgetRendererProps) {
  return (
    <TextArea
      key={ownKey.toString()}
      value={value}
      placeholder={schema.get('placeholder') as string}
      description={schema.get('description') as string}
      maxLength={schema.get<number>('maxLength', undefined) as number}
      label={t(ownKey.toString()) as string}
      invalid={!valid}
      errorMessage={errors.errors.join(', ')}
      onChange={(e) => {
        onChange({
          storeKeys,
          scopes: ['value'],
          type: 'set',
          data: {
            value: e.currentTarget.value,
          },
          schema,
          required,
        })
      }}
    />
  )
}

export function DisplayTextAreaWidget({ ownKey, value }: WidgetRendererProps) {
  return <Paragraph key={ownKey.toString()} children={value} />
}

import { DebugBlock, HStack, Pane, VStack } from '@glasscanvas/elephantkit'
import {
  beautifyKey,
  createOrderedMap,
  createStore,
  JsonSchema,
  storeUpdater,
  Translator,
  UIApiProvider,
  UIGenerator,
} from '@ui-schema/ui-schema'
import { useCallback, useState } from 'react'

import { useIntl } from 'react-intl'

import { BasicSection } from './sections/Basic'
import { displayWidgets, formWidgets } from './widgetsBinding'

const schema = createOrderedMap<JsonSchema>({
  type: 'object',
  $id: 'com.tilma.example.basic',
  $schema: 'https://json-schema.org/draft/2020-12/schema',

  properties: {
    title: { type: 'string' },
    sections: {
      type: 'array',
      maxItems: 4,

      items: {
        type: 'object',
        properties: {
          basic: {
            $ref: `#/$defs/${BasicSection.schema['$id']}`,
          },
        },
      },
    },
  },

  $defs: {
    [BasicSection.schema['$id']]: BasicSection.schema,
  },
})

export function App() {
  const [values] = useState({ name: 'Evan' })

  const [store, setStore] = useState(() =>
    createStore(createOrderedMap(values))
  )

  const { formatMessage } = useIntl()

  const intlTranslator: Translator = (text, _, schema) => {
    return formatMessage({ id: text, defaultMessage: beautifyKey(text) })
  }

  const onChange = useCallback(
    (actions) => setStore(storeUpdater(actions)),
    [setStore]
  )

  return (
    <UIApiProvider loadSchema={(url) => fetch(url).then((r) => r.json())}>
      <HStack>
        <Pane
          elevation={1}
          css={{
            padding: '$5',
            maxWidth: 400,
            width: '100%',
            height: '100vh',
          }}
        >
          <UIGenerator
            schema={schema}
            store={store}
            onChange={onChange}
            showValidity={true}
            widgets={formWidgets}
            t={intlTranslator}
          />
        </Pane>

        <VStack
          css={{
            padding: '$5',
            width: '100%',
          }}
        >
          <UIGenerator
            schema={schema}
            store={store}
            onChange={onChange}
            widgets={displayWidgets}
            t={intlTranslator}
          />

          <DebugBlock object={store.values} css={{ zIndex: 999 }} />

          <DebugBlock object={schema.toJSON()} css={{ right: 300 }} />
        </VStack>
      </HStack>
    </UIApiProvider>
  )
}

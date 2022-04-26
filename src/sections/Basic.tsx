import { Heading, Paragraph, VStack } from '@glasscanvas/elephantkit'
import {
  doExtractValues,
  ObjectRenderer,
  ObjectRendererProps,
  useUIStore,
} from '@ui-schema/ui-schema'

export const BasicSection = {
  schema: {
    type: 'object',
    widget: 'BasicSection',
    version: '1.0.0',

    $id: 'basic-section',

    properties: {
      id: { type: 'string', hidden: true },
      title: {
        type: 'string',
        maxLength: 260,
        deleteEmpty: true,

        view: {
          label: false,
        },
      },

      description: {
        type: 'string',
        maxLength: 260,
        deleteEmpty: true,

        view: {
          label: false,
        },
      },
    },
  },

  editor: ObjectRenderer,
  viewer: BasicSectionViewer,
}

function BasicSectionViewer({ storeKeys }: ObjectRendererProps) {
  const { store } = useUIStore()
  const { value } = doExtractValues(storeKeys, store)

  const { title, description } = value?.toJS?.() ?? {}

  return (
    <VStack
      align="center"
      justify="center"
      css={{ padding: '$15', backgroundImage: `url(//picsum.photos/2000/500)` }}
    >
      <Heading css={{ color: '$white' }}>{title ?? 'Add a title'}</Heading>
      <Paragraph css={{ color: '$white' }}>
        {description ?? 'Add a description'}
      </Paragraph>
    </VStack>
  )
}

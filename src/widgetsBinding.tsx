import { Strong, ThemeProvider, VStack } from '@glasscanvas/elephantkit'
import {
  GroupRenderer,
  SchemaGridHandler,
  SimpleList,
} from '@ui-schema/ds-material'
import {
  CombiningHandler,
  ConditionalHandler,
  DefaultHandler,
  DependentHandler,
  ErrorFallbackProps,
  ExtractStorePlugin,
  extractValue,
  memo,
  ObjectRenderer,
  PluginSimpleStack,
  PluginStack,
  ReferencingHandler,
  UIApiProvider,
  validators,
  ValidityReporter,
  WidgetsBindingFactory,
} from '@ui-schema/ui-schema'
import {
  VirtualArrayRenderer,
  WidgetRenderer,
  WidgetRendererProps,
} from '@ui-schema/ui-schema/WidgetRenderer'
import { List, mergeDeep } from 'immutable'
import { BasicSection } from './sections/Basic'
import { BooleanWidget } from './widgets/BooleanWidget'
import { GenericList } from './widgets/GenericList'

import {
  DisplayTextAreaWidget,
  FormTextAreaWidget,
} from './widgets/TextAreaWidget'
import { FormTextWidget, DisplayTextWidget } from './widgets/TextWidget'

const FallbackComponent: React.ComponentType<ErrorFallbackProps> = ({
  type,
  widget,
}) => (
  <VStack>
    <Strong>System Error in Widget!</Strong>
    <Strong>Type:</Strong> {List.isList(type) ? type.join(', ') : type || '-'}
    <Strong>Widget:</Strong> {widget || '-'}
  </VStack>
)

const baseWidgets: WidgetsBindingFactory = {
  pluginStack: [
    ReferencingHandler,
    SchemaGridHandler,
    ExtractStorePlugin,
    CombiningHandler,
    DefaultHandler,
    DependentHandler,
    ConditionalHandler,
    PluginSimpleStack,
    ValidityReporter,
  ],
  types: {},
  custom: {},
  pluginSimpleStack: validators,
  GroupRenderer,
  WidgetRenderer,
  RootRenderer: ThemeProvider,
  ErrorFallback: FallbackComponent,
}

export const formWidgets: WidgetsBindingFactory = mergeDeep(baseWidgets, {
  types: {
    string: FormTextWidget,
    boolean: BooleanWidget,
    array: GenericList,
  },
  custom: {
    textArea: FormTextAreaWidget,
    BasicSection: BasicSection.editor,
  },
})

const ListDisplay = extractValue(
  memo(
    ({
      value,
      showValidity,
      storeKeys,
      ownKey,
      schema,
      required,
    }: WidgetRendererProps) => {
      return (
        <VStack>
          {value
            ? value
                .map((_, i) => (
                  <PluginStack
                    showValidity={showValidity}
                    storeKeys={storeKeys.push(i)}
                    parentSchema={schema}
                    schema={schema.get('items')}
                    required={required}
                  />
                ))
                .valueSeq()
            : null}
        </VStack>
      )
    }
  )
)

export const displayWidgets: WidgetsBindingFactory = mergeDeep(baseWidgets, {
  types: {
    string: DisplayTextWidget,
    integer: DisplayTextWidget,
    array: ListDisplay,
  },
  custom: {
    textArea: DisplayTextAreaWidget,
    BasicSection: BasicSection.viewer,
  },
})

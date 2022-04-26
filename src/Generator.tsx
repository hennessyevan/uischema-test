import {
  createOrderedMap,
  createStore,
  relTranslator,
  storeUpdater,
  UIMetaProvider,
  UIStoreProvider,
  WidgetsBindingComponents,
  WidgetsBindingWidgets,
} from '@ui-schema/ui-schema'
import React, { useState } from 'react'

type GeneratorProps = {
  values: object
  widgets: WidgetsBindingComponents & WidgetsBindingWidgets
}
export function Generator({ values, widgets }: GeneratorProps) {
  // Create a state with the data, transforming into immutable on first mount
  const [store, setStore] = useState(() =>
    createStore(createOrderedMap(values))
  )

  // or create empty store, based on the schema type:
  // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));
  const onChange = React.useCallback(
    (actions) => {
      setStore(storeUpdater(actions))
    },
    [setStore]
  )

  return (
    // move `UIMetaProvider` somewhere higher in your app
    <UIMetaProvider widgets={widgets} t={relTranslator}>
      <UIStoreProvider store={store} onChange={onChange} showValidity={true} />
    </UIMetaProvider>
  )
}

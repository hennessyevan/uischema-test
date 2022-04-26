import {
  GenericListContent,
  GenericListFooter,
  GenericListItem,
  GenericListItemMore,
  GenericListItemPos,
  MuiWidgetBinding,
} from '@ui-schema/ds-material'
import {
  memo,
  useUIStore,
  WidgetProps,
  WithOnChange,
} from '@ui-schema/ui-schema'
import { List } from 'immutable'

export const GenericListContentMemo = memo(GenericListContent)

export function GenericList(
  props: WidgetProps<MuiWidgetBinding> & WithOnChange
): React.ReactElement {
  const { store } = useUIStore()
  const { value } = store?.extractValues<List<any>>(props.storeKeys) || {}
  // extracting and calculating the list size here, not passing down the actual list for performance reasons
  // https://github.com/ui-schema/ui-schema/issues/133
  return (
    <GenericListContentMemo
      {...props}
      listSize={value?.size || 0}
      ComponentItemPos={GenericListItemPos}
      ComponentItemMore={GenericListItemMore}
      ComponentItem={GenericListItem}
      ComponentFooter={GenericListFooter}
    />
  )
}

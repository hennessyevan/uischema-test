import { AriaAccordionProps } from "@react-types/accordion";
import { ButtonHTMLAttributes, HTMLAttributes, RefObject } from "react";
import { Node } from "@react-types/shared";
import { TreeState } from "@react-stately/tree";
interface AccordionAria {
    /** Props for the accordion container element. */
    accordionProps: HTMLAttributes<HTMLElement>;
}
interface AccordionItemAriaProps<T> {
    item: Node<T>;
}
interface AccordionItemAria {
    /** Props for the accordion item button. */
    buttonProps: ButtonHTMLAttributes<HTMLElement>;
    /** Props for the accordion item content element. */
    regionProps: HTMLAttributes<HTMLElement>;
}
export function useAccordionItem<T>(props: AccordionItemAriaProps<T>, state: TreeState<T>, ref: RefObject<HTMLButtonElement>): AccordionItemAria;
export function useAccordion<T>(props: AriaAccordionProps<T>, state: TreeState<T>, ref: RefObject<HTMLDivElement>): AccordionAria;

//# sourceMappingURL=types.d.ts.map

import { option } from './option';
export default class colorPicker extends MediumEditor.Extension {
    private constructor();
    private option;
    private defaultOption;
    name: string;
    aria: string;
    action: string;
    contentDefault: string;
    contentFA: string;
    private builder;
    static createInstance(option?: option): unknown;
    handleClick: (this: colorPicker, event: MouseEvent) => void;
    hide: (this: colorPicker) => void;
    show: (this: colorPicker) => void;
    getForm: (this: colorPicker) => HTMLElement;
}

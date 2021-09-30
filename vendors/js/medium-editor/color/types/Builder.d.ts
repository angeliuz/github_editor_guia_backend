import { option } from './option';
export default class Builder {
    private ownerDocument;
    private _root;
    private colorPickerCtl;
    changeColor: (color?: string) => void;
    constructor(ownerDocument: Document, option: option, changeColorAction: (color?: string) => void);
    init(option: option): void;
    getElement(): HTMLElement;
    hide: () => void;
    show: (currentColor: string, left: number) => void;
}

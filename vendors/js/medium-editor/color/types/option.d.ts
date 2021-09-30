export declare type option = {
    /** If falsy hide the HSL inputs */
    showHSL?: boolean;
    /** 	If falsy hide the RGB inputs */
    showRGB?: boolean;
    /** 	If falsy hide the RGB HEX inputs */
    showHEX?: boolean;
    /**	If truly show control to change opacity  */
    showAlpha?: boolean;
    /** Initial color */
    color?: string;
    /** Array of predefined colors.
Each element can be color name, rgb array, hex rgb, rgb(), rgba(), hsl(), hsla() */
    palette?: string[];
    /** 	If truly make the palette editable */
    paletteEditable?: boolean;
    /** 	If truly enable alpha channel in palette colors,
if 'auto' depends on the value of 'showAlpha' */
    useAlphaInPalette?: string | boolean;
    /** 	Size of hue bar in pixel (width, height) */
    hueBarSize?: Array<number>;
    /** Size of saturation/luminance canvas in pixel (width, height) */
    slBarSize?: Array<number>;
    /** buttonLabels 不是fontawesome显示按钮的内容 */
    contentDefault?: string;
    /** buttonLabels为fontawesome显示按钮的内容 */
    contentFA?: string;
    /** 按钮title */
    aria?: string;
    /** 移除按钮的内容 */
    removeButtonContent?: string;
    /** 移除按钮的title */
    removeButtonTitle?: string;
};

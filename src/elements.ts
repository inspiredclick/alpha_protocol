import { Chars, Color, DisplayPosition, ModeCode } from './types'
import './string'
import { TagParser } from './TagParser';

export function text(text: string, config?: {displayPosition?: DisplayPosition, modeCode?: ModeCode, color?: Color}): number[] {
    let output:number[] = [];
    if (config?.displayPosition !== undefined || config?.modeCode !== undefined) {
        output.push(Chars.MODE_FIELD);
        output.push(config?.displayPosition || DisplayPosition.MIDDLE_LINE);
        output.push(config?.modeCode || ModeCode.AUTO);
    }

    const color = config?.color || Color.AUTO;
    output.push(Chars.COLOR_FIELD);
    output.push(color);
    output = output.concat(text.toByteArray());
    return output;
}

export function html(text: string, config?: {displayPosition?: DisplayPosition, modeCode?: ModeCode, color?: Color}): number[] {
    return TagParser.parse(text);
}

// export function icon(icon: SpecialGraphics, config?: {displayPosition?: DisplayPosition, color?: Color}): number[] {
//     let output:number[] = [];
//     let displayPosition = config?.displayPosition || DisplayPosition.MIDDLE_LINE;
//     let color = config?.color || Color.RAINBOW_1;
//     output.push(Chars.MODE_FIELD);
//     output.push(displayPosition);
//     output.push(ModeCode.SPECIAL);
//     output.push(Chars.COLOR_FIELD);
//     output.push(color);
//     output.push(icon);
//     return output;
// }

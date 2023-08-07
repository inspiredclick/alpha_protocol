import { Chars, Color, DisplayPosition, ModeCode } from './types'
import './string'

export function text(text: string, config?: {displayPosition?: DisplayPosition, modeCode?: ModeCode, color?: Color}): number[] {
    let output:number[] = [];
    const displayPosition = config?.displayPosition || DisplayPosition.MIDDLE_LINE;
    const modeCode = config?.modeCode || ModeCode.AUTO;
    const color = config?.color || Color.AUTO;
    output.push(Chars.MODE_FIELD);
    output.push(displayPosition);
    output.push(modeCode);
    output.push(Chars.COLOR_FIELD);
    output.push(color);
    output = output.concat(text.toByteArray());
    return output;
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

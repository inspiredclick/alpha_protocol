import { text } from "./elements";
import { Color, DisplayPosition, ModeCode } from "./types";

export interface Tag {
    tagName: string;
    attributes: { 
        displayPosition?: DisplayPosition;
        mode?: ModeCode;
        color?: Color;
    };
    content: string;
}

//format: <message displayPosition="MIDDLE_LINE" mode="AUTO" color="AUTO">Hello World</message>
export class TagParser {
    private static readonly tagRegex = /<([a-z]+)([^>]*)>([^<]*)<\/\1>/g;
    private static readonly attributeRegex = /([a-z]+)="([^"]*)"/g;
    private static readonly supportedTags = ['message'];
    
    public static parse(html: string): number[] {
        let data: number[] = [];
        let match: RegExpExecArray | null;
        while ((match = this.tagRegex.exec(html)) !== null) {
            const [, tagName, attributes, content] = match;
            if (this.supportedTags.indexOf(tagName) === -1) {
                throw new Error("Unsupported tag: " + tagName);
            }
            const tag: Tag = {
                tagName,
                attributes: {},
                content: content.trim(),
            };
            let attributeMatch: RegExpExecArray | null;
            while ((attributeMatch = this.attributeRegex.exec(attributes)) !== null) {
                const [, attributeName, attributeValue] = attributeMatch;
                switch (attributeName.toLocaleLowerCase()) {
                    case "position":
                        tag.attributes.displayPosition = this.parseDisplayPostition(attributeValue);
                        break;
                    case "mode":
                        tag.attributes.mode = this.parseMode(attributeValue);
                        break;
                    case "color":
                        tag.attributes.color = this.parseColor(attributeValue);
                        break;
                    default:
                        break;
                }
            }
            data = data.concat(text(tag.content, {
                displayPosition: tag.attributes.displayPosition,
                modeCode: tag.attributes.mode,
                color: tag.attributes.color,
            }));
        }
        return data;
    }

    private static parseDisplayPostition(displayPosition: string): DisplayPosition | undefined {
        switch (displayPosition.toLocaleLowerCase()) {
            case "middle_line":
                return DisplayPosition.MIDDLE_LINE;
            case "top_line":
                return DisplayPosition.TOP_LINE;
            case "bottom_line":
                return DisplayPosition.BOTTOM_LINE;
            case "fill":
                return DisplayPosition.FILL;
            case "left":
                return DisplayPosition.LEFT;
            case "right":
                return DisplayPosition.RIGHT;
            default:
                return undefined;
        }
    }

    private static parseMode(mode: string): ModeCode | undefined { 
        switch (mode.toLocaleLowerCase()) {
            case "scroll":
                return ModeCode.SCROLL;
            case "hold":
                return ModeCode.HOLD;
            case "flash":
                return ModeCode.FLASH;
            case "reserved":
                return ModeCode.RESERVED;
            case "roll_up":
                return ModeCode.ROLL_UP;
            case "roll_down":
                return ModeCode.ROLL_DOWN;
            case "roll_left":
                return ModeCode.ROLL_LEFT;
            case "roll_right":
                return ModeCode.ROLL_RIGHT;
            case "roll_in":
                return ModeCode.ROLL_IN;
            case "roll_out":
                return ModeCode.ROLL_OUT;
            case "wipe_up":
                return ModeCode.WIPE_UP;
            case "wipe_down":
                return ModeCode.WIPE_DOWN;
            case "wipe_left":
                return ModeCode.WIPE_LEFT;
            case "wipe_right":
                return ModeCode.WIPE_RIGHT;
            case "wipe_in":
                return ModeCode.WIPE_IN;
            case "wipe_out":
                return ModeCode.WIPE_OUT;
            case "two_line_scroll":
                return ModeCode.TWO_LINE_SCROLL;
            case "auto":
                return ModeCode.AUTO;
            case "special":
                return ModeCode.SPECIAL;
            default:
                return undefined;
        }
    }

    private static parseColor(color: string): Color | undefined {
        switch (color.toLocaleLowerCase()) {
            case "auto":
                return Color.AUTO;
            case "red":
                return Color.RED;
            case "green":
                return Color.GREEN;
            case "amber":
                return Color.AMBER;
            case "dim_red":
                return Color.DIM_RED;
            case "dim_green":
                return Color.DIM_GREEN;
            case "brown":
                return Color.BROWN;
            case "orange":
                return Color.ORANGE;
            case "yellow":
                return Color.YELLOW;
            case "rainbow_1":
                return Color.RAINBOW_1;
            case "rainbow_2":
                return Color.RAINBOW_2;
            case "color_mix":
                return Color.COLOR_MIX;
            default:
                return undefined;
        }   
    }
}

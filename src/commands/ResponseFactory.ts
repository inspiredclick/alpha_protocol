import { Chars, CommandCode, TypeCode } from "../types";
import { GenericResponse, ReadTextFileResponse, Response } from "./Response";

export enum ResponseFactoryErrorCode {
    INVALID_PACKET,
    MALFORMED_PACKET,
    ERROR
}

export class ResponseFactoryError extends Error {
    code: ResponseFactoryErrorCode;

    constructor(code: ResponseFactoryErrorCode, message?: string) {
        super();
        this.code = code;
        this.name = `ResponseFactoryError.${ResponseFactoryErrorCode[code]}`;
        this.message = message || "";
    }

}

export class ResponseFactory {
    static parse(buffer: Buffer): Response {
        let bufArray = Array.from(buffer);

        let packetPosition = bufArray.lastIndexOf(Chars.START_OF_HEADER);
        if (packetPosition < 0) {
            throw new ResponseFactoryError(ResponseFactoryErrorCode.INVALID_PACKET, "Buffer does not have a SOH");
        }

        packetPosition = packetPosition + 4;
        if (bufArray[packetPosition] !== Chars.START_OF_TEXT) {
            throw new ResponseFactoryError(ResponseFactoryErrorCode.INVALID_PACKET, "Buffer does not start with STX");
        }

        const commandCode = bufArray[++packetPosition];
        try {
            switch (commandCode) {
                case CommandCode.WRITE_TEXT_FILE:
                    return new ReadTextFileResponse(bufArray, packetPosition);
                default:
                    return new GenericResponse();
            }
        }
        catch (err) {
            throw new ResponseFactoryError(ResponseFactoryErrorCode.MALFORMED_PACKET, "Malformed packet");
        }
    }
}

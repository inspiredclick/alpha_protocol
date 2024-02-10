import {describe, expect, test} from '@jest/globals';
import {SetTime} from './SetTime';
import {SetSpeaker} from './SetSpeaker';
import {Day, SetDay} from './SetDay';
import {KeyboardStatus, MemoryConfig, MemoryLabel, MemoryType, SetMemory} from './SetMemory';
import { TransmissionPacketFactory } from '../../TransmissionPacketFactory';
import { SpecialFunctionLabel } from './SpecialFunctionCommand';
import { CommandCode } from '../../types';

describe('WriteSpecialFunctionCommand', () => {
    describe('SetTime', () => {
        test('toBuffer', () => {
            const packet = new SetTime(4, 30); //4:30am

            let data: number[] = [SpecialFunctionLabel.SET_TIME];
            data = data.concat("0430".toByteArray());

            const packetBuffer = TransmissionPacketFactory.createPacketBytes(
                Buffer.from([CommandCode.WRITE_SPECIAL_FUNCTION]),
                Buffer.from(data)
            );
            expect(packet.toBuffer()).toEqual(packetBuffer);
        });

        test('toBuffer with hour out of range', () => {
            expect(() => {
                new SetTime(25, 30);
            }).toThrowError();
        });

        test('toBuffer with minute out of range', () => {
            expect(() => {
                new SetTime(12, 70);
            }).toThrowError();
        });
    });

    describe('SetMemory', () => {
        test('toBuffer', () => {
            const packet = new SetMemory();
            packet.configurations.push(new MemoryConfig({}));

            let data: number[] = [SpecialFunctionLabel.SET_MEMORY, MemoryLabel.A, MemoryType.TEXT, KeyboardStatus.UNLOCKED];
            data = data.concat("0000".toByteArray());
            data = data.concat("0000".toByteArray());
            const packetBuffer = TransmissionPacketFactory.createPacketBytes(
                Buffer.from([CommandCode.WRITE_SPECIAL_FUNCTION]), 
                Buffer.from(data)
            );

            expect(packet.toBuffer()).toEqual(packetBuffer);
        });

        test('SetMemory with bad size', () => {
            const packet = new SetMemory();
            packet.configurations.push(new MemoryConfig({
                size: "0"
            }));
            expect(() => packet.toBuffer()).toThrowError();
        });
    
        test('SetMemory with bad lastFourBytes', () => {
            const packet = new SetMemory();
            packet.configurations.push(new MemoryConfig({
                lastFourBytes: "0"
            }));
            expect(() => packet.toBuffer()).toThrowError();
        });
    });

    test('SetSpeaker toBuffer', () => {
        const packetTrue = new SetSpeaker(true);
        const packetBufferTrue = TransmissionPacketFactory.createPacketBytes(
            Buffer.from([CommandCode.WRITE_SPECIAL_FUNCTION]), 
            Buffer.from([SpecialFunctionLabel.SET_SPEAKER, SetSpeaker.ENABLE])
        );

        expect(packetTrue.toBuffer()).toEqual(packetBufferTrue);

        const packetFalse = new SetSpeaker(false);
        const packetBufferFalse = TransmissionPacketFactory.createPacketBytes(
            Buffer.from([CommandCode.WRITE_SPECIAL_FUNCTION]), 
            Buffer.from([SpecialFunctionLabel.SET_SPEAKER, SetSpeaker.DISABLE])
        );

        expect(packetFalse.toBuffer()).toEqual(packetBufferFalse);
    });

    test('SetDay toBuffer', () => {
        const packet = new SetDay(Day.MONDAY);
        const packetBuffer = TransmissionPacketFactory.createPacketBytes(
            Buffer.from([CommandCode.WRITE_SPECIAL_FUNCTION]),
            Buffer.from([SpecialFunctionLabel.SET_DAY, Day.MONDAY])
        );
        expect(packet.toBuffer()).toEqual(packetBuffer);
    });
});

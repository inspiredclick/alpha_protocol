// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
    toByteArray(): number[];
}

String.prototype.toByteArray = function(): number[] {
    const byteBuffer = [];
    const buffer = Buffer.from(this, 'utf8');
    for (let i = 0; i < buffer.length; i++) {
        byteBuffer.push(buffer[i]);
    }
    return byteBuffer;
}

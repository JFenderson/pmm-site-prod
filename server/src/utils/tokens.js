import uuidv4 from 'uuid/v4';
import crypto from 'crypto';
import { createCipher, createDecipher, createCipheriv } from 'crypto';
const ALGORITHM = 'aes-256-ctr';
const SECRET = 'forests';

function encode(value) {
    var IV = new Buffer(crypto.randomBytes(16));
    const cipher = createCipheriv(ALGORITHM, SECRET, IV);
    let encoded = cipher.update(`${uuidv4()}_${value}`, 'ascii', 'base64');
    encoded += cipher.final('base64');

    return encoded;
}

function decode(value) {
    const decipher = createDecipher(ALGORITHM, SECRET);
    let decoded = decipher.update(value, 'base64', 'ascii');
    decoded += decipher.final('ascii');
    const split = decoded.split('_');

    split.shift();

    return split.join('_');
}

export { encode, decode };
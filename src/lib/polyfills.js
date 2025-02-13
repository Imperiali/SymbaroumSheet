import { Buffer } from 'buffer';
import process from 'process';
import util from 'util';
import stream from 'stream';
import url from 'url';

if (typeof globalThis.Buffer === 'undefined') {
    globalThis.Buffer = Buffer;
}

if (typeof globalThis.stream === 'undefined') {
    globalThis.stream = stream;
}

if (typeof globalThis.url === 'undefined') {
    globalThis.url = url;
}

if (typeof globalThis.process === 'undefined') {
    globalThis.process = process;
}

if (typeof globalThis.util === 'undefined') {
    globalThis.util = util;
}

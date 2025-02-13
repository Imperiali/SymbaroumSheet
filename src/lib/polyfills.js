import { Buffer } from 'buffer';
import process from 'process';
import util from 'util';

if (typeof globalThis.Buffer === 'undefined') {
    globalThis.Buffer = Buffer;
}

if (typeof globalThis.process === 'undefined') {
    globalThis.process = process;
}

if (typeof globalThis.util === 'undefined') {
    globalThis.util = util;
}

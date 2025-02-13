import { Buffer } from 'buffer';
import process from 'process';
import { EventEmitter } from 'events';
import stream from 'stream-browserify';
import url from 'url';
import assert from 'assert';
import http from 'stream-http';
import https from 'https-browserify';
import net from 'net-browserify';
import util from 'util';
import crypto from 'crypto-browserify';

if (typeof globalThis.Buffer === 'undefined') {
    globalThis.Buffer = Buffer;
}

if (typeof globalThis.process === 'undefined') {
    globalThis.process = process;
}

if (typeof globalThis.events === 'undefined') {
    globalThis.events = { EventEmitter };
}

if (typeof globalThis.stream === 'undefined') {
    globalThis.stream = stream;
}

if (typeof globalThis.url === 'undefined') {
    globalThis.url = url;
}

if (typeof globalThis.assert === 'undefined') {
    globalThis.assert = assert;
}

if (typeof globalThis.http === 'undefined') {
    globalThis.http = http;
}

if (typeof globalThis.https === 'undefined') {
    globalThis.https = https;
}

if (typeof globalThis.net === 'undefined') {
    globalThis.net = net;
}

if (typeof globalThis.util === 'undefined') {
    globalThis.util = util;
}

if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = crypto;
}

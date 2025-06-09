import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
try {
  if (typeof global.TransformStream === 'undefined') {
    const { TransformStream } = require('stream/web');
    if (TransformStream) global.TransformStream = TransformStream;
  }
} catch (err) {
  console.warn('TransformStream no disponible. Algunas pruebas pueden fallar.');
}
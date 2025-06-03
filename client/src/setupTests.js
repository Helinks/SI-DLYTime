// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
try {
  if (typeof global.TransformStream === 'undefined') {
    const { TransformStream } = require('stream/web');
    if (TransformStream) global.TransformStream = TransformStream;
  }
} catch (err) {
  // Fallback o ignóralo si no lo necesitas en ese entorno
  console.warn('TransformStream no disponible. Algunas pruebas pueden fallar.');
}
import '@testing-library/jest-dom';

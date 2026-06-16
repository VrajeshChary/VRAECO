const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

function getRandomChar(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(1);
    crypto.getRandomValues(arr);
    return CHARS[arr[0] % CHARS.length];
  }
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function generateDiscountCode(): string {
  let code = 'VRA-';
  for (let i = 0; i < 6; i++) {
    code += getRandomChar();
  }
  return code;
}

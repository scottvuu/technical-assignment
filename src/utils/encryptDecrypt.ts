import { SHA256, enc } from 'crypto-js';

export const hash = (text: string, salt?: string) => {
  if (!salt) {
    try {
      salt = enc.Hex.stringify(SHA256.lib.WordArray.random(32));
      console.log(salt);
    } catch (error) {
      console.error('Error generating random bytes:', error);
    }
  }
  const hashed = SHA256(text + salt).toString(enc.Hex);
  return { hashed, salt };
};
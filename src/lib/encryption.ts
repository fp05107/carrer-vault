/**
 * Encryption Utility — Career Vault
 * Uses AES-256-GCM (authenticated encryption) to protect resume metadata
 * and Cloudinary public_id references stored in the database.
 *
 * Environment variable required:
 *   ENCRYPTION_KEY — 64 hex characters (32 bytes / 256 bits)
 *   Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96-bit IV recommended for GCM
const AUTH_TAG_LENGTH = 16; // 128-bit authentication tag

function getKey(): Buffer {
  const hexKey = process.env.ENCRYPTION_KEY;
  if (!hexKey || hexKey.length !== 64) {
    throw new Error(
      "ENCRYPTION_KEY must be a 64-character hex string (32 bytes). " +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  return Buffer.from(hexKey, "hex");
}

/**
 * Encrypts a plaintext string.
 * @returns  A colon-delimited string: `iv:authTag:ciphertext` (all hex-encoded)
 */
export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [iv.toString("hex"), authTag.toString("hex"), encrypted.toString("hex")].join(":");
}

/**
 * Decrypts a string produced by `encrypt()`.
 * @returns  The original plaintext, or `null` if decryption fails (tampered data / wrong key).
 */
export function decrypt(encryptedData: string): string | null {
  try {
    const key = getKey();
    const [ivHex, authTagHex, ciphertextHex] = encryptedData.split(":");

    if (!ivHex || !authTagHex || !ciphertextHex) return null;

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const ciphertext = Buffer.from(ciphertextHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
      authTagLength: AUTH_TAG_LENGTH,
    });
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return decrypted.toString("utf8");
  } catch {
    // Decryption failed — data may be tampered or key is incorrect
    return null;
  }
}

/**
 * Encrypts an object by JSON-serialising it first.
 */
export function encryptObject<T>(obj: T): string {
  return encrypt(JSON.stringify(obj));
}

/**
 * Decrypts a string back into an object.
 */
export function decryptObject<T>(encryptedData: string): T | null {
  const json = decrypt(encryptedData);
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

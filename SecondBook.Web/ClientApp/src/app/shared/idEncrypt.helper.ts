export class IdEncryptor {
  private static secretKey: number = 42; // You can choose any secret key

  // Function to encrypt the database ID
  static encrypt(databaseId: number): number {
    return databaseId ^ this.secretKey;
  }

  // Function to decrypt the encoded ID (if needed)
  static decrypt(encodedId: number): number {
    return encodedId ^ this.secretKey;
  }
}

import * as bcrypt from 'bcrypt';

export async function encryptPassword(
  plainTextPassword: string,
): Promise<string> {
  const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);
  return bcrypt.hash(plainTextPassword, PASSWORD_SALT); // Hash the password with a salt of 10 rounds
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

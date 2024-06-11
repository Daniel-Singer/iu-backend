import bcrypt from 'bcryptjs';

/**
 * comparePasswords
 *
 * @description     Compares the hashed password from database with the provided password in request body
 */

export const comparePasswords = async (provided: string, hashed: string) => {
  return await bcrypt.compare(provided, hashed);
};

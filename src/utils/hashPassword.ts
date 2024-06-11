import bcrypt from 'bcryptjs';

/**
 * @description     Creates hashed password for users
 */

export const hashPassword = async (pw: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pw, salt);
  return hashedPassword;
};

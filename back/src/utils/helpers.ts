import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export const comparePassword = async (plain: string, hashed: string) => {
  const result = await bcrypt.compare(plain, hashed);
  return result;
}
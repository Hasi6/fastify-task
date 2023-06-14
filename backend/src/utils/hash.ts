import { compare, genSalt, hash } from 'bcryptjs';

export async function hashString(text: string): Promise<string> {
  const salt = await genSalt(10);

  return await hash(text, salt);
}

export async function compareHash(
  text: string,
  hash: string
): Promise<boolean> {
  return await compare(text, hash);
}

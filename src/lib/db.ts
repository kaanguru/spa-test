import { z } from 'zod';

export const _userSchema = z.object({
  name: z.string().min(2, { message: "BİRAZ DAHA UZUN YAP" }),
  email: z.string().email()
});
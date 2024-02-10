import { superValidate } from "sveltekit-superforms/client";
import { _userSchema } from '$lib/db';
export const load = async () => {
  return {
    form: await superValidate(_userSchema),
  };
};
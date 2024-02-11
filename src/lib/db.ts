import { z } from 'zod';
import Dexie, { type Table } from 'dexie';
export const _userSchema = z.object({
	name: z.string().min(2, { message: 'BİRAZ DAHA UZUN YAP' }),
	email: z.string().email()
});
export interface User {
	id?: number;
	name: string;
	email?: string | null;
}
export class LockITDatabase extends Dexie {
	users: Table<User>;

	constructor() {
		super('LockITDatabase');

		this.version(1).stores({
			users: '++id, name , &email'
		});

		this.users = this.table('users');
	}
}

export const db = new LockITDatabase();

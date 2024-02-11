import { z } from 'zod';
import Dexie, { type Table } from 'dexie';

export const _userSchema = z.object({
	name: z.string().min(2, { message: 'need longer name' }),
	email: z.string().email().optional()
});
export interface User {
	id?: number;
	name: string;
	email?: string | null;
}
export class AppDatabase extends Dexie {
	users!: Table<User>;
	constructor() {
		super('AppDatabase');
		this.version(1).stores({
			users: '++id, name , &email'
		});
		this.users = this.table('users');
	}
}

export const db = new AppDatabase();
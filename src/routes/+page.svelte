<script lang="ts">
	import { setMessage, superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { _userSchema, db } from '$lib/db';
	import type { User } from '$lib/db';

	const { form, errors, constraints, enhance, message ,reset} = superForm(
		superValidateSync(_userSchema),
		{
			SPA: true,
			validators: _userSchema,
			onUpdate({ form }) {
				if (form.valid) {
					addUser(form.data).then((id) => {
						if (id) {
							reset();
							console.log('user id:', id);
						}
					});
					setMessage(form, 'Valid data !');
				} else {
					console.log('Form is invalid!');
				}
			}
		}
	);
	async function addUser(d: User): Promise<number | void> {
		try {
			const id: number = await db.users.add({
				name: d.name,
				email: d.email
			});
			return id;
		} catch (error) {
			console.log(error);
		}
	}
</script>

<h1>Kullanıcı Ekleme</h1>
<form method="POST" use:enhance>
	{#if $message}<p>{$message}</p>{/if}
	<label>
		Name<br />
		<input
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
	</label>
	{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

	<label>
		E-mail<br />
		<input
			type="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

	<button>Submit</button>
</form>

<style>
	.invalid {
		color: red;
	}
</style>

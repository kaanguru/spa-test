<script lang="ts">
	import { setMessage, superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { _userSchema, addUser } from '$lib/db';

	const { form, errors, constraints, enhance, message, reset } = superForm(
		superValidateSync(_userSchema),
		{
			SPA: true,
			validators: _userSchema,
			onUpdate({ form }) {
				if (form.valid) {
					setMessage(form, 'user added!');
					addUser(form.data)
						.then((id) => {
							console.log('ℹ  id:', id);
						})
						.then(() => {
							setTimeout(() => {
								reset();
							}, 500);
						});
				} else {
					setMessage(form, 'Form is invalid!');
				}
			}
		}
	);

</script>

<div class="container">
	<h1>Kullanıcı Ekleme</h1>
	<form method="POST" use:enhance>
		{#if $message}<p>{$message}</p>{/if}
		<p>
			<label>
				Name<br />
				<input
					aria-invalid={$errors.name ? 'true' : undefined}
					bind:value={$form.name}
					{...$constraints.name}
				/>
			</label>
			{#if $errors.name}<span>{$errors.name}</span>{/if}

			<label>
				E-mail<br />
				<input
					type="email"
					aria-invalid={$errors.email ? 'true' : undefined}
					bind:value={$form.email}
					{...$constraints.email}
				/>
			</label>
			{#if $errors.email}<span>{$errors.email}</span>{/if}
		</p>
		<button>Submit</button>
	</form>
</div>

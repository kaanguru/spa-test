<script lang="ts">
	import { setMessage, superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { _userSchema } from '$lib/db';

	const { form, errors, constraints, enhance, message } = superForm(
		superValidateSync(_userSchema),
		{
			SPA: true,
			validators: _userSchema,
			onUpdate({ form }) {
				if (form.valid) {
					console.log('Form is valid!');
					setMessage(form, 'Valid data!');
					console.log(form.data);
				} else {
					console.log('Form is invalid!');
				}
			}
		}
	);
</script>

<div class="container">
	<h1 class="h1">Kullanıcı Ekleme</h1>
	<form method="POST" use:enhance>
		{#if $message}<p class="input-success">{$message}</p>{/if}
		<label >
			<span>Name</span>
			<input
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
		</label>
		{#if $errors.name}<span class="input-error">{$errors.name}</span>{/if}

		<label >
			<span>E-mail</span>
			<input
				type="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			/>
			{#if $errors.email}<span class="input-error">{$errors.email}</span>{/if}
		</label>

		<button >Submit</button>
	</form>
</div>


<script lang="ts">
	import { setMessage, superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { _userSchema } from '$lib/db';
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
	const { form, errors, enhance, message, constraints } = superForm(
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
					console.log(form.data);
					console.log(form);
				}
			}
		}
	);
</script>

<h1>Kullanıcı Ekleme</h1>
<form method="POST" use:enhance>
  <div class="flex flex-col w-full max-w-sm gap-1.5">
	{#if $message}<p>{$message}</p>{/if}
	<Label for="name">Name</Label>
		<Input
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
	{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
</div>

  <div class="flex flex-col w-full max-w-sm gap-1.5">
    <Label for="email">Email</Label>
    <Input type="email" id="email" placeholder="email" aria-invalid={$errors.email ? 'true' : undefined}
    bind:value={$form.email}
    {...$constraints.email} />
    {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
  </div>


	<Button>Submit</Button>
</form>

<script lang="ts">
	import { setMessage, superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { _userSchema } from '$lib/db';
	import * as Form from "$lib/components/ui/form";
	export let form = superForm(superValidateSync(_userSchema), {
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
	});

</script>
<h1>Kullanıcı Ekleme</h1>
<Form.Root  {form} schema={_userSchema}  let:config>
  <Form.Field {config} name="name">
    <Form.Item>
      <Form.Label>Name</Form.Label>  
      <Form.Input />
      <Form.Description>This is your public display name.</Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="email">
    <Form.Item>
      <Form.Label>Email</Form.Label>
      <Form.Input />
      <Form.Description>This is your email</Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Button>Submit</Form.Button>
</Form.Root>

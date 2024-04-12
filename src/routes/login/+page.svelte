<script lang="ts">
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';

  let form;
  let errors = [];

  function login() {
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    fetch('https://api.realworld.io/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          errors = data.errors;
        } else {
          $user = data.user;
          goto('/');
        }
      });
  }
</script>

<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign in</h1>
        <p class="text-xs-center">
          <a href="/register">Need an account?</a>
        </p>

        {#each errors as errorMessage}
          <ul class="error-messages">
            <li>{errorMessage}</li>
          </ul>
        {/each}

        <form on:submit={login} bind:this={form}>
          <fieldset class="form-group">
            <input
              required
              class="form-control form-control-lg"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              required
              class="form-control form-control-lg"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
            />
          </fieldset>
          <button type="submit" class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</div>
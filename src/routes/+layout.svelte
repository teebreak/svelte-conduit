<script lang="ts">
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';

  function signout() {
    $user = null;
    localStorage.removeItem('token');
    goto('/');
  }
</script>

<header>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link active" href="/">Home</a>
        </li>
        {#if !$user}
          <li class="nav-item">
            <a class="nav-link" href="/login">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register">Sign up</a>
          </li>
        {/if}
        {#if $user}
          <li class="nav-item">
            <a class="nav-link" href="/editor">New post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile/{$user.username}">My profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/settings">Settings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" on:click={signout}>Sign out</a>
          </li>
        {/if}
      </ul>
    </div>
  </nav>
</header>

<slot />

<footer>
  <div class="container">
    <a href="/" class="logo-font">conduit</a>
    <span class="attribution">
      An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp;
      design licensed under MIT.
    </span>
  </div>
</footer>

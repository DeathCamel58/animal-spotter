<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte'

  import auth from '$lib/authService';
  import { isAuthenticated, user, auth0Client } from '$lib/store';
  import { onMount } from "svelte";

  onMount(async () => {
    $auth0Client = await auth.createClient();
    isAuthenticated.set(await $auth0Client.isAuthenticated());
    user.set(await $auth0Client.getUser());
  });

  function login() {
    auth.loginWithPop($auth0Client);
  }
  function logout() {
    auth.logout($auth0Client);
  }
</script>

<!-- TODO: Only display this to logged in users. -->
<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img src="https://picsum.photos/350/100" class="mr-3 h-6 sm:h-9" alt="Animal Spotter Logo"/>
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Animal Spotter</span>
  </NavBrand>
  {#if $isAuthenticated}
    <div class="flex items-center md:order-2">
      <Avatar id="avatar-menu" src="{$user.picture ? $user.picture : 'https://picsum.photos/96/96'}" />
      <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
      <DropdownHeader>
        <span class="block text-sm">{$user.name}</span>
        <span class="block truncate text-sm font-medium">{$user.email}</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/" on:click={logout}>Sign out</DropdownItem>
    </Dropdown>
  {:else}
    <span class="dark:text-white md:order-2">
      <a href="/" on:click={login}>Log In</a>
    </span>
  {/if}
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/">About</NavLi>
    <NavLi href="/">Services</NavLi>
    <NavLi href="/">Pricing</NavLi>
    <NavLi href="/">Contact</NavLi>
  </NavUl>
</Navbar>

<!--<pre><code>{console.log($user)}</code></pre>-->

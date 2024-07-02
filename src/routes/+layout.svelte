<script>
	import db from '$lib/db'
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import {page} from '$app/stores'
	import './styles.css';
	let isLoggedIn=false
	onMount(()=>{
		db.authStore.onChange(()=>{
			console.log('----',db);
			isLoggedIn=db.authStore.isValid
		})


	})
</script>
<div class="app">
	<Header />
	<main>

		{#if isLoggedIn || $page.route.id?.includes('login')}
			<slot />
		{:else}		
			<h1 class="text-4xl p-4 text-center font-bold">You Are Nt LoggedIn, Please, Login To Proceed</h1>
		{/if}
	</main>
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>

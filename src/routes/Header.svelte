<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import '../app.css'
</script>
<header>
	<div class="flex flex-row w-full justify-between border">
		<a href="/" class="flex">
			<img src={logo} alt="" class="w-8"/>
			<h1 class="text-2xl text-center">વાસદ</h1>									
		</a>

	<nav class="w-full">
		<div class="flex justify-center w-full flex-row">
		<ul class="flex gap-4 text-2xl text-slate-700">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/record' ? 'page' : undefined}>
				<a href="/record">AddRecord</a>
			</li>
		</ul>
		</div>
	</nav>	
	</div>
</header>
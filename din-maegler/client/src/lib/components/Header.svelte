<script lang="ts">
	import dinMaegler from '$lib/assets/Din maegler.svg';
	import paperPlane1 from '$lib/assets/paper-plane 1.svg';
	import call1 from '$lib/assets/call 1.svg';
	import user1 from '$lib/assets/user 1.svg';
	import { goto } from '$app/navigation';

	let props = $props();

	const logoutFetch = async () => {
		try {
			await fetch('/logout', { method: 'POST' });
			await goto('/');
		} catch (err) {
			console.error('Logout failed:', err);
		}
	};

	let menuItems = [
		{ href: '/propertyList', text: 'Boliger til salg' },
		{ href: '/agents', text: 'Mæglere' },
		{ href: '/favorites', text: 'Mine favoritter' },
		{ href: '/contact', text: 'Kontakt os' }
	];
</script>

<header class="w-full">
	<div class="bg-[#1a3a54] py-2 text-white">
		<div class="container mx-auto flex items-center justify-between px-4 text-sm">
			<div class="flex gap-6">
				<div class="flex items-center gap-2">
					<div class="h-4 w-4">
						<img class="h-full w-full" alt="paperPlane1" src={paperPlane1} />
					</div>
					<a href="mailto:example@example.com" class="hover:opacity-80">example@example.com</a>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-4 w-4"><img class="h-full w-full" alt="call1" src={call1} /></div>
					<a href="tel:+4512345678" class="hover:opacity-80">+45 1234 5678</a>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<div class="h-4 w-4"><img class="h-full w-full" alt="user1" src={user1} /></div>
				{#if props.user}
					<button onclick={() => logoutFetch()}>{props.user.username} | logout</button>
				{:else}
					<a href="/login" class="hover:opacity-80">Log ind</a>
				{/if}
			</div>
		</div>
	</div>

	<div class="border-b">
		<div class="container mx-auto flex items-center justify-between px-4 py-4">
			<a href="/" class="text-2xl font-bold"><img src={dinMaegler} alt="logo" /></a>
			<nav>
				<ul class="flex gap-8">
					{#each menuItems as item}
						<li>
							<a href={item.href} class="text-gray-700 hover:text-gray-900">
								{item.text}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</header>

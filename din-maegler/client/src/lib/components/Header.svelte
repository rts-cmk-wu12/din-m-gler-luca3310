<script lang="ts">
	import dinMaegler from '$lib/assets/Din maegler.svg';
	import paperPlane1 from '$lib/assets/paper-plane 1.svg';
	import call1 from '$lib/assets/call 1.svg';
	import user1 from '$lib/assets/user 1.svg';
	import { invalidateAll } from '$app/navigation';

	let props = $props();
	let isLoading = $state<boolean>(false);

	const logoutFetch = async () => {
		isLoading = true;
		try {
			await fetch('/logout', { method: 'POST' });
			await new Promise((resolve) => setTimeout(resolve, 2000));
			await invalidateAll();
		} catch (err) {
			console.error('Logout failed:', err);
		} finally {
			isLoading = false;
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
	<div class="py-2 text-white bg-[#1a3a54]">
		<div class="container flex justify-between items-center px-4 mx-auto text-sm">
			<div class="flex gap-6">
				<div class="flex gap-2 items-center">
					<div class="w-4 h-4">
						<img class="w-full h-full" alt="paperPlane1" src={paperPlane1} />
					</div>
					<a href="mailto:example@example.com" class="hover:opacity-80">example@example.com</a>
				</div>
				<div class="flex gap-2 items-center">
					<div class="w-4 h-4"><img class="w-full h-full" alt="call1" src={call1} /></div>
					<a href="tel:+4512345678" class="hover:opacity-80">+45 1234 5678</a>
				</div>
			</div>
			<div class="flex gap-2 items-center">
				<div class="w-4 h-4"><img class="w-full h-full" alt="user1" src={user1} /></div>
				{#if props.user}
					{#if isLoading}
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 h-5 text-white animate-spin"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<circle cx="12" cy="12" r="10" stroke-width="4"></circle>
								<path d="M4 12a8 8 0 013.292-6.708" stroke-width="4"></path>
							</svg>
							<span class="ml-2">Logging out...</span>
						</div>
					{:else}
						<button onclick={() => logoutFetch()}>{props.user.username} | logout</button>
					{/if}
				{:else}
					<a href="/login" class="hover:opacity-80">Log ind</a>
				{/if}
			</div>
		</div>
	</div>

	<div class="border-b">
		<div class="container flex justify-between items-center py-4 px-4 mx-auto">
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

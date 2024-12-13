<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let isLoading = $state<boolean>(false);

	const loginFetch = async () => {
		isLoading = true;
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				await invalidateAll();
				await new Promise((resolve) => setTimeout(resolve, 2000));
				await goto('/');
			} else {
				const errorData = await response.json();
				console.error(errorData.error);
			}
		} catch (err) {
			console.error('Login failed:', err);
		} finally {
			isLoading = false;
		}
	};

	function handleSubmit(e: any) {
		e.preventDefault();
		loginFetch();
	}
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-50">
	<div class="p-8 w-full max-w-md bg-white rounded-lg shadow-md">
		<h1 class="mb-8 text-2xl font-semibold text-center">Log ind på din konto</h1>

		<form onsubmit={handleSubmit} class="space-y-6">
			<div class="space-y-2">
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="Email"
					class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					required
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="Password"
					class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					required
				/>
			</div>

			{#if isLoading}
				<div class="flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-5 h-5 text-blue-500 animate-spin"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<circle cx="12" cy="12" r="10" stroke-width="4"></circle>
						<path d="M4 12a8 8 0 013.292-6.708" stroke-width="4"></path>
					</svg>
				</div>
			{:else}
				<button
					type="submit"
					class="py-2 px-4 w-full text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none bg-[#1a3a54] hover:bg-[#15304a]"
				>
					Log ind
				</button>
			{/if}
		</form>

		<div class="mt-6">
			<p class="mb-4 text-sm text-center text-gray-600">Log ind med</p>
			<div class="grid grid-cols-3 gap-3">
				<button class="py-2 px-4 w-full text-white rounded-md bg-[#db4437] hover:bg-[#c53929]">
					Google
				</button>
				<button class="py-2 px-4 w-full text-white rounded-md bg-[#4267B2] hover:bg-[#365899]">
					Facebook
				</button>
				<button class="py-2 px-4 w-full text-white rounded-md bg-[#1DA1F2] hover:bg-[#1a91da]">
					Twitter
				</button>
			</div>
		</div>

		<p class="mt-8 text-sm text-center text-gray-600">
			Har du ikke en konto?
			<a href="/opret-bruger" class="text-blue-600 hover:underline">Opret bruger</a>
		</p>
	</div>
</div>

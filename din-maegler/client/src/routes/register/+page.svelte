<script lang="ts">
	let fullName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	function handleSubmit(e: any) {
		e.preventDefault();
		// Handle registration logic here
		console.log('Registration attempt:', { fullName, email, password, confirmPassword });
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
		<h1 class="mb-8 text-center text-2xl font-semibold">Opret bruger hos Din Mægler</h1>

		<form on:submit={handleSubmit} class="space-y-6">
			<div class="space-y-2">
				<label for="fullName" class="block text-sm font-medium text-gray-700">Fulde navn</label>
				<input
					type="text"
					id="fullName"
					bind:value={fullName}
					placeholder="Fulde navn"
					class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div class="space-y-2">
				<label for="email" class="block text-sm font-medium text-gray-700">Email adresse</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="Email adresse"
					class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
					class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div class="space-y-2">
				<label for="confirmPassword" class="block text-sm font-medium text-gray-700"
					>Bekræft password</label
				>
				<input
					type="password"
					id="confirmPassword"
					bind:value={confirmPassword}
					placeholder="Bekræft password"
					class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-[#1a3a54] px-4 py-2 text-white hover:bg-[#15304a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Opret bruger
			</button>
		</form>
	</div>
</div>

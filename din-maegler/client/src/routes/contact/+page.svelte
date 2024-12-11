<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import paperPlane1 from '$lib/assets/paper-plane 1.svg';
	import call1 from '$lib/assets/call 1.svg';
	import Vector from '$lib/assets/Vector2.svg';
	import { MapLibre } from 'svelte-maplibre';

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: '',
		newsletter: false
	};

	function handleSubmit(e: any) {
		e.preventDefault();
		console.log('Form submitted:', formData);
		// Handle form submission logic here
	}
</script>

<Banner title="Kontakt os" />
<main class="container py-12 px-4 mx-auto">
	<div class="mx-auto max-w-5xl">
		<h1 class="mb-1 text-3xl font-semibold">Vi sidder klar til at besvare dine spørgsmål</h1>
		<div class="mb-4 bg-black h-[2px] w-[7rem]"></div>
		<p class="mb-8 text-gray-600">
			Der kan opstå tvivl om mange ting når man gerne vil eller er i gang med at sælge sin bolig.
			Vores medarbejdere sidder klar alle ugens dage til at svare på dine spørgsmål
		</p>

		<div class="grid gap-12 md:grid-cols-2">
			<!-- Contact Form -->
			<div class="p-5 space-y-6 shadow">
				<form on:submit={handleSubmit} class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<label for="name" class="block text-sm font-medium text-gray-700">Navn</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								placeholder="Indtast dit navn"
								class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>

						<div class="space-y-2">
							<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								placeholder="Indtast din email"
								class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>
					</div>

					<div class="space-y-2">
						<label for="subject" class="block text-sm font-medium text-gray-700">Emne</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							placeholder="Indtast emne"
							class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="message" class="block text-sm font-medium text-gray-700">Besked</label>
						<textarea
							id="message"
							bind:value={formData.message}
							placeholder="Indtast din besked..."
							rows="4"
							class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						></textarea>
					</div>

					<div class="flex gap-2 items-center">
						<input
							type="checkbox"
							id="newsletter"
							bind:checked={formData.newsletter}
							class="text-blue-600 rounded border-gray-300 focus:ring-blue-500"
						/>
						<label for="newsletter" class="text-sm text-gray-600">
							Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev.
						</label>
					</div>

					<button
						type="submit"
						class="py-2 px-6 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none bg-[#1a3a54] hover:bg-[#15304a]"
					>
						Send besked
					</button>
				</form>
			</div>

			<!-- Contact Information -->
			<div class="flex flex-col justify-between items-center p-5 shadow">
				<div class="flex flex-col gap-1 items-center">
					<div
						class="flex justify-center items-center w-10 h-10 text-white rounded-full bg-[#1a3a54]"
					>
						<img class="w-4 h-4" src={call1} alt="call1" />
					</div>

					<h3 class="text-lg font-medium">Ring til os</h3>
					<p class="text-gray-600">+45 7070 4000</p>
				</div>
				<div class="w-full bg-gray-300 h-[1px]"></div>

				<div class="flex flex-col gap-1 items-center">
					<div
						class="flex justify-center items-center w-10 h-10 text-white rounded-full bg-[#1a3a54]"
					>
						<img class="w-4 h-4" src={paperPlane1} alt="paperPlane1" />
					</div>

					<h3 class="text-lg font-medium">Send en mail</h3>
					<p class="text-gray-600">4000@din-maegler.dk</p>
				</div>

				<div class="w-full bg-gray-300 h-[1px]"></div>
				<div class="flex flex-col gap-1 items-center">
					<div
						class="flex justify-center items-center w-10 h-10 text-white rounded-full bg-[#1a3a54]"
					>
						<img class="w-4 h-4" src={Vector} alt="mapsAndFlags1" />
					</div>

					<h3 class="text-lg font-medium">Besøg butikken</h3>
					<address class="not-italic text-center text-gray-600">
						Stændertorvet 78<br />
						4000 Roskilde
					</address>
				</div>
			</div>
		</div>
	</div>
</main>
<MapLibre
	center={[12.08042, 55.641491]}
	zoom={12}
	class="map"
	standardControls
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
/>

<style>
	:global(.map) {
		height: 500px;
	}
</style>

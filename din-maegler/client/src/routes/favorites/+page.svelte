<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	let searchQuery = $state('');
	let { data } = $props();
	let favorites = $state<any>([]);
	let filteredFavorites = $derived.by(() => {
		if (!searchQuery.trim()) return favorites;
		return favorites.filter(
			(fav: any) =>
				fav.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				fav.location.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	async function fetchHomes() {
		try {
			const homeIds = data.user.homes;
			const fetchPromises = homeIds.map((id: string) =>
				fetch(`https://dinmaegler.onrender.com/homes/${id}`).then((res) => res.json())
			);
			const homes = await Promise.all(fetchPromises);
			const filteredData = homes.map((item: any) => ({
				id: item.id,
				title: item.adress1,
				location: `${item.postalcode} ${item.city}`,
				type: item.type,
				size: `${item.livingspace} m²`,
				rooms: item.rooms,
				price: item.price,
				image: item.images[0]?.url || 'https://placehold.co/200x300',
				energylabel: item.energylabel,
				cost: item.cost,
				isLoading: false
			}));
			favorites = filteredData;
		} catch (err) {
			console.error(err);
		}
	}

	$effect(() => {
		if (data.user) {
			fetchHomes();
		} else {
			goto('/login');
		}
	});

	async function removeFavorite(id: any) {
		favorites = favorites.map((fav: any) => (fav.id === id ? { ...fav, isLoading: true } : fav));

		const updatedFavorites = favorites
			.filter((fav: any) => fav.id !== id)
			.map((fav: any) => fav.id);
		try {
			await fetch(`https://dinmaegler.onrender.com/users/${data.user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwt}`
				},
				body: JSON.stringify({
					homes: updatedFavorites
				})
			});

			favorites = favorites.filter((fav: any) => fav.id !== id);
		} catch (err) {
			console.error(err);
			favorites = favorites.map((fav: any) => (fav.id === id ? { ...fav, isLoading: false } : fav));
		} finally {
			await invalidateAll();
		}
	}

	function formatPrice(price: any) {
		return new Intl.NumberFormat('da-DK').format(price);
	}
</script>

<main class="container py-8 px-4 mx-auto">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8">
			<input
				type="text"
				placeholder="Søg favoritter"
				bind:value={searchQuery}
				class="py-2 px-4 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>

		<div class="space-y-4">
			{#each filteredFavorites as property (property.id)}
				<div class="p-4 bg-white rounded-lg shadow-sm">
					<div class="flex flex-col gap-4 items-center sm:flex-row">
						<div class="w-full h-32 sm:w-48">
							<img
								src={property.image}
								alt={property.title}
								class="object-cover w-full h-full rounded-md"
							/>
						</div>

						<div class="flex-grow">
							<h2 class="text-lg font-semibold">{property.title}</h2>
							<p class="text-gray-600">{property.location}</p>
							<div class="mt-2">
								<span class="text-sm font-medium">{property.type}</span>
								<span class="text-sm text-gray-600">• Ejerudgift: {property.size}</span>
							</div>
							<div class="flex gap-2 items-center text-sm text-gray-600">
								<span>{property.rooms} værelser</span>
								<span>• {property.size}</span>
							</div>
						</div>

						<div class="flex flex-col gap-4 items-end">
							<div class="text-lg font-semibold whitespace-nowrap">
								Kr. {formatPrice(property.price)}
							</div>
							{#if property.isLoading}
								<button
									class="py-2 px-4 text-gray-600 whitespace-nowrap bg-gray-300 rounded-md"
									disabled
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										fill="currentColor"
										class="animate-spin bi bi-arrow-clockwise"
										viewBox="0 0 16 16"
									>
										<path
											fill-rule="evenodd"
											d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
										/>
										<path
											d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
										/>
									</svg>
								</button>
							{:else}
								<button
									onclick={() => removeFavorite(property.id)}
									class="py-2 px-4 text-white whitespace-nowrap rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none bg-[#1a3a54] hover:bg-[#15304a]"
								>
									Fjern fra favoritter
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/each}

			{#if filteredFavorites.length === 0}
				<div class="py-8 text-center text-gray-500">
					{searchQuery ? 'Ingen favoritter matcher din søgning' : 'Ingen favoritter endnu'}
				</div>
			{/if}
		</div>
	</div>
</main>

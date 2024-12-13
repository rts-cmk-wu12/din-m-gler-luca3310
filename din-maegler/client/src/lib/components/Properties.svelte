<script lang="ts">
	import hearth from '$lib/assets/hearth.svg';
	import love from '$lib/assets/Love.svg';
	import { invalidateAll } from '$app/navigation';

	let props = $props();
	let properties = $state<any[]>([]);
	let errorMessage = $state('');
	let homes = props.data.user ? props.data.user.homes : [];

	let filteredProperties = $derived.by(() => {
		const newProperties = properties.filter((item: any) => {
			return props.selectedType === '' || item.type.toLowerCase() === props.selectedType;
		});

		if (props.limit) {
			return newProperties.slice(0, props.limit);
		} else {
			return newProperties;
		}
	});

	const fetchProperties = async () => {
		try {
			const res = await fetch('https://dinmaegler.onrender.com/homes');
			if (!res.ok) {
				throw new Error('Failed to fetch homes');
			}

			const data = await res.json();

			const filteredData = data.map((item: any) => ({
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
				isFavorite: props.data.user ? props.data.user.homes.includes(item.id) : false,
				isLoading: false // Added isLoading property directly to the property object
			}));
			properties = filteredData;
		} catch (err: any) {
			errorMessage = err.message;
			console.error(err);
		}
	};

	$effect(() => {
		fetchProperties();
	});

	async function addFavorite(homeId: string) {
		properties = properties.map((property) =>
			property.id === homeId ? { ...property, isLoading: true } : property
		);

		const updatedHomes = [...homes, homeId];
		try {
			await fetch(`https://dinmaegler.onrender.com/users/${props.data.user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${props.data.jwt}`
				},
				body: JSON.stringify({
					homes: updatedHomes
				})
			});
			homes = updatedHomes;

			properties = properties.map((property) =>
				property.id === homeId ? { ...property, isFavorite: true, isLoading: false } : property
			);
		} catch (err) {
			console.error(err);
			properties = properties.map((property) =>
				property.id === homeId ? { ...property, isLoading: false } : property
			);
		} finally {
			await invalidateAll();
		}
	}

	async function removeFavorite(homeId: string) {
		properties = properties.map((property) =>
			property.id === homeId ? { ...property, isLoading: true } : property
		);

		const updatedHomes = homes.filter((id: string) => id !== homeId);
		try {
			await fetch(`https://dinmaegler.onrender.com/users/${props.data.user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${props.data.jwt}`
				},
				body: JSON.stringify({
					homes: updatedHomes
				})
			});
			homes = updatedHomes;

			properties = properties.map((property) =>
				property.id === homeId ? { ...property, isFavorite: false, isLoading: false } : property
			);
		} catch (err) {
			console.error(err);
			properties = properties.map((property) =>
				property.id === homeId ? { ...property, isLoading: false } : property
			);
		} finally {
			await invalidateAll();
		}
	}

	function formatPrice(price: number) {
		return new Intl.NumberFormat('da-DK').format(price);
	}
</script>

<section class="grid grid-cols-1 gap-6 md:grid-cols-2">
	{#if filteredProperties.length === 0 && errorMessage === ''}
		<div class="bg-gray-300 rounded animate-pulse h-[25rem] w-[30rem]"></div>
		<div class="bg-gray-300 rounded animate-pulse h-[25rem] w-[30rem]"></div>
		<div class="bg-gray-300 rounded animate-pulse h-[25rem] w-[30rem]"></div>
	{:else if errorMessage !== ''}
		<p style="color: red">{errorMessage}</p>
	{:else if filteredProperties.length > 0}
		{#each filteredProperties as property (property.id)}
			<article
				class="overflow-hidden relative bg-white rounded-lg shadow-lg transition hover:cursor-pointer duration-[0.5] hover:scale-[1.01]"
			>
				<a href={`property/${property.id}`}>
					<div>
						<div class="relative">
							<img
								src={property.image}
								alt={property.title}
								class="object-cover w-full aspect-[2/1]"
							/>
						</div>
						<div class="p-4 space-y-2">
							<h2 class="text-lg font-semibold">{property.title}</h2>
							<p class="text-gray-600">{property.location}</p>

							<div class="flex gap-1 items-end">
								<span class="text-base font-medium">{property.type} •</span>
								<span class="text-sm">ejerudgift: {formatPrice(property.cost)} kr.</span>
							</div>
							<div class="w-full bg-gray-200 h-[1px]"></div>

							<div class="flex justify-between items-start text-sm text-gray-600">
								<div class="flex gap-3 items-center">
									<span
										class="flex justify-center items-center w-7 h-7 text-lg font-bold text-white rounded bg-[#10AC84]"
										>{property.energylabel}</span
									>
									<div>
										<span>{property.rooms} værelser</span>
										<span>• {property.size}</span>
									</div>
								</div>

								<div class="text-lg font-semibold text-black">
									Kr. {formatPrice(property.price)}
								</div>
							</div>
						</div>
					</div>
				</a>

				{#if props.data.user}
					{#if property.isLoading}
						<button
							class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
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
					{:else if !property.isFavorite}
						<button
							class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
							onclick={(e) => {
								addFavorite(property.id);
							}}
						>
							<img src={hearth} alt="like Button" />
						</button>
					{:else}
						<button
							class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
							onclick={(e) => {
								removeFavorite(property.id);
							}}
						>
							<img src={love} alt="like Button" />
						</button>
					{/if}
				{/if}
			</article>
		{/each}
	{:else}
		<p>No properties available for the given criteria.</p>
	{/if}
</section>

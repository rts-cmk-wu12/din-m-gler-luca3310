<script lang="ts">
	import hearth from '$lib/assets/hearth.svg';
	import love from '$lib/assets/Love.svg';

	let props = $props();
	let properties = $state<any[]>([]);
	let errorMessage = $state('');
	let loadingState: Record<string, boolean> = {}; // Tracks loading state for each property
	let homes = props.data.user.homes;

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
				isFavorite: props.data.user.homes.includes(item.id)
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
		loadingState[homeId] = true;

		if (homes.includes(homeId)) {
			alert('This property is already in your favorites!');
			return;
		}

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

			console.log(homes);
			properties = properties.map((property) =>
				property.id === homeId ? { ...property, isFavorite: true } : property
			);
		} catch (err) {
			console.error(err);
		} finally {
			loadingState[homeId] = false;
		}
	}

	async function removeFavorite(homeId: string) {
		loadingState[homeId] = true;
		if (!homes.includes(homeId)) {
			alert('This property is not in your favorites!');
			return;
		}

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
				property.id === homeId ? { ...property, isFavorite: false } : property
			);
		} catch (err) {
			console.error(err);
		} finally {
			loadingState[homeId] = false;
		}
	}

	function formatPrice(price: number) {
		return new Intl.NumberFormat('da-DK').format(price);
	}
</script>

<section class="grid grid-cols-1 gap-6 md:grid-cols-2">
	{#if filteredProperties.length === 0 && errorMessage === ''}
		<div class="h-[25rem] w-[30rem] animate-pulse rounded bg-gray-300"></div>
		<div class="h-[25rem] w-[30rem] animate-pulse rounded bg-gray-300"></div>
		<div class="h-[25rem] w-[30rem] animate-pulse rounded bg-gray-300"></div>
	{:else if errorMessage !== ''}
		<p style="color: red">{errorMessage}</p>
	{:else if filteredProperties.length > 0}
		{#each filteredProperties as property (property.id)}
			<article
				class="relative overflow-hidden rounded-lg bg-white shadow-lg transition duration-[0.5] hover:scale-[1.01] hover:cursor-pointer"
			>
				<a href={`property/${property.id}`}>
					<div>
						<div class="relative">
							<img
								src={property.image}
								alt={property.title}
								class="aspect-[2/1] w-full object-cover"
							/>
						</div>
						<div class="space-y-2 p-4">
							<h2 class="text-lg font-semibold">{property.title}</h2>
							<p class="text-gray-600">{property.location}</p>

							<div class="flex items-end gap-1">
								<span class="text-base font-medium">{property.type} •</span>
								<span class="text-sm">ejerudgift: {formatPrice(property.cost)} kr.</span>
							</div>
							<div class="h-[1px] w-full bg-gray-200"></div>

							<div class="flex items-start justify-between text-sm text-gray-600">
								<div class="flex items-center gap-3">
									<span
										class="flex h-7 w-7 items-center justify-center rounded bg-[#10AC84] text-lg font-bold text-white"
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

				{#if loadingState[property.id]}
					<button
						class="absolute right-4 top-4 rounded-full bg-white p-2 shadow-sm hover:bg-gray-100"
						disabled={true}
					>
						<img src={hearth} alt="like Button" />
					</button>
				{:else if !property.isFavorite}
					<button
						class="absolute right-4 top-4 rounded-full bg-white p-2 shadow-sm hover:bg-gray-100"
						onclick={(e) => {
							addFavorite(property.id);
						}}
					>
						<img src={hearth} alt="like Button" />
					</button>
				{:else}
					<button
						class="absolute right-4 top-4 rounded-full bg-white p-2 shadow-sm hover:bg-gray-100"
						onclick={(e) => {
							removeFavorite(property.id);
						}}
					>
						<img src={love} alt="like Button" />
					</button>
				{/if}
			</article>
		{/each}
	{:else}
		<p>No properties available for the given criteria.</p>
	{/if}
</section>

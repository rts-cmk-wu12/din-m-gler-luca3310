<script lang="ts">
	import group54 from '$lib/assets/Group 54.svg';
	import group55 from '$lib/assets/Group 55.svg';
	import group56 from '$lib/assets/Group 56.svg';
	import Vector from '$lib/assets/Vector.svg';
	import paperPlane1 from '$lib/assets/paper-plane-black 1.svg';
	import call1 from '$lib/assets/callBlack 1.svg';

	import { MapLibre } from 'svelte-maplibre';

	let stateProperty = $state<any>();
	let isOpen = $state<boolean>(false);
	let isMap = $state<boolean>(true);
	let shownImage = $state<any>();

	let { data }: { data: any } = $props();

	function formatPrice(price: any) {
		return new Intl.NumberFormat('da-DK').format(price);
	}

	const fetchProperty = async (id: any) => {
		try {
			const res = await fetch(`https://dinmaegler.onrender.com/homes/${id}`);
			if (!res.ok) {
				throw new Error('Failed to fetch property');
			}

			const data = await res.json();
			console.log(data);
			const filteredData = {
				imageUrl: data.images[0].url,
				imageUrl2: data.floorplan.url,
				adress1: data.adress1,
				title: data.city + ' ' + data.postalcode,
				price: data.price,
				description: data.description,
				lat: data.lat,
				long: data.long,
				agent: {
					id: data.agent.id,
					name: data.agent.name,
					title: data.agent.title,
					phone: data.agent.phone,
					email: data.agent.email,
					imageUrl: data.agent.image.url
				},
				leftColumn: {
					Sagsnummer: '1234567898',
					Boligareal: '128 m²',
					Grundareal: '768 m²',
					'Rum/værelser': data.rooms,
					'Antal Plan': '3'
				},
				middleColumn: {
					Kælder: '-',
					Byggeår: data.built,
					Ombygget: data.remodel,
					Energimærke: data.energylabel
				},
				rightColumn: {
					udbetaling: 'kr. ' + formatPrice(data.payment),
					'Brutto ex ejerudgift': 'kr. ' + formatPrice(data.netto),
					'Netto ex ejerudgift': 'kr. ' + formatPrice(data.netto),
					Ejerudgifter: 'kr. ' + formatPrice(data.gross)
				}
			};

			stateProperty = filteredData;
			console.log(data);
		} catch (err: any) {
			console.error(err);
		}
	};

	$effect(() => {
		fetchProperty(data.id);
	});
</script>

<main class="container py-8 px-4 mx-auto">
	{#if stateProperty}
		{#if isOpen}
			<div
				onclick={() => (isOpen = false)}
				class="fixed top-0 left-0 z-20 w-screen h-full bg-black opacity-75"
			></div>
			<div
				class="flex fixed top-0 left-0 z-30 flex-col gap-3 justify-center items-center mt-12 w-screen"
			>
				{#if !isMap}
					<div class="h-[25rem] w-[50rem]">
						<img src={shownImage} alt={stateProperty.title} class="object-cover w-full h-full" />
					</div>
				{:else}
					<div class="h-[25rem] w-[50rem]">
						<MapLibre
							center={[stateProperty.long, stateProperty.lat]}
							zoom={18}
							class="map"
							standardControls
							style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
						/>
					</div>
				{/if}
				<div class="flex gap-4 justify-center">
					<button
						onclick={() => {
							shownImage = stateProperty.imageUrl;
							isMap = false;
						}}
						class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100"
					>
						<img class="w-8 h-8" src={group54} alt="ting" />
					</button>
					<button
						onclick={() => {
							shownImage = stateProperty.imageUrl2;
							isMap = false;
						}}
						class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100"
					>
						<img class="w-8 h-8" src={group55} alt="ting" />
					</button>
					<button
						onclick={() => (isMap = true)}
						class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100"
					>
						<img class="w-8 h-8" src={group56} alt="ting" />
					</button>
					<button class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100">
						<img class="w-8 h-8" src={Vector} alt="ting" />
					</button>
				</div>
			</div>
		{/if}
		<!-- Hero Image -->
		<div class="relative mb-6">
			<img
				src={stateProperty.imageUrl}
				alt={stateProperty.title}
				class="object-cover w-full rounded-lg h-[500px]"
			/>
		</div>

		<!-- Title Section -->
		<div class="pb-6 mb-6 border-b">
			<div class="flex justify-between items-start mb-4">
				<div>
					<h1 class="mb-1 text-2xl font-semibold">{stateProperty.adress1}</h1>
					<p class="text-gray-600">{stateProperty.title}</p>
				</div>
				<div class="flex gap-4 mt-4">
					<button
						onclick={() => {
							shownImage = stateProperty.imageUrl;
							isOpen = true;
							isMap = false;
						}}
						class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100"
					>
						<img class="w-8 h-8" src={group54} alt="ting" />
					</button>
					<button
						onclick={() => {
							shownImage = stateProperty.imageUrl2;
							isOpen = true;
							isMap = false;
						}}
						class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100"
					>
						<img class="w-8 h-8" src={group55} alt="ting" />
					</button>
					<button
						onclick={() => {
							isOpen = true;
							isMap = true;
						}}
						class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100"
					>
						<img class="w-8 h-8" src={group56} alt="ting" />
					</button>
					<button class="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100">
						<img class="w-8 h-8" src={Vector} alt="ting" />
					</button>
				</div>

				<div class="text-2xl font-bold">
					Kr. {formatPrice(stateProperty.price)}
				</div>
			</div>
		</div>

		<div class="grid grid-cols-3 gap-32 mb-12 text-sm">
			<!-- Left Column -->
			<div class="space-y-4">
				{#each Object.entries(stateProperty.leftColumn) as [label, value]}
					<div class="flex justify-between items-center">
						<span class="text-gray-600">{label}:</span>
						<span class="font-medium text-start">{value}</span>
					</div>
				{/each}
			</div>

			<!-- Middle Column -->
			<div class="space-y-4">
				{#each Object.entries(stateProperty.middleColumn) as [label, value]}
					<div class="flex justify-between items-center">
						<span class="text-gray-600">{label}:</span>
						<span class="font-medium">{value}</span>
					</div>
				{/each}
			</div>

			<!-- Right Column -->
			<div class="space-y-4">
				{#each Object.entries(stateProperty.rightColumn) as [label, value]}
					<div class="flex justify-between items-center">
						<span class="text-gray-600">{label}:</span>
						<span class="font-medium">{value}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Description and Agent -->
		<div class="flex justify-between">
			<!-- Description -->
			<div class="w-[40%]">
				<h2 class="mb-4 text-xl font-semibold">Beskrivelse</h2>
				<div class="space-y-4 text-gray-600">
					<p>
						{stateProperty.description}
					</p>
				</div>
			</div>

			<!-- Agent -->
			<div>
				<h2 class="mb-4 text-xl font-semibold">Ansvarlig mægler</h2>
				<div class="p-6 bg-white rounded-lg shadow-sm">
					<div class="flex gap-5">
						<img
							src={stateProperty.agent.imageUrl}
							alt={stateProperty.agent.name}
							class="object-cover mx-auto w-48 h-48"
						/>
						<div class="flex flex-col gap-2">
							<div>
								<h3 class="text-lg font-semibold">{stateProperty.agent.name}</h3>
								<p class="text-gray-600">{stateProperty.agent.title}</p>
							</div>
							<div class="w-full bg-gray-200 h-[1px]"></div>
							<div class="flex flex-col gap-2">
								<a
									href={`tel:${stateProperty.agent.phone}`}
									class="flex gap-2 items-center text-gray-600 hover:text-gray-900"
								>
									<img class="w-3 h-3" src={call1} alt="phone" />
									{stateProperty.agent.phone}
								</a>
								<a
									href={`mailto:${stateProperty.agent.email}`}
									class="flex gap-2 items-center text-gray-600 hover:text-gray-900"
								>
									<img class="w-3 h-3" src={paperPlane1} alt="phone" />
									{stateProperty.agent.email}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	:global(.map) {
		height: 25rem;
	}
</style>

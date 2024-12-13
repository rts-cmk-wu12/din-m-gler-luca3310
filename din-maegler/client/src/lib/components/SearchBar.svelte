<script lang="ts">
	let searchQuery = '';

	let properties = $state<any>();

	let { button, text } = $props();

	let filteredProperties = $state<any>();

	let show = $state<boolean>(false);

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
				cost: item.cost
			}));
			properties = filteredData;
			console.log(filteredData);
		} catch (err: any) {
			console.error(err);
		}
	};

	$effect(() => {
		fetchProperties();
	});

	function handleSearch(e: any) {
		e.preventDefault();
		if (searchQuery.trim() === '') {
			filteredProperties = [];
		} else {
			filteredProperties = properties.filter((property: any) =>
				property.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
	}
</script>

<form onsubmit={handleSearch} class="flex gap-2">
	<div class="relative flex-1">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder={text}
			onfocus={() => (show = true)}
			onblur={() => (show = false)}
			class="py-3 px-4 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
		{#if filteredProperties && filteredProperties.length !== 0 && show}
			<ul
				class="flex overflow-scroll absolute bottom-0 left-0 z-20 flex-col w-full bg-white translate-y-full max-h-[30rem]"
			>
				{#each filteredProperties as property}
					<a href={`property/${property.id}`}>
						<li class="flex justify-between p-3 hover:bg-gray-100 hover:cursor-pointer">
							<div class="flex gap-2">
								<div class="overflow-hidden rounded h-[7rem] w-[7rem]">
									<img class="object-cover w-full h-full" src={property.image} alt="image" />
								</div>
								<div class="flex flex-col gap-1 items-start">
									<h2 class="text-base font-bold">{property.title}</h2>
									<p>{property.location}</p>
								</div>
							</div>
						</li>
					</a>
				{/each}
			</ul>
		{/if}
	</div>

	{#if button}
		<button
			type="submit"
			onclick={() => (show = true)}
			class="py-3 px-6 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none bg-[#1a3a54] hover:bg-[#15304a]"
		>
			Søg
		</button>
	{/if}
</form>

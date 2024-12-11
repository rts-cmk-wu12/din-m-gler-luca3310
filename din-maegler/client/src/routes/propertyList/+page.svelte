<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import Properties from '$lib/components/Properties.svelte';

	let minPrice = $state(0);
	let maxPrice = $state(12000000);
	let selectedType = $state('');

	let { data } = $props();

	function formatPrice(price: number) {
		return new Intl.NumberFormat('da-DK').format(price);
	}
</script>

<Banner title="Boliger til salg" />
<main class="container py-8 px-4 mx-auto">
	<section class="mb-12">
		<h1 class="mb-1 text-xl font-semibold">Søg efter dit drømmehus</h1>
		<div class="mb-5 w-12 h-1 bg-black rounded"></div>

		<div class="bg-white rounded-lg shadow-sm">
			<div class="flex gap-7 items-center">
				<label class="block w-[30%] text-sm font-medium text-gray-700">
					Ejendomstype
					<select
						class="block py-2 px-3 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
						bind:value={selectedType}
					>
						<option value="">Vælg ejendomstype</option>
						<option value="villa">Villa</option>
						<option value="ejerlejlighed">Ejerlejlighed</option>
						<option value="landejendom">Landejendom</option>
						<option value="byhus">Byhus</option>
					</select>
				</label>

				<div class="w-[50%]">
					<p class="block mb-1 text-sm font-medium text-gray-700">Pris interval</p>
					<div class="flex flex-col gap-1">
						<input
							type="range"
							bind:value={minPrice}
							min="0"
							max={maxPrice}
							step="100000"
							class="flex-grow"
						/>
						<div class="flex justify-between">
							<span class="text-sm text-gray-600">{formatPrice(minPrice)} kr.</span>
							<span class="text-sm text-gray-600">{formatPrice(maxPrice)} kr.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<Properties {data} {selectedType} />
</main>

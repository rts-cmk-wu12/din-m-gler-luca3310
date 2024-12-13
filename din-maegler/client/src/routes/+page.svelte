<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import homeImage from '$lib/assets/homeImage.jpg';
	import family from '$lib/assets/family.png';
	import home1 from '$lib/assets/home 1.svg';
	import house1 from '$lib/assets/house 1.svg';
	import property1 from '$lib/assets/property 1.svg';
	import mapsAndFlags1 from '$lib/assets/maps-and-flags 1.svg';
	import customer1 from '$lib/assets/customer 1.svg';
	import apple1 from '$lib/assets/apple 1.svg';
	import playStore1 from '$lib/assets/play-store 1.svg';
	import giantBuildingWithSun from '$lib/assets/giant-building-with-sun.png';
	import Properties from '$lib/components/Properties.svelte';
	import Agents from '$lib/components/Agents.svelte';
	import phoneTing from '$lib/assets/PhoneTING.png';
	let emailSubscription = '';

	let { data } = $props();

	const stats = {
		experience: '38+',
		soldHomes: '4529',
		availableHomes: '158'
	};

	async function handleSubscribe(e: any) {
		e.preventDefault();
		try {
			await fetch('https://dinmaegler.onrender.com/subscribers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					mail: emailSubscription
				})
			});
			alert('successfully subscribed');
		} catch (err) {
			console.error(err);
		}
	}
</script>

<main>
	<!-- Hero Section -->
	<section class="relative h-[600px]">
		<div class="absolute inset-0">
			<img
				src={homeImage}
				alt="Beautiful home exterior"
				class="object-cover w-full h-full brightness-75"
			/>
			<div class="absolute inset-0 bg-black/40"></div>
		</div>

		<div class="flex relative justify-center items-center px-4 h-full">
			<div class="space-y-6 w-full max-w-3xl text-center">
				<h1 class="text-4xl font-bold text-white md:text-5xl">Søg efter din drømmebolig</h1>

				<div class="flex flex-col gap-3 p-4 bg-white">
					<div class="flex flex-col gap-1">
						<h2 class="font-bold text-start">Søg blandt 158 boliger til salg i 74 butikker</h2>
						<div class="h-1 bg-black w-[2rem]"></div>
					</div>
					<p class="text-sm text-gray-600 text-start">Hvad skal din næste bolig indeholde</p>
					<SearchBar button={true} text="Hvad skal din næste bolig indeholde" />
				</div>
			</div>
		</div>
	</section>

	<!-- Experience Section -->
	<section class="py-16 px-4">
		<div class="container mx-auto">
			<div class="grid gap-12 items-center md:grid-cols-2">
				<div class="relative h-[25rem] w-[25rem]">
					<img
						src={family}
						alt="Happy family making home gesture"
						class="absolute top-0 left-0 w-full h-full rounded-lg"
					/>
					<div
						class="flex z-10 justify-end items-end w-full h-full rounded border-8 translate-x-7 translate-y-7 border-[#1a3a54]"
					>
						<div
							class="flex flex-col justify-center items-center aspect-square bg-[#1a3a54] pl-[8px] pt-[8px]"
						>
							<h2 class="text-6xl font-bold text-center text-white">38+</h2>
							<p class="w-[70%] text-center text-xl text-white">års mægler-erfaring</p>
						</div>
					</div>
				</div>

				<div class="space-y-6">
					<h2 class="text-3xl font-bold">Vi har fulgt danskerne hjem i snart 4 årtier</h2>
					<p class="text-gray-600">
						It is a long established fact that a reader will be distracted by the readable content
						of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
						more-or-less normal distribution.
					</p>
					<p class="text-gray-600">
						It is a long established fact that a reader will be distracted by the readable content
						of a page when looking at its layout.
					</p>

					<div class="flex justify-between pr-3">
						<div class="flex gap-3 items-center">
							<div class="p-3 h-full bg-gray-200 rounded aspect-square">
								<img src={house1} alt="homeSvg" class="w-full h-full" />
							</div>
							<div>
								<div class="text-3xl font-bold text-[#1a3a54]">{stats.soldHomes}</div>
								<div class="text-gray-600">boliger solgt</div>
							</div>
						</div>

						<div class="flex gap-3 items-center">
							<div class="p-3 h-full bg-gray-200 rounded aspect-square">
								<img src={home1} alt="homeSvg" class="w-full h-full" />
							</div>
							<div>
								<div class="text-3xl font-bold text-[#1a3a54]">{stats.availableHomes}</div>
								<div class="text-gray-600">boliger til salg</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="container mx-auto">
			<div class="grid gap-8 md:grid-cols-3">
				<div class="flex gap-3">
					<div class="p-2 h-16 bg-gray-200 rounded aspect-square">
						<img src={property1} alt="propertySvg" class="w-full h-full" />
					</div>

					<div class="flex flex-col gap-1">
						<h3 class="text-xl font-semibold">Bestil et salgstjek</h3>
						<p class="text-gray-600">
							Med et Din Mægler salgstjek bliver du opdateret på værdien af din bolig.
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<div class="p-2 h-16 bg-gray-200 rounded aspect-square">
						<img src={mapsAndFlags1} alt="propertySvg" class="w-full h-full" />
					</div>

					<div class="flex flex-col gap-1">
						<h3 class="text-xl font-semibold">74 butikker</h3>
						<p class="text-gray-600">
							Hos Din Mægler er der altid tæt til nærmeste butik. 74 butikker, som er fordelt rundt
							om i Danmark.
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<div class="p-2 h-16 bg-gray-200 rounded aspect-square">
						<img src={customer1} alt="propertySvg" class="w-full h-full" />
					</div>
					<div class="flex flex-col gap-1">
						<h3 class="text-xl font-semibold">Tilmeld køberkartoteket</h3>
						<p class="text-gray-600">
							Når du er tilmeldt vores køberkartoteket, bliver du kontaktet inden en ny bolig bliver
							annonceret.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Properties Section -->
	<section class="py-16 px-4">
		<div class="container mx-auto">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold">Udvalgte Boliger</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					There are many variations of passages of Lorem ipsum available but the majority have
					suffered alteration in some
				</p>
			</div>
			<Properties {data} selectedType={''} limit={4} />

			<div class="mt-12 text-center">
				<a
					href="/boliger"
					class="inline-block py-3 px-6 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none bg-[#1a3a54] hover:bg-[#15304a]"
				>
					Se alle boliger
				</a>
			</div>
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="relative bg-[url('$lib/assets/giant-building-with-sun.png')] bg-center py-32">
		<div class="absolute top-0 left-0 w-full h-full opacity-90 bg-[#162A41]"></div>
		<div class="absolute top-0 left-0 z-10 w-full h-full">
			<div class="container mx-auto w-full max-w-4xl h-full">
				<div class="flex flex-col gap-8 justify-between items-center w-full h-full md:flex-row">
					<div class="text-white">
						<h2 class="text-2xl font-bold">
							Tilmeld dig vores nyhedsbrev og hold dig opdateret på boligmarkedet
						</h2>
					</div>

					<form on:submit={handleSubscribe} class="flex gap-2 w-full md:w-auto">
						<input
							type="email"
							bind:value={emailSubscription}
							placeholder="Indtast din email adresse"
							class="flex-1 py-3 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						/>
						<button
							type="submit"
							class="py-3 px-6 bg-white rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none text-[#1a3a54]"
						>
							→
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!-- Agents Section -->
	<section class="py-16 px-4">
		<div class="container mx-auto">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold">Med vores engagerede medarbejdere</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Din Mægler er garant for den bedste service og rådgivning i dit boligsalg. Kontakt en af
					vores medarbejdere.
				</p>
			</div>
			<Agents limit={3} />
			<div class="mt-12 text-center">
				<a
					href="/maeglere"
					class="inline-block py-3 px-6 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none bg-[#1a3a54] hover:bg-[#15304a]"
				>
					Se alle mæglere
				</a>
			</div>
		</div>
	</section>

	<!-- Mobile App Section -->
	<section class="px-4 bg-[#1a3a54]">
		<div class="container mx-auto">
			<div class="flex justify-between items-center">
				<div class="space-y-6 w-1/2 text-white">
					<h2 class="text-3xl font-bold">Hold dig opdateret på salgsprocessen</h2>
					<p class="text-gray-200">
						Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med din ejendomsmægler
						eller køber med bare ét klik. Her kan du også se statistik på interesse for din bolig i
						alle vores salgskanaler.
					</p>
					<div class="flex gap-4">
						<a
							href="#/"
							class="flex gap-2 items-center py-3 px-6 bg-white rounded-md text-[#1a3a54]"
						>
							<img class="w-4 h-4" src={playStore1} alt="playStore" />
							<p>Google Play</p>
						</a>
						<a
							href="#/"
							class="flex gap-2 items-center py-3 px-6 text-white bg-black rounded-md border-solid hover:bg-gray-900"
						>
							<img class="w-4 h-4" src={apple1} alt="apple" />
							<p>App Store</p>
						</a>
					</div>
				</div>

				<div class="relative pt-24">
					<img src={phoneTing} alt="Din Mægler mobile app" class="mx-auto h-[20rem]" />
				</div>
			</div>
		</div>
	</section>
</main>

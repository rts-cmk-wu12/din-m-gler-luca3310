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
				class="h-full w-full object-cover brightness-75"
			/>
			<div class="absolute inset-0 bg-black/40"></div>
		</div>

		<div class="relative flex h-full items-center justify-center px-4">
			<div class="w-full max-w-3xl space-y-6 text-center">
				<h1 class="text-4xl font-bold text-white md:text-5xl">Søg efter din drømmebolig</h1>

				<div class="flex flex-col gap-3 bg-white p-4">
					<div class="flex flex-col gap-1">
						<h2 class="text-start font-bold">Søg blandt 158 boliger til salg i 74 butikker</h2>
						<div class="h-1 w-[2rem] bg-black"></div>
					</div>
					<p class="text-start text-sm text-gray-600">Hvad skal din næste bolig indeholde</p>
                    <SearchBar/>
			</div>
			</div>
		</div>
	</section>

	<!-- Experience Section -->
	<section class="px-4 py-16">
		<div class="container mx-auto">
			<div class="grid items-center gap-12 md:grid-cols-2">
				<div class="relative h-[25rem] w-[25rem]">
					<img
						src={family}
						alt="Happy family making home gesture"
						class="absolute left-0 top-0 h-full w-full rounded-lg"
					/>
					<div
						class="z-10 flex h-full w-full translate-x-7 translate-y-7 items-end justify-end rounded border-8 border-[#1a3a54]"
					>
						<div
							class="flex aspect-square flex-col items-center justify-center bg-[#1a3a54] pl-[8px] pt-[8px]"
						>
							<h2 class="text-center text-6xl font-bold text-white">38+</h2>
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
						<div class="flex items-center gap-3">
							<div class="aspect-square h-full rounded bg-gray-200 p-3">
								<img src={house1} alt="homeSvg" class="h-full w-full" />
							</div>
							<div>
								<div class="text-3xl font-bold text-[#1a3a54]">{stats.soldHomes}</div>
								<div class="text-gray-600">boliger solgt</div>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<div class="aspect-square h-full rounded bg-gray-200 p-3">
								<img src={home1} alt="homeSvg" class="h-full w-full" />
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
	<section class="bg-gray-50 px-4 py-16">
		<div class="container mx-auto">
			<div class="grid gap-8 md:grid-cols-3">
				<div class="flex gap-3">
					<div class="aspect-square h-16 rounded bg-gray-200 p-2">
						<img src={property1} alt="propertySvg" class="h-full w-full" />
					</div>

					<div class="flex flex-col gap-1">
						<h3 class="text-xl font-semibold">Bestil et salgstjek</h3>
						<p class="text-gray-600">
							Med et Din Mægler salgstjek bliver du opdateret på værdien af din bolig.
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<div class="aspect-square h-16 rounded bg-gray-200 p-2">
						<img src={mapsAndFlags1} alt="propertySvg" class="h-full w-full" />
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
					<div class="aspect-square h-16 rounded bg-gray-200 p-2">
						<img src={customer1} alt="propertySvg" class="h-full w-full" />
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
	<section class="px-4 py-16">
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
					class="inline-block rounded-md bg-[#1a3a54] px-6 py-3 text-white hover:bg-[#15304a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Se alle boliger
				</a>
			</div>
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="relative bg-[url('$lib/assets/giant-building-with-sun.png')] bg-center py-32">
		<div class="absolute left-0 top-0 h-full w-full bg-[#162A41] opacity-90"></div>
		<div class="absolute left-0 top-0 z-10 h-full w-full">
			<div class="container mx-auto h-full w-full max-w-4xl">
				<div class="flex h-full w-full flex-col items-center justify-between gap-8 md:flex-row">
					<div class="text-white">
						<h2 class="text-2xl font-bold">
							Tilmeld dig vores nyhedsbrev og hold dig opdateret på boligmarkedet
						</h2>
					</div>

					<form on:submit={handleSubscribe} class="flex w-full gap-2 md:w-auto">
						<input
							type="email"
							bind:value={emailSubscription}
							placeholder="Indtast din email adresse"
							class="flex-1 rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						<button
							type="submit"
							class="rounded-md bg-white px-6 py-3 text-[#1a3a54] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							→
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!-- Agents Section -->
	<section class="px-4 py-16">
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
					class="inline-block rounded-md bg-[#1a3a54] px-6 py-3 text-white hover:bg-[#15304a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Se alle mæglere
				</a>
			</div>
		</div>
	</section>

	<!-- Mobile App Section -->
	<section class="bg-[#1a3a54] px-4">
		<div class="container mx-auto">
			<div class="flex items-center justify-between">
				<div class="w-1/2 space-y-6 text-white">
					<h2 class="text-3xl font-bold">Hold dig opdateret på salgsprocessen</h2>
					<p class="text-gray-200">
						Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med din ejendomsmægler
						eller køber med bare ét klik. Her kan du også se statistik på interesse for din bolig i
						alle vores salgskanaler.
					</p>
					<div class="flex gap-4">
						<a
							href="#/"
							class="flex items-center gap-2 rounded-md bg-white px-6 py-3 text-[#1a3a54]"
						>
							<img class="h-4 w-4" src={playStore1} alt="playStore" />
							<p>Google Play</p>
						</a>
						<a
							href="#/"
							class="flex items-center gap-2 rounded-md border-solid bg-black px-6 py-3 text-white hover:bg-gray-900"
						>
							<img class="h-4 w-4" src={apple1} alt="apple" />
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
	<!--
  _____              __                                       
_/ ____\_ __   ____ |  | __ ___________   ___.__. ____  __ __ 
\   __\  |  \_/ ___\|  |/ // __ \_  __ \ <   |  |/  _ \|  |  \
 |  | |  |  /\  \___|    <\  ___/|  | \/  \___  (  <_> )  |  /
 |__| |____/  \___  >__|_ \\___  >__|     / ____|\____/|____/ 
	\/ \/ \/ \/
-->
</main>

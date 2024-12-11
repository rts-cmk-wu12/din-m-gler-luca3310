<script lang="ts">
	import paperPlane1 from '$lib/assets/paper-plane-black 1.svg';
	import call1 from '$lib/assets/callBlack 1.svg';
	import Banner from '$lib/components/Banner.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	let stateAgent = $state<any>(null);

	let { data }: { data: any } = $props();

	const fetchProperty = async (id: any) => {
		try {
			const res = await fetch(`https://dinmaegler.onrender.com/agents/${id}`);
			if (!res.ok) {
				throw new Error('Failed to fetch agents');
			}

			const data = await res.json();
			const filteredData = {
				name: data.name,
				imageUrl: data.image.url,
				title: data.title,
				phone: data.phone,
				email: data.email,
				description: data.description
			};
			stateAgent = filteredData;
			console.log(data);
		} catch (err: any) {
			console.error(err);
		}
	};

	$effect(() => {
		fetchProperty(data.id);
	});

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	function handleSubmit(e: any) {
		e.preventDefault();
		console.log('Form submitted:', formData);
	}
</script>

<Banner title="Kontakt en medarbejder" />
<main class="container py-8 px-4 mx-auto">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- Agent Profile and Contact Form -->
		{#if stateAgent}
			<div class="p-6 space-y-8 shadow lg:col-span-2">
				<!-- Agent Profile -->

				<div class="bg-white rounded-lg">
					<div class="flex flex-col gap-6 md:flex-row">
						<img
							src={stateAgent.imageUrl}
							alt={stateAgent.name}
							class="object-cover w-48 h-48 rounded-lg"
						/>
						<div class="space-y-4">
							<div>
								<h1 class="text-2xl font-semibold">{stateAgent.name}</h1>
								<p class="text-gray-600">{stateAgent.title}</p>
							</div>
							<div class="flex flex-col gap-2">
								<a
									href={`tel:${stateAgent.phone}`}
									class="flex gap-2 items-center text-gray-600 hover:text-gray-900"
								>
									<img class="w-3 h-3" src={call1} alt="phone" />
									{stateAgent.phone}
								</a>
								<a
									href={`mailto:${stateAgent.email}`}
									class="flex gap-2 items-center text-gray-600 hover:text-gray-900"
								>
									<img class="w-3 h-3" src={paperPlane1} alt="phone" />
									{stateAgent.email}
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- About Section -->
				<div class="space-y-4">
					<div class="flex flex-col gap-1">
						<h2 class="text-xl font-semibold">Om {stateAgent.name}</h2>
						<div class="bg-black h-[2px] w-[2rem]"></div>
					</div>
					<p class="text-gray-600">{stateAgent.description}</p>
				</div>

				<!-- Contact Form -->
				<div class="p-6 bg-white rounded-lg shadow-sm">
					<h2 class="mb-6 text-xl font-semibold">Kontakt {stateAgent.name}</h2>
					<form onsubmit={handleSubmit} class="space-y-4">
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div class="space-y-2">
								<label for="name" class="block text-sm font-medium text-gray-700">Navn</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									placeholder="Indtast navn"
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
									placeholder="Indtast email"
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
								placeholder="Hvad drejer din henvendelse sig om?"
								class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>

						<div class="space-y-2">
							<label for="message" class="block text-sm font-medium text-gray-700">Besked</label>
							<textarea
								id="message"
								bind:value={formData.message}
								placeholder="Skriv din besked her..."
								rows="4"
								class="py-2 px-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							></textarea>
						</div>

						<button
							type="submit"
							class="py-2 px-6 w-full text-white rounded-md sm:w-auto focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none bg-[#1a3a54] hover:bg-[#15304a]"
						>
							Send besked
						</button>
					</form>
				</div>
			</div>
		{/if}
		<!-- Sidebar -->
		<div class="space-y-6">
			<!-- Search Box -->
			<div class="p-6 bg-gray-50 rounded-lg">
				<h2 class="mb-4 text-lg font-semibold">Search Property</h2>
				<div class="relative">
					
                    <SearchBar/>
				</div>
			</div>

			<!-- CTA Card -->
			<div class="p-6 text-white rounded-lg bg-[#1a3a54]">
				<div class="space-y-4 text-center">
					<h2 class="text-xl font-semibold">Find The Best Property</h2>
					<p>For Rent Or Buy</p>
					<div class="space-y-2">
						<p class="text-sm">Call Us Now</p>
						<p class="text-xl font-semibold">+00 123 456 789</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<script lang="ts">
	let props = $props();
	let agents = $state<any[]>([]);
	let errorMessage = $state('');

	let filteredAgents = $derived.by(() => {
		if (props.limit) {
			return agents.slice(0, props.limit);
		} else {
			return agents;
		}
	});

	const fetchAgents = async () => {
		try {
			const res = await fetch('https://dinmaegler.onrender.com/agents');
			if (!res.ok) {
				throw new Error('Failed to fetch agents');
			}

			const data = await res.json();
			const filteredData = data.map((item: any) => {
				return {
					id: item.id,
					name: item.name,
					title: item.title,
					imageUrl: item.image.url
				};
			});
			agents = filteredData;
			console.log(filteredData);
		} catch (err: any) {
			errorMessage = err.message;
			console.error(err);
		}
	};

	$effect(() => {
		fetchAgents();
	});
</script>

<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
	{#each filteredAgents as agent (agent.id)}
		<div class="overflow-hidden bg-white rounded-lg shadow-sm">
			<a href={`/agent/${agent.id}`}>
				<img src={agent.imageUrl} alt={agent.name} class="object-cover object-center w-full h-80" />
				<div class="p-6 text-center">
					<h2 class="text-xl font-semibold">{agent.name}</h2>
					<p class="mt-1 text-gray-600">{agent.title}</p>
					<div class="flex gap-4 justify-center mt-4">
						<div class="text-gray-600 hover:text-gray-900" aria-label="Send email to {agent.name}">
							✉
						</div>
						<div
							class="text-gray-600 hover:text-gray-900"
							aria-label="View {agent.name}'s LinkedIn profile"
						>
							in
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>

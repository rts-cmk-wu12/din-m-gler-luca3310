<script lang="ts">
	let props = $props();
</script>

<section class="relative bg-[url('$lib/assets/banner.png')] bg-center py-16">
	<div class="absolute top-0 left-0 w-full h-full opacity-90 bg-[#162A41]"></div>
	<div class="absolute top-0 left-0 z-10 w-full h-full">
		<div class="container mx-auto w-full max-w-4xl h-full">
			<div class="flex flex-col gap-8 justify-center items-center w-full h-full md:flex-row">
				<div class="text-center text-white">
					<h2 class="text-4xl font-bold">{props.title}</h2>
				</div>
			</div>
		</div>
	</div>
</section>

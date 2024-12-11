<script lang="ts">
	import DinMaegler from '$lib/assets/Din maegler.svg';
	import paperPlane1 from '$lib/assets/paper-plane 1.svg';
	import call1 from '$lib/assets/call 1.svg';
	import Vector from '$lib/assets/Vector2.svg';

	import sammenslutning from '$lib/assets/Dansk mægler sammenslutning.svg';

	const quickLinks = [
		{ href: '/boliger-til-salg', text: 'Boliger til salg' },
		{ href: '/maeglere', text: 'Mæglere' },
		{ href: '/kontakt-os', text: 'Kontakt os' },
		{ href: '/login', text: 'Log ind / bliv bruger' }
	];
</script>

<footer class="relative w-full">
	<div class="container py-12 px-4 mx-auto">
		<div class="flex flex-col gap-12">
			<!-- Logo and Description -->
			<div class="space-y-4">
				<a href="/" class="text-2xl font-bold"><img src={DinMaegler} alt="Logo" /></a>
				<p class="w-[70%] text-gray-600">
					There are many variations of passages of Lorem ipsum available, but the majority have
					suffered alteration in some form, by injected humour, or randomised words.
				</p>
			</div>

			<div class="flex gap-32">
				<!-- Contact Information -->
				<div class="z-10 p-4 space-y-6 bg-white rounded shadow-lg">
					<div class="flex gap-3 items-center">
						<div
							class="flex justify-center items-center w-10 h-10 text-white rounded-full bg-[#1a3a54]"
						>
							<img class="w-4 h-4" src={call1} alt="call1" />
						</div>
						<div>
							<div class="text-sm text-gray-500">Ring til os</div>
							<a href="tel:+4570704000" class="hover:underline">+45 7070 4000</a>
						</div>
					</div>

					<div class="flex gap-3 items-center">
						<div
							class="flex justify-center items-center w-10 h-10 text-white rounded-full bg-[#1a3a54]"
						>
							<img class="w-4 h-4" src={paperPlane1} alt="call1" />
						</div>
						<div>
							<div class="text-sm text-gray-500">Send en mail</div>
							<a href="mailto:4000@dinmaegler.com" class="hover:underline">4000@dinmaegler.com</a>
						</div>
					</div>

					<div class="flex gap-3 items-center">
						<div
							class="flex justify-center items-center w-10 h-10 text-white rounded-full bg-[#1a3a54]"
						>
							<img class="w-4 h-4 fill-white" src={Vector} alt="call1" />
						</div>
						<div>
							<div class="text-sm text-gray-500">Besøg butikken</div>
							<address class="not-italic">Stændertorvet 78, 4000 Roskilde</address>
						</div>
					</div>

					<p class="mt-4 text-sm text-gray-600">
						Din Mægler Roskilde er din boligbutik i lokalområdet.
					</p>
				</div>

				<!-- Quick Links and DMS -->
				<div class="space-y-8">
					<div class="space-y-4">
						<h3 class="text-lg font-semibold">Quick Links</h3>
						<nav>
							<ul class="space-y-2">
								{#each quickLinks as link}
									<li>
										<a href={link.href} class="text-gray-600 hover:text-gray-900 hover:underline">
											{link.text}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					</div>

					<div class="space-y-1">
						<img src={sammenslutning} alt="sammenslutning" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="py-4 text-white bg-[#1a3a54]">
		<div class="container px-4 mx-auto text-sm text-center">Layout By Lucas Kragh 2024</div>
	</div>

	<div class="absolute top-0 left-0 w-full h-2/3 bg-gray-100 z-[-1]"></div>
</footer>

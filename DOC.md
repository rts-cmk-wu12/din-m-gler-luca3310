# hej dette er min documentation

## passwords / urler

- navn
  lucas agerskov kragh
- holdnummer
  wu11
- mail
  lucask@mail.dk
- password
  123456
- url
  http://localhost:5173/

## Stack

<details>
<summary>Sveltekit</summary>
<p>SvelteKit er valgt som framework, da det er moderne, effektivt og understøtter server-side rendering (SSR). Dette gør det ideelt til at bygge hurtige og skalerbare webapplikationer.</p>
</details>

<details>
<summary>Docker</summary>
<p>Docker blev brugt til containerisering af applikationen, hvilket sikrer ensartede miljøer på tværs af udvikling, test og produktion. Det forenkler også deployment og gør det nemt at håndtere afhængigheder.</p>
</details>

## Dependencies

<details>
<summary>Tailwind</summary>
<p>Tailwind CSS blev valgt for at skabe et hurtigt og fleksibelt design uden at skulle skrive traditionelle CSS-filer. Selvom det har sine begrænsninger som at gøre html filerne kæmpe, giver det en effektiv og moderne tilgang til styling.</p>
</details>

<details>
<summary>Typescript</summary>
<p>TypeScript giver stærk typning og bedre udvikleroplevelse. Det hjælper med at undgå fejl og forbedrer kodekvaliteten ved at gøre det lettere at vedligeholde og udvide applikationen.</p>
</details>

<details>
<summary>SvelteMaplibre</summary>
<p>SvelteMaplibre blev valgt, da det er det bedste kortbibliotek, der er optimeret til Svelte. Det tilbyder god ydeevne og funktionalitet, som gør det nemt at integrere interaktive kort i applikationen.</p>
</details>

## Argumenter

<details>
<summary>Fjernet like fra mæglere</summary>
<p>Denne funktionalitet er ikke på APIen</p>
</details>

<details>
<summary>Fjernet ændret footer på error page</summary>
<p>Giver ikke nogen mening at footeren er ændret på error pagen</p>
</details>

<details>
<summary>Fjernet double range fra boliger</summary>
<p>Vurdered at det ville tage for lang tid ud fra belønningen</p>
</details>

## Vurdering

<details>
<summary>Middleware i Svelte var svært at få til at virke</summary>
<p>Fandt ud af at man skal bruge +layout.ts, +layout.server.ts, som er smart når det virker</p>
</details>

<details>
<summary>Komponere i Svelte</summary>
<p>Ville gerne have nået at dele mine komponter op i api og hookLike mapper, og bare normale filer for at gøre dem mere læselige</p>
</details>

<details>
<summary>Loading Skeleter + layout shifts</summary>
<p>Ville gerne havde nået at lave loading skeleter for mine sider, så der ikke var så mange layout shifts</p>
</details>

<details>
<summary>searchbar på hovedside</summary>
<p>Ville gerne havde nået at lave searchbaren færdig, med finpudsning af dropdownen og måske mere søgefunctionalitet</p>
</details>

## Code 

- +layout.server.ts

```json
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }: any) => {
	const jwt = cookies.get('jwt');
	return { jwt: jwt };
};
```

dette er en server fil der bliver kaldt hver gang siden indlæser (vil siges at den ikke bliver opdateret hver gang man skifter side), jeg har brugt den til at få fat i min jwt fra cookies, da cookies kun kan hentes fra server siden

- +layout.ts

```json
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }: any) => {
    if (data.jwt) {
        try {
            const res = await fetch('https://dinmaegler.onrender.com/users/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${data.jwt}`
                }
            });
            if (res.ok) {
                const userData = await res.json();
                return { user: userData, jwt: data.jwt };
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        return { user: null, jwt: data.jwt };
    }
};
```

dette er en client fil, der vil kaldes hver gang at siden skiftes, den får dataen (jwt) fra den nyeste opdatering af serveren, så den kan lave lave en betingelse om den skal returnere useren som null sammen med jwt hvis der er ikke er en jwt eller om den fetch bruger informatinen og returnere den sammen med jwt

```json
	let props = $props();
	let properties = $state<any[]>([]);

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
				isFavorite: props.data.user ? props.data.user.homes.includes(item.id) : false,
				isLoading: false // Added isLoading property directly to the property object
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
```

det er en fetch til at få alle boliger, efter fetches mapper jeg igennem den, så jeg kun har den data jeg skal bruge, derefter så jeg min properties som er en reactiv state, til den filteret data

jeg bruger også try catch til error handling, min $effect bliver kaldt ved hver indlæsning

props indeholder den data som bliver returneret fra +layout.ts, som jeg bruger til at finde ud af om boligen af en del af brugerens favoritter
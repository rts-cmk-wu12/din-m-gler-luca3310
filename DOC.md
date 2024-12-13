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
<p>Tailwind CSS blev valgt for at skabe et hurtigt og fleksibelt design uden at skulle skrive traditionelle CSS-filer. Selvom det har sine begrænsninger, giver det en effektiv og moderne tilgang til styling.</p>
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

/**
 * Brands shown in the looping logo strip on the Home and About pages.
 *
 * - Logo files live in /public/clients (cropped SVGs, original colors kept).
 * - `h` is the logo height in px on desktop (it scales down a little on phones).
 *   It is tuned per logo so wide and square marks feel the same visual size.
 * - To add a brand: drop an SVG in /public/clients, add a line below.
 * - To remove a brand: delete its line. If the list is empty the strip hides itself.
 */
export interface Client {
  name: string
  logo: string
  h: number
}

export const clients: Client[] = [
  { name: 'Sorbet', logo: 'clients/client-1.svg', h: 28 },
  { name: 'BeatO', logo: 'clients/client-2.svg', h: 40 },
  { name: 'National Multiple Sclerosis Society', logo: 'clients/client-3.svg', h: 36 },
  { name: 'Beep', logo: 'clients/client-4.svg', h: 56 },
  { name: 'Ninzarin', logo: 'clients/client-5.svg', h: 34 },
  { name: 'CE Group', logo: 'clients/client-6.svg', h: 44 },
  { name: 'Neoscale', logo: 'clients/client-7.svg', h: 28 },
  { name: 'HCL', logo: 'clients/client-8.svg', h: 24 },
  { name: 'Prophet Shares', logo: 'clients/client-9.svg', h: 44 },
]

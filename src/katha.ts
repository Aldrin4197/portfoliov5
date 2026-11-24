import adarna from './assets/katha/adarna.webp'
import bakunawa from './assets/katha/bakunawa.webp'
import batingaw from './assets/katha/batingaw.webp'
import adarnaThumb from './assets/katha/adarna-small.webp'
import bakunawaThumb from './assets/katha/bakunawa-small.webp'
import batingawThumb from './assets/katha/batingaw-small.webp'

export const kathaCards = [
  { label: 'Adarna', src: adarna, thumbnail: adarnaThumb, alt: 'Adarna, a rainbow-feathered bird perched in the forest', ability: 'Seven Songs', text: 'Once per round, when you claim a Legend using Adarna, draw 1 Adventure card.' },
  { label: 'Bakunawa', src: bakunawa, thumbnail: bakunawaThumb, alt: 'Bakunawa, a sea serpent rising from moonlit waves', ability: 'Moon’s Shelter', text: 'At Night, your first Legend claimed using Bakunawa that round scores +1 Memory.' },
  { label: 'Batingaw', src: batingaw, thumbnail: batingawThumb, alt: 'Batingaw, an engraved bronze bell glowing in a tower', ability: 'Action', text: 'Put 1 face-up public Legend on the bottom of its deck and reveal a new one.' },
]

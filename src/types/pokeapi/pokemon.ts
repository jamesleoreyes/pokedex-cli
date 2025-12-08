export type Pokemon = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: Ability[]
  forms: Form[]
  game_indices: Index[]
  held_items: HeldItem[]
  location_area_encounters: string
  moves: Moves[]
  species: Species
  sprites: Sprites
  cries: Cries
  stats: Stat[]
  types: Type[]
  past_types: PastType[]
  past_abilities: PastAbility[]
}

type Ability = {
  is_hidden: boolean
  slot: number
  ability: AbilityMeta
}

type AbilityMeta = {
  name: string
  url: string
}

type Form = {
  name: string
  url: string
}

type Index = {
  game_index: number
  version: Version
}

type Version = {
  name: string
  url: string
}

type HeldItem = {
  item: Item
  version_details: VersionDetail[]
}

type Item = {
  name: string
  url: string
}

type VersionDetail = {
  rarity: number
  version: VersionMeta
}

type VersionMeta = {
  name: string
  url: string
}

type Moves = {
  move: Move
  version_group_details: VersionGroupDetail[]
}

type Move = {
  name: string
  url: string
}

type VersionGroupDetail = {
  level_learned_at: number
  version_group: VersionGroup
  move_learn_method: MoveLearnMethod
  order: number
}

type VersionGroup = {
  name: string
  url: string
}

type MoveLearnMethod = {
  name: string
  url: string
}

type Species = {
  name: string
  url: string
}

type Sprites = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
  other: Other
  versions: Versions
}

type Other = {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
  showdown: Showdown
}

type DreamWorld = {
  front_default: string
  front_female: any
}

type Home = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type OfficialArtwork = {
  front_default: string
  front_shiny: string
}

type Showdown = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type Versions = {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-v": GenerationV
  "generation-vi": GenerationVi
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

type GenerationI = {
  "red-blue": RedBlue
  yellow: Yellow
}

type RedBlue = {
  back_default: string
  back_gray: string
  front_default: string
  front_gray: string
}

type Yellow = {
  back_default: string
  back_gray: string
  front_default: string
  front_gray: string
}

type GenerationIi = {
  crystal: Crystal
  gold: Gold
  silver: Silver
}

type Crystal = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

type Gold = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

type Silver = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

type GenerationIii = {
  emerald: Emerald
  "firered-leafgreen": FireredLeafgreen
  "ruby-sapphire": RubySapphire
}

type Emerald = {
  front_default: string
  front_shiny: string
}

type FireredLeafgreen = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

type RubySapphire = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
}

type GenerationIv = {
  "diamond-pearl": DiamondPearl
  "heartgold-soulsilver": HeartgoldSoulsilver
  platinum: Platinum
}

type DiamondPearl = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type HeartgoldSoulsilver = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type Platinum = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type GenerationV = {
  "black-white": BlackWhite
}

type BlackWhite = {
  animated: Animated
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type Animated = {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type GenerationVi = {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire
  "x-y": XY
}

type OmegarubyAlphasapphire = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type XY = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type GenerationVii = {
  icons: Icons
  "ultra-sun-ultra-moon": UltraSunUltraMoon
}

type Icons = {
  front_default: string
  front_female: any
}

type UltraSunUltraMoon = {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

type GenerationViii = {
  icons: Icons
}

type Cries = {
  latest: string
  legacy: string
}

type Stat = {
  base_stat: number
  effort: number
  stat: StatMeta
}

type StatMeta = {
  name: string
  url: string
}

type Type = {
  slot: number
  type: TypeMeta
}

type TypeMeta = {
  name: string
  url: string
}

type PastType = {
  generation: Generation
  types: Type[]
}

type Generation = {
  name: string
  url: string
}

type PastAbility = {
  generation: Generation
  abilities: Ability[]
}

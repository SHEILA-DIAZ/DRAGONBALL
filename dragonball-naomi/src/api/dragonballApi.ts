import axios from "axios"
import type { Character } from "@/types/character"

interface CharactersResponse {
  items: Character[]
}

export async function getCharacters(): Promise<Character[]> {
  const response = await axios.get<CharactersResponse>(
    "https://dragonball-api.com/api/characters"
  )

  return response.data.items
}
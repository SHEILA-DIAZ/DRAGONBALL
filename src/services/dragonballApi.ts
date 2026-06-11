import axios from "axios"
import type { DragonBallCharacter } from "@/types/dragonball"

const api = axios.create({
  baseURL: "https://dragonball-api.com/api",
})

export async function getCharacters() {
  const response = await api.get<{ items: DragonBallCharacter[] }>("/characters")
  return response.data.items
}

export async function getCharacterById(id: string) {
  const response = await api.get<DragonBallCharacter>(`/characters/${id}`)
  return response.data
}
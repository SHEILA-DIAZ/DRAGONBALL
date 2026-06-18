import { useState } from "react"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getCharacters } from "@/api/dragonballApi"
import CharacterCard from "@/components/dragonball/CharacterCard"
import { Input } from "@/components/ui/input"

function Home() {
  const [search, setSearch] = useState("")

  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  })

  const filteredCharacters = characters?.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-orange-500">DRAGONBALL</h1>
          <p className="text-zinc-400 mt-3">
            Explora personajes del universo Dragon Ball.
          </p>
        </div>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
          <Input
            type="text"
            placeholder="Buscar personaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border-orange-500/40 text-white"
          />
        </div>

        {isLoading && (
          <p className="text-center text-orange-400">Cargando personajes...</p>
        )}

        {isError && (
          <p className="text-center text-red-400">
            No se pudieron cargar los personajes.
          </p>
        )}

        {filteredCharacters?.length === 0 && (
          <p className="text-center text-zinc-400">
            No se encontraron personajes.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCharacters?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
import { useQuery } from "@tanstack/react-query"
import { getCharacters } from "@/api/dragonballApi"
import CharacterCard from "@/components/dragonball/CharacterCard"

function Home() {
  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  })

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-orange-500">
            DRAGONBALL
          </h1>
          <p className="text-zinc-400 mt-3">
            Listado de personajes consumidos desde la Dragon Ball API.
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-orange-400">
            Cargando personajes...
          </p>
        )}

        {isError && (
          <p className="text-center text-red-400">
            No se pudieron cargar los personajes.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
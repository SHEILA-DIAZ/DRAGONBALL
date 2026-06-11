import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCharacterById } from "@/services/dragonballApi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: character, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id!),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return <p className="text-center text-orange-400">Cargando detalle...</p>
  }

  if (isError || !character) {
    return <p className="text-center text-red-400">No se pudo cargar el personaje.</p>
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-zinc-950 p-8">
          <img
            src={character.image}
            alt={character.name}
            className="max-h-[520px] object-contain"
          />
        </div>

        <div className="space-y-5">
          <Button asChild variant="secondary">
            <Link to="/">Volver</Link>
          </Button>

          <h1 className="text-5xl font-bold text-orange-500">{character.name}</h1>

          <div className="flex flex-wrap gap-2">
            <Badge>{character.race}</Badge>
            <Badge variant="secondary">{character.gender}</Badge>
            <Badge variant="outline">{character.affiliation}</Badge>
          </div>

          <p className="text-zinc-300">{character.description}</p>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p><strong>Ki:</strong> {character.ki}</p>
            <p><strong>Máximo Ki:</strong> {character.maxKi}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
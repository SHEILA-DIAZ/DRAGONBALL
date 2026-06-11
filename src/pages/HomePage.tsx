import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getCharacters } from "@/services/dragonballApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HomePage() {
  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  })

  if (isLoading) {
    return <p className="text-center text-orange-400">Cargando personajes...</p>
  }

  if (isError) {
    return <p className="text-center text-red-400">Error al cargar personajes.</p>
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-orange-500">DRAGONBALL</h1>
          <p className="mt-3 text-zinc-400">
            Personajes de Dragon Ball usando React, Vite, Tailwind y shadcn/ui.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {characters?.map((character) => (
            <Card key={character.id} className="bg-zinc-950 border-zinc-800 text-white">
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex h-64 items-center justify-center rounded-lg bg-zinc-900">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="h-full object-contain"
                  />
                </div>

                <div className="flex gap-2">
                  <Badge>{character.race}</Badge>
                  <Badge variant="secondary">{character.affiliation}</Badge>
                </div>

                <Button asChild className="w-full">
                  <Link to={`/characters/${character.id}`}>Ver detalle</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
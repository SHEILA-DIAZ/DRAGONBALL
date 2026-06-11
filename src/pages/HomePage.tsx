import { useMemo, useState } from "react"
import { Search, Sparkles, Flame } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getCharacters } from "@/services/dragonballApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

export function HomePage() {
  const [search, setSearch] = useState("")

  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  })

  const filteredCharacters = useMemo(() => {
    return characters?.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [characters, search])

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff6b00_0%,transparent_35%)] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),#000_75%)]" />

        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-20 flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-wide text-orange-500">
              DRAGONBALL
            </h2>
            <Badge className="bg-orange-500 px-4 py-2 text-black">
              React + shadcn/ui
            </Badge>
          </nav>

          <div className="mx-auto mb-24 max-w-4xl text-center">
            <Badge className="mb-5 bg-orange-500 px-4 py-2 text-black">
              <Sparkles className="mr-2 h-4 w-4" />
              Proyecto Lab13
            </Badge>

            <h1 className="text-6xl font-black tracking-tight text-orange-500 md:text-8xl">
              Universo Dragon Ball
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Explora personajes legendarios de Dragon Ball en una interfaz moderna,
              oscura y elegante usando React, Vite, TypeScript, Tailwind, Axios,
              TanStack Query y shadcn/ui.
            </p>

            <div className="mt-8 flex justify-center">
              <Button className="bg-orange-500 px-8 py-6 text-base font-bold text-black hover:bg-orange-400">
                <Flame className="mr-2 h-5 w-5" />
                Explorar personajes
              </Button>
            </div>
          </div>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-2xl backdrop-blur">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Personajes principales
                </h2>
                <p className="mt-2 text-zinc-400">
                  Busca y revisa el detalle de cada personaje.
                </p>
              </div>

              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar personaje..."
                  className="h-12 border-zinc-700 bg-black pl-12 text-white"
                />
              </div>
            </div>

            {isLoading && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-96 rounded-2xl bg-zinc-900" />
                ))}
              </div>
            )}

            {isError && (
              <p className="text-center text-red-400">
                Error al cargar personajes.
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredCharacters?.map((character) => (
                <Card
                  key={character.id}
                  className="group overflow-hidden border-zinc-800 bg-black text-white shadow-xl transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-orange-500/20"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{character.name}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex h-72 items-center justify-center rounded-2xl bg-zinc-900 p-4">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="h-full object-contain transition duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-orange-500 text-black">
                        {character.race}
                      </Badge>
                      <Badge variant="secondary">{character.affiliation}</Badge>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-orange-500 font-bold text-black hover:bg-orange-400"
                    >
                      <Link to={`/characters/${character.id}`}>Ver detalle</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
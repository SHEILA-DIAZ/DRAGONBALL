import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Flame, Shield, Sparkles, Zap } from "lucide-react"
import { getCharacterById } from "@/services/dragonballApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: character, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id!),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <Skeleton className="h-[620px] rounded-3xl bg-zinc-900" />
          <Skeleton className="h-[500px] rounded-3xl bg-zinc-900" />
        </section>
      </main>
    )
  }

  if (isError || !character) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-red-400">No se pudo cargar el personaje.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black px-6 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ff6b00_0%,transparent_35%)] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#f97316_0%,transparent_25%)] opacity-20" />

      <section className="relative mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between">
          <Button asChild variant="secondary" className="font-bold">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>

          <Badge className="bg-orange-500 px-4 py-2 text-black">
            Detalle del personaje
          </Badge>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div className="relative rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl">
            <div className="absolute inset-8 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="relative flex min-h-[620px] items-center justify-center rounded-[1.5rem] bg-black/60">
              <img
                src={character.image}
                alt={character.name}
                className="max-h-[560px] object-contain drop-shadow-[0_0_45px_rgba(249,115,22,0.55)]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Badge className="mb-5 w-fit bg-orange-500 px-4 py-2 text-black">
              <Sparkles className="mr-2 h-4 w-4" />
              Universo Dragon Ball
            </Badge>

            <h1 className="text-6xl font-black tracking-tight text-orange-500 md:text-7xl">
              {character.name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="bg-orange-500 text-black">{character.race}</Badge>
              <Badge variant="secondary">{character.gender}</Badge>
              <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                {character.affiliation}
              </Badge>
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              {character.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                <div className="mb-3 flex items-center gap-2 text-orange-500">
                  <Zap className="h-5 w-5" />
                  <span className="font-bold">Ki actual</span>
                </div>
                <p className="text-2xl font-black">{character.ki}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                <div className="mb-3 flex items-center gap-2 text-orange-500">
                  <Flame className="h-5 w-5" />
                  <span className="font-bold">Máximo Ki</span>
                </div>
                <p className="text-2xl font-black">{character.maxKi}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
              <div className="mb-3 flex items-center gap-2 text-orange-500">
                <Shield className="h-5 w-5" />
                <span className="font-bold">Afiliación</span>
              </div>
              <p className="text-xl font-bold">{character.affiliation}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
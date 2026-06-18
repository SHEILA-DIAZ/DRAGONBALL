import { useQuery } from "@tanstack/react-query"
import {
  AlertTriangle,
  ArrowLeft,
  BatteryCharging,
  Globe2,
  Shield,
  Sparkles,
  Star,
  Swords,
  UsersRound,
  Zap,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { getCharacterById } from "@/api/dragonballApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

function CharacterDetail() {
  const { id } = useParams()

  const {
    data: character,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id ?? ""),
    enabled: Boolean(id),
  })

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#fef3c7_38%,#ffffff_72%,#fed7aa_100%)] text-zinc-950">
      <nav className="sticky top-0 z-50 border-b border-orange-200/80 bg-white/75 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-orange-500 text-black shadow-lg shadow-orange-500/25">
              <Star className="size-5 fill-current" />
            </div>
            <div>
              <p className="text-sm font-black uppercase leading-none text-zinc-950">
                Dragonball
              </p>
              <p className="text-xs text-zinc-500">Ficha de personaje</p>
            </div>
          </Link>

          <Button
            asChild
            variant="outline"
            className="border-orange-200 bg-white/80 text-zinc-900 hover:bg-orange-50"
          >
            <Link to="/">
              <ArrowLeft className="size-4" />
              Volver
            </Link>
          </Button>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:py-14">
        {isLoading && (
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Skeleton className="h-[520px] rounded-3xl bg-orange-200/60" />
            <div className="space-y-5">
              <Skeleton className="h-10 w-48 bg-orange-200/60" />
              <Skeleton className="h-20 w-full bg-orange-200/60" />
              <Skeleton className="h-56 w-full bg-orange-200/60" />
            </div>
          </div>
        )}

        {isError && (
          <Card className="border-red-200 bg-white/85 py-0 shadow-xl">
            <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
              <AlertTriangle className="size-11 text-red-500" />
              <h1 className="text-2xl font-black">No se pudo cargar el personaje</h1>
              <p className="max-w-md text-sm leading-6 text-zinc-600">
                Hubo un problema al consultar la Dragon Ball API. Regresa a la
                galeria e intenta abrir el personaje nuevamente.
              </p>
              <Button asChild className="mt-2 bg-orange-500 text-black hover:bg-amber-300">
                <Link to="/">Volver a la galeria</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {character && (
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Card className="relative overflow-hidden border-orange-200 bg-white/80 py-0 shadow-2xl shadow-orange-950/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(251,191,36,0.58),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(249,115,22,0.24),transparent_34%)]" />
              <CardContent className="relative flex min-h-[520px] items-end justify-center p-6">
                <img
                  src={character.image}
                  alt={character.name}
                  className="max-h-[500px] w-full object-contain drop-shadow-[0_30px_40px_rgba(124,45,18,0.35)]"
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div>
                <Badge className="mb-4 border border-orange-300 bg-orange-100 px-3 py-1 text-orange-800">
                  <Swords className="size-3.5" />
                  Personaje #{character.id}
                </Badge>
                <h1 className="text-5xl font-black uppercase leading-none text-zinc-950 sm:text-6xl">
                  {character.name}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-700">
                  {character.description || "Sin descripcion disponible."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard icon={Sparkles} label="Raza" value={character.race} />
                <InfoCard icon={Shield} label="Genero" value={character.gender} />
                <InfoCard icon={UsersRound} label="Afiliacion" value={character.affiliation} />
                <InfoCard
                  icon={Globe2}
                  label="Planeta"
                  value={character.originPlanet?.name ?? "Desconocido"}
                />
              </div>

              <Card className="border-orange-200 bg-white/85 py-0 shadow-xl shadow-orange-950/10">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-2">
                    <Zap className="size-5 text-orange-500" />
                    <h2 className="text-xl font-black">Nivel de poder</h2>
                  </div>
                  <Separator className="bg-orange-100" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PowerPill icon={Zap} label="Ki base" value={character.ki} />
                    <PowerPill
                      icon={BatteryCharging}
                      label="Ki maximo"
                      value={character.maxKi}
                    />
                  </div>
                </CardContent>
              </Card>

              {Boolean(character.transformations?.length) && (
                <Card className="border-orange-200 bg-white/85 py-0 shadow-xl shadow-orange-950/10">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-5 text-amber-500" />
                      <h2 className="text-xl font-black">Transformaciones</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {character.transformations?.map((transformation) => (
                        <div
                          key={transformation.id}
                          className="rounded-2xl border border-orange-100 bg-orange-50 p-4"
                        >
                          <div className="mb-3 flex h-40 items-end justify-center rounded-xl bg-white">
                            <img
                              src={transformation.image}
                              alt={transformation.name}
                              className="h-full object-contain"
                            />
                          </div>
                          <p className="font-bold text-zinc-950">{transformation.name}</p>
                          <p className="text-sm text-zinc-600">Ki: {transformation.ki}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sparkles
  label: string
  value?: string
}) {
  return (
    <Card className="border-orange-200 bg-white/85 py-0 shadow-lg shadow-orange-950/10">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="grid size-11 place-items-center rounded-2xl bg-orange-100 text-orange-600">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase text-zinc-500">{label}</p>
          <p className="truncate font-black text-zinc-950">{value || "Desconocido"}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function PowerPill({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Zap
  label: string
  value?: string
}) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-600">
        <Icon className="size-4 text-orange-500" />
        {label}
      </p>
      <p className="text-lg font-black text-zinc-950">{value || "Desconocido"}</p>
    </div>
  )
}

export default CharacterDetail

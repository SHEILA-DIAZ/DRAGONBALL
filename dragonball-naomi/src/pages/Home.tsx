import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  AlertTriangle,
  ArrowRight,
  Flame,
  LoaderCircle,
  Search,
  Sparkles,
  Star,
  Trophy,
  UsersRound,
  X,
  Zap,
} from "lucide-react"

import { getCharacters } from "@/api/dragonballApi"
import CharacterCard from "@/components/dragonball/CharacterCard"
import heroImage from "@/assets/hero-dragonball.svg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const featuredStats = [
  { label: "Personajes", icon: UsersRound },
  { label: "Razas", icon: Sparkles },
  { label: "Afiliaciones", icon: Trophy },
]

function Home() {
  const [search, setSearch] = useState("")

  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  })

  const filteredCharacters = characters?.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  )

  const racesCount = new Set(characters?.map((character) => character.race)).size
  const affiliationsCount = new Set(
    characters?.map((character) => character.affiliation).filter(Boolean)
  ).size
  const stats = [
    { value: characters?.length ?? 0, label: featuredStats[0].label, icon: featuredStats[0].icon },
    { value: racesCount, label: featuredStats[1].label, icon: featuredStats[1].icon },
    { value: affiliationsCount, label: featuredStats[2].label, icon: featuredStats[2].icon },
  ]

  const scrollToCharacters = () => {
    document.getElementById("characters")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#fff7ed_0%,#fef3c7_34%,#ffffff_68%,#fed7aa_100%)] text-zinc-950">
      <nav className="sticky top-0 z-50 border-b border-orange-200/80 bg-white/75 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full border border-orange-300/40 bg-orange-500 text-black shadow-lg shadow-orange-500/25">
              <Star className="size-5 fill-current" />
            </div>
            <div>
              <p className="text-sm font-black uppercase leading-none tracking-normal text-orange-300">
                Dragonball
              </p>
              <p className="text-xs text-zinc-500">Naomi Edition</p>
            </div>
          </div>

          <Button
            type="button"
            onClick={scrollToCharacters}
            className="border border-orange-300/40 bg-orange-500 text-black shadow-lg shadow-orange-500/20 hover:bg-amber-300"
          >
            <Zap className="size-4" />
            Explorar
          </Button>
        </div>
      </nav>

      <section className="relative border-b border-orange-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(249,115,22,0.30),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.40),transparent_28%),linear-gradient(180deg,rgba(255,247,237,0.50),rgba(255,255,255,0.92)_94%)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20 lg:py-24">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="mb-5 border border-amber-300/40 bg-amber-300/15 px-3 py-1 text-amber-100">
              <Flame className="size-3.5" />
              Universo Dragon Ball API
            </Badge>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-normal text-zinc-950 sm:text-6xl lg:text-7xl">
              DRAGONBALL
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg">
              Explora guerreros, razas, niveles de Ki y afiliaciones en una
              experiencia visual moderna creada con React, TypeScript y
              componentes profesionales.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={scrollToCharacters}
                size="lg"
                className="h-12 border border-orange-300/40 bg-orange-500 px-6 text-black shadow-xl shadow-orange-500/25 hover:bg-amber-300"
              >
                Ver personajes
                <ArrowRight className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setSearch("Saiyan")}
                className="h-12 border-orange-200 bg-white/80 px-6 text-zinc-900 shadow-lg shadow-orange-950/5 hover:bg-orange-50"
              >
                <Sparkles className="size-4 text-amber-300" />
                Filtrar Saiyan
              </Button>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-md justify-center md:max-w-none">
            <div className="absolute bottom-8 h-28 w-72 rounded-full bg-orange-500/25 blur-3xl" />
            <img
              src={heroImage}
              alt="Goku inspirado en Dragon Ball"
              className="relative max-h-[520px] w-full object-contain drop-shadow-[0_28px_38px_rgba(124,45,18,0.35)]"
            />
          </div>
        </div>
      </section>

      <section id="characters" className="mx-auto max-w-7xl space-y-8 px-5 py-12 lg:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <Card
                key={stat.label}
                className="border-orange-200/80 bg-white/85 py-0 text-zinc-950 shadow-xl shadow-orange-950/10"
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="grid size-12 place-items-center rounded-2xl border border-orange-300/30 bg-orange-500/15 text-orange-200">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-zinc-950">{stat.value}</p>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <Badge className="mb-3 border border-orange-400/30 bg-orange-500/15 text-orange-100">
              <Search className="size-3" />
              Busqueda dinamica
            </Badge>
            <h2 className="text-3xl font-black uppercase tracking-normal text-zinc-950">
              Galeria de guerreros
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
              Encuentra personajes por nombre y revisa su raza, genero,
              afiliacion y poder de Ki. Presiona la imagen de una tarjeta para
              abrir su ficha completa.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-orange-500" />
            <Input
              type="text"
              placeholder="Buscar personaje..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 rounded-2xl border-orange-200 bg-white/90 pl-12 pr-12 text-zinc-950 shadow-xl shadow-orange-950/10 transition-all duration-300 placeholder:text-zinc-400 focus-visible:border-orange-400 focus-visible:ring-orange-400/25"
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:bg-orange-100 hover:text-zinc-950"
                aria-label="Limpiar busqueda"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <Separator className="bg-orange-200/80" />

        {isLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <LoaderCircle className="size-5 animate-spin" />
              <span className="font-medium">Cargando personajes...</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="border-orange-200 bg-white/85 py-0">
                  <CardContent className="space-y-4 p-5">
                    <Skeleton className="h-7 w-2/3 bg-orange-200/60" />
                    <Skeleton className="h-72 rounded-2xl bg-orange-200/60" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full bg-orange-200/60" />
                      <Skeleton className="h-6 w-24 rounded-full bg-orange-200/60" />
                    </div>
                    <Skeleton className="h-12 rounded-2xl bg-orange-200/60" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {isError && (
          <Card className="border-red-200 bg-white/85 py-0 text-zinc-950">
            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
              <AlertTriangle className="size-10 text-red-300" />
              <h3 className="text-xl font-bold">No se pudieron cargar los personajes</h3>
              <p className="max-w-md text-sm leading-6 text-red-100/80">
                Revisa tu conexion o intenta nuevamente en unos segundos. La
                aplicacion mantiene la integracion con Dragon Ball API.
              </p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && filteredCharacters?.length === 0 && (
          <Card className="border-amber-200 bg-white/85 py-0 text-zinc-950">
            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
              <Search className="size-10 text-amber-200" />
              <h3 className="text-xl font-bold">Sin resultados</h3>
              <p className="max-w-md text-sm leading-6 text-zinc-600">
                No encontramos personajes que coincidan con "{search}". Prueba
                con otro nombre o limpia la busqueda.
              </p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && Boolean(filteredCharacters?.length) && (
          <ScrollArea className="max-h-none">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCharacters?.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </ScrollArea>
        )}
      </section>

      <footer className="border-t border-orange-200/80 bg-white/80 px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>
            DRAGONBALL Naomi - Interfaz profesional con React, TypeScript,
            Vite, Tailwind CSS y shadcn/ui.
          </p>
          <div className="flex items-center gap-2 text-orange-200">
            <Star className="size-4 fill-current" />
            <span>Powered by Dragon Ball API</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home

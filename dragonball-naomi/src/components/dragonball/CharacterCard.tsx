import type { Character } from "@/types/character"
import {
  ArrowUpRight,
  BatteryCharging,
  Crown,
  Shield,
  Sparkles,
  UserRound,
  UsersRound,
  Zap,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Props {
  character: Character
}

function CharacterCard({ character }: Props) {
  return (
    <Card className="group relative border-orange-200/80 bg-white/90 py-0 text-zinc-950 shadow-xl shadow-orange-950/10 ring-1 ring-orange-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/70 hover:shadow-orange-500/20">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-300 to-orange-600 opacity-80" />

      <CardHeader className="gap-3 px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate text-xl font-black uppercase tracking-normal text-zinc-950">
              {character.name}
            </CardTitle>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <UsersRound className="size-3.5 text-orange-500" />
              {character.affiliation || "Sin afiliacion"}
            </p>
          </div>

          <Badge className="border border-amber-300/70 bg-amber-100 text-amber-800">
            <Crown className="size-3" />
            ID {character.id}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-5 pb-5">
        <Link
          to={`/personaje/${character.id}`}
          className="relative flex h-72 items-end justify-center overflow-hidden rounded-2xl border border-orange-200/80 bg-[radial-gradient(circle_at_50%_18%,rgba(251,191,36,0.62),rgba(249,115,22,0.20)_38%,rgba(255,247,237,0.98)_76%)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/50"
          aria-label={`Ver detalles de ${character.name}`}
        >
          <div className="absolute inset-x-8 bottom-4 h-14 rounded-full bg-orange-400/25 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
          <img
            src={character.image}
            alt={character.name}
            loading="lazy"
            className="relative z-10 h-[94%] max-w-full object-contain drop-shadow-[0_22px_22px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-xs font-bold text-zinc-950 opacity-0 shadow-lg shadow-orange-950/10 transition-all duration-300 group-hover:opacity-100">
            Ver detalle
            <ArrowUpRight className="size-3" />
          </span>
        </Link>

        <div className="flex flex-wrap gap-2.5">
          <Badge className="border border-orange-300 bg-orange-100 text-orange-800">
            <Sparkles className="size-3" />
            {character.race}
          </Badge>
          <Badge className="border border-zinc-200 bg-zinc-100 text-zinc-700">
            <UserRound className="size-3" />
            {character.gender}
          </Badge>
        </div>

        <Separator className="bg-orange-100" />

        <div className="grid gap-3 text-sm">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-3 py-2.5">
            <span className="flex items-center gap-2 text-zinc-600">
              <Zap className="size-4 text-orange-500" />
              Ki base
            </span>
            <span className="truncate text-right font-semibold text-zinc-950">
              {character.ki || "Desconocido"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-3 py-2.5">
            <span className="flex items-center gap-2 text-zinc-600">
              <BatteryCharging className="size-4 text-amber-500" />
              Ki maximo
            </span>
            <span className="truncate text-right font-semibold text-amber-700">
              {character.maxKi || "Desconocido"}
            </span>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-zinc-600">
          <Shield className="mr-1 inline size-4 text-orange-500" />
          {character.description || "Guerrero del universo Dragon Ball."}
        </p>
      </CardContent>
    </Card>
  )
}

export default CharacterCard

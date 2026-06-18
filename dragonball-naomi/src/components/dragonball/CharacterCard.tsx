import type { Character } from "@/types/character"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Props {
  character: Character
}

function CharacterCard({ character }: Props) {
  return (
    <Card className="bg-zinc-900 border-orange-500/40 text-white overflow-hidden">
      <CardHeader>
        <CardTitle className="text-orange-400">{character.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-64 flex items-center justify-center bg-black rounded-lg">
          <img
            src={character.image}
            alt={character.name}
            className="h-full object-contain"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{character.race}</Badge>
          <Badge variant="outline" className="text-orange-400 border-orange-400">
            {character.gender}
          </Badge>
        </div>

        <p className="text-sm text-zinc-300">
          Ki: {character.ki}
        </p>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
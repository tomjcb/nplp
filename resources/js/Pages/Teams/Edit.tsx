import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { router } from "@inertiajs/react"
import { useState } from "react"

interface Game {
    id: number
    name: string
}

interface Player {
    id: number
    name: string
}

interface Team {
    id: number
    name: string
    game_id: number
    players: Player[]
}

interface EditProps {
    team: Team
    games: Game[]
}

export default function Edit(props: EditProps) {
    const [formData, setFormData] = useState({
        name: props.team.name,
        game_id: props.team.game_id.toString(),
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.put(`/teams/${props.team.id}`, formData)
    }

    return (
        <AuthenticatedLayout header={
            <h2 className={"text-xl font-semibold leading-tight text-gray-800"}>
                Modifier l'équipe
            </h2>
        }>
            <div className={"container mx-auto py-6"}>
                <div className={"mx-auto max-w-2xl"}>
                    <form onSubmit={handleSubmit} className={"space-y-6"}>
                        <div className={"space-y-2"}>
                            <label htmlFor="name" className={"text-sm font-medium"}>
                                Nom de l'équipe
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className={"space-y-2"}>
                            <label htmlFor="game" className={"text-sm font-medium"}>
                                Jeu
                            </label>
                            <Select
                                value={formData.game_id}
                                onValueChange={(value: string) =>
                                    setFormData({ ...formData, game_id: value })
                                }
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un jeu" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.games.map((game) => (
                                        <SelectItem key={game.id} value={game.id.toString()}>
                                            {game.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {props.team.players.length > 0 && (
                            <div className={"space-y-2"}>
                                <h3 className={"text-sm font-medium"}>Joueurs actuels</h3>
                                <div className={"rounded-md border p-4"}>
                                    <ul className={"space-y-2"}>
                                        {props.team.players.map((player) => (
                                            <li key={player.id}>{player.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className={"flex justify-end space-x-4"}>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get("/teams")}
                            >
                                Annuler
                            </Button>
                            <Button type="submit">
                                Mettre à jour l'équipe
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
} 
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

interface CreateProps {
    games: Game[]
}

export default function Create(props: CreateProps) {
    const [formData, setFormData] = useState({
        name: "",
        game_id: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.post("/teams", formData)
    }

    return (
        <AuthenticatedLayout header={
            <h2 className={"text-xl font-semibold leading-tight text-gray-800"}>
                Créer une équipe
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
                                onValueChange={(value) =>
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

                        <div className={"flex justify-end space-x-4"}>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get("/teams")}
                            >
                                Annuler
                            </Button>
                            <Button type="submit">
                                Créer l'équipe
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
} 
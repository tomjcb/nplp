import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { router } from '@inertiajs/react'

import { Button } from "@/Components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { toast } from "react-toastify"

// Définition du schéma de validation
const teamFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Le nom est requis"),
    game_id: z.string().min(1, "Le jeu est requis"),
})

type TeamFormValues = z.infer<typeof teamFormSchema>

interface Game {
    id: number
    name: string
}

// Props du composant
interface TeamFormProps {
    team?: {
        id: number
        name: string
        game_id: number
    }
    games: Game[]
    isEditing?: boolean
    onSuccess?: () => void
}

export function TeamForm({ team, games, isEditing = false, onSuccess }: TeamFormProps) {
    // Initialiser le formulaire avec react-hook-form
    const form = useForm<TeamFormValues>({
        resolver: zodResolver(teamFormSchema),
        defaultValues: team 
            ? { 
                id: team.id,
                name: team.name, 
                game_id: team.game_id.toString() 
            } 
            : {
                name: "",
                game_id: "",
            },
    })

    // Gestion de la soumission
    function onSubmit(data: TeamFormValues) {
        if (isEditing && team) {
            router.put(`/teams/${team.id}`, data, {
                onSuccess: () => {
                    toast.success("Équipe mise à jour")
                    if (onSuccess) onSuccess()
                },
            })
        } else {
            router.post('/teams', data, {
                onSuccess: () => {
                    toast.success("Équipe créée")
                    if (onSuccess) onSuccess()
                },
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de l'équipe</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez le nom de l'équipe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="game_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jeu</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un jeu" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {games.map((game) => (
                                        <SelectItem key={game.id} value={game.id.toString()}>
                                            {game.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {isEditing ? "Mettre à jour" : "Créer"} l'équipe
                </Button>
            </form>
        </Form>
    )
} 
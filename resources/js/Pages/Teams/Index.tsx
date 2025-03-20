import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { TeamForm } from "@/Components/TeamForm"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { router } from '@inertiajs/react'
import { EllipsisVertical, Plus } from "lucide-react"
import { toast } from "react-toastify"
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
    created_at: string
    players: Player[]
}

interface IndexProps {
    teams: {
        data: Team[]
        current_page: number
        last_page: number
    }
    games: Game[]
}

export default function Index(props: IndexProps) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null)

    const deleteTeam = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
            router.delete(`/teams/${id}`, {
                onSuccess: () => {
                    toast.success("Équipe supprimée")
                },
            })
        }
    }

    const handleEdit = (team: Team) => {
        setCurrentTeam(team)
        setIsEditDialogOpen(true)
    }

    const handleDialogClose = () => {
        setIsCreateDialogOpen(false)
        setIsEditDialogOpen(false)
    }

    return <AuthenticatedLayout header={<>
        <h2 className={"text-xl font-semibold leading-tight text-gray-800"}>
            Liste des équipes
        </h2>
    </>}>
        <div className={"container mx-auto py-6"}>
            <div className={"flex justify-between items-center mb-6"}>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className={"mr-2 h-4 w-4"} />
                            Ajouter une équipe
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={"max-w-3xl max-h-[90vh] overflow-y-auto"}>
                        <DialogHeader>
                            <DialogTitle>Ajouter une nouvelle équipe</DialogTitle>
                            <DialogDescription>
                                Remplissez le formulaire pour ajouter une nouvelle équipe.
                            </DialogDescription>
                        </DialogHeader>
                        <TeamForm 
                            games={props.games} 
                            isEditing={false} 
                            onSuccess={handleDialogClose}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className={"rounded-md border"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Nombre de joueurs</TableHead>
                            <TableHead>Date de création</TableHead>
                            <TableHead className={"w-[100px]"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.teams.data.map((team) => (
                            <TableRow key={team.id}>
                                <TableCell>{team.name}</TableCell>
                                <TableCell>{team.players.length}</TableCell>
                                <TableCell>{new Date(team.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className={"h-8 w-8 p-0"}>
                                                <EllipsisVertical/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => handleEdit(team)}
                                            >
                                                Modifier
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className={"text-red-600"}
                                                onClick={() => deleteTeam(team.id)}
                                            >
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Dialog pour l'édition */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className={"max-w-3xl max-h-[90vh] overflow-y-auto"}>
                    <DialogHeader>
                        <DialogTitle>Modifier l'équipe</DialogTitle>
                        <DialogDescription>
                            Modifiez les informations de l'équipe.
                        </DialogDescription>
                    </DialogHeader>
                    {currentTeam && (
                        <TeamForm 
                            team={currentTeam} 
                            games={props.games} 
                            isEditing={true} 
                            onSuccess={handleDialogClose}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Pagination */}
            {props.teams.last_page > 1 && (
                <div className={"flex items-center justify-between py-4"}>
                    {props.teams.current_page > 1 && (
                        <Button
                            variant="outline"
                            onClick={() => router.get(`/teams?page=${props.teams.current_page - 1}`)}
                        >
                            Précédent
                        </Button>
                    )}

                    <span className={"mx-4"}>
                        Page {props.teams.current_page} sur {props.teams.last_page}
                    </span>

                    {props.teams.current_page < props.teams.last_page && (
                        <Button
                            variant="outline"
                            onClick={() => router.get(`/teams?page=${props.teams.current_page + 1}`)}
                        >
                            Suivant
                        </Button>
                    )}
                </div>
            )}
        </div>
    </AuthenticatedLayout>
} 
import { useState } from "react"
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {toast} from "react-toastify";
import {EllipsisVertical} from "lucide-react";

interface Song {
	id: number
	title: string
	artist: string
	youtube_link: string
	round: string
	points: number
	lyrics_to_find: string
	lyrics_time_code: string
	created_at: string
}

interface IndexProps {
	songs: {
		data: Song[]
		current_page: number
		last_page: number
	}
}

export default function Index({ songs }: IndexProps) {
	const deleteSong = (id: number) => {
		if (confirm('Êtes-vous sûr de vouloir supprimer cette chanson ?')) {
			router.delete(`/songs/${id}`, {
				onSuccess: () => {
					toast.success("Chanson supprimée")
				},
			})
		}
	}

	return (
		<div className="container mx-auto py-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Liste des Chansons</h1>
				<Link href={route('songs.create')}>
					<Button>Ajouter une chanson</Button>
				</Link>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Titre</TableHead>
							<TableHead>Artiste</TableHead>
							<TableHead>Round</TableHead>
							<TableHead>Points</TableHead>
							<TableHead>Time Code</TableHead>
							<TableHead className="w-[100px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{songs.data.map((song) => (
							<TableRow key={song.id}>
								<TableCell>{song.title}</TableCell>
								<TableCell>{song.artist}</TableCell>
								<TableCell>{song.round}</TableCell>
								<TableCell>{song.points}</TableCell>
								<TableCell>{song.lyrics_time_code}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<EllipsisVertical />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem
												onClick={() => router.visit(`/songs/${song.id}/edit`)}
											>
												Modifier
											</DropdownMenuItem>
											<DropdownMenuItem
												className="text-red-600"
												onClick={() => deleteSong(song.id)}
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

			{/* Pagination */}
			{songs.last_page > 1 && (
				<div className="flex items-center justify-between py-4">
					{songs.current_page > 1 && (
						<Button
							variant="outline"
							onClick={() => router.get(`/songs?page=${songs.current_page - 1}`)}
						>
							Précédent
						</Button>
					)}

					<span className="mx-4">
                        Page {songs.current_page} sur {songs.last_page}
                    </span>

					{songs.current_page < songs.last_page && (
						<Button
							variant="outline"
							onClick={() => router.get(`/songs?page=${songs.current_page + 1}`)}
						>
							Suivant
						</Button>
					)}
				</div>
			)}
		</div>
	)
}

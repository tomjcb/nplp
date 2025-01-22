import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { router } from '@inertiajs/react'

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {toast} from "react-toastify";

// Définition du schéma de validation
const songFormSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(1, "Le titre est requis"),
	artist: z.string().min(1, "L'artiste est requis"),
	youtube_link: z.string().url("Le lien YouTube doit être une URL valide"),
	round: z.string().min(1, "Le round est requis"),
	points: z.number().min(0, "Les points doivent être positifs"),
	lyrics_to_find: z.string().min(1, "Les paroles à trouver sont requises"),
	lyrics_time_code: z.string().min(1, "Le time code est requis"),
})

type SongFormValues = z.infer<typeof songFormSchema>

// Props du composant
interface SongFormProps {
	song?: SongFormValues
	isEditing?: boolean
}

export function SongForm({ song, isEditing = false }: SongFormProps) {
	// Initialiser le formulaire avec react-hook-form
	const form = useForm<SongFormValues>({
		resolver: zodResolver(songFormSchema),
		defaultValues: song || {
			title: "",
			artist: "",
			youtube_link: "",
			round: "",
			points: 0,
			lyrics_to_find: "",
			lyrics_time_code: "",
		},
	})

	// Gestion de la soumission
	function onSubmit(data: SongFormValues) {
		if (isEditing && song) {
			router.put(`/songs/${song.id}`, data, {
				onSuccess: () => {
					toast.success("Chanson mise à jour")
				},
			})
		} else {
			router.post('/songs', data, {
				onSuccess: () => {
					toast.success("Chanson créée")
				},
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titre</FormLabel>
							<FormControl>
								<Input placeholder="Entrez le titre" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="artist"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Artiste</FormLabel>
							<FormControl>
								<Input placeholder="Entrez l'artiste" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="youtube_link"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lien YouTube</FormLabel>
							<FormControl>
								<Input placeholder="https://youtube.com/..." {...field} />
							</FormControl>
							<FormDescription>
								Collez le lien YouTube complet de la chanson
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="round"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Round</FormLabel>
							<FormControl>
								<Input placeholder="Round 1" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="points"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Points</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="100"
									{...field}
									onChange={(e) => field.onChange(parseInt(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lyrics_to_find"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Paroles à trouver</FormLabel>
							<FormControl>
								<Input placeholder="Entrez les paroles" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lyrics_time_code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time Code</FormLabel>
							<FormControl>
								<Input placeholder="1:30" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">
					{isEditing ? "Mettre à jour" : "Créer"} la chanson
				</Button>
			</form>
		</Form>
	)
}

import { useForm } from '@inertiajs/react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { toast } from "react-toastify"
import { Switch } from "@/Components/ui/switch"

interface Song {
	id: number
	title: string
	artist: string
	video_file: string
	round: number
	points: number
	lyrics_to_find: string
	lyrics_time_code: string
	has_been_played: boolean
}

interface SongFormProps {
	song?: Song
	isEditing?: boolean
	onSuccess?: () => void
}

export function SongForm({ song, isEditing = false, onSuccess }: SongFormProps) {
	const { data, setData, post, put, processing, progress, errors, reset } = useForm({
		title: song?.title || '',
		artist: song?.artist || '',
		video_file: null as File | null,
		round: song?.round || 1,
		points: song?.points || 0,
		lyrics_to_find: song?.lyrics_to_find || '',
		lyrics_time_code: song?.lyrics_time_code || '',
		has_been_played: song?.has_been_played || false,
		_method: isEditing ? 'PUT' : 'POST', // Pour Laravel
	})

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		
		// Validation côté client
		if (!data.title.trim()) {
			toast.error("Le titre est requis")
			return
		}
		if (!data.artist.trim()) {
			toast.error("L'artiste est requis")
			return
		}
		if (!isEditing && !data.video_file) {
			toast.error("Le fichier vidéo est requis")
			return
		}
		if (!data.lyrics_to_find.trim()) {
			toast.error("Les paroles à trouver sont requises")
			return
		}

		// Pour les formulaires avec fichiers, Inertia détecte automatiquement 
		// qu'il faut utiliser FormData si un fichier est présent
		const options = {
			forceFormData: true, // Force l'utilisation de FormData
			preserveScroll: true,
			onSuccess: () => {
				toast.success(isEditing ? "Chanson mise à jour avec succès" : "Chanson créée avec succès")
				onSuccess?.()
			},
			onError: (errors: any) => {
				console.error(errors)
				toast.error("Une erreur est survenue lors de l'enregistrement")
			}
		}

		// Utilisation de post pour les deux cas car avec des fichiers,
		// nous devons utiliser POST avec _method pour simuler PUT
		// Le champ _method est déjà défini dans data et sera envoyé avec le formulaire
		// Laravel reconnaît ce champ et traite la requête comme un PUT si _method='PUT'
		if (isEditing && song) {
			post(route('songs.update', song.id), options)
		} else {
			post(route('songs.store'), options)
		}
	}

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div>
				<Label htmlFor="title">Titre</Label>
				<Input
					id="title"
					type="text"
					value={data.title}
					onChange={e => setData('title', e.target.value)}
					required
				/>
				{errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
			</div>

			<div>
				<Label htmlFor="artist">Artiste</Label>
				<Input
					id="artist"
					type="text"
					value={data.artist}
					onChange={e => setData('artist', e.target.value)}
					required
				/>
				{errors.artist && <div className="text-red-500 text-sm">{errors.artist}</div>}
			</div>

			<div>
				<Label htmlFor="video_file">Fichier vidéo</Label>
				<Input
					id="video_file"
					type="file"
					accept="video/*"
					onChange={e => setData('video_file', e.target.files?.[0] || null)}
					required={!isEditing}
				/>
				{errors.video_file && <div className="text-red-500 text-sm">{errors.video_file}</div>}
			</div>

			<div>
				<Label htmlFor="round">Manche</Label>
				<Input
					id="round"
					type="number"
					min="0"
					value={data.round}
					onChange={e => setData('round', parseInt(e.target.value))}
					required
				/>
				{errors.round && <div className="text-red-500 text-sm">{errors.round}</div>}
			</div>

			<div>
				<Label htmlFor="points">Points</Label>
				<Input
					id="points"
					type="number"
					min="0"
					value={data.points}
					onChange={e => setData('points', parseInt(e.target.value))}
					required
				/>
				{errors.points && <div className="text-red-500 text-sm">{errors.points}</div>}
			</div>

			<div>
				<Label htmlFor="lyrics_to_find">Paroles à trouver</Label>
				<Textarea
					id="lyrics_to_find"
					value={data.lyrics_to_find}
					onChange={e => setData('lyrics_to_find', e.target.value)}
					required
				/>
				{errors.lyrics_to_find && <div className="text-red-500 text-sm">{errors.lyrics_to_find}</div>}
			</div>

			<div className="flex items-center space-x-2">
				<Switch
					id="has_been_played"
					checked={data.has_been_played}
					onCheckedChange={checked => setData('has_been_played', checked)}
				/>
				<Label htmlFor="has_been_played">A déjà été jouée</Label>
			</div>

			<div className="flex justify-end">
				<Button type="submit" disabled={processing}>
					{isEditing ? 'Mettre à jour' : 'Créer'}
				</Button>
			</div>
		</form>
	)
}

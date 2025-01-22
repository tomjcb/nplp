import { SongForm } from '@/Components/SongForm'
import { PageProps } from '@/types'
import { Song } from '@/types'

interface EditProps extends PageProps {
	song: Song
}

export default function Edit({ auth, song }: EditProps) {
	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Modifier la chanson</h1>
			<SongForm song={song} isEditing={true} />
		</div>
	)
}

import { SongForm } from '@/Components/SongForm'
import { PageProps } from '@/types'

export default function Create({ auth }: PageProps) {
	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Créer une nouvelle chanson</h1>
			<SongForm />
		</div>
	)
}

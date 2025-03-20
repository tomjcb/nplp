import { Head, Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button } from "@/Components/ui/button"
import { ArrowLeft, Pencil } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import Lyrics from '@/Pages/Youtube/Lyrics'

interface Song {
	id: number
	title: string
	artist: string
	video_file: string
	round: string
	points: number
	lyrics_to_find: string
	created_at: string
}

interface ShowProps {
	song: Song
}

export default function Show({ song }: ShowProps) {
	return (
		<AuthenticatedLayout
			header={
				<div className="flex items-center space-x-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => router.visit(route('songs.index'))}
						className="hover:bg-gray-100"
					>
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<div>
						<h2 className="text-2xl font-bold tracking-tight text-gray-900">
							{song.title}
						</h2>
						<p className="text-sm text-gray-500">
							{song.artist}
						</p>
					</div>
				</div>
			}
		>
			<div className="py-12">
				<div className="w-full sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-center h-full">
						{/* Section Vidéo */}
						<Card className="overflow-hidden">
							<CardHeader>
								<CardTitle>Vidéo</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="aspect-video relative">
									<video
										controls
										className="w-full h-full rounded-lg"
										src={`/video/${song.video_file}`}
									>
										Votre navigateur ne supporte pas la lecture de vidéos.
									</video>
								</div>
							</CardContent>
						</Card>

						{/* Section Paroles */}
						<div className="space-y-6 h-full flex flex-col justify-center">
							<Lyrics
								lyrics={song.lyrics_to_find}
							/>

							<Card>
								<CardHeader>
									<CardTitle>Informations</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
									<div className="flex justify-between">
											<span className="text-gray-500">Points</span>
											<span className="font-medium">{song.points}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-500">Round</span>
											<span className="font-medium">{song.round}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	)
}

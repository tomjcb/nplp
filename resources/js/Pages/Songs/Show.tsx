import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { ArrowLeft, Pencil, CheckCircle2, Circle } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import Lyrics from "@/Pages/Youtube/Lyrics";
import { toast } from "react-toastify";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/Components/ui/tooltip";

interface Song {
	id: number;
	title: string;
	artist: string;
	video_file: string;
	round: string;
	points: number;
	lyrics_to_find: string;
	created_at: string;
	has_been_played: boolean;
}

interface ShowProps {
	song: Song;
}

export default function Show({ song }: ShowProps) {
	const handleTogglePlayed = async (song: Song) => {
		try {
			await router.post(
				route("songs.toggle-played", song.id),
				{},
				{
					preserveScroll: true,
					onSuccess: () => {
						toast.success("État de la chanson mis à jour");
					},
					onError: () => {
						toast.error(
							"Erreur lors de la mise à jour de l'état de la chanson"
						);
					},
				}
			);
		} catch (error) {
			toast.error(
				"Erreur lors de la mise à jour de l'état de la chanson"
			);
		}
	};

	return (
		<AuthenticatedLayout
			header={
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center space-x-4">
						<Button
							variant="ghost"
							onClick={() => router.visit(route("songs.index"))}
							className="hover:bg-gray-100"
						>
							<ArrowLeft className="!size-8" />
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

					<Button
						variant="ghost"
						onClick={() => handleTogglePlayed(song)}
						className={
							song.has_been_played
								? "text-green-500"
								: "text-gray-400"
						}
					>
						{song.has_been_played ? (
							<span className="text-green-500 flex items-center gap-2">
								Marquée comme non jouée
								<CheckCircle2 className="h-5 w-5" />
							</span>
						) : (
							<span className="text-gray-400 flex items-center gap-2">
								Marquée comme jouée
								<Circle className="h-5 w-5" />
							</span>
						)}
					</Button>
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
										Votre navigateur ne supporte pas la
										lecture de vidéos.
									</video>
								</div>
							</CardContent>
						</Card>

						{/* Section Paroles */}
						<div className="space-y-6 h-full flex flex-col justify-center">
							<Lyrics lyrics={song.lyrics_to_find} />

							<Card>
								<CardHeader>
									<CardTitle>Informations</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex justify-between">
											<span className="text-gray-500">
												Points
											</span>
											<span className="font-medium">
												{song.points}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-500">
												Manche
											</span>
											<span className="font-medium">
												{song.round}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

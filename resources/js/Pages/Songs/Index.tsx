import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import { SongForm } from "@/Components/SongForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import {
	Plus,
	Pencil,
	Trash2,
	Play,
	CheckCircle2,
	Circle,
	Search,
	ArrowUpDown,
	ArrowUp,
	ArrowDown,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/Components/ui/tooltip";
import { countWords } from "@/Pages/Youtube/Lyrics";

interface Song {
	id: number;
	title: string;
	artist: string;
	video_file: string;
	round: number;
	points: number;
	lyrics_to_find: string;
	lyrics_time_code: string;
	created_at: string;
	has_been_played: boolean;
}

interface IndexProps {
	songs: Song[];
	auth: {
		user: any;
	};
}

type SortField = "title" | "points" | "lyrics_length";
type SortDirection = "asc" | "desc";

export default function Index({ auth, songs }: IndexProps) {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [selectedSong, setSelectedSong] = useState<Song | null>(null);
	const [showPlayed, setShowPlayed] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState<SortField>("title");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

	const rounds = [...new Set(songs.map((song) => song.round))].sort(
		(a, b) => a - b
	);

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

	const handleSort = (field: SortField) => {
		if (field === sortField) {
			// Toggle direction if clicking on the same field
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			// New field, set to ascending by default
			setSortField(field);
			setSortDirection("asc");
		}
	};

	const getSortIcon = (field: SortField) => {
		if (field !== sortField) return <ArrowUpDown className="h-4 w-4" />;
		return sortDirection === "asc" ? (
			<ArrowUp className="h-4 w-4" />
		) : (
			<ArrowDown className="h-4 w-4" />
		);
	};

	// Filter and sort songs
	const filteredSongs = useMemo(() => {
		return (
			songs
				// Filter by search query
				.filter((song) => {
					const query = searchQuery.toLowerCase();
					return (
						song.title.toLowerCase().includes(query) ||
						song.artist.toLowerCase().includes(query) ||
						song.lyrics_to_find.toLowerCase().includes(query)
					);
				})
				// Filter played songs if showPlayed is false
				.filter((song) => showPlayed || !song.has_been_played)
				// Sort by chosen field
				.sort((a, b) => {
					let comparison = 0;

					if (sortField === "title") {
						comparison = a.title.localeCompare(b.title);
					} else if (sortField === "points") {
						comparison = a.points - b.points;
					} else if (sortField === "lyrics_length") {
						// Count words in lyrics
						const aWords = a.lyrics_to_find.split(" ").length;
						const bWords = b.lyrics_to_find.split(" ").length;
						comparison = aWords - bWords;
					}

					return sortDirection === "asc" ? comparison : -comparison;
				})
		);
	}, [songs, searchQuery, showPlayed, sortField, sortDirection]);

	// Group songs by round after filtering and sorting
	const songsByRound = useMemo(() => {
		const grouped: Record<number, Song[]> = {};

		rounds.forEach((round) => {
			grouped[round] = filteredSongs.filter(
				(song) => song.round === round
			);
		});

		return grouped;
	}, [filteredSongs, rounds]);

	const sortFieldsTranslation = {
		title: "Titre",
		points: "Points",
		lyrics_length: "Nombre de mots",
	};

	return (
		<AuthenticatedLayout>
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold">
							Liste des chansons
						</h1>
						<Dialog
							open={isCreateDialogOpen}
							onOpenChange={setIsCreateDialogOpen}
						>
							<DialogTrigger asChild>
								<Button>
									<Plus className="mr-2 h-4 w-4" />
									Nouvelle chanson
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Nouvelle chanson</DialogTitle>
									<DialogDescription>
										Ajoutez une nouvelle chanson à la liste.
									</DialogDescription>
								</DialogHeader>
								<SongForm
									onSuccess={() =>
										setIsCreateDialogOpen(false)
									}
								/>
							</DialogContent>
						</Dialog>
					</div>

					{/* Search and filter controls */}
					<div className="mb-6 space-y-4">
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-1">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Search className="h-4 w-4 text-gray-400" />
								</div>
								<Input
									type="search"
									placeholder="Rechercher par titre, artiste ou paroles..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="pl-10"
								/>
							</div>

							<div className="flex items-center space-x-2">
								<Switch
									id="show-played"
									checked={showPlayed}
									onCheckedChange={setShowPlayed}
								/>
								<Label htmlFor="show-played">
									Afficher les chansons déjà jouées
								</Label>
							</div>
						</div>

						<div className="flex gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="gap-1">
										Trier par ({sortFieldsTranslation[sortField]}) {getSortIcon(sortField)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem
										onClick={() => handleSort("title")}
										className="gap-2"
									>
										Titre {getSortIcon("title")}
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleSort("points")}
										className="gap-2"
									>
										Points {getSortIcon("points")}
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleSort("lyrics_length")
										}
										className="gap-2"
									>
										Nombre de mots{" "}
										{getSortIcon("lyrics_length")}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					<Tabs
						defaultValue={rounds[0]?.toString()}
						className="w-full"
					>
						<TabsList className="w-full bg-gray-100 p-1 rounded-lg">
							{rounds.map((round) => (
								<TabsTrigger
									key={round}
									value={round.toString()}
									className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
									disabled={songsByRound[round]?.length === 0}
								>
									Manche {round}{" "}
									{songsByRound[round]?.length > 0 &&
										`(${songsByRound[round].length})`}
								</TabsTrigger>
							))}
						</TabsList>
						{rounds.map((round) => (
							<TabsContent
								key={round}
								value={round.toString()}
								className="mt-6"
							>
								{songsByRound[round]?.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										{songsByRound[round].map((song) => (
											<Card
												key={song.id}
												className={cn(
													song.has_been_played &&
														"opacity-75 bg-gray-50 border-gray-200"
												)}
											>
												<CardHeader>
													<CardTitle
														className={cn(
															song.has_been_played &&
																"text-gray-500"
														)}
													>
														{song.title}
													</CardTitle>
													<CardDescription>
														{song.artist}
													</CardDescription>
												</CardHeader>
												<CardContent>
													<p className="text-lg text-gray-500">
														Points:{" "}
														<b>{song.points}</b>
													</p>
													<p className="text-lg text-gray-500">
														Mots:{" "}
														<b>
															{countWords(song.lyrics_to_find)}
														</b>
													</p>
													{song.video_file == ' ' && <p className="text-gray-500 italic">Pas de vidéo</p>}
												</CardContent>
												<CardFooter className="flex justify-between">
													<div className="flex space-x-2">
														<Link
															href={route(
																"songs.show",
																song.id
															)}
														>
															<Button
																variant="outline"
																size="icon"
																className={
																	"hover:bg-green-50"
																}
															>
																<Play className="h-4 w-4 text-green-500" />
															</Button>
														</Link>
														<Button
															variant="outline"
															size="icon"
															onClick={() => {
																setSelectedSong(
																	song
																);
																setIsEditDialogOpen(
																	true
																);
															}}
															className={
																"hover:bg-blue-50"
															}
														>
															<Pencil className="h-4 w-4 text-blue-500" />
														</Button>
														<Button
															variant="outline"
															size="icon"
															onClick={() => {
																if (
																	confirm(
																		"Êtes-vous sûr de vouloir supprimer cette chanson ?"
																	)
																) {
																	router.delete(
																		route(
																			"songs.destroy",
																			song.id
																		),
																		{
																			onSuccess:
																				() => {
																					toast.success(
																						"Chanson supprimée avec succès"
																					);
																				},
																		}
																	);
																}
															}}
															className={
																"hover:bg-red-50"
															}
														>
															<Trash2 className="h-4 w-4 text-red-500" />
														</Button>
													</div>
													<TooltipProvider delayDuration={100}>
														<Tooltip>
															<TooltipTrigger
																asChild
															>
																<Button
																	variant="ghost"
																	size="icon"
																	onClick={() =>
																		handleTogglePlayed(
																			song
																		)
																	}
																	className={
																		song.has_been_played
																			? "text-green-500"
																			: "text-gray-400"
																	}
																>
																	{song.has_been_played ? (
																		<CheckCircle2 className="h-5 w-5" />
																	) : (
																		<Circle className="h-5 w-5" />
																	)}
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																{song.has_been_played
																	? "Marquer la chanson comme non jouée"
																	: "Marquer la chanson comme jouée"}
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</CardFooter>
											</Card>
										))}
									</div>
								) : (
									<div className="text-center py-8 text-gray-500">
										Aucune chanson trouvée pour ce round
										avec les filtres actuels.
									</div>
								)}
							</TabsContent>
						))}
					</Tabs>
				</div>
			</div>

			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Modifier la chanson</DialogTitle>
						<DialogDescription>
							Modifiez les informations de la chanson.
						</DialogDescription>
					</DialogHeader>
					{selectedSong && (
						<SongForm
							song={selectedSong}
							isEditing={true}
							onSuccess={() => setIsEditDialogOpen(false)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</AuthenticatedLayout>
	);
}

import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export default function Lyrics(props: { lyrics: string; className?: string }) {
	const [revealed, setRevealed] = useState<boolean>(false);
	const [halfRevealed, setHalfRevealed] = useState<boolean>(false);
	const [contentBlurred, setContentBlurred] = useState<boolean>(true);

	// Fonction pour diviser correctement les mots, en séparant juste les apostrophes
	const countWords = (text: string): number => {
		// Prétraitement pour normaliser les espaces
		const cleanText = text.trim().replace(/\s+/g, ' ');
		
		// Compter les espaces pour obtenir le nombre de mots de base
		const baseCount = cleanText.split(' ').length;
		
		// Compter les apostrophes qui séparent des mots (l', d', j', etc.)
		const apostrophes = (cleanText.match(/\w'\w/g) || []).length;
		
		// Le nombre total est la somme
		return baseCount + apostrophes;
	};

	// Trouver les indices de chaque mot, en comptant correctement les apostrophes
	const getWordIndices = (text: string): number[] => {
		const words: number[] = [];
		let wordIndex = 0;
		
		// Diviser d'abord par les espaces
		const spaceSplit = text.trim().replace(/\s+/g, ' ').split(' ');
		
		spaceSplit.forEach(chunk => {
			// Vérifier s'il y a une apostrophe dans le mot
			const apostropheMatch = chunk.match(/(\w)'(\w)/);
			
			if (apostropheMatch) {
				// Si apostrophe trouvée, compter comme deux mots
				words.push(wordIndex);
				wordIndex++;
				words.push(wordIndex);
				wordIndex++;
			} else {
				// Sinon, compter comme un seul mot
				words.push(wordIndex);
				wordIndex++;
			}
		});
		
		return words;
	};

	// Fonction pour générer les tirets ou les mots
	const generateLyrics = (text: string, blur?: boolean): JSX.Element => {
		// Diviser le texte en lignes
		const lines = text.split("\n");
		
		// Compteur global pour suivre l'alternance des mots
		let globalWordIndex = 0;
		
		return (
			<div
				className={cn(
					"space-y-6 transition-all duration-300",
					contentBlurred && "blur-[5px] select-none"
				)}
			>
				{lines.map((line, lineIndex) => {
					// Diviser chaque ligne en mots
					const words = line
						.split(/\s+/)
						.filter((word) => word.length > 0);
					
					return (
						<div
							key={lineIndex}
							className={"flex flex-wrap justify-center"}
						>
							{words.map((word, wordIndex) => {
								// Vérifier s'il y a une apostrophe dans le mot
								const apostropheMatch = word.match(/(\w)'(\w)/);
								
								if (apostropheMatch && apostropheMatch.index !== undefined) {
									// Si apostrophe trouvée, diviser en deux segments
									const before = word.substring(0, apostropheMatch.index + 1) + "'";
									const after = word.substring(apostropheMatch.index + 2);
									
									// Déterminer l'alternance pour chaque partie avec le compteur global
									const showBeforeInHalfMode = halfRevealed && globalWordIndex % 2 === 0;
									globalWordIndex++; // Incrémenter après utilisation
									
									const showAfterInHalfMode = halfRevealed && globalWordIndex % 2 === 0;
									globalWordIndex++; // Incrémenter après utilisation
									
									return (
										<React.Fragment key={`${lineIndex}-${wordIndex}`}>
											<div className={"inline-block mr-0"}>
												{revealed || showBeforeInHalfMode ? (
													<span className={cn(
														"text-3xl font-semibold",
														halfRevealed && "italic"
													)}>
														{before}
													</span>
												) : (
													<div className={cn(
														"h-[3px] w-10 bg-gray-500 dark:bg-gray-400 rounded-full mt-6",
														blur && "bg-gray-100"
													)}></div>
												)}
											</div>
											<div className={"inline-block mr-2"}>
												{revealed || showAfterInHalfMode ? (
													<span className={cn(
														"text-3xl font-semibold",
														halfRevealed && "italic"
													)}>
														{after}
													</span>
												) : (
													<div className={cn(
														"h-[3px] w-10 bg-gray-500 dark:bg-gray-400 rounded-full mt-6",
														blur && "bg-gray-100"
													)}></div>
												)}
											</div>
										</React.Fragment>
									);
								}
								
								// Pour les mots sans apostrophe, utiliser le compteur global
								const showInHalfMode = halfRevealed && globalWordIndex % 2 === 0;
								globalWordIndex++; // Incrémenter après utilisation

								return (
									<div
										key={`${lineIndex}-${wordIndex}`}
										className={"inline-block mr-2"}
									>
										{revealed || showInHalfMode ? (
											<span
												className={cn(
													"text-3xl font-semibold",
													halfRevealed && "italic"
												)}
											>
												{word}
											</span>
										) : (
											<div
												className={cn(
													"h-[3px] w-16 bg-gray-500 dark:bg-gray-400 rounded-full mt-6",
													blur && "bg-gray-100"
												)}
											></div>
										)}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	};

	const toggleReveal = () => {
		setRevealed(!revealed);
		// Si on révèle tout, désactiver le mode "moit-moit"
		if (!revealed) {
			if (contentBlurred) {
				toggleBlur();
			}
			setHalfRevealed(false);
		}
	};

	const toggleHalfReveal = () => {
		// Ne permettre le mode "moit-moit" que si les paroles ne sont pas déjà révélées
		if (!revealed) {
			if (contentBlurred) {
				toggleBlur();
			}
			setHalfRevealed(!halfRevealed);
		}
	};

	const toggleBlur = () => {
		setContentBlurred(!contentBlurred);
	};

	// Calculer le nombre de mots avec notre nouvelle fonction
	const wordCount = countWords(props.lyrics);

	return (
		<Card className={`p-4 ${props.className || ""}`}>
			<div className={"mb-4"}>
				<div className="flex justify-between items-center mb-2">
					<h3 className={"text-xl font-bold flex items-center"}>
						Paroles à deviner
						<span
							className={cn(
								"ml-2 text-gray-400 transition-all duration-300",
								contentBlurred && "opacity-0"
							)}
						>
							({wordCount} mots)
						</span>
					</h3>

					<Button
						size="sm"
						variant="ghost"
						onClick={toggleBlur}
						className={
							"transition-all duration-200 hover:bg-gray-100"
						}
						title={
							contentBlurred
								? "Afficher le contenu"
								: "Masquer le contenu"
						}
					>
						{contentBlurred ? (
							<>
								<Eye className="h-4 w-4 mr-1" />
								Voir
							</>
						) : (
							<>
								<EyeOff className="h-4 w-4 mr-1" />
								Masquer
							</>
						)}
					</Button>
				</div>

				<div
					className={cn(
						"min-h-[60px] p-3 bg-gray-50 dark:bg-gray-800 rounded-md relative",
						contentBlurred && "cursor-pointer"
					)}
					onClick={() => contentBlurred && setContentBlurred(false)}
				>
					{generateLyrics(props.lyrics, contentBlurred)}

					{/* Overlay pour faciliter le clic quand flouté */}
					{contentBlurred && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-gray-400 flex flex-col items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg font-bold border border-gray-300 hover:bg-gray-100 transition-all ease-in-out">
								<Eye className="h-6 w-6 mb-1" />
								<span>Cliquer pour révéler</span>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className={"flex justify-end space-x-2"}>
				<Button
					onClick={toggleHalfReveal}
					variant="default"
					disabled={revealed}
					title={
						revealed
							? "Déjà tout révélé"
							: "Afficher un mot sur deux"
					}
					className={
						halfRevealed
							? "bg-orange-600 hover:bg-orange-700 text-white"
							: "bg-purple-600 hover:bg-purple-700 text-white"
					}
				>
					{/* Icône de baguette magique */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={"mr-2"}
					>
						<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
						<path d="m14 7 3 3"></path>
						<path d="M5 6v4"></path>
						<path d="M19 14v4"></path>
						<path d="M10 2v2"></path>
						<path d="M7 8H3"></path>
						<path d="M21 16h-4"></path>
						<path d="M22 22v-4"></path>
						<path d="M2 2v4"></path>
					</svg>
					{halfRevealed ? "Désactiver le joker" : "Soupère moit-moit"}
				</Button>
				<Button
					onClick={toggleReveal}
					variant={revealed ? "outline" : "default"}
				>
					{revealed ? "Masquer les paroles" : "Révéler les paroles"}
				</Button>
			</div>
		</Card>
	);
}

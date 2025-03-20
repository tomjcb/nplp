import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import Player from "@/Pages/Youtube/Player";
import Lyrics from "@/Pages/Youtube/Lyrics";
import { useState } from "react";

export default function Dashboard() {
	const [displayLyrics, setDisplayLyrics] = useState(false);
	return (
		<AuthenticatedLayout
			header={
				<></>
			}
		>
			{displayLyrics && <Lyrics lyrics={"Never gonna give you up\nNever gonna let you down"} />}
			<Player
				videoUrl={'/videos/videoplayback.mp4'}
				stopAt="1:30"
				onVideoEnd={() => console.log("Vidéo terminée")}
				onVideoStop={() => setDisplayLyrics(true)}
				className="w-full h-[200px]"
			/>
		</AuthenticatedLayout>
	);
}

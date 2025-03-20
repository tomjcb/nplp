export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface Song {
	id: number
	title: string
	artist: string
	video_file: string
	round: number
	points: number
	lyrics_to_find: string
	lyrics_time_code: string
	created_at: string
	updated_at: string
	has_been_played: boolean
}

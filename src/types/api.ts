export interface Breed {
	id: number;
	name: string;
	bred_for?: string;
	breed_group?: string;
	life_span?: string;
	temperament?: string;
	weight?: {
		metric?: string;
	};
	height?: {
		metric?: string;
	};
	image?: {
		id: string;
		url?: string;
	};
	reference_image_id?: string;
}

export interface Vote {
	id: number;
	message?: string;
	value?: 1 | -1; // 1 for like, -1 for dislike
}

export interface VoteRequest {
	image_id: string;
	value: 1 | -1;
}

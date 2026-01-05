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

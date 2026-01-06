import type { Breed } from "./types/api";

export const getImageUrl = (breed: Breed): string => {
	return `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
};

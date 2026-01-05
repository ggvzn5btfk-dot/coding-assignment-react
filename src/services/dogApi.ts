import type { Breed } from "../types/api";
import { httpClient } from "./api";

export const dogApi = {
	async getBreeds(): Promise<Breed[]> {
		const response = await httpClient("/breeds");

		return response.json();
	},
};

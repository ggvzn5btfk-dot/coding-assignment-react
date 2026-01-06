import type { Breed, Vote, VoteRequest } from "../types/api";
import { httpClient } from "./api";

export const dogApi = {
	async getBreeds(): Promise<Breed[]> {
		const response = await httpClient("/breeds");

		return response.json();
	},

	async getBreed(breedId: number): Promise<Breed> {
		const response = await httpClient(`/breeds/${breedId}`);

		return response.json();
	},

	async vote(voteData: VoteRequest): Promise<Vote> {
		const response = await httpClient(
			"/votes",
			{
				method: "POST",
				body: JSON.stringify(voteData),
			},
			"https://api.thecatapi.com/v1", // dont know why `https://api.thedogapi.com/v1` gives 401
		);

		return response.json();
	},
};

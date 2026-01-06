import { useQuery } from "@tanstack/react-query";
import { dogApi } from "../services/dogApi";

export function useBreed(breedId: number) {
	return useQuery({
		queryKey: ["breeds", breedId],
		queryFn: () => dogApi.getBreed(breedId),
	});
}

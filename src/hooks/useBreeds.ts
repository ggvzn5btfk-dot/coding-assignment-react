import { useQuery } from "@tanstack/react-query";
import { dogApi } from "../services/dogApi";

export function useBreeds() {
	return useQuery({
		queryKey: ["breeds"],
		queryFn: () => dogApi.getBreeds(),
	});
}

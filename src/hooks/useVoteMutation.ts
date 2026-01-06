import { useMutation } from "@tanstack/react-query";
import { dogApi } from "../services/dogApi";
import type { VoteRequest } from "../types/api";

interface Props {
	onSuccess?: () => void;
	onError?: (error: unknown, currentIndex: number) => void;
}

export function useVoteMutation({ onSuccess, onError }: Props) {
	return useMutation({
		mutationFn: (
			voteData: VoteRequest & {
				currentIndex: number;
			},
		) => {
			const { currentIndex, ...payload } = voteData;
			return dogApi.vote(payload);
		},
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error, { currentIndex }) => {
			onError?.(error, currentIndex);
		},
	});
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ErrorScreen } from "../components/ErrorScreen";
import { LoadingScreen } from "../components/LoadingScreen";
import { SwipeableCards } from "../components/SwipeableCards";
import { CURRENT_BREED_ID_STORAGE_KEY } from "../constants";
import { useBreeds } from "../hooks/useBreeds";
import { useVoteMutation } from "../hooks/useVoteMutation";
import type { Breed, VoteRequest } from "../types/api";
import type { SwipeDirection } from "../types/common";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

const getImageId = (breed?: Breed): string => {
	return breed?.reference_image_id ?? breed?.image?.id ?? "";
};

function RouteComponent() {
	const mountedRef = useRef(false);
	const { data: breeds = [], isLoading, error, isSuccess } = useBreeds();
	const [currentIndex, setCurrentIndex] = useState(0);
	const { mutate } = useVoteMutation({
		onError: (error, currentIndex) => {
			console.error("Vote failed:", error, currentIndex);
			setCurrentIndex(currentIndex); // Revert index on error
		},
	});

	const handleVote = (direction: SwipeDirection) => {
		setCurrentIndex((prev) => prev + 1);

		const imageId = getImageId(breeds[currentIndex]);

		if (!imageId) {
			console.error("No image ID found for the current breed.");
			return;
		}

		const votePayload: VoteRequest = {
			image_id: imageId,
			value: direction === "right" ? 1 : -1,
		};

		mutate({ ...votePayload, currentIndex });
	};

	// sync current index with breeds data on mount or breeds change
	useEffect(() => {
		if (!isSuccess || mountedRef.current) {
			return;
		}

		const storedBreedId = localStorage.getItem(CURRENT_BREED_ID_STORAGE_KEY);
		mountedRef.current = true;

		if (storedBreedId) {
			const index = breeds.findIndex(
				(breed) => String(breed.id) === storedBreedId,
			);
			setCurrentIndex(index !== -1 ? index : 0);
		}
	}, [breeds, isSuccess]);

	// Persist current breed ID to localStorage
	useEffect(() => {
		const id = breeds[currentIndex]?.id;

		if (!id) {
			return;
		}

		localStorage.setItem(
			CURRENT_BREED_ID_STORAGE_KEY,
			String(breeds[currentIndex]?.id ?? ""),
		);
	}, [currentIndex, breeds]);

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <ErrorScreen />;
	}

	if (!breeds || breeds.length === 0) {
		return (
			<div className="flex min-h-screen flex-col justify-center">
				<h3 className="text-center font-bold">No Breeds Available</h3>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col justify-center overflow-hidden">
			<div className="flex items-center justify-center p-4">
				<div className="w-full max-w-sm">
					<SwipeableCards
						currentIndex={currentIndex}
						initialBreeds={breeds}
						onSwipe={handleVote}
					/>
				</div>
			</div>

			<div className="mx-auto flex max-w-sm justify-center gap-6">
				<button
					type="button"
					onClick={() => handleVote("left")}
					className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-red-500 text-2xl text-white shadow-lg"
				>
					✕
				</button>
				<button
					type="button"
					onClick={() => handleVote("right")}
					className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg"
				>
					♥
				</button>
			</div>
		</div>
	);
}

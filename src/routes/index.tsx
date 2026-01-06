import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SwipeableCards } from "../components/SwipeableCards";
import { useBreeds } from "../hooks/useBreeds";
import type { SwipeDirection } from "../types/common";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: breeds, isLoading, error } = useBreeds();
	const [currentIndex, setCurrentIndex] = useState(0); // TODO persist currentIndex

	const handleVote = (_direction: SwipeDirection) => {
		setCurrentIndex((prev) => prev + 1);

		// TODO : Implement vote handling logic
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
					<div className="animate-pulse">
						<div className="mb-4 h-64 rounded-xl bg-gray-200"></div>
						<div className="mb-2 h-8 rounded bg-gray-200"></div>
						<div className="mb-2 h-4 rounded bg-gray-200"></div>
						<div className="h-4 w-3/4 rounded bg-gray-200"></div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen flex-col justify-center">
				<h3 className="mb-2 text-center font-bold text-red-800">
					Something went wrong
				</h3>
				<button
					type="button"
					onClick={() => window.location.reload()}
					className="rounded-lg bg-red-600 px-4 py-2 text-white"
				>
					Try Again
				</button>
			</div>
		);
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

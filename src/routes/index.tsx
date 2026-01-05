import { createFileRoute } from "@tanstack/react-router";
import { BreedCard } from "../components/BreedCard";
import { useBreeds } from "../hooks/useBreeds";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: breeds, isLoading, error } = useBreeds();

	const handleVote = async (_action: "like" | "dislike") => {
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

	const currentBreed = breeds[0]; // FIXME: temporary

	return (
		<div className="flex min-h-screen flex-col">
			<div className="flex items-center justify-center p-4">
				<div className="w-full max-w-sm">
					<BreedCard breed={currentBreed} />
				</div>
			</div>

			<div className="mx-auto flex max-w-sm justify-center gap-6">
				<button
					type="button"
					onClick={() => handleVote("dislike")}
					className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-red-500 text-2xl text-white shadow-lg"
				>
					✕
				</button>
				<button
					type="button"
					onClick={() => handleVote("like")}
					className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg"
				>
					♥
				</button>
			</div>
		</div>
	);
}

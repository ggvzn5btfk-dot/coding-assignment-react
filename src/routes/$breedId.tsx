import { createFileRoute, Link } from "@tanstack/react-router";
import { ErrorScreen } from "../components/ErrorScreen";
import { LoadingScreen } from "../components/LoadingScreen";
import { StatCard } from "../components/StatCard";
import { Tag } from "../components/Tag";
import { IMAGE_PLACEHOLDER_URL } from "../constants";
import { useBreed } from "../hooks/useBreed";
import { getImageUrl } from "../utils";

export const Route = createFileRoute("/$breedId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { breedId } = Route.useParams();
	const { data: breed, isLoading, error } = useBreed(Number(breedId));

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error || !breed) {
		return <ErrorScreen />;
	}

	const imageUrl = getImageUrl(breed);

	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-2xl">
				<div className="flex items-center p-4">
					<Link
						to="/"
						className="flex h-12 w-12 items-center justify-center rounded-full p-2 shadow-md"
					>
						<span className="text-2xl">←</span>
					</Link>
					<h3 className="ml-4 font-bold text-xl">Breed Details</h3>
				</div>

				<div className="p-4">
					<div className="overflow-hidden rounded-2xl shadow-lg">
						<div className="relative h-64 sm:h-80">
							<img
								src={imageUrl}
								alt={breed.name}
								className="h-full w-full object-cover"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src = IMAGE_PLACEHOLDER_URL;
								}}
							/>
						</div>
						<div className="px-6">
							<h2 className="my-2 font-bold text-3xl">{breed.name}</h2>
							{breed.breed_group && <Tag>{breed.breed_group}</Tag>}
						</div>

						<div className="p-6">
							<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
								{breed.weight?.metric && (
									<StatCard title="Weight">{breed.weight.metric} kg</StatCard>
								)}

								{breed.height?.metric && (
									<StatCard title="Height">{breed.height.metric} cm</StatCard>
								)}

								{breed.life_span && (
									<StatCard title="Life Span">{breed.life_span}</StatCard>
								)}

								{breed.bred_for && (
									<StatCard title="Bred For">{breed.bred_for}</StatCard>
								)}
							</div>

							{breed.temperament && (
								<div className="mb-6">
									<h3 className="mb-3 font-bold text-lg">Temperament</h3>
									<div className="flex flex-wrap gap-2">
										{breed.temperament.split(",").map((t) => (
											<Tag key={t}>{t.trim()}</Tag>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

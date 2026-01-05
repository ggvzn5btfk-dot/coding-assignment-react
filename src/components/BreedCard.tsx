import type { Breed } from "../types/api";

interface Props {
	breed: Breed;
	className?: string;
}

const IMAGE_PLACEHOLDER_URL =
	"https://via.placeholder.com/400x300/e2e8f0/64748b?text=Dog+Photo";

const getImageUrl = (breed: Breed): string => {
	return `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
};

export function BreedCard({ breed, className = "" }: Props) {
	const imageUrl = breed.image?.url || getImageUrl(breed);

	return (
		<div className={`block ${className}`}>
			<div className="relative h-140 overflow-hidden rounded-2xl bg-white shadow-lg">
				<div className="relative h-[70%] overflow-hidden">
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

				<div className="flex h-[30%] flex-col justify-between p-6">
					<div>
						<h2 className="mb-2 font-bold text-2xl text-gray-800">
							{breed.name}
						</h2>
						<div className="space-y-1">
							{breed.breed_group && (
								<p className="text-gray-600 text-sm">
									<span className="font-medium">Group:</span>{" "}
									{breed.breed_group}
								</p>
							)}

							{breed.life_span && (
								<p className="text-gray-600 text-sm">
									<span className="font-medium">Lifespan:</span>{" "}
									{breed.life_span}
								</p>
							)}
						</div>
					</div>

					{breed.temperament && (
						<div className="mt-3">
							<div className="flex flex-wrap gap-1">
								{breed.temperament
									.split(",")
									.slice(0, 3)
									.map((t) => (
										<span
											key={t}
											className="rounded-full bg-blue-100 px-2 py-1 text-xs"
										>
											{t.trim()}
										</span>
									))}

								{breed.temperament.split(",").length > 3 && (
									<span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
										+{breed.temperament.split(",").length - 3} more
									</span>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

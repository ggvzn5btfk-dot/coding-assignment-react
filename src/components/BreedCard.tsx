import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@tanstack/react-router";
import { IMAGE_PLACEHOLDER_URL } from "../constants";
import type { Breed } from "../types/api";
import { getImageUrl } from "../utils";
import { Tag } from "./Tag";

interface Props {
	breed: Breed;
	className?: string;
	isTop?: boolean;
	isNext?: boolean;
}

export function BreedCard({
	breed,
	className = "",
	isTop = false,
	isNext = false,
}: Props) {
	const imageUrl = getImageUrl(breed) || breed.image?.url;
	const preload = isTop || isNext;
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: breed.id,
			disabled: !isTop,
		});

	return (
		<div
			ref={setNodeRef}
			className={`absolute top-0 left-0 w-full touch-none ${isDragging ? "cursor-grab" : "cursor-pointer"}`}
			style={{
				transform: CSS.Transform.toString(transform),
			}}
			{...(isTop ? listeners : {})}
			{...(isTop ? attributes : {})}
		>
			<Link
				className={`${isDragging ? "pointer-events-none" : ""}`}
				to="/$breedId"
				params={{ breedId: String(breed.id) }}
			>
				<div className={`block ${className}`}>
					<div
						className={`relative h-140 overflow-hidden rounded-2xl bg-white ${preload ? "shadow-lg" : ""}`}
					>
						<div className="relative h-[70%] overflow-hidden">
							{preload && (
								<img
									src={imageUrl}
									alt={breed.name}
									className="h-full w-full object-cover"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src = IMAGE_PLACEHOLDER_URL;
									}}
								/>
							)}
						</div>

						<div className="flex h-[30%] flex-col justify-between p-6">
							<div>
								<h2
									title={breed.name}
									className="mb-2 truncate font-bold text-2xl text-gray-800"
								>
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
												<Tag key={t}>{t.trim()}</Tag>
											))}

										{breed.temperament.split(",").length > 3 && (
											<Tag>+{breed.temperament.split(",").length - 3} more</Tag>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

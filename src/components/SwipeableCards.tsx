import {
	DndContext,
	type DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useMemo } from "react";
import type { Breed } from "../types/api";
import type { SwipeDirection } from "../types/common";
import { BreedCard } from "./BreedCard";

interface Props {
	initialBreeds: Breed[];
	currentIndex: number;
	onSwipe?: (direction: SwipeDirection) => void;
}

const SWIPE_THRESHOLD = 200;
const VISIBLE_CARDS_COUNT = 5;

export function SwipeableCards({
	initialBreeds,
	currentIndex,
	onSwipe,
}: Props) {
	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: {
			distance: 8,
		},
	});
	const sensors = useSensors(pointerSensor);
	const breeds = useMemo(
		() => initialBreeds.slice(currentIndex, currentIndex + VISIBLE_CARDS_COUNT),
		[initialBreeds, currentIndex],
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { delta } = event;

		if (Math.abs(delta.x) > SWIPE_THRESHOLD) {
			if (delta.x > 0) {
				onSwipe?.("right");
			} else {
				onSwipe?.("left");
			}
		}
	};

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
			<div>
				{breeds.length === 0 ? (
					<h3 className="font-bold">No more cards!</h3>
				) : (
					<div className="relative h-140">
						{[...breeds].reverse().map((breed, index) => {
							const isTop = index === breeds.length - 1;
							const isNext = index === breeds.length - 2;

							return (
								<BreedCard
									key={breed.id}
									breed={breed}
									isTop={isTop}
									isNext={isNext}
								/>
							);
						})}
					</div>
				)}
			</div>
		</DndContext>
	);
}

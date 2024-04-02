import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	KeyboardSensor,
	MouseSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Expand } from "@mui/icons-material";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export function SortableProvider({
	children,
	items,
	setItems,
}: {
	children: ReactNode;
	items: string[];
	setItems: Dispatch<SetStateAction<string[]>>;
}) {
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setItems((item) => {
				const oldIndex = item.indexOf(active.id as string);
				const newIndex = item.indexOf(over.id as string);

				return arrayMove(item, oldIndex, newIndex);
			});
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToVerticalAxis]}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
			<DragOverlay>
				<Expand />
			</DragOverlay>
		</DndContext>
	);
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

export function SortableTr({
	children,
	id,
}: { children: ReactNode; id: string }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}{" "}
		</tr>
	);
}

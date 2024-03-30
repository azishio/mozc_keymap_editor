import type { Shortcut, Shortcuts } from "@/classes/Shortcuts.ts";
import { CommandSelector } from "@/components/CommandSelector";
import { KeySelector } from "@/components/KeySelector";
import { ModeSelector } from "@/components/ModeSelector";
import { RemoveCircle, Report } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import React, { type Dispatch, type SetStateAction, useCallback } from "react";

export function Row({
	order,
	id,
	confliction,
	shortcut,
	setShortcuts,
}: {
	order: number;
	id: string;
	confliction: number[] | null;
	shortcut: Shortcut;
	setShortcuts: Dispatch<SetStateAction<Shortcuts>>;
}) {
	const { modes, key, command } = shortcut;

	const setState = useCallback(
		({ modes, key, command }: Partial<Shortcut>) => {
			setShortcuts((prev) => {
				prev.conflictionCheckList.add(id);

				if (modes) shortcut.modes = modes;
				if (key) shortcut.key = key;
				if (command) shortcut.command = command;

				prev.checkConfliction();
				return prev.copy();
			});
		},
		[shortcut, setShortcuts, id],
	);

	return (
		<tr>
			<td>
				<Stack position={"relative"} alignItems={"center"}>
					{confliction && (
						<Tooltip
							title={`${confliction
								.map((i) => `#${i}`)
								.join(", ")} と競合/重複しています`}
							placement={"right"}
							color={"danger"}
							variant={"plain"}
							sx={{ position: "absolute", top: -30 }}
						>
							<Report color={"danger"} />
						</Tooltip>
					)}
					<Typography level={"title-lg"}>{order}</Typography>
				</Stack>
			</td>
			<td>
				<ModeSelector modes={modes} setState={setState} />
			</td>
			<td>
				<KeySelector pressKey={key} setState={setState} />
			</td>
			<td>
				<CommandSelector command={command} setState={setState} />
			</td>
			<td>
				<IconButton>
					<RemoveCircle />
				</IconButton>
			</td>
		</tr>
	);
}

import type { Keymap, Keymaps } from "@/classes/Keymaps.ts";
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
	keymap,
	setKeymaps,
	deleteKeymap,
}: {
	order: number;
	id: string;
	confliction: number[] | null;
	keymap: Keymap;
	setKeymaps: Dispatch<SetStateAction<Keymaps>>;
	deleteKeymap: (id: string) => void;
}) {
	const { modes, key, command } = keymap;

	const setState = useCallback(
		({ modes, key, command }: Partial<Keymap>) => {
			setKeymaps((prev) => {
				prev.conflictCheckList.add(id);

				if (modes) keymap.modes = modes;
				if (key) keymap.key = key;
				if (command) keymap.command = command;

				return prev.update();
			});
		},
		[keymap, setKeymaps, id],
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
				<IconButton onClick={() => deleteKeymap(id)}>
					<RemoveCircle />
				</IconButton>
			</td>
		</tr>
	);
}

import { Command } from "@/classes/command.ts";
import { MozcModes } from "@/classes/mozcModes.ts";
import { PressKey } from "@/classes/pressKey.ts";
import { CommandSelector } from "@/components/CommandSelector";
import { KeySelector } from "@/components/KeySelector";
import { ModeSelector } from "@/components/ModeSelector";
import { RemoveCircle, Report } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import { memo, useState } from "react";

export const Row = memo(function Row({
	order,
	confliction,
}: {
	order: number;
	confliction: number[] | null;
}) {
	const [modes, setModes] = useState(new MozcModes());
	const [pressKey, setPressKey] = useState(new PressKey());
	const [command, setCommand] = useState(new Command());

	return (
		<tr>
			<td>
				<Stack position={"relative"} alignItems={"center"}>
					{confliction && (
						<Tooltip
							title={`${confliction.map((i) => `#${i} `)}と競合/重複しています`}
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
				<ModeSelector modes={modes} setModes={setModes} />
			</td>
			<td>
				<KeySelector pressKey={pressKey} setPressKey={setPressKey} />
			</td>
			<td>
				<CommandSelector command={command} setCommand={setCommand} />
			</td>
			<td>
				<IconButton>
					<RemoveCircle />
				</IconButton>
			</td>
		</tr>
	);
});

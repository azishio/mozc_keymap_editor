import type { RowState } from "@/classes/rowState";
import { CommandSelector } from "@/components/CommandSelector";
import { KeySelector } from "@/components/KeySelector";
import { ModeSelector } from "@/components/ModeSelector";
import { RemoveCircle } from "@mui/icons-material";
import { IconButton } from "@mui/joy";

export function Row({
	setState,
	rowState: { modes, pressKey, command },
}: {
	setState: (state: Partial<RowState>) => void;
	rowState: RowState;
}) {
	return (
		<tr>
			<td>
				<ModeSelector modes={modes} setState={setState} />
			</td>
			<td>
				<KeySelector pressKey={pressKey} setState={setState} />
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

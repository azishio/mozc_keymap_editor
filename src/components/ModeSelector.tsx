import type { Keymap } from "@/classes/Keymaps.ts";
import { MozcModes } from "@/classes/mozcModes.ts";
import { Checkbox, Sheet, Stack, Typography } from "@mui/joy";
import { memo } from "react";

export const ModeSelector = memo(
	function ModeSelector({
		modes,
		setState,
	}: {
		modes: MozcModes;
		setState: ({ modes, key, command }: Partial<Keymap>) => void;
	}) {
		return (
			<Stack direction={"row"} flexWrap={"wrap"} spacing={1} useFlexGap>
				{MozcModes.list.map(({ camel, lCamel, ja }) => (
					<Sheet
						sx={{ paddingY: "3px", paddingX: "9px", borderRadius: 4 }}
						key={lCamel}
					>
						<Checkbox
							label={
								<Stack>
									<Typography level={"title-md"}>{ja}</Typography>
									<Typography level={"body-sm"}>{camel}</Typography>
								</Stack>
							}
							disableIcon
							overlay
							checked={modes[lCamel]}
							variant={modes[lCamel] ? "soft" : "outlined"}
							onChange={(e) => {
								if (e.target.checked) {
									setState({ modes: modes.enable(lCamel) });
								} else {
									setState({ modes: modes.disable(lCamel) });
								}
							}}
							slotProps={{
								action: ({ checked }) => ({
									sx: checked
										? {
												border: "1px solid",
												borderColor: "primary.500",
											}
										: {},
								}),
							}}
						/>
					</Sheet>
				))}
			</Stack>
		);
	},
	(oldProps, newProps) => oldProps.modes === newProps.modes,
);

import { type MozcMode, mozcModes } from "@/mozc_options";
import { Checkbox, Sheet, Stack } from "@mui/joy";
import type { Dispatch, SetStateAction } from "react";

export function ModeSelector({
	modes,
	setModes,
}: {
	modes: MozcMode["en"][];
	setModes: Dispatch<SetStateAction<MozcMode["en"][]>>;
}) {
	return (
		<Stack direction={"row"} flexWrap={"wrap"} spacing={1} useFlexGap>
			{mozcModes.map(({ en, ja }) => (
				<Sheet
					sx={{ paddingY: "3px", paddingX: "9px", borderRadius: 4 }}
					key={en}
				>
					<Checkbox
						label={ja}
						disableIcon
						overlay
						checked={modes.includes(en)}
						variant={modes.includes(en) ? "soft" : "outlined"}
						onChange={(e) => {
							if (e.target.checked) {
								setModes((prevModes) => [...prevModes, en]);
							} else {
								setModes((prevModes) => prevModes.filter((m) => m !== en));
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
}

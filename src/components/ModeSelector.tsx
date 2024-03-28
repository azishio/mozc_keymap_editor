import type { RowState } from "@/classes/rowState";
import { type MozcMode, mozcModes } from "@/mozc_options";
import { Checkbox, Sheet, Stack } from "@mui/joy";

export function ModeSelector({
	modes,
	setState,
}: {
	modes: MozcMode["en"][];
	setState: (state: Partial<RowState>) => void;
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
								setState({ modes: [...modes, en] });
							} else {
								setState({ modes: modes.filter((m) => m !== en) });
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

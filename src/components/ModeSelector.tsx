"use client";

import { type Mode, modes } from "@/mozc_options";
import { Checkbox, Sheet, Stack } from "@mui/joy";
import { useState } from "react";

export function ModeSelector() {
	const [select, setSelect] = useState<Mode["en"][]>([]);
	return (
		<Stack direction={"row"} flexWrap={"wrap"} spacing={1} useFlexGap>
			{modes.map(({ en, ja }) => (
				<Sheet sx={{ paddingY: "3px", paddingX: "9px" }} key={en}>
					<Checkbox
						label={ja}
						disableIcon
						overlay
						checked={select.includes(en)}
						variant={select.includes(en) ? "soft" : "outlined"}
						onChange={(e) => {
							if (e.target.checked) {
								setSelect((mode) => [...mode, en]);
							} else {
								setSelect((mode) => mode.filter((m) => m !== en));
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

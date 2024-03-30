import type { Shortcut } from "@/classes/Shortcuts.ts";
import { PressKey } from "@/classes/pressKey";
import { Chip, Input, Snackbar, Stack } from "@mui/joy";
import { memo, useState } from "react";

export const KeySelector = memo(
	function KeySelector({
		pressKey,
		setState,
	}: {
		pressKey: PressKey;

		setState: ({ modes, key, command }: Partial<Shortcut>) => void;
	}) {
		const [IMEEnable, setIMEEnable] = useState(false);

		return (
			<>
				<Input
					sx={{ "caret-color": "transparent" }}
					startDecorator={
						<Stack direction={"row"} spacing={0.5}>
							{pressKey.metaKey && <Chip color={"primary"}>Meta</Chip>}
							{pressKey.ctrlKey && <Chip color={"primary"}>Ctrl</Chip>}
							{pressKey.altKey && <Chip color={"primary"}>Alt</Chip>}
							{pressKey.shiftKey && <Chip color={"primary"}>Shift</Chip>}
							{pressKey.key && <Chip variant={"outlined"}>{pressKey.key}</Chip>}
						</Stack>
					}
					value={""}
					onKeyDown={(e) => {
						e.preventDefault();
						const { metaKey, ctrlKey, altKey, shiftKey, key } = e;

						// IMEが有効であれば警告する
						if (key === "Process") {
							setState({ key: new PressKey() });
							setIMEEnable(true);
							return;
						}

						setIMEEnable(false);

						setState({
							key: new PressKey({
								metaKey,
								ctrlKey,
								altKey,
								shiftKey,
								key: PressKey.isCombinationKey(key) ? null : key,
							}),
						});
					}}
					error={IMEEnable}
				/>
				<Snackbar
					open={IMEEnable}
					onClose={() => setIMEEnable(false)}
					color={"danger"}
					variant={"soft"}
				>
					IMEが有効になっています。
				</Snackbar>
			</>
		);
	},
	(oldProps, newProps) => oldProps.pressKey === newProps.pressKey,
);

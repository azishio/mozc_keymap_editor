import type { Keymap } from "@/classes/Keymaps.ts";
import { PressKey } from "@/classes/pressKey";
import { Add } from "@mui/icons-material";
import {
	Chip,
	Input,
	Snackbar,
	Stack,
	Switch,
	Tooltip,
	inputClasses,
} from "@mui/joy";
import { memo, useState } from "react";

export const KeySelector = memo(
	function KeySelector({
		pressKey,
		setState,
	}: {
		pressKey: PressKey;

		setState: ({ modes, key, command }: Partial<Keymap>) => void;
	}) {
		const [IMEEnable, setIMEEnable] = useState(false);
		const [holdConbinationKey, setHoldCombinationKey] = useState(false);

		return (
			<>
				<Stack direction={"row"} spacing={1}>
					<Tooltip title={"コンビネーションキーを保持"}>
						<Switch
							checked={holdConbinationKey}
							onChange={(e) => setHoldCombinationKey(e.target.checked)}
							slotProps={{
								thumb: { children: <Add /> },
							}}
							sx={{ "& .MuiSvgIcon-root": { fontSize: 15 } }}
						/>
					</Tooltip>
					<Input
						sx={{
							caretColor: "transparent",
							[`& .${inputClasses.input}`]: { width: 0 },
						}}
						value={""}
						startDecorator={
							<Stack direction={"row"} spacing={0.5}>
								{pressKey.metaKey && <Chip color={"primary"}>Meta</Chip>}
								{pressKey.ctrlKey && <Chip color={"primary"}>Ctrl</Chip>}
								{pressKey.altKey && <Chip color={"primary"}>Alt</Chip>}
								{pressKey.shiftKey && <Chip color={"primary"}>Shift</Chip>}
								{pressKey.key && (
									<Chip variant={"outlined"}>{pressKey.key}</Chip>
								)}
							</Stack>
						}
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

							if (holdConbinationKey) {
								const {
									metaKey: prevMeta,
									ctrlKey: prevCtrl,
									altKey: prevAlt,
									shiftKey: prevShift,
								} = pressKey;
								setState({
									key: new PressKey({
										metaKey: metaKey || prevMeta,
										ctrlKey: ctrlKey || prevCtrl,
										altKey: altKey || prevAlt,
										shiftKey: shiftKey || prevShift,
										key: PressKey.isCombinationKey(key) ? null : key,
									}),
								});
								if (!PressKey.isCombinationKey(key))
									setHoldCombinationKey(false);
							} else {
								setState({
									key: new PressKey({
										metaKey,
										ctrlKey,
										altKey,
										shiftKey,
										key: PressKey.isCombinationKey(key) ? null : key,
									}),
								});
							}
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
				</Stack>
			</>
		);
	},
	(oldProps, newProps) => oldProps.pressKey === newProps.pressKey,
);

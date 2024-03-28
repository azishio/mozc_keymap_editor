import { type PressKey, pressNothing } from "@/components/Row";
import { Chip, Input, Snackbar, Stack } from "@mui/joy";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Key } from "ts-key-enum";

const combinationKeys = [Key.Meta, Key.Fn, Key.Control, Key.Shift, Key.Alt];

export function KeySelector({
	pressKey,
	setPressKey,
}: { pressKey: PressKey; setPressKey: Dispatch<SetStateAction<PressKey>> }) {
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
						setPressKey(pressNothing);
						setIMEEnable(true);
						return;
					}

					setIMEEnable(false);

					setPressKey({
						metaKey,
						ctrlKey,
						altKey,
						shiftKey,
						key: combinationKeys.every((cbkey) => key !== cbkey)
							? key.toUpperCase()
							: null,
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
}

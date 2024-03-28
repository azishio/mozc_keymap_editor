"use client";

import { CommandSelector } from "@/components/CommandSelector";
import { KeySelector } from "@/components/KeySelector";
import { ModeSelector } from "@/components/ModeSelector";
import type { MozcEnCommand, MozcMode } from "@/mozc_options";
import { useState } from "react";

export const pressNothing = {
	metaKey: false,
	ctrlKey: false,
	altKey: false,
	shiftKey: false,
	key: null as string | null,
};

export type PressKey = typeof pressNothing;

export function Row() {
	const [command, setCommand] = useState<null | MozcEnCommand>(null);
	const [pressKey, setPressKey] = useState<PressKey>(pressNothing);
	const [modes, setModes] = useState<MozcMode["en"][]>([]);

	return (
		<tr>
			<td>
				<ModeSelector modes={modes} setModes={setModes} />
			</td>
			<td>
				<KeySelector pressKey={pressKey} setPressKey={setPressKey} />
			</td>
			<td>
				<CommandSelector command={command} setCommand={setCommand} />
			</td>
		</tr>
	);
}

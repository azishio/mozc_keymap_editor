import { PressKey } from "@/classes/pressKey";
import type { MozcEnCommand, MozcMode } from "@/mozc_options";

export class RowState {
	public command: null | MozcEnCommand = null;
	public pressKey = new PressKey();
	public modes: MozcMode["en"][] = [];
	constructor(
		state?: Partial<{
			command: null | MozcEnCommand;
			pressKey: PressKey;
			modes: MozcMode["en"][];
		}>,
	) {
		if (state) Object.assign(this, state);
	}
}

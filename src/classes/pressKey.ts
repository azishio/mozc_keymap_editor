export class PressKey {
	static webKeyToMozcKey = new Map<string, string>([
		["a", "A"],
		["b", "B"],
		["c", "C"],
		["d", "D"],
		["e", "E"],
		["f", "F"],
		["g", "G"],
		["h", "H"],
		["i", "I"],
		["j", "J"],
		["k", "K"],
		["l", "L"],
		["m", "M"],
		["n", "N"],
		["o", "O"],
		["p", "P"],
		["q", "Q"],
		["r", "R"],
		["s", "S"],
		["t", "T"],
		["u", "U"],
		["v", "V"],
		["w", "W"],
		["x", "X"],
		["y", "Y"],
		["z", "Z"],
		["Control", "Ctrl"],
		["ArrowUp", "Up"],
		["ArrowDown", "Down"],
		["ArrowLeft", "Left"],
		["ArrowRight", "Right"],
		[" ", "Space"],
	]);
	public key: string | null = null;
	public metaKey = false;
	public ctrlKey = false;
	public altKey = false;
	public shiftKey = false;

	constructor(
		pressKey?: Partial<{
			key: string | null;
			metaKey: boolean;
			ctrlKey: boolean;
			altKey: boolean;
			shiftKey: boolean;
		}>,
	) {
		if (pressKey) {
			const { key, ...combinationKey } = pressKey;
			Object.assign(this, combinationKey);
			if (key) this.key = PressKey.keyNameConverter(key);
		}
	}

	static isCombinationKey(key: string) {
		return (["Meta", "Key", "Ctrl", "Shift", "Alt"] as string[]).includes(
			PressKey.keyNameConverter(key),
		);
	}

	static fromText(text: string) {
		const newPressKey = new PressKey();

		console.log(text.split(" "));

		text
			.split(" ")
			.map((key) => PressKey.keyNameConverter(key))
			.forEach((key) => {
				switch (key) {
					case "Meta":
						newPressKey.metaKey = true;
						break;
					case "Ctrl":
						newPressKey.ctrlKey = true;
						break;
					case "Alt":
						newPressKey.altKey = true;
						break;
					case "Shift":
						newPressKey.shiftKey = true;
						break;
					default:
						newPressKey.key = key;
				}
			});

		return newPressKey;
	}

	static keyNameConverter(keyName: string) {
		return PressKey.webKeyToMozcKey.get(keyName) || keyName;
	}

	eq(pressKey: PressKey) {
		return (
			this.key === pressKey.key &&
			this.metaKey === pressKey.metaKey &&
			this.ctrlKey === pressKey.ctrlKey &&
			this.altKey === pressKey.altKey &&
			this.shiftKey === pressKey.shiftKey
		);
	}

	silialize() {
		const enableKeys: string[] = [];
		if (this.metaKey) enableKeys.push("Meta");
		if (this.ctrlKey) enableKeys.push("Ctrl");
		if (this.altKey) enableKeys.push("Alt");
		if (this.shiftKey) enableKeys.push("shift");
		if (this.key !== null) enableKeys.push(this.key);

		return enableKeys.join(" ");
	}
}

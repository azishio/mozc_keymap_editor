import { Key } from "ts-key-enum";

export class PressKey {
	static webKeyToMozcKey = new Map<string, string>([
		[Key.ArrowUp, "Up"],
		[Key.ArrowDown, "Down"],
		[Key.ArrowLeft, "Left"],
		[Key.ArrowRight, "Right"],
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

	static fromText(text: string) {
		const newPressKey = new PressKey();

		text.split(" ").forEach((key) => {
			switch (key) {
				case Key.Meta:
					newPressKey.metaKey = true;
					break;
				case Key.Control:
					newPressKey.ctrlKey = true;
					break;
				case Key.Alt:
					newPressKey.altKey = true;
					break;
				case Key.Shift:
					newPressKey.shiftKey = true;
					break;
				default:
					newPressKey.key = PressKey.keyNameConverter(key);
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
}

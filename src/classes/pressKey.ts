export class PressKey {
	public metaKey = false;
	public ctrlKey = false;
	public altKey = false;
	public shiftKey = false;
	public key: string | null = null;
	constructor(
		key?: Partial<{
			metaKey: boolean;
			ctrlKey: boolean;
			altKey: boolean;
			shiftKey: boolean;
			key: string | null;
		}>,
	) {
		if (key) Object.assign(this, key);
	}
}

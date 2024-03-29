export class MozcModes {
	public directInput = false;
	public precomposition = false;
	public composition = false;
	public conversion = false;
	public suggestion = false;
	public prediction = false;

	public static list = [
		{ lCamel: "directInput", camel: "DirectInput", ja: "直接入力" },
		{ lCamel: "precomposition", camel: "Precomposition", ja: "入力文字なし" },
		{ lCamel: "composition", camel: "Composition", ja: "変換前入力中" },
		{ lCamel: "conversion", camel: "Conversion", ja: "変換中" },
		{ lCamel: "suggestion", camel: "Suggestion", ja: "サジェスト表示中" },
		{ lCamel: "prediction", camel: "Prediction", ja: "サジェスト選択中" },
	] as const;

	constructor(modes?: Partial<MozcModes>) {
		if (modes) Object.assign(this, modes);
	}

	enable(mode: (typeof MozcModes.list)[number]["lCamel"]) {
		this[mode] = true;
		return new MozcModes(this);
	}
	disable(mode: (typeof MozcModes.list)[number]["lCamel"]) {
		this[mode] = false;
		return new MozcModes(this);
	}
}

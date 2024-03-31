/**
 * 設定できるモードの情報と状態を持つクラス
 *
 * @remarks
 * 状態を更新するメソッドを使用した場合、更新が適用された新しいインスタンスを返すので、それを使うこと。
 * インスタンスのアドレスが変更されるとモード選択UIが再レンダリングされる
 */
export class MozcModes {
	/**
	 * モードの各表記をまとめた配列
	 */
	public static list = [
		{ lCamel: "directInput", camel: "DirectInput", ja: "直接入力" },
		{ lCamel: "precomposition", camel: "Precomposition", ja: "入力文字なし" },
		{ lCamel: "composition", camel: "Composition", ja: "変換前入力中" },
		{ lCamel: "conversion", camel: "Conversion", ja: "変換中" },
		{ lCamel: "suggestion", camel: "Suggestion", ja: "サジェスト表示中" },
		{ lCamel: "prediction", camel: "Prediction", ja: "サジェスト選択中" },
	] as const;

	// 各モードが選択されているかを示すフラグ
	public directInput = false;
	public precomposition = false;
	public composition = false;
	public conversion = false;
	public suggestion = false;
	public prediction = false;

	/**
	 * 引数が存在する場合、与えられた`MozcModes`の浅いコピーを返す。
	 * @param modes
	 */
	constructor(modes?: Partial<MozcModes>) {
		if (modes) Object.assign(this, modes);
	}

	/**
	 * 与えられた文字列に対応するモードのフラグを立てたインスタンスを返す。
	 * 文字列に対応するモードが存在しない場合は初期状態のインスタンスを返す。
	 */
	static fromText(text: string) {
		const newMozcMode = new MozcModes();
		MozcModes.list.forEach(({ lCamel, camel }) => {
			if (text === camel) newMozcMode[lCamel] = true;
		});

		return newMozcMode;
	}

	/**
	 * 指定されたモードのフラグを立てた新しいインスタンスを返す
	 */
	enable(mode: (typeof MozcModes.list)[number]["lCamel"]) {
		this[mode] = true;
		return new MozcModes(this);
	}

	/**
	 * 指定されたモードのフラグを下した新しいインスタンスを返す
	 */
	disable(mode: (typeof MozcModes.list)[number]["lCamel"]) {
		this[mode] = false;
		return new MozcModes(this);
	}

	/**
	 * 指定されたモードのフラグを反転した新しいインスタンスを返す
	 */
	toggle(mode: (typeof MozcModes.list)[number]["lCamel"]) {
		this[mode] = !this[mode];
		return new MozcModes(this);
	}

	/**
	 * 立っているフラグを配列にして返す
	 */
	getEnables() {
		return MozcModes.list.filter(({ lCamel }) => this[lCamel]);
	}

	/**
	 * 与えられた`MozcModes`と自身を比較して、同じフラグが立っているか否かを返す
	 */
	hasSame(modes: MozcModes) {
		const enables = modes.getEnables();

		return this.getEnables().some((mode) => enables.includes(mode));
	}
}

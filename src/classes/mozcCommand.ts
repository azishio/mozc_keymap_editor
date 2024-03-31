/**
 * 設定できるコマンドとその分類を持つクラス
 *
 * @remarks
 * 格納するデータが変わる場合は新しくインスタンスを作成すること。
 * インスタンスのアドレスが変更されるとコマンド選択UIが再レンダリングされる
 */
export class MozcCommand {
	/**
	 * カテゴリー毎に対応するコマンドをまとめた配列
	 */
	static mozcCommandCategories = [
		{
			category: "基本操作",
			commands: [
				{
					en: "Backspace",
					ja: "左の文字を削除",
				},
				{
					en: "Delete",
					ja: "右の文字を削除",
				},
				{
					en: "MoveCursorLeft",
					ja: "カーソルを左に移動",
				},
				{
					en: "MoveCursorRight",
					ja: "カーソルを右に移動",
				},
				{
					en: "MoveCursorToBeginning",
					ja: "カーソルを左端に移動",
				},
				{
					en: "MoveCursorToEnd",
					ja: "カーソルを右端に移動",
				},
				{
					en: "Cancel",
					ja: "キャンセル",
				},
				{
					en: "Undo",
					ja: "確定取り消し",
				},
				{
					en: "Commit",
					ja: "確定",
				},
			],
		},
		{
			category: "文字入力",
			commands: [
				{
					en: "InsertAlternateSpace",
					ja: "代替空白文字を入力",
				},
				{
					en: "InsertFullSpace",
					ja: "全角空白を入力",
				},
				{
					en: "InsertHalfSpace",
					ja: "半角空白を入力",
				},
				{
					en: "InsertSpace",
					ja: "空白を入力",
				},
				{
					en: "InsertCharacter",
					ja: "文字を挿入",
				},
			],
		},
		{
			category: "変換操作",
			commands: [
				{
					en: "Convert",
					ja: "変換",
				},
				{
					en: "ConvertWithoutHistory",
					ja: "学習を使わずに変換",
				},
				{
					en: "CommitFirstSuggestion",
					ja: "最初の予測候補を確定",
				},
				{
					en: "ConvertNext",
					ja: "次候補を選択",
				},
				{
					en: "ConvertNextPage",
					ja: "次候補ページを選択",
				},
				{
					en: "ConvertPrev",
					ja: "前候補を選択",
				},
				{
					en: "ConvertPrevPage",
					ja: "前候補ページを選択",
				},
				{
					en: "DeleteSelectedCandidate",
					ja: "選択候補を履歴から削除",
				},
				{
					en: "PredictAndConvert",
					ja: "予測変換",
				},
				{
					en: "Reconvert",
					ja: "再変換",
				},
				{
					en: "Revert",
					ja: "最後の学習をキャンセル",
				},
			],
		},
		{
			category: "分節操作",
			commands: [
				{
					en: "CommitOnlyFirstSegment",
					ja: "最初の文節のみを確定",
				},
				{
					en: "SegmentFocusFirst",
					ja: "文節を左端に移動",
				},
				{
					en: "SegmentFocusLast",
					ja: "文節を右端に移動",
				},
				{
					en: "SegmentFocusLeft",
					ja: "文節を左に移動",
				},
				{
					en: "SegmentFocusRight",
					ja: "文節を右に移動",
				},
				{
					en: "SegmentWidthExpand",
					ja: "文節を伸ばす",
				},
				{
					en: "SegmentWidthShrink",
					ja: "文節を縮める",
				},
			],
		},
		{
			category: "文字種変換",
			commands: [
				{
					en: "ConvertToFullAlphanumeric",
					ja: "全角英数に変換",
				},
				{
					en: "ConvertToFullKatakana",
					ja: "全角カタカナに変換",
				},
				{
					en: "ConvertToHalfAlphanumeric",
					ja: "半角英数に変換",
				},
				{
					en: "ConvertToHalfKatakana",
					ja: "半角カタカナに変換",
				},
				{
					en: "ConvertToHalfWidth",
					ja: "半角に変換",
				},
				{
					en: "ConvertToHiragana",
					ja: "ひらがなに変換",
				},
			],
		},
		{
			category: "状態遷移", // ソースでは"状態遷移基本"
			commands: [
				{
					en: "CancelAndIMEOff",
					ja: "キャンセル後 IME を無効化",
				},
				{
					en: "IMEOff",
					ja: "IME を無効化",
				},
				{
					en: "IMEOn",
					ja: "IME を有効化",
				},
			],
		},
		{
			category: "表示切替",
			commands: [
				{
					en: "DisplayAsFullAlphanumeric",
					ja: "全角英数に表示切替",
				},
				{
					en: "DisplayAsFullKatakana",
					ja: "全角カタカナに表示切替",
				},
				{
					en: "DisplayAsHalfAlphanumeric",
					ja: "半角英数に表示切替",
				},
				{
					en: "DisplayAsHalfKatakana",
					ja: "半角カタカナに表示切替",
				},
				{
					en: "DisplayAsHalfWidth",
					ja: "半角に表示切替",
				},
				{
					en: "DisplayAsHiragana",
					ja: "ひらがなに表示切替",
				},
			],
		},
		{
			category: "入力切替",
			commands: [
				{
					en: "InputModeFullAlphanumeric",
					ja: "全角英数に入力切替",
				},
				{
					en: "InputModeFullKatakana",
					ja: "全角カタカナに入力切替",
				},
				{
					en: "InputModeHalfAlphanumeric",
					ja: "半角英数に入力切替",
				},
				{
					en: "InputModeHalfKatakana",
					ja: "半角カタカナに入力切替",
				},
				{
					en: "InputModeHiragana",
					ja: "ひらがなに入力切替",
				},
				{
					en: "InputModeSwitchKanaType",
					ja: "次のかな文字種に入力切替",
				},
				{
					en: "SwitchKanaType",
					ja: "ひらがな・カタカナを切替",
				},
				{
					en: "ToggleAlphanumericMode",
					ja: "英数入力切り替え",
				},
			],
		},
		{
			category: "IME機能",
			commands: [
				{
					en: "LaunchConfigDialog",
					ja: "プロパティを起動",
				},
				{
					en: "LaunchDictionaryTool",
					ja: "辞書ツールを起動",
				},
				{
					en: "LaunchWordRegisterDialog",
					ja: "単語登録を起動",
				},
			],
		},
	] as const;
	/**
	 * カテゴリー関係なくコマンドの英語表記と日本語表記をまとめた配列
	 * @remarks
	 * MozcCommand.mozcCommandCategoriesから生成
	 */
	static mozcCommands = MozcCommand.mozcCommandCategories.flatMap(
		({ commands }) => commands.flatMap((v) => v),
	);
	/**
	 * コマンドの英語表記から日本語表記/カテゴリーを取得するための逆引き辞書
	 * @remarks
	 * MozcCommand.mozcCommandCategoriesから生成
	 */
	static info = new Map(
		MozcCommand.mozcCommandCategories.flatMap(({ category, commands }) =>
			commands.map(({ en, ja }) => [en, { ja, category }]),
		),
	);
	/**
	 * 選択されているコマンドのカテゴリー
	 * @private
	 */
	private category:
		| null
		| (typeof MozcCommand.mozcCommandCategories)[number]["category"] = null;
	/**
	 * 選択されているコマンドの日本語表記
	 * @private
	 */
	private jaName: null | (typeof MozcCommand.mozcCommands)[number]["ja"] = null;
	/**
	 * 選択されているコマンドの英語表記
	 * @private
	 */
	private enName: null | (typeof MozcCommand.mozcCommands)[number]["en"] = null;

	/**
	 * 引数が存在する場合、与えられた`MozcCommand`の浅いコピーを返す。
	 */
	constructor(command?: MozcCommand) {
		if (!command) return;

		Object.assign(this, command);
	}

	/**
	 * 与えられた文字列から対応するコマンドを格納したインスタンスを返す。
	 * 文字列に対応するコマンドが存在しない場合は初期状態のインスタンスを返す
	 */
	static fromText(text: string) {
		const newInstance = new MozcCommand();

		if (!MozcCommand.isCommand(text)) return newInstance;

		newInstance.enName = text;
		const info = MozcCommand.info.get(text);

		// 前に文字列がコマンドであることを確認したので、必ずtruthy
		if (info) {
			newInstance.jaName = info.ja;
			newInstance.category = info.category;
		}

		return newInstance;
	}

	/**
	 * 与えられた文字列がコマンドか否か判定する
	 */
	static isCommand = (
		text: unknown,
	): text is (typeof MozcCommand.mozcCommands)[number]["en"] => {
		return (
			MozcCommand.info as Map<unknown, { ja: string; category: string }>
		).has(text);
	};

	getCategory() {
		return this.category;
	}

	getEnName() {
		return this.enName;
	}

	getJaName() {
		return this.jaName;
	}

	/**
	 * MozcCommandのインスタンスと自身を比較して内容が同じか否かを返す
	 */
	eq(command: MozcCommand) {
		return this.enName === command.enName;
	}
}

// ソースは以下
// https://qiita.com/nekoppoituki_nhs/items/f612eb863b424d83d79f

export const modes = [
	{ en: "DirectInput", ja: "直接入力" },
	{ en: "Precomposition", ja: "入力文字なし" },
	{ en: "Composition", ja: "変換前入力中" },
	{ en: "Coversion", ja: "変換中" },
	{ en: "Suggestion", ja: "サジェスト表示中" },
	{ en: "Prediction", ja: "サジェスト選択中" },
] as const;

export type Mode = (typeof modes)[number];

export const commandCategories = [
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

export type CommandCategory = (typeof commandCategories)[number]["category"];

const jaCommands = commandCategories.flatMap(({ commands }) =>
	commands.map(({ ja }) => ja),
);

type t = (typeof commandCategories)[number]["commands"];

export type JaCommand = (typeof jaCommands)[number];

const enCommands = commandCategories.flatMap(({ commands }) =>
	commands.map(({ en }) => en),
);

export type EnCommand = (typeof enCommands)[number];

// 逆引き
export const commands = Object.fromEntries(
	commandCategories.flatMap(({ commands, category }) =>
		commands.map(({ en, ja }) => [en, { ja, category }]),
	),
) as Record<EnCommand, { ja: JaCommand; category: CommandCategory }>;

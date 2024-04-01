import { MozcCommand } from "@/classes/mozcCommand.ts";
import { MozcModes } from "@/classes/mozcModes.ts";
import { PressKey } from "@/classes/pressKey.ts";

/**
 * 1種類のキーマップを表すクラス
 *
 * @remarks
 * 内容を変更する再は、プロパティ自体を書き変える。
 * インスタンスのライフタイムは1行まるごと再レンダリングされるまでの期間と一致する必要がある。
 */
export class Shortcut {
	constructor(
		public modes: MozcModes = new MozcModes(),
		public key: PressKey = new PressKey(),
		public command: MozcCommand = new MozcCommand(),
	) {}

	copy() {
		return new Shortcut(this.modes, this.key, this.command);
	}
}

/**
 * キーマップの集合を管理するクラス。
 *
 * @remarks
 * 状態が変ったら新しいインスタンスを作ってそれを使用すること。
 * インスタンスのアドレスが変ることで再レンダリングをトリガーする。
 */
export class Shortcuts {
	static header = "status\tkey\tcommand\n";
	readonly conflictionCheckList: Set<string> = new Set();
	conflictions: Map<string, Set<string>> = new Map();
	readonly shortcutMap: Map<string, Shortcut> = new Map();

	constructor(shortcuts?: Shortcuts) {
		if (!shortcuts) return;

		this.conflictionCheckList = shortcuts.conflictionCheckList;
		this.conflictions = shortcuts.conflictions;
		this.shortcutMap = shortcuts.shortcutMap;
	}

	/**
	 * キーマップが記述されたテキストからインスタンスを生成する。
	 * 無効な行は空のShortcutとして扱われる。
	 *
	 * @return [Shortcutに割り当てられたIDの配列, 自身のインスタンス]
	 *
	 * @remarks
	 * 2行目以降は`/(?<mode>[a-zA-Z]+)\t(?<combinationKey>[a-zA-Z]+ )*(?<key>[a-zA-Z]+)\t(?<command>[a-zA-Z]+)/`に一致することを期待する。
	 * 内部的には、`\t`で区切った後で`[mode,key,command]`であることを前提に解析される。
	 * それぞれ無効な文字列であった場合、その項目は初期状態(無選択状態)になる。
	 */
	static fromText(keymap: string): [string[], Shortcuts] {
		const newInstance = new Shortcuts();

		const [, ...line] = keymap.split("\n");

		const shortcuts: Shortcut[] = line
			.filter((s) => s !== "")
			.map((s) => s.split("\t"))
			.map(
				([mode, keys, command]) =>
					new Shortcut(
						MozcModes.fromText(mode),
						PressKey.fromText(keys),
						MozcCommand.fromText(command),
					),
			);

		const newKeys = newInstance.mergeShortcuts(shortcuts);
		newKeys.forEach((k) => newInstance.conflictionCheckList.add(k));
		newInstance.checkConfliction();

		return [newKeys, newInstance];
	}

	/**
	 * 自身と与えられたインスタンスの内容を併せたインスタンスを返す。
	 * 入力キーとコマンドが同一のShortcutは、両方の有効になっているモードのフラグを立てた単一のShortcutに合成される。
	 */
	mergeShortcuts(shortcuts: Shortcut[]) {
		const pushedShortcutId: string[] = [];

		shortcuts.forEach((v) => {
			const sameCmdAndKey = Array.from(this.shortcutMap.entries()).find(
				([, { command, key }]) => command.eq(v.command) && key.eq(v.key),
			);

			if (sameCmdAndKey) {
				v.modes
					.getEnables()
					.forEach(({ lCamel }) => sameCmdAndKey[1].modes.enable(lCamel));
				this.conflictionCheckList.add(sameCmdAndKey[0]);
				console.log("m", sameCmdAndKey[1]);
			} else {
				const newId = crypto.randomUUID();
				this.shortcutMap.set(newId, v);
				this.conflictionCheckList.add(newId);
				pushedShortcutId.push(newId);
				console.log("n", v);
			}
		});

		return pushedShortcutId;
	}

	/**
	 * 与えられたShortcutのインスタンスを自身の管理下におき、割り当てたIDを返す。
	 */
	push(shortcut: Shortcut) {
		const newId = crypto.randomUUID();
		this.shortcutMap.set(newId, shortcut);
		this.conflictionCheckList.add(newId);

		return newId;
	}

	/**
	 * モードと入力キーが同一で、コマンドが違うShortcutを探す
	 */
	checkConfliction() {
		const currentShortcuts: Readonly<[string, Shortcut][]> = Array.from(
			this.shortcutMap.entries(),
		);

		const conflictions: Map<string, Set<string>> = new Map();

		this.conflictionCheckList.forEach((checkTargetId) => {
			const checkTarget = this.shortcutMap.get(checkTargetId);
			if (!checkTarget) {
				this.conflictionCheckList.delete(checkTargetId);
				return;
			}

			const conflictionShortcuts = currentShortcuts.filter(
				([id, { modes, key }]) =>
					modes.hasSame(checkTarget.modes) &&
					key.eq(checkTarget.key) &&
					id !== checkTargetId,
			);

			if (conflictionShortcuts.length === 0) {
				this.conflictionCheckList.delete(checkTargetId);
				return;
			}

			conflictions.set(
				checkTargetId,
				new Set(conflictionShortcuts.map(([id]) => id)),
			);

			conflictionShortcuts.forEach(([id]) => {
				if (id === checkTargetId) return;

				const target = conflictions.get(id);
				if (target) {
					target.add(checkTargetId);
				} else {
					conflictions.set(id, new Set([checkTargetId]));
				}

				this.conflictionCheckList.add(id);
			});
		});

		this.conflictions = conflictions;
	}

	/**
	 * 自身の内容をシャローコピーしたインスタンスを返す。
	 */
	update() {
		this.checkConfliction();
		return new Shortcuts(this);
	}

	/**
	 * 自身が管理するshortcutを全て文字列に起す。
	 * 完全でない(全てのモードのフラグが降りている/入力キーが未指定/コマンドが未指定)shortcutは無視される。
	 */
	silialize(order?: string[]) {
		if (order) {
			return Shortcuts.header.concat(
				order
					.map((id) => {
						const shortcut = this.shortcutMap.get(id);

						if (!shortcut) return null;

						const { modes, key, command } = shortcut;

						if (
							modes.getEnables().length === 0 ||
							key.eq(new PressKey()) ||
							command.getEnName() === null
						)
							return null;

						return modes
							.getEnables()
							.map(
								(mode) =>
									`${mode.camel}\t${key.silialize()}\t${command.getEnName()}`,
							)
							.join("\n");
					})
					.filter((text) => text !== null)
					.join("\n"),
			);
		}

		return Shortcuts.header.concat(
			[...this.shortcutMap.values()]
				.map(({ modes, key, command }) => {
					if (
						modes.getEnables().length === 0 ||
						key.eq(new PressKey()) ||
						command.getEnName() === null
					)
						return null;

					return modes
						.getEnables()
						.map(
							(mode) =>
								`${mode.camel}\t${key.silialize()}\t${command.getEnName()}`,
						)
						.join("\n");
				})
				.filter((text) => text !== null)
				.join("\n"),
		);
	}
}

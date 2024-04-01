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
export class Keymap {
	constructor(
		public modes: MozcModes = new MozcModes(),
		public key: PressKey = new PressKey(),
		public command: MozcCommand = new MozcCommand(),
	) {}

	copy() {
		return new Keymap(this.modes, this.key, this.command);
	}
}

/**
 * キーマップの集合を管理するクラス。
 *
 * @remarks
 * 状態が変ったら新しいインスタンスを作ってそれを使用すること。
 * インスタンスのアドレスが変ることで再レンダリングをトリガーする。
 */
export class Keymaps {
	static header = "status\tkey\tcommand\n";
	readonly conflictCheckList: Set<string> = new Set();
	conflictions: Map<string, Set<string>> = new Map();
	readonly keymapMap: Map<string, Keymap> = new Map();

	constructor(keymaps?: Keymaps) {
		if (!keymaps) return;

		this.conflictCheckList = keymaps.conflictCheckList;
		this.conflictions = keymaps.conflictions;
		this.keymapMap = keymaps.keymapMap;
	}

	/**
	 * キーマップが記述されたテキストからインスタンスを生成する。
	 * 無効な行は空のKeymapとして扱われる。
	 *
	 * @return [Keymapに割り当てられたIDの配列, 自身のインスタンス]
	 *
	 * @remarks
	 * 2行目以降は`/(?<mode>[a-zA-Z]+)\t(?<combinationKey>[a-zA-Z]+ )*(?<key>[a-zA-Z]+)\t(?<command>[a-zA-Z]+)/`に一致することを期待する。
	 * 内部的には、`\t`で区切った後で`[mode,key,command]`であることを前提に解析される。
	 * それぞれ無効な文字列であった場合、その項目は初期状態(無選択状態)になる。
	 */
	static fromText(keymap: string): [string[], Keymaps] {
		const newInstance = new Keymaps();

		const [, ...line] = keymap.split("\n");

		const keymapListFromText: Keymap[] = line
			.filter((s) => s !== "")
			.map((s) => s.split("\t"))
			.map(
				([mode, keys, command]) =>
					new Keymap(
						MozcModes.fromText(mode),
						PressKey.fromText(keys),
						MozcCommand.fromText(command),
					),
			);

		const newKeys = newInstance.merge(keymapListFromText);
		newKeys.forEach((k) => newInstance.conflictCheckList.add(k));
		newInstance.checkConfliction();

		return [newKeys, newInstance];
	}

	/**
	 * 自身と与えられたインスタンスの内容を併せたインスタンスを返す。
	 * 入力キーとコマンドが同一のKeymapは、両方の有効になっているモードのフラグを立てた単一のKeymapに合成される。
	 */
	merge(keymapList: Keymap[]) {
		// 新しく追加されたKeymapに割り当てられたid
		const pushedKeymapId: string[] = [];

		keymapList.forEach((v) => {
			const sameCmdAndKey = Array.from(this.keymapMap.entries()).find(
				([, { command, key }]) => command.eq(v.command) && key.eq(v.key),
			);

			if (sameCmdAndKey) {
				v.modes
					.getEnables()
					.forEach(({ lCamel }) => sameCmdAndKey[1].modes.enable(lCamel));
				this.conflictCheckList.add(sameCmdAndKey[0]);
				console.log("m", sameCmdAndKey[1]);
			} else {
				const newId = crypto.randomUUID();
				this.keymapMap.set(newId, v);
				this.conflictCheckList.add(newId);
				pushedKeymapId.push(newId);
				console.log("n", v);
			}
		});

		return pushedKeymapId;
	}

	/**
	 * 与えられたKeymapのインスタンスを自身の管理下におき、割り当てたIDを返す。
	 */
	push(keymap: Keymap) {
		const newId = crypto.randomUUID();
		this.keymapMap.set(newId, keymap);
		this.conflictCheckList.add(newId);

		return newId;
	}

	/**
	 * モードと入力キーが同一で、コマンドが違うKeymapを探す
	 */
	checkConfliction() {
		const currentKeymapList: Readonly<[string, Keymap][]> = Array.from(
			this.keymapMap.entries(),
		);

		const conflictingKeymaps: Map<string, Set<string>> = new Map();

		this.conflictCheckList.forEach((checkTargetId) => {
			const checkTarget = this.keymapMap.get(checkTargetId);
			if (!checkTarget) {
				this.conflictCheckList.delete(checkTargetId);
				return;
			}

			const conflictingKeymapList = currentKeymapList.filter(
				([id, { modes, key }]) =>
					modes.hasSame(checkTarget.modes) &&
					key.eq(checkTarget.key) &&
					id !== checkTargetId,
			);

			if (conflictingKeymapList.length === 0) {
				this.conflictCheckList.delete(checkTargetId);
				return;
			}

			conflictingKeymaps.set(
				checkTargetId,
				new Set(conflictingKeymapList.map(([id]) => id)),
			);

			conflictingKeymapList.forEach(([id]) => {
				if (id === checkTargetId) return;

				const target = conflictingKeymaps.get(id);
				if (target) {
					target.add(checkTargetId);
				} else {
					conflictingKeymaps.set(id, new Set([checkTargetId]));
				}

				this.conflictCheckList.add(id);
			});
		});

		this.conflictions = conflictingKeymaps;
	}

	/**
	 * 競合チェックをした後で、自身の内容をシャローコピーしたインスタンスを返す。
	 */
	update() {
		this.checkConfliction();
		return new Keymaps(this);
	}

	/**
	 * 自身が管理するKeymapを全て文字列に起こす。
	 * idの配列を渡すと、その順番で文字起こしする。
	 * 完全でない(全てのモードのフラグが降りている/入力キーが未指定/コマンドが未指定)keymapは無視される。
	 */
	serialize(order?: string[]) {
		if (order) {
			return Keymaps.header.concat(
				order
					.map((id) => {
						const keymap = this.keymapMap.get(id);

						if (!keymap) return null;

						const { modes, key, command } = keymap;

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

		return Keymaps.header.concat(
			[...this.keymapMap.values()]
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

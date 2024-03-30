import { MozcCommand } from "@/classes/mozcCommand.ts";
import { MozcModes } from "@/classes/mozcModes.ts";
import { PressKey } from "@/classes/pressKey.ts";

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

export class Shortcuts {
	readonly conflictionCheckList: Set<string> = new Set();
	conflictions: Map<string, Set<string>> = new Map();
	readonly shortcutMap: Map<string, Shortcut> = new Map();

	constructor(shortcuts?: Shortcuts) {
		if (!shortcuts) return;

		this.conflictionCheckList = shortcuts.conflictionCheckList;
		this.conflictions = shortcuts.conflictions;
		this.shortcutMap = shortcuts.shortcutMap;
	}

	static fromText(keymap?: string) {
		if (!keymap) return;

		const [, ...line] = keymap.split("\n");

		const shortcuts: Shortcut[] = line
			.filter((s) => s !== "")
			.map((s) => s.split("\t"))
			.map(
				([modes, keys, command]) =>
					new Shortcut(
						MozcModes.fromText(modes),
						PressKey.fromText(keys),
						new MozcCommand(command),
					),
			);

		return new Shortcuts().mergeShortcuts(shortcuts);
	}

	mergeShortcuts(shortcuts: Shortcut[]) {
		const currentShortcuts: Readonly<[string, Shortcut][]> = Array.from(
			this.shortcutMap.entries(),
		);

		const pushedShortcutId: string[] = [];

		shortcuts.forEach((v) => {
			const sameCmdAndKey = currentShortcuts.find(
				([, { command, key }]) => command.eq(v.command) && key.eq(v.key),
			);

			if (sameCmdAndKey) {
				v.modes
					.getEnables()
					.forEach((mode) => sameCmdAndKey[1].modes.enable(mode));
			} else {
				const newId = crypto.randomUUID();
				this.shortcutMap.set(newId, v);
				this.conflictionCheckList.add(newId);
				pushedShortcutId.push(newId);
			}
		});

		return pushedShortcutId;
	}

	push(shortcut: Shortcut) {
		const newId = crypto.randomUUID();
		this.shortcutMap.set(newId, shortcut);

		return newId;
	}

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

			console.log("target", checkTarget);
			console.log(conflictionShortcuts.map((v) => v[1]));

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

	copy() {
		return new Shortcuts(this);
	}

	silialize(order?: string[]) {
		if (order) {
			return order
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
				.join("\n");
		}

		return [...this.shortcutMap.values()]
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
			.join("\n");
	}
}

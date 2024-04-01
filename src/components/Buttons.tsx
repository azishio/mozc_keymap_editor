"use client";

import { Shortcut, Shortcuts } from "@/classes/Shortcuts.ts";
import {
	ContentCopy,
	Download,
	Merge,
	RestartAlt,
	UploadFile,
} from "@mui/icons-material";
import {
	ButtonGroup,
	IconButton,
	Input,
	Link,
	Snackbar,
	Stack,
	Tooltip,
} from "@mui/joy";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function Buttons({
	text,
	setShortcuts,
	setShortcutOrder,
}: {
	text: string;
	setShortcuts: Dispatch<SetStateAction<Shortcuts>>;
	setShortcutOrder: Dispatch<SetStateAction<string[]>>;
}) {
	const [openCopiedSnackbar, setOpenCopiedSnackbar] = useState(false);
	const [openInvalidFileSnackbar, setOpenInvalidFileSnackbar] = useState(false);

	const [hasClipboard, setHasclipboard] = useState(false);
	useEffect(() => {
		if (navigator.clipboard) setHasclipboard(true);
	}, []);

	const [objectURL, setObjectURL] = useState<string | null>(null);

	useEffect(() => {
		setObjectURL((prev) => {
			if (prev) URL.revokeObjectURL(prev);
			return URL.createObjectURL(new Blob([text], { type: "text/plain" }));
		});
	}, [text]);

	const resetShortcuts = () => {
		const shortcuts = new Shortcuts();
		const newId = shortcuts.push(new Shortcut());
		setShortcuts(shortcuts);
		setShortcutOrder([newId]);
	};

	const mergeShortcuts = async (files: FileList | null) => {
		if (!files || files.length === 0) return;

		if (files[0].type !== "text/plain") {
			setOpenInvalidFileSnackbar(true);
			return;
		}

		const text = await files[0].text();

		setShortcuts((prev) => {
			const newIdList = prev.mergeShortcuts([
				...Shortcuts.fromText(text)[1].shortcutMap.values(),
			]);

			setShortcutOrder((prev) => prev.concat(newIdList));
			return prev.update();
		});
	};

	return (
		<>
			<Stack direction={"row"} spacing={4}>
				<ButtonGroup>
					<Tooltip title={"新規"}>
						<IconButton component={"label"}>
							<Input
								type={"file"}
								sx={{ display: "none" }}
								onChange={({ currentTarget: { files } }) => {
									setShortcuts(new Shortcuts());
									setShortcutOrder([]);
									mergeShortcuts(files);
								}}
							/>
							<UploadFile />
						</IconButton>
					</Tooltip>
					<Tooltip title={"追加"}>
						<IconButton component={"label"}>
							<Input
								type={"file"}
								sx={{ display: "none" }}
								onChange={({ currentTarget: { files } }) =>
									mergeShortcuts(files)
								}
							/>
							<Merge />
						</IconButton>
					</Tooltip>
				</ButtonGroup>

				<ButtonGroup>
					<Tooltip title={"全て削除"}>
						<IconButton onClick={() => resetShortcuts()}>
							<RestartAlt />
						</IconButton>
					</Tooltip>
				</ButtonGroup>

				<ButtonGroup>
					<Tooltip title={"クリップボードへコピー"} placement={"top"}>
						<IconButton
							disabled={!hasClipboard}
							onClick={() =>
								navigator.clipboard
									?.writeText(text)
									.then(() => setOpenCopiedSnackbar(true))
							}
						>
							<ContentCopy />
						</IconButton>
					</Tooltip>
					<Tooltip title={"設定ファイルのダウンロード"} placement={"top"}>
						<Link href={objectURL || ""} download={"keymap.txt"}>
							<IconButton>
								<Download />
							</IconButton>
						</Link>
					</Tooltip>
				</ButtonGroup>
			</Stack>

			<Snackbar
				variant={"soft"}
				color={"success"}
				open={openCopiedSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenCopiedSnackbar(false)}
			>
				コピー済み !!
			</Snackbar>
			<Snackbar
				variant={"soft"}
				color={"danger"}
				open={openInvalidFileSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenInvalidFileSnackbar(false)}
			>
				テキストファイル以外は読み込めません
			</Snackbar>
		</>
	);
}

"use client";

import { ContentCopy, Download } from "@mui/icons-material";
import {
	ButtonGroup,
	IconButton,
	Link,
	Snackbar,
	Stack,
	Tooltip,
} from "@mui/joy";
import { useEffect, useState } from "react";

export function Buttons({ text }: { text: string }) {
	const [openSnackbar, setOpenSnackbar] = useState(false);

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

	return (
		<>
			<Stack direction={"row"} spacing={4}>
				<ButtonGroup>
					<Tooltip title={"クリップボードへコピー"} placement={"top"}>
						<IconButton
							disabled={!hasClipboard}
							onClick={() =>
								navigator.clipboard
									?.writeText(text)
									.then(() => setOpenSnackbar(true))
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
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
			>
				コピー済み !!
			</Snackbar>
		</>
	);
}

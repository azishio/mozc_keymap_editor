import { Keymap, Keymaps } from "@/classes/Keymaps.ts";
import {
	ContentCopy,
	Download,
	Merge,
	RestartAlt,
	UploadFile,
} from "@mui/icons-material";
import {
	ButtonGroup,
	CircularProgress,
	IconButton,
	Input,
	Link,
	Snackbar,
	Stack,
	Tooltip,
} from "@mui/joy";
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useState,
	useTransition,
} from "react";

export function Buttons({
	text,
	setKeymaps,
	setKeymapOrder,
}: {
	text: string;
	setKeymaps: Dispatch<SetStateAction<Keymaps>>;
	setKeymapOrder: Dispatch<SetStateAction<string[]>>;
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

	const [newFileTransition, startNewFileTransition] = useTransition();
	const [addFileTransition, startAddFileTransition] = useTransition();

	const resetKeymaps = () => {
		const newInstance = new Keymaps();
		const newId = newInstance.push(new Keymap());
		setKeymaps(newInstance);
		setKeymapOrder([newId]);
	};

	const mergeKeymaps = async (files: FileList | null) => {
		if (!files || files.length === 0) return;

		if (files[0].type !== "text/plain") {
			setOpenInvalidFileSnackbar(true);
			return;
		}

		const text = await files[0].text();

		setKeymaps((prev) => {
			const newIdList = prev.merge([
				...Keymaps.fromText(text)[1].keymapMap.values(),
			]);

			setKeymapOrder((prev) => prev.concat(newIdList));
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
								onChange={({ currentTarget }) => {
									startNewFileTransition(() => {
										setKeymaps(new Keymaps());
										setKeymapOrder([]);
										mergeKeymaps(currentTarget.files);
									});
									currentTarget.value = "";
								}}
							/>
							{newFileTransition ? <CircularProgress /> : <UploadFile />}
						</IconButton>
					</Tooltip>
					<Tooltip title={"追加"}>
						<IconButton component={"label"}>
							<Input
								type={"file"}
								sx={{ display: "none" }}
								onChange={({ currentTarget }) => {
									startAddFileTransition(async () => {
										await mergeKeymaps(currentTarget.files);
									});
									currentTarget.value = "";
								}}
							/>
							{addFileTransition ? <CircularProgress /> : <Merge />}
						</IconButton>
					</Tooltip>
				</ButtonGroup>

				<ButtonGroup>
					<Tooltip title={"全て削除"}>
						<IconButton onClick={() => resetKeymaps()}>
							<RestartAlt />
						</IconButton>
					</Tooltip>
				</ButtonGroup>

				<ButtonGroup>
					<Tooltip title={"クリップボードへコピー"}>
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
					<Tooltip title={"設定ファイルのダウンロード"}>
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

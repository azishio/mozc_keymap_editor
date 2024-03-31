import { ContentCopy, Download } from "@mui/icons-material";
import {
	ButtonGroup,
	IconButton,
	Link,
	Sheet,
	Snackbar,
	Typography,
} from "@mui/joy";
import { useState } from "react";

export function TextViewer({ text }: { text: string }) {
	const [openSnackbar, setOpenSnackbar] = useState(false);

	return (
		<>
			<Sheet
				variant={"outlined"}
				sx={{
					width: "100%",
					position: "relative",
					minHeight: 100,
					boxShadow: "sm",
					borderRadius: "sm",
				}}
			>
				<ButtonGroup
					sx={{ position: "absolute", right: 15, top: 15 }}
					spacing={1}
				>
					<IconButton
						disabled={!navigator.clipboard}
						onClick={() =>
							navigator.clipboard
								?.writeText(text)
								.then(() => setOpenSnackbar(true))
						}
					>
						<ContentCopy />
					</IconButton>
					<IconButton>
						<Link
							href={URL.createObjectURL(
								new Blob([text], { type: "text/plain" }),
							)}
							download={"keymap.txt"}
							overlay
						>
							<Download />
						</Link>
					</IconButton>
				</ButtonGroup>
				<Typography component={"pre"} sx={{ margin: 3 }}>
					{text !== "" ? text : "※ 有効なキー設定がありません"}
				</Typography>
			</Sheet>
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

import { ContentCopy } from "@mui/icons-material";
import { IconButton, Sheet, Typography } from "@mui/joy";

export function TextViewer({ text }: { text: string }) {
	return (
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
			<IconButton sx={{ position: "absolute", right: 10, top: 10 }}>
				<ContentCopy />
			</IconButton>
			<Typography component={"pre"} sx={{ margin: 3 }}>
				{text}
			</Typography>
		</Sheet>
	);
}

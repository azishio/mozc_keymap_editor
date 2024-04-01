import { Sheet, Typography } from "@mui/joy";

export function TextViewer({ text }: { text: string }) {
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
				<Typography component={"pre"} sx={{ margin: 3 }}>
					{text !== "" ? text : "※ 有効なキー設定がありません"}
				</Typography>
			</Sheet>
		</>
	);
}

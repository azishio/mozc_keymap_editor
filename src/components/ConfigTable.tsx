import { Keymap, type Keymaps } from "@/classes/Keymaps.ts";
import { Row } from "@/components/Row";
import { SortableProvider } from "@/components/SortableProvider.tsx";
import { AddCircleOutline } from "@mui/icons-material";
import { IconButton, Sheet, Stack, Table, Tooltip, Typography } from "@mui/joy";
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
} from "react";

export function ConfigTable({
	keymapOrder,
	setKeymapOrder,
	keymaps,
	setKeymaps,
}: {
	keymapOrder: string[];
	setKeymapOrder: Dispatch<SetStateAction<string[]>>;
	keymaps: Keymaps;
	setKeymaps: Dispatch<SetStateAction<Keymaps>>;
}) {
	useEffect(() => {
		console.log(keymaps.serialize());
	}, [keymaps]);

	const deleteKeymap = useCallback(
		(id: string) => {
			setKeymaps((prev) => {
				prev.keymapMap.delete(id);
				return prev.update();
			});
			setKeymapOrder((prev) => prev.filter((v) => v !== id));
		},
		[setKeymaps, setKeymapOrder],
	);

	return (
		<Stack justifyContent={"center"}>
			<Sheet sx={{ boxShadow: "sm", borderRadius: "sm" }}>
				<Table
					borderAxis={"both"}
					stickyHeader
					stripe={"even"}
					sx={{
						userSelect: "none",
						tableLayout: "auto",
						"& thead th": {
							verticalAlign: "middle",
						},
						"& thead th:first-of-type": {
							width: 50,
							textAlign: "center",
						},
						"& thead th:nth-of-type(3)": {
							width: "20%",
							maxWidth: "100",
						},
						"& thead th:nth-of-type(4)": {
							width: "20%",
							maxWidth: "100",
						},
						"& thead th:last-of-type": {
							width: 50,
							textAlign: "center",
						},
						"& td:first-of-type ": {
							textAlign: "center",
						},
						"& td:last-of-type": {
							textAlign: "center",
							padding: 0,
						},
						"& td": {
							paddingX: 2,
							paddingY: 1,
						},
					}}
				>
					<thead>
						<tr>
							<th>
								<Typography level={"title-lg"}>#</Typography>
							</th>
							<th>
								<Typography level={"title-lg"}>モード</Typography>
							</th>
							<th>
								<Typography level={"title-lg"}>入力キー</Typography>
							</th>
							<th>
								<Typography level={"title-lg"}>コマンド</Typography>
							</th>
							<th />
						</tr>
					</thead>
					<tbody>
						<SortableProvider items={keymapOrder} setItems={setKeymapOrder}>
							{keymapOrder.map((id, order) => {
								const keymap = keymaps.keymapMap.get(id);
								if (!keymap) return null;
								const confliction = keymaps.conflictions.get(id);
								return (
									<Row
										key={id}
										id={id}
										order={order}
										deleteKeymap={deleteKeymap}
										confliction={
											confliction
												? [...confliction.keys()]
														.map((id) => keymapOrder.findIndex((i) => i === id))
														.filter((index) => index !== -1)
														.sort((a, b) => a - b)
												: null
										}
										keymap={keymap}
										setKeymaps={setKeymaps}
									/>
								);
							})}
						</SortableProvider>
					</tbody>
				</Table>
			</Sheet>
			<Tooltip title={"追加"}>
				<IconButton
					size={"lg"}
					onClick={() => {
						const newId = keymaps.push(new Keymap());
						setKeymapOrder((prev) => [...prev, newId]);
					}}
				>
					<AddCircleOutline />
				</IconButton>
			</Tooltip>
		</Stack>
	);
}

"use client";

import { Shortcut, Shortcuts } from "@/classes/Shortcuts.ts";
import { Row } from "@/components/Row";
import { AddCircleOutline, DeleteForever } from "@mui/icons-material";
import { IconButton, Sheet, Stack, Table, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

export function ConfigTable() {
	const [shortcutOrder, setShortcutOrder] = useState<string[]>([]);

	const [shortcuts, setShortcuts] = useState(() => {
		const shortcuts = new Shortcuts();
		const newId = shortcuts.push(new Shortcut());
		setShortcutOrder([newId]);
		return shortcuts;
	});

	useEffect(() => {
		console.log(shortcuts.silialize());
	}, [shortcuts]);

	return (
		<Stack justifyContent={"center"}>
			<Sheet variant={"outlined"} sx={{ boxShadow: "sm", borderRadius: "sm" }}>
				<Table
					borderAxis={"both"}
					stickyHeader
					stripe={"even"}
					sx={{
						"& thead th:first-of-type": {
							width: 50,
							textAlign: "center",
						},
						"& thead th:nth-of-type(2)": {
							maxWidth: 300,
						},
						"& thead th:last-of-type": {
							width: 50,
							textAlign: "center",
						},
						"& td:first-of-type": {
							textAlign: "center",
						},
						"& td:last-of-type": {
							textAlign: "center",
						},
						"& thead th": {
							verticalAlign: "middle",
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
							<th>
								<Typography level={"title-lg"}>
									<DeleteForever />
								</Typography>
							</th>
						</tr>
					</thead>
					<tbody>
						{shortcutOrder.map((id, order) => {
							const shortcut = shortcuts.shortcutMap.get(id);
							if (!shortcut) return null;
							const confliction = shortcuts.conflictions.get(id);
							return (
								<Row
									key={id}
									id={id}
									order={order}
									confliction={
										confliction
											? [...confliction.keys()]
													.map((id) => shortcutOrder.findIndex((i) => i === id))
													.filter((index) => index !== -1)
													.sort((a, b) => a - b)
											: null
									}
									shortcut={shortcut}
									setShortcuts={setShortcuts}
								/>
							);
						})}
					</tbody>
				</Table>
			</Sheet>
			<IconButton
				size={"lg"}
				onClick={() => {
					const newId = shortcuts.push(new Shortcut());
					setShortcutOrder((prev) => [...prev, newId]);
				}}
			>
				<AddCircleOutline />
			</IconButton>
		</Stack>
	);
}

"use client";

import { Shortcut, type Shortcuts } from "@/classes/Shortcuts.ts";
import { Row } from "@/components/Row";
import { AddCircleOutline, DeleteForever } from "@mui/icons-material";
import { IconButton, Sheet, Stack, Table, Typography } from "@mui/joy";
import { type Dispatch, type SetStateAction, useEffect } from "react";

export function ConfigTable({
	shortcutOrder,
	setShortcutOrder,
	shortcuts,
	setShortcuts,
}: {
	shortcutOrder: string[];
	setShortcutOrder: Dispatch<SetStateAction<string[]>>;
	shortcuts: Shortcuts;
	setShortcuts: Dispatch<SetStateAction<Shortcuts>>;
}) {
	useEffect(() => {
		console.log(shortcuts.silialize());
	}, [shortcuts]);

	return (
		<Stack justifyContent={"center"}>
			<Sheet sx={{ boxShadow: "sm", borderRadius: "sm" }}>
				<Table
					borderAxis={"both"}
					stickyHeader
					stripe={"even"}
					sx={{
						tableLayout: "auto",
						"& thead th:first-of-type": {
							width: 50,
							textAlign: "center",
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
						},
						"& thead th": {
							verticalAlign: "middle",
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

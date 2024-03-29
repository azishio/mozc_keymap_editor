"use client";

import { Row } from "@/components/Row";
import { DeleteForever } from "@mui/icons-material";
import { Sheet, Table, Typography } from "@mui/joy";
import { useState } from "react";

export function ConfigTable() {
	const uuid = crypto.randomUUID();

	const [shortcutOrder, setShortcutOrder] = useState<string[]>(
		Array.from(Array(5), () => crypto.randomUUID()),
	);

	return (
		<Sheet variant={"outlined"} sx={{ boxShadow: "sm", borderRadius: "sm" }}>
			<Table
				borderAxis={"both"}
				stickyHeader
				stripe={"even"}
				sx={{
					"& thead th:first-child": {
						width: 50,
						textAlign: "center",
					},
					"& thead th:nth-child(2)": {
						maxWidth: 300,
					},
					"& thead th:last-child": {
						width: 50,
						textAlign: "center",
					},
					"& td:first-child": {
						textAlign: "center",
					},
					"& td:last-child": {
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
					{shortcutOrder.map((id, order) => (
						<Row key={id} order={order} />
					))}
				</tbody>
			</Table>
		</Sheet>
	);
}

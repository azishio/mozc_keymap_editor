"use client";

import { RowState } from "@/classes/rowState";
import { Row } from "@/components/Row";
import { DeleteForever } from "@mui/icons-material";
import { Sheet, Table, Typography } from "@mui/joy";
import { useState } from "react";

export function ConfigTable() {
	const uuid = crypto.randomUUID();

	const [rowOrder, setRowOrder] = useState<string[]>(
		Array.from(Array(5), () => crypto.randomUUID()),
	);

	// Mapを使いたい&変更するたびに再生成したくない
	// 更新するときは、新しいオブジェクトに参照を貼り変える
	const [rowData, setRowData] = useState<{ current: Map<string, RowState> }>({
		current: new Map(),
	});

	// 更新する内容を渡すと前回の内容へ上書きして保存する
	const setState = (id: string) => {
		return (state: Partial<RowState>) =>
			setRowData(({ current: prevData }) => {
				const prev = prevData.get(id) || new RowState();
				return { current: prevData.set(id, { ...prev, ...state }) };
			});
	};

	const deleteRow = (id: string, index: number) => {
		return () => {
			setRowData(({ current: prev }) => {
				prev.delete(id);
				return { current: prev };
			});
			setRowOrder((prevArr) => prevArr.toSpliced(index, 1));
		};
	};

	return (
		<Sheet variant={"outlined"} sx={{ boxShadow: "sm", borderRadius: "sm" }}>
			<Table
				borderAxis={"both"}
				stickyHeader
				stripe={"even"}
				sx={(theme) => ({
					"& thead th:last-child": {
						width: "60px",
					},
				})}
			>
				<thead>
					<tr>
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
					{rowOrder.map((id) => (
						<Row
							key={id}
							rowState={rowData.current.get(id) || new RowState()}
							setState={setState(id)}
						/>
					))}
				</tbody>
			</Table>
		</Sheet>
	);
}

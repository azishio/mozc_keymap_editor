"use client";

import { Keymap, Keymaps } from "@/classes/Keymaps.ts";
import { Buttons } from "@/components/Buttons.tsx";
import { ConfigTable } from "@/components/ConfigTable.tsx";
import { TextViewer } from "@/components/TextViewer.tsx";
import { Edit, Subject } from "@mui/icons-material";
import {
	Box,
	Divider,
	Stack,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Typography,
} from "@mui/joy";
import { useState } from "react";

export default function Home() {
	const [keymapOrder, setKeymapOrder] = useState<string[]>([]);
	const [keymaps, setKeymaps] = useState(() => {
		const newInstance = new Keymaps();
		const newId = newInstance.push(new Keymap());
		setKeymapOrder([newId]);
		return newInstance;
	});

	const text = keymaps.serialize(keymapOrder);

	return (
		<main>
			<Stack sx={{ margin: 3, alignItems: "center" }}>
				<Typography level={"h1"}>Mozc キー設定編集ツール</Typography>
				<Divider sx={{ marginY: 2 }} />
				<Tabs sx={{ maxWidth: 1500, width: "90%" }}>
					<TabList defaultValue={0}>
						<Tab variant={"outlined"}>
							<Typography startDecorator={<Edit />}>編集</Typography>
						</Tab>
						<Tab variant={"outlined"}>
							<Typography startDecorator={<Subject />}>出力</Typography>
						</Tab>
					</TabList>
					<Box position={"absolute"} right={15} top={-8}>
						<Buttons
							text={text}
							setKeymaps={setKeymaps}
							setKeymapOrder={setKeymapOrder}
						/>
					</Box>

					<TabPanel value={0}>
						<ConfigTable
							setKeymapOrder={setKeymapOrder}
							keymaps={keymaps}
							setKeymaps={setKeymaps}
							keymapOrder={keymapOrder}
						/>
					</TabPanel>
					<TabPanel value={1}>
						<TextViewer text={text} />
					</TabPanel>
				</Tabs>
			</Stack>
		</main>
	);
}

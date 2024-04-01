"use client";

import { Shortcut, Shortcuts } from "@/classes/Shortcuts.ts";
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
	const [shortcutOrder, setShortcutOrder] = useState<string[]>([]);
	const [shortcuts, setShortcuts] = useState(() => {
		const shortcuts = new Shortcuts();
		const newId = shortcuts.push(new Shortcut());
		setShortcutOrder([newId]);
		return shortcuts;
	});

	const text = shortcuts.silialize(shortcutOrder);

	return (
		<main>
			<Stack sx={{ margin: 3, alignItems: "center" }}>
				<Typography level={"h1"}>Mozc キー設定編集ツール</Typography>
				<Divider sx={{ marginY: 2 }} />
				<Tabs sx={{ maxWidth: 1360, minWidth: "fit-content" }}>
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
							setShortcuts={setShortcuts}
							setShortcutOrder={setShortcutOrder}
						/>
					</Box>

					<TabPanel value={0}>
						<ConfigTable
							setShortcutOrder={setShortcutOrder}
							shortcuts={shortcuts}
							setShortcuts={setShortcuts}
							shortcutOrder={shortcutOrder}
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

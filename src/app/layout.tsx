import { JoyProvider } from "@/app/JoyProvider";
import { Sheet } from "@mui/joy";
import type { Metadata } from "next";
import Head from "next/head";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Mozc Keymap Editor",
	description: "Mozcのキー設定ファイル用のエディタ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ja">
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<body>
				<Sheet sx={{ width: "100vw", height: "100vh" }}>
					<JoyProvider>{children}</JoyProvider>
				</Sheet>
			</body>
		</html>
	);
}

import { CssBaseline, CssVarsProvider } from "@mui/joy";
import type { Metadata } from "next";
import Head from "next/head";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Mozc Shortcut Editor",
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
				<CssVarsProvider defaultMode={"system"}>
					<CssBaseline />
					{children}
				</CssVarsProvider>
			</body>
		</html>
	);
}

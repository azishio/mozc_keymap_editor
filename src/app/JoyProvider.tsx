"use client";

import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import type { ReactNode } from "react";

const theme = extendTheme({
	colorSchemes: {
		light: { palette: { background: { level2: "WhiteSmoke" } } },
	},
});

export function JoyProvider({ children }: { children: ReactNode }) {
	return (
		<CssVarsProvider defaultMode={"system"} theme={theme}>
			<CssBaseline />
			{children}
		</CssVarsProvider>
	);
}

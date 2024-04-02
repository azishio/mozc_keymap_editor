/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	webpack: {
		resolve: {
			alias: {
				"@mui/material": "@mui/joy",
			},
		},
	},
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: {
		resolve: {
			alias: {
				"@mui/material": "@mui/joy",
			},
		},
	},
};

export default nextConfig;

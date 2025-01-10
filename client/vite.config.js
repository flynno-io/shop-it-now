import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { ViteAliases } from "vite-aliases"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		ViteAliases({
			/**
			 * Relative path to the project directory
			 */
			dir: "src",

			/**
			 * Prefix symbol for the aliases
			 */
			prefix: "@",
		}),
	],
	server: {
		port: 3000,
		open: true,
		proxy: {
			"/graphql": {
				target: "http://localhost:3001",
				secure: false,
				changeOrigin: true,
			},
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
	},
})

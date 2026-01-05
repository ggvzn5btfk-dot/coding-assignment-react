import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root") as HTMLElement;

if (!root) {
	throw new Error("Failed to find the root element");
}

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

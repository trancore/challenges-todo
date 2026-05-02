import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/style.css";
import App from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: HTML内にidが"root"の要素が存在することを確認しているため、non-null assertion演算子の使用は安全。
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

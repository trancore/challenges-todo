import { cn } from "../../utils/cn";

export function Header() {
	return (
		<header className={cn("p-5 w-full", "bg-gray-800 text-white")}>
			<p className={cn("text-2xl font-bold")}>TODO</p>
		</header>
	);
}

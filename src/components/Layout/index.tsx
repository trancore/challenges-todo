import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Header } from "../Header";

type Props = {
	children: ReactNode;
};

export function Layout({ children }: Props) {
	return (
		<div className={cn("min-h-screen")}>
			<Header />
			<main
				className={cn(
					"px-6 pt-6 pb-28 w-full gap-4 m-auto",
					"flex flex-1 flex-col justify-center items-center",
				)}
			>
				{children}
			</main>
		</div>
	);
}

import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { useCallback, useState } from "react";
import { cn } from "../../utils/cn";

type AddBoxProps = {
	onAdd: (title: string) => void | Promise<void>;
};

export function AddBox({ onAdd }: AddBoxProps) {
	const [value, setValue] = useState("");

	const submit = useCallback(async () => {
		const title = value.trim();
		if (!title) return;
		await onAdd(title);
		setValue("");
	}, [value, onAdd]);

	return (
		<div
			className={cn(
				"py-4 px-2 m-2 gap-1",
				"fixed inset-x-0 bottom-0 z-10 flex",
				"border-3 border-gray-800 bg-white",
			)}
		>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") void submit();
				}}
				placeholder="TODOを入力してください"
				className={cn("p-1", "w-full", "border-2 border-black")}
			/>
			<button
				type="button"
				aria-label="追加"
				onClick={() => void submit()}
				className={cn("cursor-pointer")}
			>
				<PlusCircleIcon className={cn("size-10")} />
			</button>
		</div>
	);
}

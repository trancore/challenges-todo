import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import type { TodoRecord } from "../../types/todo";
import { cn } from "../../utils/cn";

type TodoProps = {
	todo: TodoRecord;
	onToggleComplete: (todo: TodoRecord) => void;
	onDelete: (id: string) => void;
};

export function Todo({ todo, onToggleComplete, onDelete }: TodoProps) {
	return (
		<div
			className={cn(
				"px-4 py-3.5 gap-1 w-full max-w-4xl",
				"flex flex-col",
				"rounded-lg border-3 border-gray-800 bg-white shadow-sm transition-shadow hover:shadow-md",
				"motion-safe:animate-todo-enter",
				todo.completed && "opacity-75",
			)}
		>
			<p
				className={cn(
					"min-w-0",
					"flex-1",
					"text-gray-900 text-base font-medium leading-snug",
					todo.completed && "text-gray-500 line-through",
				)}
			>
				{todo.title}
			</p>
			<div className={cn("flex items-center flex-row-reverse")}>
				<button
					type="button"
					aria-label="削除"
					onClick={() => onDelete(todo.id)}
					className={cn(
						"p-2",
						"text-gray-500",
						"rounded-md transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 cursor-pointer",
					)}
				>
					<TrashIcon className={cn("size-8")} strokeWidth={1.75} />
				</button>
				<button
					type="button"
					aria-label={todo.completed ? "未完了に戻す" : "完了"}
					onClick={() => onToggleComplete(todo)}
					className={cn(
						"p-2",
						todo.completed ? "text-emerald-600" : "text-gray-500",
						"rounded-md transition-colors hover:bg-emerald-50 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 cursor-pointer",
					)}
				>
					<CheckCircleIcon className={cn("size-8")} strokeWidth={1.75} />
				</button>
			</div>
		</div>
	);
}

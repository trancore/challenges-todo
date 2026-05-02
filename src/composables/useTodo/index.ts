import { useCallback, useEffect, useState } from "react";
import { addTodo, deleteTodo, getAllTodos, putTodo } from "../../lib/todoDb";
import type { TodoRecord } from "../../types/todo";

export const useTodo = () => {
	const [todos, setTodos] = useState<TodoRecord[] | undefined>(undefined);
	const [loadError, setLoadError] = useState<string | null>(null);

	const refresh = useCallback(async () => {
		try {
			setLoadError(null);
			setTodos(await getAllTodos());
		} catch {
			setLoadError("TODOの読み込みに失敗しました");
		}
	}, []);

	useEffect(() => {
		void refresh();
	}, [refresh]);

	const handleAdd = useCallback(
		async (title: string) => {
			try {
				await addTodo(title);
				await refresh();
			} catch {
				setLoadError("TODOの追加に失敗しました");
			}
		},
		[refresh],
	);

	const handleToggleComplete = useCallback(
		async (todo: TodoRecord) => {
			try {
				await putTodo({ ...todo, completed: !todo.completed });
				await refresh();
			} catch {
				setLoadError("TODOの更新に失敗しました");
			}
		},
		[refresh],
	);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				await deleteTodo(id);
				await refresh();
			} catch {
				setLoadError("TODOの削除に失敗しました");
			}
		},
		[refresh],
	);
	return {
		todos,
		loadError,

		refresh,
		handleAdd,
		handleDelete,
		handleToggleComplete,
	};
};

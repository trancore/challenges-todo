import { AddBox } from "./components/AddBox";
import { Layout } from "./components/Layout";
import Loading from "./components/Loading";
import { Todo } from "./components/Todo";
import { useTodo } from "./composables/useTodo";

function App() {
	const { todos, loadError, handleToggleComplete, handleDelete, handleAdd } =
		useTodo();

	return (
		<Layout>
			{loadError ? (
				<p className="text-red-600 text-sm px-2" role="alert">
					{loadError}
				</p>
			) : null}
			{todos === undefined ? (
				<Loading type="spinner" />
			) : todos.length === 0 ? (
				<p>TODOがありません</p>
			) : (
				todos.map((todo) => (
					<Todo
						key={todo.id}
						todo={todo}
						onToggleComplete={handleToggleComplete}
						onDelete={handleDelete}
					/>
				))
			)}

			<AddBox onAdd={handleAdd} />
		</Layout>
	);
}

export default App;

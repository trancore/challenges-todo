import type { TodoRecord } from "../types/todo";

const DB_NAME = "todo-app";
const DB_VERSION = 1;
const STORE = "todos";

let dbPromise: Promise<IDBDatabase> | null = null;

function openTodoDb(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onerror = () =>
			reject(request.error ?? new Error("IndexedDB open failed"));
		request.onsuccess = () => resolve(request.result);
		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(STORE)) {
				const store = db.createObjectStore(STORE, { keyPath: "id" });
				store.createIndex("createdAt", "createdAt", { unique: false });
			}
		};
	});
}

function getDb(): Promise<IDBDatabase> {
	if (!dbPromise) dbPromise = openTodoDb();
	return dbPromise;
}

export async function getAllTodos(): Promise<TodoRecord[]> {
	const db = await getDb();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE, "readonly");
		const request = transaction.objectStore(STORE).getAll();
		request.onsuccess = () => {
			const list = request.result as TodoRecord[];
			list.sort((a, b) => a.createdAt - b.createdAt);
			resolve(list);
		};
		request.onerror = () => reject(request.error ?? new Error("getAll failed"));
	});
}

export async function addTodo(title: string): Promise<TodoRecord> {
	const trimmed = title.trim();
	const record: TodoRecord = {
		id: crypto.randomUUID(),
		title: trimmed,
		completed: false,
		createdAt: Date.now(),
	};
	const db = await getDb();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE, "readwrite");
		transaction.objectStore(STORE).add(record);
		transaction.oncomplete = () => resolve(record);
		transaction.onerror = () =>
			reject(transaction.error ?? new Error("add failed"));
	});
}

export async function putTodo(todo: TodoRecord): Promise<void> {
	const db = await getDb();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE, "readwrite");
		transaction.objectStore(STORE).put(todo);
		transaction.oncomplete = () => resolve();
		transaction.onerror = () =>
			reject(transaction.error ?? new Error("put failed"));
	});
}

export async function deleteTodo(id: string): Promise<void> {
	const db = await getDb();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE, "readwrite");
		transaction.objectStore(STORE).delete(id);
		transaction.oncomplete = () => resolve();
		transaction.onerror = () =>
			reject(transaction.error ?? new Error("delete failed"));
	});
}

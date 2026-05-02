# TODO アプリ

ブラウザ上で動作するシンプルな TODO 管理アプリです。タスクの追加・完了の切り替え・削除ができ、データは **IndexedDB** に保存されるため、ページを閉じても内容が残ります。

## 機能

- 初回読み込み中はスピナーでローディング表示（IndexedDB から一覧取得まで）
- TODO の追加（下部固定の入力欄、**Enter** または追加ボタン）
- 完了 / 未完了の切り替え、TODO の削除
- 作成日時順（古い順）での一覧表示
- 一覧アイテムの表示アニメーション（`prefers-reduced-motion` を尊重）
- 読み込み・更新失敗時のエラー表示

## 技術スタック

| 分類                | 技術                                    |
| ------------------- | --------------------------------------- |
| フレームワーク      | React 19（`StrictMode`）                |
| ビルド              | Vite 8                                  |
| 言語                | TypeScript                              |
| スタイル            | Tailwind CSS 4（`@tailwindcss/vite`）   |
| クラス名の結合      | `clsx` / `tailwind-merge`（`utils/cn`） |
| アイコン            | Heroicons（`@heroicons/react`）         |
| Lint / フォーマット | Biome                                   |

## 必要環境

- [Node.js](https://nodejs.org/)（LTS 推奨）
- [pnpm](https://pnpm.io/)（`pnpm-lock.yaml` あり）

| 項目 | コマンド例 | 説明 |
| --- | --- | --- |
| セットアップ | `pnpm install` | 依存パッケージのインストール |
| 開発サーバー | `pnpm dev` | ローカル開発用サーバーを起動<br>（例: `http://localhost:5173`） |
| 本番ビルド | `pnpm build` | 本番用にビルドし、成果物を `dist/` に出力 |
| ビルド結果プレビュー | `pnpm preview` | ビルドされた成果物のローカルプレビューを起動 |
| コードチェック | `pnpm check`<br>`pnpm lint`<br>`pnpm format` | `check`: Biome による lint + format（--write）<br>`lint`: lint のみ<br>`format`: format のみ |

## データの保存先

IndexedDB にデータベース名 `todo-app`、オブジェクトストア `todos` として保存します。ブラウザの開発者ツールなどからストレージを確認・削除できます。

アプリ内の状態では、一覧取得が完了するまで `todos` が `undefined`（ローディング）、取得後は配列（空でも可）になります。

## プロジェクト構成（概要）

```
src/
  main.tsx                # エントリ（`assets/css/style.css` を読み込み）
  App.tsx                 # ルート画面（ローディング / 一覧 / 空表示）
  assets/css/style.css    # グローバルスタイル（スピナー等）
  components/
    Layout/ Header/       # レイアウト・ヘッダー
    Todo/ AddBox/         # 一覧アイテム・入力バー
    Loading/              # ローディング UI（スピナー）
  composables/useTodo/    # TODO 一覧・CRUD・`refresh`
  lib/todoDb.ts           # IndexedDB アクセス
  types/todo.ts           # TODO レコード型
  utils/cn.ts             # `clsx` + `tailwind-merge` のヘルパー
```

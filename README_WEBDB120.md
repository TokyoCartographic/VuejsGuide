# WEB+DB PRESS Vol.120 特集 2「最新 Vue.js 3 入門」サンプルコード

技術評論社刊「WEB+DB PRESS Vol.120」の特集 2「最新 Vue.js 3 入門」のサンプルコードです。

## 第 2 章で使用するサンプルソースコード

どのサンプルソースコードも実行までの手順は同じです。

あらかじめ Node.js と npm がインストールされている必要があります。
これらのサンプルソースコードは、Google Chrome でのみ動作確認していますので、Google Chrome で動作させることをお勧めします。

1. 各アプリケーションのルートディレクトリ（`package.json`のあるディレクトリ）でコマンド `npm ci` を実行して、必要なモジュールをインストールします。
2. 各アプリケーションのルートディレクトリでコマンド `npm run dev` を実行してアプリケーションを起動します。
3. コマンド実行後に表示される `http://localhost:XXXX/` の URL でアプリケーションのページを開きます。
   （ポートが使用されていなければ、`http://localhost:3000/` が割り当てられます。）

- 02_basic_usage
  - todo-list ... 第 2 章で説明する ToDo リストアプリケーションの完成系です。
    - src/App.vue ... 最初に書き換えたソースコードです。
    - src/components/ToDoList.vue ... 主に説明で使用したソースコードです。
  - todo-list-with-watch-option ... watch オプションの説明で使用したフィルタ処理を遅延して行う版です。
    - src/components/ToDoList.vue ... 説明で使用したソースコードです。

## 第 3 章で使用するサンプルソースコード

どのサンプルソースコードも実行までの手順は同じです。

あらかじめ Node.js と npm がインストールされている必要があります。
これらのサンプルソースコードは、Google Chrome でのみ動作確認していますので、Google Chrome で動作させることをお勧めします。

1. 各アプリケーションのルートディレクトリ（`package.json`のあるディレクトリ）でコマンド `npm ci` を実行して、必要なモジュールをインストールします。
2. 各アプリケーションのルートディレクトリでコマンド `npm run dev` を実行してアプリケーションを起動します。
3. コマンド実行後に表示される `http://localhost:XXXX/` の URL でアプリケーションのページを開きます。
   （ポートが使用されていなければ、`http://localhost:3000/` が割り当てられます。）

- 03_advanced_usage
  - todo-list-with-components ... 第 2 章で作成した ToDo リストアプリケーションを第 3 章で書き換えた完成系です。
    - src/components/ToDoItem.vue ... コンポーネントに切り出されたソースコードです。
    - src/components/ToDoList.vue ... ToDoItem.vue コンポーネントを使用するように書き換えられたソースコードです。
  - 01_list-items ... 「コンポーネント化とコンポーネントの使用」に登場したソースコードです。
    - src/components/＊＊＊.vue ... 説明で使用したソースコードです。
  - 02_prop-down-emit-up ... 「再利用可能なコンポーネント」に登場したソースコードです。
    - src/components/ChildComponent.vue ... 子コンポーネントのソースコードです。
    - src/components/ParentComponent.vue ... 親コンポーネントのソースコードです。
  - 03_modal-dialog-component ... 「名前付きスロット」、「v-slot ディレクティブ」に登場したモーダルダイアログコンポーネントのソースコードです。
    - src/components/ModalDialog.vue ... ModalDialog のソースコードです。
    - src/components/ParentComponent.vue ... ModalDialog を使用する親コンポーネントのソースコードです。
  - 04_scoped-slots ... 「スコープ付きスロット 」に登場したソースコードです。
    - src/components/ChildComponent.vue ... 子コンポーネントのソースコードです。
    - src/components/ParentComponent.vue ... 親コンポーネントのソースコードです。
  - 05_provide-inject-counter ... 「provide オプション」、「inject オプション」に登場したソースコードです。
    - src/components/CounterProvider.vue ... 「provide オプション」で説明する CounterProvider のソースコードです。
    - src/components/CountUp.vue ... 「inject オプション」で説明する CountUp のソースコードです。
    - src/components/RenderCount.vue ... 「inject オプション」で説明する RenderCount のソースコードです。
    - src/components/ParentComponent.vue ... これらを使用したコンポーネントのソースコードです。
  - 06_scoped-css ... 「スコープ付き CSS」に登場したソースコードです。
    - src/components/MyComponent.vue ... スコープ付き CSS を使用したコンポーネントのソースコードです。
    - src/components/OtherComponent.vue ... スコープ付き CSS を使用しない「別コンポーネント」のソースコードです。
  - 07_fadein-transition ... 「`<transition>`コンポーネント」に登場したソースコードです。
    - src/components/MyComponent.vue ... 説明で使用したソースコードです。
  - 08_move-shuffle-transition-group ... 「`<transition-group>`コンポーネント」で紹介した`<transition-group>`を実際に使用したソースコードです。本誌ではソースコードの紹介はしていません。

2. 各アプリケーションのルートディレクトリコマンド `npm run dev` を実行してアプリケーションを起動します。
3. コマンド実行後に表示される `http://localhost:XXXX/` の URL でアプリケーションのページを開きます。
   （ポートが使用されていなければ、おそらく `http://localhost:3000/` が割り当てられます。）

## 第 4 章で使用するサンプルソースコード

- 04_whats_new_in_vue_3
  - 01_composition-api ... 「Composition API」に登場したソースコードです。
    - src/components/CompositionApiComponent.vue ... Composition API を使用したコンポーネントのソースコードです。
    - src/components/OptionsApiComponent.vue ... 対比として Options API を使用したコンポーネントのソースコードです。
  - 02_reactivity-api-1 ... 「Reactivity API」の最初に登場したソースコードです。
    - src/main.js ... 説明で使用したソースコードです。
  - 03_reactivity-api-2 ... 「Reactivity API」の`ref()`の紹介で登場したソースコードです。
    - src/main.js ... 説明で使用したソースコードです。
  - 04_todo-list-with-composition-api ... 第 2 章で作成した ToDo リストアプリケーションを Composition API で書き換えたソースコードです。
    - src/components/ToDoList.vue ... 説明で使用したソースコードです。
  - 05_todo-list-with-composable-function ... Composition API で書き換えた ToDo リストアプリケーションを Composable Function にしたソースコードです。
    - src/components/ToDoList.vue ... 説明で使用したソースコードです。
  - 06_teleport ... 「`<teleport>`コンポーネント」>「基本的な使い方」に登場したソースコードです。
    - src/components/MyComponent.vue ... 説明で使用したソースコードです。
  - 07_fragments ... 「Fragments」>「基本的な使い方」に登場したソースコードです。
    - src/components/＊＊＊.vue ... 説明で使用したソースコードです。
  - 08_emits ... 「Emits Component Option」>「基本的な使い方」に登場したソースコードです。
    - src/components/MyComponent.vue ... 説明で使用したソースコードです。

# Mozc Keymap Editor
　Mozcのキーマップ設定ファイルを楽に編集するためのツールです。
新規設定ファイルの作成だけでなく、既存の設定ファイルを読み込んで編集したり、複数の設定ファイルを統合することもできます。

## 使用方法
　GitHub Pagesに公開しているので、以下のURLから使用できます。
https://azishio.github.io/mozc_keymap_editor/

## できること
+ GUIを使用したキーマップの編集
  + キーとコマンドを、複数のモードに対して一括で設定できます。
+ 複数の設定ファイルの統合
  + 「統合」ボタンからファイルを選択することで、設定ファイルを統合できます。
  + すでに同一の入力キーとコマンドのペアが存在する場合、その行のモードを追加します。
  + 入力キーとコマンドのペアが存在しない場合、新しい行を追加します。
+ 設定の並べ替え
  + ドラッグアンドドロップで設定を並べ替えられます。
+ 競合する設定の警告
  + モードと入力キーが重複する設定がある場合、警告を表示します。
+ 設定ファイルのダウンロード
  + 「ダウンロード」ボタンから、編集した設定ファイルをダウンロードできます。
  + クリップボードにコピーすることもできます。

## できないこと
+ 入力キーの正常性のチェック
  + キー名の正しさは検証されません。
    + 例えば、読み込んだ設定ファイルのキー名が「Hoge」であった場合、UI上でも「Hoge」として表示され、警告は表示されません。
    + Mozcが対応しているかを問わず、任意のキーを設定できます。
  + キーがMozcに対応しているのかは、ユーザーが確認する必要があります。
    + Mozcが対応していないキーの設定を行った場合でも、警告は表示されません。

## 入力キーについて
　入力キーは[キーボードイベントのkeyの値](https://developer.mozilla.org/ja/docs/Web/API/UI_Events/Keyboard_event_key_values)を読み取って取得しています。
Mozcの設定ファイルで使用されるキー名とは一部異なるため、そのままでは正常に動作しません。

　以下は開発者が認識しているキー名の対応表です。この表にないキー名は、プログラム上で自動的に置き換わりません。
このプログラムで対応していないキー名に気づいた方は、Issueを立てていただけると助かります。

| キーボードイベントのkeyの値   | Mozcのキー名 |
|-------------------|----------|
| `Control`         | `Ctrl`   |
| `ArrowUp`         | `Up`     |
| `ArrowDown`       | `Down`   |
| `ArrowLeft`       | `Left`   |
| `ArrowRight`      | `Right`  |
| ` ` (スペース)        | `Space`  |
| `[A-Z]` (アルファベット) | `[a-z]`  |

　また、本プログラムでコンビネーションキーとして表示するキーは`meta`,`ctrl`, `alt`, `shift`のみです。それ以外のキーは、そのままのキー名で表示されます。
Mozcがそれ以外のコンビネーションキーに対応していることをご存知の方はIssueでお知らせください。

## UI詳説

### 編集タブ
　キーマップテーブル上のUIからキーマップの編集を行います。

#### 「\#」
　行番号です。他の行の設定と競合している(モードと入力キーが同一である)場合、警告が表示されます。
#### モード
　この設定が適用されるモードを指定します。
複数のモードを指定できます。
#### 入力キー
　キーボードからの入力を受け付けるキーを指定します。
このキーが押されたときに、コマンドが実行されます。

　すでにブラウザやIMEなどがコンビネーションキーと通常キーの組み合わせを予約している場合、そのキーを一度に入力することができません。
その場合、「コンビネーションキーを保持」スイッチをオンにしてください。このスイッチをオンにすると、コンビネーションキーの入力を保持します。
これによって、コンビネーションキーと通常キーを個別に入力できます。
#### コマンド
　入力キーが押されたときに実行されるコマンドを指定します。
コマンドは各カテゴリーごとにまとめられています。
#### 「-」ボタン
　この行を削除します。
#### 「+」ボタン
　新しい行を追加します。

### 出力タブ
　編集タブで編集したキーマップの設定から生成した設定ファイルの内容を表示します。
ここから設定を書き換えることはできません。

### ボタン類
#### 新規
　設定ファイルをローカルから読み込み、その内容を表示します。すでにキーマップテーブルに設定が存在する場合、それらは削除されます。
#### 追加
　設定ファイルをローカルから読み込み、その内容をキーマップテーブルに追加します。
入力キーとコマンドが同一で、モードが異なる設定が存在する場合、それらは統合されます。
#### すべて削除
　キーマップテーブルの内容をすべて削除します。
#### クリップボードにコピー
　出力タブの内容をクリップボードにコピーします。
#### ダウンロード
　出力タブの内容をファイル（`keymap.txt`）としてダウンロードします。

## ライセンス
　このプログラムはMITライセンスのもとで公開されています。

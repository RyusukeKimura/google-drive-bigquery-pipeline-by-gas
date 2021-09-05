# これは何??

Google App Script(GAS)を用いてGoogle Drive上のCSVファイルをBigQueryのテーブルに連携する

## 使い方

1. Google App Scriptに`config.js`, `helpers.js`, `jobs.js`をコピーする。
2. サービスから「BigQuery」を追加する。
3. config.gsの変数と`table_definition()`をいい感じにする。
4. `jobs.js`の`create_table_one_time()`を実行してCSVファイルを格納するBigQueryのテーブルを作成する。
5. `process_all_pending_csv_files()`を実行してGoogle Driveの指定のフォルダに格納されているCSVファイルを全てBigQueryのテーブルにロードする
6. Google App Scriptのトリガー機能を用いて`process_all_pending_csv_files()`を定期実行するように設定する

## フォルダ構成

- `config.js`: 設定ファイル
- `helpers.js`: `jobs.js`で用いる関数を定義してあるファイル
- `jobs.js`: メインの処理を実行するファイル
- `README.md`: このファイル

## 参考資料

- Towards data science: [Automatically load CSV files from Google Drive into BigQuery using AppScript](https://towardsdatascience.com/automatically-load-csv-files-from-google-drive-into-bigquery-using-appscript-631b087826d0)
- GitHub: [↑の記事のGitHubリポジトリ](https://github.com/usaussie/appscript-bigquery-csv)

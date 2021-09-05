// 設定
// true: CSVファイルをBigQueryに連携したらCSVファイルを削除する
// false: CSVファイルをBigQueryに連携したらCSVファイルを別フォルダに保存する
const TRASH_FILES_AFTER_MOVE = false;

// BigQueryとGoogle Driveの変数定義
const BQ_PROJECT_ID = 'BQのプロジェクトID';
const BQ_DATASET_ID = 'BQのデータセットID';
const PENDING_CSV_DRIVE_FOLDER_ID = "BigQueryに連携するCSVファイルを格納するGoogle DriveのフォルダID";
const PROCESSED_CSV_DRIVE_FOLDER_ID = "BigQueryに連携したCSVファイルを格納するGoogle DriveのフォルダID";

// 連携先のBigQueryのテーブル定義
function table_definition() {
  table = {};
  table.tableId = 'iris-dataset-test';
  table.schema = {
      fields: [
        {name: 'sepal_length', type: 'FLOAT'},
        {name: 'sepal_width', type: 'FLOAT'},
        {name: 'petal_length', type: 'FLOAT'},
        {name: 'petal_width', type: 'FLOAT'},
        {name: 'species', type: 'STRING'}
      ]
    };
  return table;
}

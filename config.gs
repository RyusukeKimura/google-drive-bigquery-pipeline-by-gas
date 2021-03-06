// オプション
//// true: CSVファイルをBigQueryに連携したらCSVファイルを削除する
//// false: CSVファイルをBigQueryに連携したらCSVファイルを別フォルダに保存する
const TRASH_FILES_AFTER_MOVE = false;
//// CSVファイルの先頭行を何行スキップするかを指定する
const SKIP_READING_ROWS = 1;
//// CSVファイルの文字コード。このコードではUTF-8とShift_JISに対応。他の文字コードによる動作は未確認。
const CHARACTER_CODE = 'Shift_JIS';
//// true: CSVデータを連携する度にBigQueryのテーブルを洗い替える
const REFRESH_TABLE = false;

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
        {name: 'sepal_length', type: 'FLOAT', mode: 'REQUIRED', description: '萼の長さ'},
        {name: 'sepal_width', type: 'FLOAT', mode: 'REQUIRED', description: '萼の幅'},
        {name: 'petal_length', type: 'FLOAT', mode: 'REQUIRED', description: '花弁の長さ'},
        {name: 'petal_width', type: 'FLOAT', mode: 'REQUIRED', description: '花弁の幅'},
        {name: 'species', type: 'STRING', mode: 'REQUIRED', description: '種別'}
      ]
    };
  return table;
}

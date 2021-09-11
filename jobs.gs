// このファイルのコードは触らないでください！

// create_tables_one_time()はCSVデータを格納するBigQueryのテーブルを生成する関数です
function create_table_one_time() {
    var thisTable = table_definition();
    var tableJson = constructTableJson(thisTable, BQ_PROJECT_ID, BQ_DATASET_ID);
    createTable(thisTable.tableId, BQ_PROJECT_ID, BQ_DATASET_ID, tableJson);
}

// process_all_pending_csv_files()はCSVデータをBigQueryのテーブルに流し込む関数です
function process_all_pending_csv_files() {

  // 対象のGoogle Driveのフォルダに格納されているCSVファイルを取得する
  var folder = DriveApp.getFolderById(PENDING_CSV_DRIVE_FOLDER_ID);
  var files = folder.getFiles();

  // 各CSVファイルに対して処理を行う
  while (files.hasNext()){
    var file = files.next();
    var thisTable = table_definition();
    Logger.log('Attempt to load CSV file -> BQ Job. File ID: ' + file.getName());
    Logger.log('Project: ' + BQ_PROJECT_ID + ' --- Data Set: ' + BQ_DATASET_ID + ' --- Table ID: ' + thisTable.tableId + ' --- File ID: ' + file.getId())
    bqLoadCsv(BQ_PROJECT_ID, BQ_DATASET_ID, thisTable.tableId, file.getId(), SKIP_READING_ROWS, WRITE_DISPOSITION, CHARACTER_CODE);
    Logger.log('Loaded CSV file -> BQ Job. File ID: ' + file.getName());

    if(TRASH_FILES_AFTER_MOVE) {
      file.setTrashed(true); // CSVファイルを削除する
    } else {
      file.getParents().next().removeFile(file);
      var newFolder = DriveApp.getFolderById(PROCESSED_CSV_DRIVE_FOLDER_ID);
      file.moveTo(newFolder);
      Logger.log('Moving CSV file to Processed folder. File ID: ' + file.getName() + ' --> ' + newFolder.getName());
    }
  }
}

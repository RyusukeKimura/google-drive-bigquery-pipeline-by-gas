// このファイルのコードは触らないでください！
// jobs.gsで用いる関数を定義しておく.gsファイル

// BigQueryのTable定義に必要なJSONファイルを生成する関数
function constructTableJson(thisTableData, thisProjectId, thisDatasetId) {
  return{
      tableReference: {
        projectId: thisProjectId,
        datasetId: thisDatasetId,
        tableId: thisTableData.tableId
      },
      schema: thisTableData.schema
    };
}

// BigQueryにCSVファイルをロードする関数
function bqLoadCsv(thisProjectId, thisDatasetId, thisTableId, csvFileId, thisSkipReadingRows, thisCharacterCode) {
  var file = DriveApp.getFileById(csvFileId);
  var blob = file.getBlob().setContentType('application/octet-stream');
  if(thisCharacterCode == 'UFT-8'){
    var data = blob;
  } else if(thisCharacterCode == 'Shift_JIS'){
    var csvString = blob.getDataAsString('Shift_JIS')
    var data = Utilities.newBlob('', 'text/csv', 'UTF-8 csv file').setDataFromString(csvString, "UTF-8");
  } else {
    Logger.log('Unsupported character code');
  }
  var myJob = {
    configuration: {
      load: {
        destinationTable: {
          projectId: thisProjectId,
          datasetId: thisDatasetId,
          tableId: thisTableId
        },
        skipLeadingRows: thisSkipReadingRows,
        writeDisposition: 'WRITE_APPEND',
      }
    }
  };
  loadJob = BigQuery.Jobs.insert(myJob, thisProjectId, data);
  Logger.log('Load job started. Check on the status of it here: ' +
      'https://console.cloud.google.com/bigquery?project=%s&page=jobs', BQ_PROJECT_ID);
}

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

// BigQueryにテーブルを作成する関数
function createTable(thisTableId, thisProjectId, thisDataSetId, tableReferenceJson) {
  table = BigQuery.Tables.insert(tableReferenceJson, thisProjectId, thisDataSetId);
  Logger.log('Table created: %s', thisTableId);
}

// BigQueryにCSVファイルをロードする関数
function bqLoadCsv(thisProjectId, thisDatasetId, thisTableId, csvFileId) {
  var file = DriveApp.getFileById(csvFileId);
  var data = file.getBlob().setContentType('application/octet-stream');
  var myJob = {
    configuration: {
      load: {
        destinationTable: {
          projectId: thisProjectId,
          datasetId: thisDatasetId,
          tableId: thisTableId
        },
        skipLeadingRows: 1,
        writeDisposition: 'WRITE_APPEND',
      }
    }
  };
  loadJob = BigQuery.Jobs.insert(myJob, thisProjectId, data);
  Logger.log('Load job started. Check on the status of it here: ' +
      'https://console.cloud.google.com/bigquery?project=%s&page=jobs', BQ_PROJECT_ID);
}

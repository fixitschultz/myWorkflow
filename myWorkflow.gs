/**
* sort spreadsheet assuming first row is a header row
*/
function customSort() {
var sheet = SpreadsheetApp.getActiveSheet();
var allData = sheet.getDataRange();
var range = sheet.getRange(2,2, allData.getNumRows()-1, allData.getNumColumns());
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
  var pri = headers[0].indexOf('pri')+1;
  var opened = headers[0].indexOf('opened')+1;
  var status = headers[0].indexOf('status')+1;
 range.sort([{column: pri, ascending: true},{column: status, ascending: true},{column: opened, ascending: true}]);
};

function values() {
  Logger.clear();
  var sheet = SpreadsheetApp.getActiveSheet();
var allData = sheet.getDataRange();

      var range = sheet.getRange(2,2, allData.getNumRows()-1, allData.getNumColumns());
     var values = range.getValues();
  for (var r=0; r<values.length; r++) {
    //completed	opened	Company	Customer	Task	pri	deadline (2weeks)	location of task	status
   var row = values[r],
       completed = row[0],
       opened = row[1],
       company = row[2],
       customer = row[3],
       task = row[4],
       pri = row[5],
       deadline = row[6],
       location = row[7],
       status = row[8];
   //Logger.log(customer);
   //Logger.log(status);
    if( status.toString()=="complete")
    {
      Logger.log("***"+status);
    }
    /*
    var html = HtmlService.createHtmlOutputFromFile('Status')
      .setTitle('Information')
      .setWidth(300);
  html.append("Prioity<br />");
    html.append("1: <br />");
    html.append("2: <br />");
    html.append("3: <br />");
    html.append("4: <br />");
    html.append("Status <br />");
    var task1 ="test";
    html.append(task1+": <br />");
    html.append("2: <br />");
    html.append("2: <br />");
    html.append("2: <br />");
    html.append("2: <br />");
    html.append("2: <br />");
    html.append("2: <br />");
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
    */
  }
}
function values2() {
  Logger.clear();
  var sheet = SpreadsheetApp.getActiveSheet();
var allData = sheet.getDataRange();

      var range = sheet.getRange(2,2, allData.getNumRows()-1, 2);
     var values = range.getValues();
  for (var r=0; r<values.length; r++) {
    //completed	opened	Company	Customer	Task	pri	deadline (2weeks)	location of task	status
   var row = values[r];
    Logger.log("row 0: "+row[0]);
   Logger.log("row 1: "+row[1]);
  }
}
/**
* Adds a custom menu to the active spreadsheet, containing a single menu item
* for invoking the readRows() function specified above.
* The onOpen() function, when defined, is automatically invoked whenever the
* spreadsheet is opened.
* For more information on using the Spreadsheet API, see
* https://developers.google.com/apps-script/service_spreadsheet
*/
function onOpen() {
var sheet = SpreadsheetApp.getActiveSpreadsheet();
var entries = [{
name : "Custom Sort",
functionName : "customSort"
}];
sheet.addMenu("Custom Scripts", entries);
};

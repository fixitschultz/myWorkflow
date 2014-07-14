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

function moveComplete(){
  Logger.clear();
 // The code below will move the first 5 columns over to the 6th column
 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var completeSheet = SpreadsheetApp.setActiveSheet(ss.getSheets() [4] );// getting the sheet labeled complete
  var OpenTaskSheet = SpreadsheetApp.setActiveSheet(ss.getSheets() [1] );// getting the sheet labeled open 
  var firstCol = "A";
  var lastCol = "M";
  var row = 2;
 
  
  var completeFirstCol = 3;
  var allData = OpenTaskSheet.getDataRange();
  var range = OpenTaskSheet.getRange(2,1, allData.getNumRows()-1, allData.getLastColumn());
  var values = range.getValues();
  for (var r=0; r<values.length; r++) {
    //completed	opened	Company	Customer	Task	pri	deadline (2weeks)	location of task	status
   var row = values[r];
    
    if(row[8]=="complete")
    {
      Logger.log("row 0: "+row[3]);
      Logger.log("row 1: "+row[8]);
      var tempFirst = firstCol+(r+2);
      var tempLast = lastCol+(r+2);
      Logger.log(" moving "+OpenTaskSheet.getName()+": ("+r+2+","+OpenTaskSheet.getLastColumn()+") to "+completeSheet.getName()+": ("+(completeSheet.getLastRow()+1)+", "+completeFirstCol+")");
      OpenTaskSheet.getRange((r+2),1,1,OpenTaskSheet.getLastColumn()).moveTo(completeSheet.getRange(completeSheet.getLastRow()+1,completeFirstCol));
    }
    
  }
  customSort();
}
function setMyDataValidation(){
  Logger.clear();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var OpenTaskSheet = SpreadsheetApp.setActiveSheet(ss.getSheets() [1] );// getting the sheet labeled open 
  var cell = OpenTaskSheet.getRange("D2:D"+(OpenTaskSheet.getLastRow()+20));
  var DataSheet = SpreadsheetApp.setActiveSheet(ss.getSheets() [3] );// getting the sheet labeled DataSheet
  var range = DataSheet.getRange("B2:B130");
  Logger.log(OpenTaskSheet.getLastRow());
  // rule number 1 setting Customer rule;
 var rule = SpreadsheetApp.newDataValidation()
     .requireValueInRange(range)
     .setAllowInvalid(true)
     .build();
 cell.setDataValidation(rule);
  // rule number 2 setting status rule;
 cell = OpenTaskSheet.getRange("I2:I"+(OpenTaskSheet.getLastRow()+20));
 range=DataSheet.getRange("A2:A10");
 rule=SpreadsheetApp.newDataValidation()
     .requireValueInRange(range)
     .setAllowInvalid(true)
     .build();
 cell.setDataValidation(rule);
 Logger.log(OpenTaskSheet.getLastRow());
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
},{
name : "Move Commplete",
functionName : "moveComplete"
}];
sheet.addMenu("Custom Scripts", entries);
};

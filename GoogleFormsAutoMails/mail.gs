var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("temp");
var html = HtmlService.createTemplateFromFile("mail");

function addTable(num) {
  var tbody = [];
  var id = sheet.getRange(num, 1).getValue();
  var name1 = sheet.getRange(num, 4).getValue();
  // var name2 = sheet.getRange(num, 5).getValue();
  // var consent = sheet.getRange(num, 3).getValue();
  var mailadd = sheet.getRange(num, 6).getValue();
  var date = sheet.getRange(num, 7).getValue();
  var domain = sheet.getRange(num, 8).getValue();
  // var wherefind = sheet.getRange(i, 9).getValue();
  tbody.push('<tr><td class="bg-primary">' + id + '</td><td>' + name1 + '</td><td>' + mailadd + '</td><td>' + date + '</td><td>' + domain + '</td></tr>');
  html.tbody = tbody.join("");
}



function sendmail() {
  var rowSheet = sheet.getDataRange().getLastRow();
  // for(var n = 1;n<rowSheet;n++){}
  for (var i = 2; i <= rowSheet; i++) {
    html = HtmlService.createTemplateFromFile("mail");
    addTable(i);
    var body = html.evaluate().getContent(); //mail.html
    var email = sheet.getRange(i, 6).getValue()
    var sender = "旭祭実行委員会";
    var subject = "【再送】第10回旭祭登録確認メール";
    GmailApp.sendEmail(email, subject, "body", {
      name: sender,
      htmlBody: body
    });
  }
}
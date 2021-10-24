var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("temp");
var html = HtmlService.createTemplateFromFile("mail");

function addTable() {
  var tbody = [];
  for (i = 2; i < 4; i++) {
    var id = sheet.getRange(i, 1).getValue();
    var name1 = sheet.getRange(i, 4).getValue();
    // var name2 = sheet.getRange(i, 5).getValue();
    // var consent = sheet.getRange(i, 3).getValue();
    var mailadd = sheet.getRange(i, 6).getValue();
    var date = sheet.getRange(i, 7).getValue();
    var domain = sheet.getRange(i, 8).getValue();
    // var wherefind = sheet.getRange(i, 9).getValue();
    tbody.push(
      '<tr><td class="bg-primary">' +
      id +
      "</td><td>" +
      name1 +
      "</td><td>" +
      mailadd +
      "</td><td>" +
      date +
      "</td><td>" +
      domain +
      "</td></tr>"
    );
  }
  html.tbody = tbody.join("");
}

function sendmail() {
  addTable();
  var rowSheet = sheet.getDataRange().getLastRow();
  for (var i = 2; i <= rowSheet; i++) {
    var email = sheet.getRange(i, 6).getValue();
    var sender = "旭祭実行委員会";
    var subject = "【再送】第10回旭祭登録確認メール";
  }
  var body = html.evaluate().getContent(); //mail.html

  GmailApp.sendEmail(email, subject, "body", {
    name: sender,
    htmlBody: body,
  });
}
let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("temp");
// let html = HtmlService.createTemplateFromFile("mail");

function addTable(num, html) {
  let tbody = [];
  let id = sheet.getRange(num, 1).getValue();
  let name1 = sheet.getRange(num, 4).getValue();
  // let name2 = sheet.getRange(num, 5).getValue();
  // let consent = sheet.getRange(num, 3).getValue();
  let mailadd = sheet.getRange(num, 6).getValue();
  let date = sheet.getRange(num, 7).getValue();
  let domain = sheet.getRange(num, 8).getValue();
  // let wherefind = sheet.getRange(i, 9).getValue();
  tbody.push('<tr><td class="bg-primary">' + id + '</td><td>' + name1 + '</td><td>' + mailadd + '</td><td>' + date + '</td><td>' + domain + '</td></tr>');
  html.tbody = tbody.join("");
}



function sendmail() {
  let rowSheet = sheet.getDataRange().getLastRow();
  for (let i = 2; i <= rowSheet; i++) {
    let html = HtmlService.createTemplateFromFile("mail");
    addTable(i, html);
    let body = html.evaluate().getContent(); //mail.html
    let email = sheet.getRange(i, 6).getValue()
    let sender = "旭祭実行委員会";
    let subject = "【再送】第10回旭祭登録確認メール";
    GmailApp.sendEmail(email, subject, "body", {
      name: sender,
      htmlBody: body
    });
  }
}
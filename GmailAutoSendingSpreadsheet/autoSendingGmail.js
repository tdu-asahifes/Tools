function main() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('千住メール送信用(29_17:33)');
  const firstRow = 1; 
  const mailCol = 2;  

  var rowLength = sheet.getLastRow() - (firstRow - 1);
  var mailaddressList = [];

  for(let i=0; i < rowLength; i++){
    let address = sheet.getRange(firstRow + i, mailCol).getValue();
    mailaddressList.push(address);
  }
  mailaddressList.forEach(address => {
    if(address != ''){
      sendMailToAll(address);
    }
  });

}

function sendMailToAll(address) {
  const subject = 'メールタイトルをここに記載！';

  const body = `
メール本文をここに記載！
`;

GmailApp.sendEmail(address, subject, body);

}
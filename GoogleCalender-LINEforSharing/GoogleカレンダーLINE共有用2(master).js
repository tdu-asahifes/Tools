var lineToken = "";

//Google Apps Scriptで記述。
//GoogleカレンダーのイベントをLINEのグループLINEに通知を送信する為のコードです。
//LINE Notifyが自動でGoogleカレンダーの予定を取りに行きます。
//このコードの実行時間はGoogleDriveのトリガー設定を設定することで可能。


function main() {
  var calendars = CalendarApp.getAllCalendars();
  var text = Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd') + "\n";

  for(i in calendars) 
  {
  		var calendar = calendars[i];
    	var events = calendar.getEventsForDay(new Date());

    if( events.length > 0 )
    {
    	text += "◆ " + calendar.getName() + "\n";
    }

    for(j in events) 
    {
      	var event = events[j];
      	var title = event.getTitle();
      	var start = toTime(event.getStartTime());
      	var end = toTime(event.getEndTime());
    }
   
    if( events.length > 0 )
    {
      	text += "\n";
    }
  }
   if(title == undefined)
   {
   		text += "今日予定されているイベンとはありません。\n"
	//イベントの無い日に実行。
    }
    else
    {
    	text += start+'_'+end+" "+title+'\n';
      sendToLine(text);
    }

}

function sendToLine(text){
  var token = lineToken;
  var options =
   {
     "method"  : "post",
     "payload" : "message=" + text,
     "headers" : {"Authorization" : "Bearer "+ token}

   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

function toTime(str){
  return Utilities.formatDate(str, 'JST', 'HH:mm');
}

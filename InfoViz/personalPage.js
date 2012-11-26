/*Data holders*/
var infoData;
var selectedPerson;
var tempCount=0;

function displayInformation(name){
	selectedPerson = name;
	var queryText = "SELECT Name,Department, Title, Year, Salary FROM "+gatechTableID+" WHERE Name='"+name+"' ORDER BY Year";
	queryText = encodeURIComponent(queryText);
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
	query.send(infoCallBack);
}

function infoCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	infoData = response.getDataTable();
	var formatter = new google.visualization.NumberFormat({prefix: '$'});
  	formatter.format(infoData, 4); // Apply formatter to salary column
  	var dateformatter = new google.visualization.DateFormat({pattern: "yyyy"});
  	dateformatter.format(infoData,3);
	infoData.addColumn('number','Rank');
	for(var i=0; i<infoData.getNumberOfRows();i++){
		//infoData.setValue(i,5,
			getRank(i,infoData.getFormattedValue(i,3), infoData.getNumberOfRows(), drawInfoTable);//);
	}
	//drawInfoTable();
}

function getRank(rowId,year, maxRows, callback){
	var queryText = "SELECT Name FROM "+gatechTableID+" WHERE Year="+year+" ORDER BY Salary DESC";
	// Construct the URL to grab the data
	queryText = encodeURIComponent(queryText);

    var url = ['https://www.googleapis.com/fusiontables/v1/query?sql=' + queryText + '&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ'];
    /*url.push('');
    url.push('');
    url.push('');*/
	$.ajax({
		url: url.join(''),
		dataType: 'jsonp',
		context: {rowId: rowId, maxRows: maxRows, callback: callback},
		success: function (data) {
			var rows = data['rows'];
			for (var i=0;i<rows.length; i++) {
				if(rows[i][0]==selectedPerson){
					infoData.setValue(rowId,5,i+1);// i+1;
					tempCount++;
					break;
				}
			}
			if (tempCount == maxRows) {
				callback();
			}
		}
	});
}

function drawInfoTable(){
	var options = {
		showRowNumber: true,
		firstRowNumber: 1
	};
	infoTable = new google.visualization.Table(document.getElementById('info'));
	infoTable.draw(infoData, options);
}
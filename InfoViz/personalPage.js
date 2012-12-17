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
	infoData.addColumn('string','Overall Rank');
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
					infoData.setValue(rowId,5,(i+1).toString()+"/"+rows.length.toString());// i+1;
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
		firstRowNumber: 1,
	};
	infoTable = new google.visualization.Table(document.getElementById('info'));
	infoTable.draw(infoData, options);
	drawLineChart();
}

function drawLineChart(){
	var options = {
		title: 'Income over the Years',
		vAxis: {title: 'Salary/Rank',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Year',  titleTextStyle: {color: 'red'}},
		height: 200,
		width: 630,
		chartArea:{left:50,bottom:20,width:"70%",height:"50%"},
		titleTextStyle: {color: 'black', fontName: 'Calibri', fontSize: 16},
		pointSize: 4
    };
    var dtable = new google.visualization.DataTable();
    dtable.addColumn('string','Year');
    dtable.addColumn('number','Salary(in thousands)');
    dtable.addColumn('number','Percentile(across all Titles and all Departments)');
    dtable.addRows(infoData.getNumberOfRows());
    for(var i=0; i<infoData.getNumberOfRows();i++){
    	dtable.setValue(i,0,infoData.getFormattedValue(i,3));
    	dtable.setValue(i,1,infoData.getValue(i,4)/1000);
    	var n=infoData.getValue(i,5).split('/');
    	var val = (parseInt(n[1])-parseInt(n[0]))*100/parseInt(n[1]);
    	dtable.setValue(i,2,val);
    }
    var formatter = new google.visualization.NumberFormat({suffix: '%'});
    	formatter.format(dtable, 2); // Apply formatter to percentile column
    var formatter = new google.visualization.NumberFormat({prefix: '$', fractionDigits: '5'});
      formatter.format(dtable, 1); // Apply formatter to salary column
	var chart = new google.visualization.LineChart(document.getElementById('chart'));
	chart.draw(dtable,options);
}
/*Code for GaTech Homescreen visualizations
1. Average salary by TITLE (Left)
2. Average Salary by DEPT (Center bottom)
3. Top 10 salaries (Right)
4. Salary range (Center top) NOT YET IN
*/
var gatechTableID = "1WcLU5ysaaR5Bo0Ypaz7G4RRogOzCEYb_yt1ARC4";	//gatech information all years
var gatech2011TableID = "1nbznINBBG8JFbhs7b7WDC8ExF9SdlmvBaAxhB6s"; //wont need to use this anywhere
var APIkey = "AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ"; /* need to include this API key at the end of query like "&key=APIkey" (no spaces) if accessing from browser*/
/*Visualization handles*/
var leftChart;
var centerTopChart;
var centerBottomChart;
var rightChart;
/*Data holders*/
var leftData;
var centerTopData;
var centerBottomData;
var rightData;
var top10Data;


function drawVisualizations(year){
	/*Avg sal by title*/
	var queryText1 = "SELECT%20Title,%20AVERAGE(Salary)%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year+"%20GROUP%20BY%20Title%20ORDER%20BY%20AVERAGE(Salary)%20DESC";
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText1);
	query.send(leftCallBack);

	/*Avg sal by dept*/
	var queryText2 = "SELECT%20Department,%20AVERAGE(Salary)%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year+"%20GROUP%20BY%20Department%20ORDER%20BY%20AVERAGE(Salary)%20DESC";
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText2);
	query.send(centerBottomCallBack);

	/*Top 10*/
	var queryText3 = "SELECT%20Name,%20Title,%20Department,%20Salary%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year+"%20ORDER%20BY%20Salary%20DESC%20LIMIT%2010";
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText3);
	query.send(rightCallBack);

	/*Sal range by title*/
	var queryText4 = "SELECT%20Title,%20MINIMUM(Salary),%20AVERAGE(Salary),%20AVERAGE(Salary),%20MAXIMUM(Salary)%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year+"%20GROUP%20BY%20Title%20ORDER%20BY%20Title%20ASC";
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText4);
	query.send(centerTopCallBack);
}


function browsingQueries(year){
	/*Autocomplete search*/
	/*var queryText5 = "SELECT%20Name%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year;
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText5);
	query.send(autoCompleteCallBack);*/
	fetchAutocompleteData(year);

	/*Populate browse dept*/
	var queryText6 = "SELECT%20Department%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year;
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText6);
	query.send(populateDeptCallBack);
}

function fetchAutocompleteData(year){
	var queryText5 = "SELECT%20Name%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year;
	// Construct the URL to grab the data
    var url = ['https://www.googleapis.com/fusiontables/v1/query'];
    url.push('?sql=' + queryText5);
    url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
    url.push('&callback=?');
	// Get the variables from the table, in a loop
	var availableTags = new Array();
	$.ajax({
		url: url.join(''),
		dataType: 'jsonp',
		success: function (data) {
			var rows = data['rows'];
			for (var i in rows) {
				availableTags[i]=rows[i][0];
			}
		}
	});
	$("#tags").autocomplete({
       source: availableTags
    });
}


function initMap() {
  	var map = new GMap2(document.getElementById('maps'));
    /*map.setMapType(G_HYBRID_MAP);*/
    var center = new GLatLng(33.7791792, -84.3996303);
    map.setCenter(center, 14);
  	var marker = new GMarker(center);
	GEvent.addListener(marker, "click", function() {
      map.closeInfoWindow();
    });
	GEvent.addListener(marker, "click", function() {
      marker.openInfoWindowHtml("Georgia Institute of Technology");
    });
      map.addOverlay(marker);
}


function leftCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	leftData = response.getDataTable();
	drawLeftChart();
}

function drawLeftChart(){
	var options = {
    	title: 'Average Salary by Title',
        vAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}},
		isStacked: true,
		height: 350,
		legend: {position: 'none'}
    };
	leftChart = new google.visualization.BarChart(document.getElementById('left'));
	leftChart.draw(leftData, options);

	function barMouseOver(e) {
		//alert('Mouserover');
    	//leftChart.setSelection([e]);
    	//centerTopChart.highlightRow([e],false);
    	var centerTopIndex = centerTopData.getFilteredRows([{column:0, value: leftData.getValue(e.row,0)}]);
    	if (centerTopIndex.length > 0){
			highlightSeriesInCenterTopData(centerTopIndex[0]);
		}
  	}

  	function barMouseOut(e) {
  		var centerTopIndex = centerTopData.getFilteredRows([{column:1, value: 0},{column:2, value: 0},{column:3, value: 0},{column:4, value: 0}]);
  		if(centerTopIndex.length > 0){
  			removeHighlightInCenterTopData(centerTopIndex[0]);
  		}
    	//leftChart.setSelection([{'row': null, 'column': null}]);
    	//centerTopChart.setSelection([{'row': null, 'column': null}]);
  	}

	google.visualization.events.addListener(leftChart, 'onmouseover', barMouseOver);
    google.visualization.events.addListener(leftChart, 'onmouseout', barMouseOut);
}

function rightCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	top10Data = response.getDataTable();
	rightData = new google.visualization.DataTable();
	rightData.addColumn('string','Name');
	rightData.addColumn('number','Salary');
	rightData.addRows(10);
	for(var i=0; i<10; i++){
		rightData.setValue(i,0,top10Data.getValue(i,0));
		rightData.setValue(i,1,top10Data.getValue(i,3));
	}
	drawRightChart();
}

function drawRightChart(){
	var options = {
		title: 'Average Salary by Title',
		vAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}},
		isStacked: true,
		height: 350,
		width: 250
	};
	rightChart = new google.visualization.Table(document.getElementById('right'));
    rightChart.draw(rightData, options);
    function tableSelected(e){
    	selected = rightChart.getSelection();
    	if(selected.length > 0){
    		var index = selected[0].row;
    		var leftIndex = leftData.getFilteredRows([{column:0, value: top10Data.getValue(index,1)}]);
    		if(leftIndex.length > 0)
    			highlightRowInLeftData(leftIndex[0]);
    		var centerTopIndex = centerTopData.getFilteredRows([{column:0, value: top10Data.getValue(index,1)}]);
    		if(centerTopIndex.length > 0)
    			highlightSeriesInCenterTopData(centerTopIndex[0]);
    		var centerBottomIndex = centerBottomData.getFilteredRows([{column:0, value: top10Data.getValue(index,2)}]);
    		if(centerBottomIndex.length > 0)
    			highlightColumnInCenterBottomData(centerBottomIndex[0]);
    	}
    }
	google.visualization.events.addListener(rightChart,'select',tableSelected);
    //google.visualization.events.addListener(rightChart,'onmouseout',tableMouseOut);
}

function tableMouseOut(e){
	if(rightChart.getSelection().length > 0){
		rightChart.setSelection([{'row': null, 'column': null}]);
    	var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
  		if(leftIndex.length > 0){
  			removeHighLightInLeftData(leftIndex[0]);
		}
    	var centerTopIndex = centerTopData.getFilteredRows([{column:1, value: 0},{column:2, value: 0},{column:3, value: 0},{column:4, value: 0}]);
  		if(centerTopIndex.length > 0){
  			removeHighlightInCenterTopData(centerTopIndex[0]);
  		}
    	var centerBottomIndex = centerBottomData.getFilteredRows([{column:1, value: 0}]);
  		if(centerBottomIndex.length > 0){
  			removeHighlightInCenterBottomData(centerBottomIndex[0]);
		}
	}
}

function centerBottomCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	
	centerBottomData = response.getDataTable();
	drawCenterBottomChart();
}

function drawCenterBottomChart(){
	var options = {
		title: 'Average Salary by Department',
		vAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Department',  titleTextStyle: {color: 'red'}},
		isStacked: true,
		height: 175,
		width: 500,
		legend: {position: 'none'}
    };

	centerBottomChart = new google.visualization.ColumnChart(document.getElementById('bottom'));
	centerBottomChart.draw(centerBottomData, options);
}

function centerTopCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	centerTopData = response.getDataTable();
	for(var i=0; i<4; i++){
		centerTopData.addColumn('number','');
		for(var j=0; j<centerTopData.getNumberOfRows(); j++)
			centerTopData.setValue(j,i+5,0);
	}
	drawCenterTopChart();
}


function drawCenterTopChart(){
	var options = {
		title: 'Salary Range By Title',
		vAxis: {title: 'Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Title',  titleTextStyle: {color: 'red'}},
		height: 175,  
      	width: 500,
      	/*series: [{color: 'Black'}],
      	candlestick:{risingColor: {stroke: "Green"}},*/
      	legend: {position: 'none'}
	};

	centerTopChart = new google.visualization.CandlestickChart(document.getElementById('top'));
	centerTopChart.draw(centerTopData, options);

	function rangeMouseOver(e) {
		var leftIndex = leftData.getFilteredRows([{column:0, value: centerTopData.getValue(e.row,0)}]);
		if (leftIndex.length > 0){
			/*Modify leftData*/
			highlightRowInLeftData(leftIndex[0]);
		}
    	//centerTopChart.setSelection([e]);
    	//leftChart.setSelection([e]);
  	}

  	function rangeMouseOut(e) {
  		var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
  		if(leftIndex.length > 0){
  			removeHighLightInLeftData(leftIndex[0]);
		}
    	//centerTopChart.setSelection([{'row': null, 'column': null}]);
    	//leftChart.setSelection([{'row': null, 'column': null}]);
  	}

	google.visualization.events.addListener(centerTopChart, 'onmouseover', rangeMouseOver);
    google.visualization.events.addListener(centerTopChart, 'onmouseout', rangeMouseOut);
}


function populateDeptCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	var availableValues = data.getDistinctValues(0);
	var combo = document.getElementById('listDept');
	for(var i=0; i<availableValues.length; i++)
		combo.options[i+1]=new Option(availableValues[i],availableValues[i]);
}

function highlightRowInLeftData(rowInd){
	var tempData = new google.visualization.DataTable();
	tempData.addRows(leftData.getNumberOfRows());
	tempData.addColumn('string','Title');
	tempData.addColumn('number','Salary');
	tempData.addColumn('number','Selected');
	for(var i=0; i<leftData.getNumberOfRows(); i++){
		tempData.setValue(i,0,leftData.getValue(i,0));
		if(i==rowInd){
			tempData.setValue(i,1,0);
			tempData.setValue(i,2,leftData.getValue(i,1));
		}
		else{
			tempData.setValue(i,1,leftData.getValue(i,1));
			tempData.setValue(i,2,0);
		}
	}
	leftData = tempData;
	drawLeftChart();	
}

function removeHighLightInLeftData(rowInd){
	leftData.setValue(rowInd,1,leftData.getValue(rowInd,2));
  	leftData.setValue(rowInd,2,0);
  	drawLeftChart();
}

function highlightSeriesInCenterTopData(rowInd){
	var tempData = new google.visualization.DataTable();
	tempData.addRows(centerTopData.getNumberOfRows());
	tempData.addColumn('string','Title');
	for(var i=0; i<8; i++)
		tempData.addColumn('number','');
	for(var i=0; i<centerTopData.getNumberOfRows(); i++){
		tempData.setValue(i,0,centerTopData.getValue(i,0));
		if(i==rowInd){
			for(var j=0; j<4; j++){
				tempData.setValue(i,j+1,0);
				tempData.setValue(i,j+5,centerTopData.getValue(i,j+1));	
			}
		}
		else{
			for(var j=0; j<4; j++){
				tempData.setValue(i,j+1,centerTopData.getValue(i,j+1));
				tempData.setValue(i,j+5,0);
			}
		}
	}
	centerTopData = tempData;
	drawCenterTopChart();	
}

function removeHighlightInCenterTopData(rowInd){
	for(var j=0; j<4; j++){
  		centerTopData.setValue(rowInd,j+1,centerTopData.getValue(rowInd,j+5));	
  		centerTopData.setValue(rowInd,j+5,0);
  	}
  	drawCenterTopChart();
}

function highlightColumnInCenterBottomData(rowInd){
	var tempData = new google.visualization.DataTable();
	tempData.addRows(centerBottomData.getNumberOfRows());
	tempData.addColumn('string','Department');
	tempData.addColumn('number','Average');
	tempData.addColumn('number','Selected');
	for(var i=0; i<centerBottomData.getNumberOfRows(); i++){
		tempData.setValue(i,0,centerBottomData.getValue(i,0));
		if(i==rowInd){
			tempData.setValue(i,1,0);
			tempData.setValue(i,2,centerBottomData.getValue(i,1));
		}
		else{
			tempData.setValue(i,1,centerBottomData.getValue(i,1));
			tempData.setValue(i,2,0);
		}
	}
	centerBottomData = tempData;	
	drawCenterBottomChart();
}

function removeHighlightInCenterBottomData(rowInd){
	centerBottomData.setValue(rowInd,1,centerBottomData.getValue(rowInd,2));
  	centerBottomData.setValue(rowInd,2,0);
  	drawCenterBottomChart();
}
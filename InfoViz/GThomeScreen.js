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
	var queryText5 = "SELECT%20Name%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year;
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText5);
	query.send(autoCompleteCallBack);

	/*Populate browse dept*/
	var queryText6 = "SELECT%20Department%20FROM%20"+gatechTableID+"%20WHERE%20Year="+year;
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText6);
	query.send(populateDeptCallBack);
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
			var tempData = new google.visualization.DataTable();
			tempData.addRows(centerTopData.getNumberOfRows());
			tempData.addColumn('string','Title');
			for(var i=0; i<8; i++)
				tempData.addColumn('number','');
			for(var i=0; i<centerTopData.getNumberOfRows(); i++){
				tempData.setValue(i,0,centerTopData.getValue(i,0));
				if(i==centerTopIndex[0]){
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
		}
		centerTopData = tempData;
		drawCenterTopChart();
  	}

  	function barMouseOut(e) {
  		var centerTopIndex = centerTopData.getFilteredRows([{column:1, value: 0},{column:2, value: 0},{column:3, value: 0},{column:4, value: 0}]);
  		if(centerTopIndex.length > 0){
  			for(var j=0; j<4; j++){
  				centerTopData.setValue(centerTopIndex[0],j+1,centerTopData.getValue(centerTopIndex[0],j+5));	
  				centerTopData.setValue(centerTopIndex[0],j+5,0);
  			}
  		}
		drawCenterTopChart();
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

	rightData = response.getDataTable();
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
      	series: [{color: 'Black'}],
      	candlestick:{risingColor: {stroke: "Red"}},
      	legend: {position: 'none'}
	};

	centerTopChart = new google.visualization.CandlestickChart(document.getElementById('top'));
	centerTopChart.draw(centerTopData, options);

	function rangeMouseOver(e) {
		var leftIndex = leftData.getFilteredRows([{column:0, value: centerTopData.getValue(e.row,0)}]);
		if (leftIndex.length > 0){
			/*Modify leftData*/
			var tempData = new google.visualization.DataTable();
			tempData.addRows(leftData.getNumberOfRows());
			tempData.addColumn('string','Title');
			tempData.addColumn('number','Salary');
			tempData.addColumn('number','Selected');
			for(var i=0; i<leftData.getNumberOfRows(); i++){
				tempData.setValue(i,0,leftData.getValue(i,0));
				if(i==leftIndex[0]){
					tempData.setValue(i,1,0);
					tempData.setValue(i,2,leftData.getValue(i,1));
				}
				else{
					tempData.setValue(i,1,leftData.getValue(i,1));
					tempData.setValue(i,2,0);
				}
			}	
		}
		leftData = tempData;
		drawLeftChart();
    	//centerTopChart.setSelection([e]);
    	//leftChart.setSelection([e]);
  	}

  	function rangeMouseOut(e) {
  		var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
  		if(leftIndex.length > 0){
  			leftData.setValue(leftIndex[0],1,leftData.getValue(leftIndex[0],2));
  			leftData.setValue(leftIndex[0],2,0);
		}
		drawLeftChart();
    	//centerTopChart.setSelection([{'row': null, 'column': null}]);
    	//leftChart.setSelection([{'row': null, 'column': null}]);
  	}

	google.visualization.events.addListener(centerTopChart, 'onmouseover', rangeMouseOver);
    google.visualization.events.addListener(centerTopChart, 'onmouseout', rangeMouseOut);
}


function autoCompleteCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	/*var len = data.getNumberOfRows();
	for(var i=0; i<len; i++)
		availableTags[i]=response.getValue(i,0);*/
	var availableTags = data.getDistinctValues(0);
	$("#tags").autocomplete({
       source: availableTags
    });
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
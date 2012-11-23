/*Code for GaTech Homescreen visualizations
1. Average salary by TITLE (Left)
2. Average Salary by DEPT (Center bottom)
3. Top 10 salaries (Right)
4. Salary range (Center top) NOT YET IN
*/
var gatechTableID = "1WcLU5ysaaR5Bo0Ypaz7G4RRogOzCEYb_yt1ARC4";	//gatech information all years
var gatech2011TableID = "1nbznINBBG8JFbhs7b7WDC8ExF9SdlmvBaAxhB6s"; //wont need to use this anywhere
var APIkey = "AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ"; /* need to include this API key at the end of query like "&key=APIkey" (no spaces) if accessing from browser*/

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

function initialize() {
  
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

		var data = response.getDataTable();
		var options = {
          title: 'Average Salary by Title',
          vAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		  hAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}},
		  isStacked: true,
		  height: 300
        };

        var chart = new google.visualization.BarChart(document.getElementById('left'));
        chart.draw(data, options);
}

function rightCallBack(response){
	if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
			return;
		}

		var data = response.getDataTable();
    var dtable
		var options = {
          title: 'Average Salary by Title',
          vAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		  hAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}},
		  isStacked: true,
		  height: 300,
		  width: 250
        };

    var chart = new google.visualization.Table(document.getElementById('right'));
    chart.draw(data, options);
}

function centerBottomCallBack(response){
	if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
			return;
		}

		var data = response.getDataTable();
		var options = {
          title: 'Average Salary by Department',
          vAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		  hAxis: {title: 'Department',  titleTextStyle: {color: 'red'}},
		  isStacked: true,
		  height: 150
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('bottom'));
        chart.draw(data, options);
}

function centerTopCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	var options = {
          title: 'Salary Range By Title',
          vAxis: {title: 'Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		  hAxis: {title: 'Title',  titleTextStyle: {color: 'red'}},
		  height: 200,  
      	width: 400,
      backgroundColor:{stroke: "Black"},
      candlestick:{risingColor: {stroke: "Red"}}
        };

        var chart = new google.visualization.CandlestickChart(document.getElementById('top'));
        chart.draw(data, options);
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
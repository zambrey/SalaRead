/*Code for GaTech Homescreen visualizations
1. Average salary by TITLE (Left)
2. Average Salary by DEPT (Center bottom)
3. Top 10 salaries (Right)
4. Salary range (Center top) NOT YET IN
*/

/*Data source IDs*/
var oldGatechTable = "13MFP5CQRCfZsvbkKnwEIYfcpniM5yFMzCX1Nmcc";
var gatechTableID = "1ttYhH0Bi9AEXWujX1Limq2Q0zrZB-yE-tTrwy2Y";	//gatech information all years

var gatech2011TableID = "1nbznINBBG8JFbhs7b7WDC8ExF9SdlmvBaAxhB6s"; //wont need to use this anywhere
var APIkey = "AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ"; /* need to include this API key at the end of query like "&key=APIkey" (no spaces) if accessing from browser*/
var gisTableID = "1kbn2QJUnd1dphKGykAimc1BaSriVvLVsEHyxBMA";

/*Miscellaneous*/
var joinedDataTable;
var map;

/*Filters*/
var selectedYear = '2011';
var salaryRange = new Array();
var selectedTitle = "";
var selectedDepartment = "";
var salaryMax = 900000;
var salaryMin = 10000; 

function init(){
	drawMap();
	initCharts();
    initMapExpenseValues();
	initSlider();
}

function initMapExpenseValues() {
  	var deptExpenseQueryText = "SELECT Department, SUM(Salary) FROM "+gatechTableID+" WHERE Year='"+ selectedYear +"'GROUP BY Department";
  	deptExpenseQueryText = encodeURIComponent(deptExpenseQueryText);
  	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + deptExpenseQueryText);
	query.send(deptExpenseCallBack);
}

function initMapLocations(){
	var gisQueryText = "SELECT Department, Latitude, Longitude FROM "+gisTableID;
	gisQueryText = encodeURIComponent(gisQueryText);
	query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + gisQueryText);
	query.send(gisCallBack);
}

function initSlider() {
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 900000,
            values: [ 10000, 900000 ],
			step: 10000,
            stop: function( event, ui ) {
                //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
				salaryMin = $( "#slider-range" ).slider( "values", 0 );
				salaryMax = $( "#slider-range" ).slider( "values", 1 );
				var valLabel = document.getElementById('valueSlider');
				valLabel.innerHTML = 'Salary Range:' + salaryMin + ' - ' +salaryMax;
				drawCharts();
            }
        });
        //$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
          //" - $" + $( "#slider-range" ).slider( "values", 1 ) );
		  		salaryMin = $( "#slider-range" ).slider( "values", 0 );
				salaryMax = $( "#slider-range" ).slider( "values", 1 );
		var valLabel = document.getElementById('valueSlider');
		valLabel.innerHTML = 'Salary Range:' + salaryMin + ' - ' +salaryMax;
}

function drawCharts(){
	/*Avg sal by title*/
	if(selectedTitle == ""){
		var queryText1 = "SELECT Title, AVERAGE(Salary) FROM "+gatechTableID+" WHERE "+ buildWhereClause() + " GROUP BY Title ORDER BY AVERAGE(Salary) DESC";
		queryText1 = encodeURIComponent(queryText1);
		var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText1);
		query.send(leftCallBack);
	}

	/*Avg sal by dept*/
	if(selectedDepartment==""){
		var queryText2 = "SELECT Department, AVERAGE(Salary) FROM "+gatechTableID+" WHERE "+ buildWhereClause() +" GROUP BY Department ORDER BY AVERAGE(Salary) DESC";
		queryText2 = encodeURIComponent(queryText2);
		var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText2);
		query.send(centerBottomCallBack);
	}

	/*Top 10*/
	var queryText3 = "SELECT Name, Title, Department, Salary, Gender FROM "+gatechTableID+" WHERE "+ buildWhereClause() +" ORDER BY Salary DESC LIMIT 10";
	queryText3 = encodeURIComponent(queryText3);
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText3);
	query.send(rightCallBack);

	/*Sal range by title*/
	if(selectedTitle==""){
		var queryText4 = "SELECT Title, MINIMUM(Salary), AVERAGE(Salary), AVERAGE(Salary), MAXIMUM(Salary) FROM "+gatechTableID+" WHERE "+ buildWhereClause() +" GROUP BY Title ORDER BY Title ASC";
		queryText4 = encodeURIComponent(queryText4);
		var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText4);
		query.send(centerTopCallBack);
	}

	/*Avg sal by gender*/
	var queryText5 = "SELECT Gender, AVERAGE(Salary) FROM "+gatechTableID+" WHERE "+ buildWhereClause() +" GROUP BY Gender";
	queryText5 = encodeURIComponent(queryText5);
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText5);
	query.send(genderCallBack);
}


function populateFiltersData(year){
	fetchAutocompleteData(year);

	/*Populate browse dept*/
	var queryText6 = "SELECT Department FROM "+gatechTableID+" WHERE Year="+year +" GROUP BY Department";
	queryText6 = encodeURIComponent(queryText6);
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText6);
	query.send(populateDeptCallBack);

	/*Populate browse title*/
	queryText6 = "SELECT Title FROM "+gatechTableID+" WHERE Year="+year +" GROUP BY Title";
	queryText6 = encodeURIComponent(queryText6);
	query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText6);
	query.send(populateTitleCallBack);
}


function changeTitle(title){
	var titleList = document.getElementById('listTitle');
	if(titleList.selectedIndex == 0){
		selectedTitle = "";
		drawCharts();
	}
	else{
		selectedTitle=title;
		drawCharts();
		/*Highlight selected department in centerBottomChart*/
		var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
      	if(leftIndex.length > 0){
        	removeHighLightInLeftData(leftIndex[0]);
    	}

    	leftIndex = leftData.getFilteredRows([{column:0, value: title}]);
    	if (leftIndex.length > 0){
      		highlightRowInLeftData(leftIndex[0]);
    	}
    	removeHighlightInCenterTopData();
		var centerTopIndex = centerTopData.getFilteredRows([{column:0, value: title}]);
      	if (centerTopIndex.length > 0){
      		highlightSeriesInCenterTopData(centerTopIndex[0]);
    	}
	}
}

function changeDepartment(dept){
	var deptList = document.getElementById('listDept');
	if(deptList.selectedIndex == 0){
		removeHighlightFromMapMarker();
		selectedDepartment = "";
		drawCharts();
	}
	else{
		selectedDepartment=dept;
		highlightDepartmentInMap(selectedDepartment);
		drawCharts();
		/*Highlight selected department in centerBottomChart*/
		var centerBottomIndex = centerBottomData.getFilteredRows([{column:1, value: 0}]);
  		if(centerBottomIndex.length > 0){
  			removeHighlightInCenterBottomData(centerBottomIndex[0]);
  		}
		centerBottomIndex = centerBottomData.getFilteredRows([{column:0, value: dept}]);
    	if(centerBottomIndex.length > 0)
    		highlightColumnInCenterBottomData(centerBottomIndex[0]);
	}
}

function changeYear(year){
	selectedYear = year;
	clearAllSelections();
	initMapExpenseValues();	/*Eventually calls initMapLocations*/
	drawCharts(year);
	populateFiltersData(year);
	 	$("a.button2008, a.button2009, a.button2010, a.button2011").css({
			'color': 'rgba(0,0,0,0.6)',
  			'text-decoration': 'none',
			'font-size': '18px',
			'font-weight': 'normal',
			'text-align' :'center',
			'background-image': 'url("button.png")',
			//'padding': '4px 57px 3px'
		});
		for(var i=2008; i<=2011; i++)
		{
			//alert("i" + i);
			//alert("year" + year)
			if(i != year)
			{
				//alert("button" + i);
				$("a.button" + i).hover(function(){
					$(this).css({
					'color': 'rgba(0,0,0,0.6)',
  					'text-decoration': 'none',
					'font-size': '18px',
					'font-weight': 'normal',
					'text-align' :'center',
					'background-image': 'url("hover.png")',
					//'padding': '4px 57px 3px'
					});
				},
				function()
					{
					$(this).css({
					'color': 'rgba(0,0,0,0.6)',
  					'text-decoration': 'none',
					'font-size': '18px',
					'font-weight': 'normal',
					'text-align' :'center',
					'background-image': 'url("button.png")',
					//'padding': '4px 57px 3px'
					});

				});
			}	
			else
			{		
				$("a.button" + i).hover(function(){
					$(this).css({                
					'color': 'white',
  					'text-decoration': 'none',
					'font-size': '18px',
					'font-weight': 'normal',
					'text-align' :'center',
					'background-image': 'url("button_state.png")',
					//'padding': '4px 57px 3px'                        
					});	
				});
			}
		}
		
		$("a.button"+year).css({                
			'color': 'white',
  			'text-decoration': 'none',
			'font-size': '18px',
			'font-weight': 'bold',
			'text-align' :'center',
			'background-image': 'url("button_state.png")',
			'padding': '4px 57px 3px'                        
});
}

function clearAllSelections(){ 
	//Called when year changed
	clearMapSelection();
	selectedDepartment = "";
	selectedTitle="";
	initSlider();
}

function buildWhereClause(){
	//Year
	var clause="";
	if(selectedYear != ""){
		clause = clause + "Year='" + selectedYear + "' AND ";
	}
	//Department
	if(selectedDepartment != ""){
		clause = clause + "Department='" + selectedDepartment + "' AND ";
	}
	//Title
	if(selectedTitle != ""){
		clause = clause + "Title='" + selectedTitle + "' AND ";
	}
	//Range
	clause = clause + "Salary>=" + salaryMin +" AND Salary<=" + salaryMax; 
	return clause;
}

function fetchAutocompleteData(year){
	var queryText5 = "SELECT Name FROM "+gatechTableID+" WHERE Year="+year;
	// Construct the URL to grab the data
	queryText5 = encodeURIComponent(queryText5);
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
       source: availableTags,
       select: function(event, ui){onPersonSelected(event, ui);}
    });
}

function onPersonSelected(event,ui){
	sessionStorage.clear();
	sessionStorage.setItem(ui.item.label,'selectedPerson');
	//window.location.href = "Personal.html"
	// Open in a pop-up window
	window.open("Personal.html","Employee Details","status=1,width=650,height=400,resizable=1");
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

function populateTitleCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	var availableValues = data.getDistinctValues(0);
	var combo = document.getElementById('listTitle');
	for(var i=0; i<availableValues.length; i++)
		combo.options[i+1]=new Option(availableValues[i],availableValues[i]);
}


/*Visualization handles*/
var leftChart;
var centerTopChart;
var centerBottomChart;
var rightChart;
var genderChart;
var infoWindow=null;
var markers  = [];

function initCharts(){
	leftChart = new google.visualization.BarChart(document.getElementById('left'));
	rightChart = new google.visualization.Table(document.getElementById('right'));
	centerBottomChart = new google.visualization.ColumnChart(document.getElementById('bottom'));
	centerTopChart = new google.visualization.CandlestickChart(document.getElementById('top'));
	genderChart = new google.visualization.BarChart(document.getElementById('gender'));

	google.visualization.events.addListener(leftChart, 'onmouseover', barMouseOver);
    google.visualization.events.addListener(leftChart, 'onmouseout', barMouseOut);
    google.visualization.events.addListener(rightChart,'select',tableSelected);
    //google.visualization.events.addListener(rightChart,'onmouseout',tableMouseOut);
    google.visualization.events.addListener(centerTopChart, 'onmouseover', rangeMouseOver);
    google.visualization.events.addListener(centerTopChart, 'onmouseout', rangeMouseOut);
}

function drawLeftChart(){
	var options = {
    	title: 'Average Salary by Title',
        //vAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		//hAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}},
		isStacked: true,
		height: 250,
		//width:300,
		backgroundColor : '#FDFDD9',
		titleTextStyle: {color: 'black', fontName: 'Calibri', fontSize: 14},
		chartArea:{left:100,bottom:20,width:"62%",height:"70%"},
		legend: {position: 'none'}
    };
    var formatter = new google.visualization.NumberFormat({prefix: '$'});
    	formatter.format(leftData, 1); // Apply formatter to second column
	leftChart.draw(leftData, options);

}

function drawRightChart(){
	var options = {
		//height: 370,
		width: 239,
		backgroundColor : '#FDFDD9',
		titleTextStyle: {color: 'black', fontName: 'Calibri', fontSize: 14},
		showRowNumber: true,
		firstRowNumber: 1
	};
	var formatter = new google.visualization.NumberFormat({prefix: '$'});
  	formatter.format(rightData, 1); // Apply formatter to second column
    rightChart.draw(rightData, options);
	
    
}

function drawCenterBottomChart(){
	var options = {
		title: 'Average Salary by Department',
		//vAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		//hAxis: {title: 'Department',  titleTextStyle: {color: 'red'}, slantedText: false, maxAlternation:4, showTextEvery:1, maxTextLines:4},
		isStacked: true,
		//height: 238,
		width: 700,
		fontSize : 10,
		backgroundColor : '#FDFDD9',
		titleTextStyle: {color: 'black', fontName: 'Calibri', fontSize: 14},
		legend: {position: 'none'}
    };
    var formatter = new google.visualization.NumberFormat({prefix: '$'});
    	formatter.format(centerBottomData, 1); // Apply formatter to second column
	centerBottomChart.draw(centerBottomData, options);
}

function drawCenterTopChart(){
	var options = {
		title: 'Salary Range By Title',
		//vAxis: {title: 'Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		//hAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, slantedText: false, maxAlternation:4, showTextEvery:1, maxTextLines:3},
		height: 238,  
		fontSize: 10,
      	width: 700,
		titleTextStyle: {color: 'black', fontName: 'Calibri', fontSize: 14},
		backgroundColor : '#FDFDD9',
      	colors: ["Black"],
      	candlestick:{risingColor: {stroke: "Blue",fill: "Blue", strokeWidth: 0}, fallingColor: {stroke: "Red", fill: "Red",strokeWidth: 0}},
      	legend: {position: 'none'}
	};

	centerTopChart.draw(centerTopData, options);
	
}

function drawGenderChart(){
	var options = {
    	title: 'Average Salary by Gender',
        //vAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		//hAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}},
		isStacked: true,
		height: 250,
		width:320,
		backgroundColor : '#FDFDD9',
		titleTextStyle: {color: 'black', fontName: 'Calibri', fontSize: 14},
		legend: {position: 'none'}
    };
    var formatter = new google.visualization.NumberFormat({prefix: '$'});
    	formatter.format(genderData, 1); // Apply formatter to second column
	genderChart.draw(genderData, options);
}

function drawMarkers(){
	var tempMarker=markers.pop();
	while(tempMarker!=null){
		tempMarker.setMap(null);
		tempMarker = markers.pop();
	}
  	joinedDataTable = new google.visualization.data.join(gisData, deptExpenseData, 'inner', [[0,0]],[1,2],[1]);
  	var range = joinedDataTable.getColumnRange(3);
  	for(var i=0; i< joinedDataTable.getNumberOfRows(); i++){
  		
  		var scale = 60*joinedDataTable.getValue(i,3)/range.max;
  	  	var bubble = {
  			path: google.maps.SymbolPath.CIRCLE,
  			fillColor: "gold",
  			fillOpacity: 0.7,
  			scale: scale,
  			strokeColor: "white",
  			strokeWeight: 3
		};
		marker = new google.maps.Marker({
  			position: new google.maps.LatLng(joinedDataTable.getValue(i,1),joinedDataTable.getValue(i,2)),
  			icon: bubble,
  			draggable: false,
  			map: map
		});
		markers.push(marker);
		marker.set('scale',scale);
        marker.set('deptName', joinedDataTable.getValue(i,0));
        marker.set('expenditure',"Total Expenditure: $"+ addCommas(parseFloat(joinedDataTable.getValue(i,3).toFixed(2))));
		google.maps.event.addListener(marker, 'click', 
			function() {
				//var myLatLng = new google.maps.LatLng(gisData.getValue(i,1),gisData.getValue(i,2));
				removeHighlightFromMapMarker();
    			if(infoWindow == null)
    				infoWindow = new google.maps.InfoWindow({position: this.position,content: this.get('deptName')});
    			infoWindow.setPosition(this.position);
    			infoWindow.setContent(buildContentString(this));
				infoWindow.open(map);
				//this.getIcon().fillColor = "red";
				highlightMapMarker(this);
				setDepartmentFromMap(this.get('deptName'));
				changeDepartment(this.get('deptName'));
			}
		);

		google.maps.event.addListener(marker, 'mouseover', 
			function() {
				if(selectedDepartment==""){
					if(infoWindow == null)
    					infoWindow = new google.maps.InfoWindow({position: this.position,content: this.get('deptName')});
    				infoWindow.setPosition(this.position);
    				infoWindow.setContent(this.get('deptName'));
					infoWindow.open(map);
				}
			}
		);

		google.maps.event.addListener(marker, 'mouseout', 
			function() {
				if(selectedDepartment==""){
					if(infoWindow!=null)
    					infoWindow.close();
				}
			}
		);
	}
}

function drawMap(){
	var mapDiv = document.getElementById('maps');
    map = new google.maps.Map(mapDiv, {
    	center: new google.maps.LatLng(33.775898, -84.398998),
    	zoom: 15,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    	/*disableDefaultUI: true,
    	mapTypeId: google.maps.MapTypeId.TERRAIN*/
  	});
	google.maps.event.addListener(map, 'click', function() {
   		clearMapSelection();
  	});
}
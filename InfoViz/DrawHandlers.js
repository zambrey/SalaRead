/*Visualization handles*/
var leftChart;
var centerTopChart;
var centerBottomChart;
var rightChart;
var infoWindow=null;
var markers  = [];

function drawLeftChart(){
	var options = {
    	title: 'Average Salary by Title',
        vAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}},
		isStacked: true,
		//height: 320,
		width:400,
		legend: {position: 'none'}
    };
	leftChart = new google.visualization.BarChart(document.getElementById('left'));
	leftChart.draw(leftData, options);

	
	google.visualization.events.addListener(leftChart, 'onmouseover', barMouseOver);
    google.visualization.events.addListener(leftChart, 'onmouseout', barMouseOut);
}

function drawRightChart(){
	var options = {
		//height: 370,
		width: 239,
		showRowNumber: true,
		firstRowNumber: 1
	};
	rightChart = new google.visualization.Table(document.getElementById('right'));
	var formatter = new google.visualization.NumberFormat({prefix: '$'});
  	formatter.format(rightData, 1); // Apply formatter to second column
    rightChart.draw(rightData, options);
	google.visualization.events.addListener(rightChart,'select',tableSelected);
    //google.visualization.events.addListener(rightChart,'onmouseout',tableMouseOut);
}

function drawCenterBottomChart(){
	var options = {
		title: 'Average Salary by Department',
		vAxis: {title: 'Average Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Department',  titleTextStyle: {color: 'red'}, slantedText: false, maxAlternation:4, showTextEvery:1, maxTextLines:4},
		isStacked: true,
		//height: 238,
		width: 700,
		fontSize : 10,
		legend: {position: 'none'}
    };

	centerBottomChart = new google.visualization.ColumnChart(document.getElementById('bottom'));
	centerBottomChart.draw(centerBottomData, options);
}

function drawCenterTopChart(){
	var options = {
		title: 'Salary Range By Title',
		vAxis: {title: 'Salary',  titleTextStyle: {color: 'red'}, textStyle: {fontSize: 10}},
		hAxis: {title: 'Title',  titleTextStyle: {color: 'red'}, slantedText: false, maxAlternation:4, showTextEvery:1, maxTextLines:3},
		height: 238,  
		fontSize: 10,
      	width: 700,
      	colors: ["Black"],
      	candlestick:{risingColor: {stroke: "Blue",fill: "Blue", strokeWidth: 0}, fallingColor: {stroke: "Red", fill: "Red",strokeWidth: 0}},
      	legend: {position: 'none'}
	};

	centerTopChart = new google.visualization.CandlestickChart(document.getElementById('top'));
	centerTopChart.draw(centerTopData, options);
	google.visualization.events.addListener(centerTopChart, 'onmouseover', rangeMouseOver);
    google.visualization.events.addListener(centerTopChart, 'onmouseout', rangeMouseOut);
}

function drawMarkers(){
  	joinedDataTable = new google.visualization.data.join(gisData, deptExpenseData, 'inner', [[0,0]],[1,2],[1]);
  	
  	for(var i=0; i< joinedDataTable.getNumberOfRows(); i++){
  		
  		var scale = joinedDataTable.getValue(i,3)/700000;
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
        marker.set('info', "<p>"+ gisData.getValue(i,0)+" <br/> Total Expenditure: $"+ addCommas(parseFloat(joinedDataTable.getValue(i,3).toFixed(2)))+"</p>");
		google.maps.event.addListener(marker, 'click', 
			function() {
				//var myLatLng = new google.maps.LatLng(gisData.getValue(i,1),gisData.getValue(i,2));
				removeHighlightFromMapMarker();
    			/*if(this.getIcon().fillColor=="red"){
    				infoWindow.close();
    				var bubble = {
  						path: google.maps.SymbolPath.CIRCLE,
  						fillColor: "gold",
  						fillOpacity: 0.7,
  						scale: this.get('scale'),
  						strokeColor: "white",
  						strokeWeight: 3
					};
					this.setIcon(bubble);
    				return;
    			}*/
    			if(infoWindow == null)
    				infoWindow = new google.maps.InfoWindow({position: this.position,content: this.get('info')});
    			infoWindow.setPosition(this.position);
    			infoWindow.setContent(this.get('info'));
				infoWindow.open(map);
				//this.getIcon().fillColor = "red";
				highlightMapMarker(this);
			}
		);
	}
}

function drawMap(){
	var mapDiv = document.getElementById('maps');
    map = new google.maps.Map(mapDiv, {
    	center: new google.maps.LatLng(33.774898, -84.40222),
    	zoom: 14,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	});
}
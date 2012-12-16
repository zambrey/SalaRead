/*Data holders*/
var leftData;
var centerTopData;
var centerBottomData;
var rightData;
var top10Data;
var deptExpenseData;
var gisData;
var genderData;

function leftCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	leftData = response.getDataTable();
	drawLeftChart();
}

function rightCallBack(response){
	/*if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}*/
	//top10Data = response.getDataTable();
	top10Data = new google.visualization.DataTable();
	top10Data.addColumn('string','Name');
	top10Data.addColumn('string','Title');
	top10Data.addColumn('string','Department');
	top10Data.addColumn('number','Salary');
	top10Data.addColumn('string','Gender');
	rightData = new google.visualization.DataTable();
//	rightData.addColumn('number','#');
	rightData.addColumn('string','Name');
	rightData.addColumn('number','Salary');
	var rows = response['rows'];
	top10Data.addRows(rows.length);
	for (var i=0; i<rows.length; i++) {
		for(var j=0; j<5; j++)
			top10Data.setValue(i,j,rows[i][j]);
	}
	rightData.addRows(top10Data.getNumberOfRows());
	for(var i=0; i<top10Data.getNumberOfRows(); i++){
		//rightData.setValue(i,0,i+1);
		rightData.setValue(i,0,top10Data.getValue(i,0));
		rightData.setValue(i,1,top10Data.getValue(i,3));
	}
	drawRightChart();
}

function centerBottomCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	
	centerBottomData = response.getDataTable();
	centerBottomData.addColumn('number','');
	for(var j=0; j<centerBottomData.getNumberOfRows(); j++)
		centerBottomData.setValue(j,2,0);
	drawCenterBottomChart();
}

function centerTopCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	centerTopData = response.getDataTable();
	/*for(var i=0; i<4; i++){
		centerTopData.addColumn('number','');
		for(var j=0; j<centerTopData.getNumberOfRows(); j++)
			centerTopData.setValue(j,i+5,0);
	}*/
	centerTopData.addColumn({type:'string',role:'tooltip'});

	for(var j=0; j<centerTopData.getNumberOfRows(); j++){
		centerTopData.setValue(j,2,centerTopData.getValue(j,2)-1);
		centerTopData.setValue(j,3,centerTopData.getValue(j,3)+1);
		centerTopData.setValue(j,5,centerTopData.getValue(j,0)+"\nMAX: $ "+ addCommas(parseFloat(centerTopData.getValue(j,4).toFixed(2)))+
									"\nAVG: $ "+ addCommas(parseFloat((centerTopData.getValue(j,2)+1).toFixed(2)))+
									"\nMIN: $ "+ addCommas(parseFloat(centerTopData.getValue(j,1).toFixed(2))));
	}
	drawCenterTopChart();
}

function deptExpenseCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	deptExpenseData = response.getDataTable();
	initMapLocations();
}


function gisCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	gisData = response.getDataTable();
	drawMarkers();
}

function genderCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	genderData = response.getDataTable();
	for(var i=0; i<genderData.getNumberOfRows(); i++){
		if(genderData.getValue(i,0)=='M')
			genderData.setValue(i,0,'Male');
		else
			genderData.setValue(i,0,'Female');
	}
	drawGenderChart();	
}
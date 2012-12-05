/*Data holders*/
var leftData;
var centerTopData;
var centerBottomData;
var rightData;
var top10Data;
var deptExpenseData;
var gisData;

function leftCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	leftData = response.getDataTable();
	drawLeftChart();
}

function rightCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	top10Data = response.getDataTable();
	rightData = new google.visualization.DataTable();
//	rightData.addColumn('number','#');
	rightData.addColumn('string','Name');
	rightData.addColumn('number','Salary');
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
	for(var j=0; j<centerTopData.getNumberOfRows(); j++){
		centerTopData.setValue(j,2,centerTopData.getValue(j,2)-1);
		centerTopData.setValue(j,3,centerTopData.getValue(j,3)+1);
	}
	drawCenterTopChart();
}

function deptExpenseCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	deptExpenseData = response.getDataTable();
}


function gisCallBack(response){
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	gisData = response.getDataTable();
	drawMarkers();
}
function tableMouseOut(e){
	if(rightChart.getSelection().length > 0){
		rightChart.setSelection([{'row': null, 'column': null}]);
    	var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
      var titleList = document.getElementById('listTitle');

  		if(leftIndex.length > 0 && titleList.selectedIndex==0){
  			removeHighLightInLeftData(leftIndex[0]);
		  }
    	/*var centerTopIndex = centerTopData.getFilteredRows([{column:1, value: 0},{column:2, value: 0},{column:3, value: 0},{column:4, value: 0}]);
  		if(centerTopIndex.length > 0){
  		-	removeHighlightInCenterTopData(centerTopIndex[0]);
  		}*/
      if(titleList.selectedIndex==0)
  		  removeHighlightInCenterTopData();
    	var centerBottomIndex = centerBottomData.getFilteredRows([{column:1, value: 0}]);
    	var deptList = document.getElementById('listDept');
  		if(centerBottomIndex.length > 0 && deptList.selectedIndex==0){
  			removeHighlightInCenterBottomData(centerBottomIndex[0]);
		  }
      var genderIndex = genderData.getFilteredRows([{column:1, value: 0}]);
      if(genderIndex.length > 0){
        removeHighlightInGenderChart(genderIndex[0]);
      }
	}
}

function tableSelected(e){
      selected = rightChart.getSelection();
      if(selected.length > 0){
        var index = selected[0].row;
        var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
        if(leftIndex.length > 0){
          removeHighLightInLeftData(leftIndex[0]);
        }
        leftIndex = leftData.getFilteredRows([{column:0, value: top10Data.getValue(index,1)}]);
        if(leftIndex.length > 0)
          highlightRowInLeftData(leftIndex[0]);
        removeHighlightInCenterTopData();
        var centerTopIndex = centerTopData.getFilteredRows([{column:0, value: top10Data.getValue(index,1)}]);
        if(centerTopIndex.length > 0)
          highlightSeriesInCenterTopData(centerTopIndex[0]);
        var centerBottomIndex = centerBottomData.getFilteredRows([{column:0, value: top10Data.getValue(index,2)}]);
        if(centerBottomIndex.length > 0)
          highlightColumnInCenterBottomData(centerBottomIndex[0]);

        var genderIndex = genderData.getFilteredRows([{column:1, value: 0}]);
        if(genderIndex.length > 0){
          removeHighlightInGenderChart(genderIndex[0]);
        }
        var genderFull;
        if(top10Data.getValue(index,4)=='M')
          genderFull = 'Male';
        else genderFull = 'Female';
        genderIndex = genderData.getFilteredRows([{column:0, value: genderFull}]);
        if(genderIndex.length > 0)
          highlightInGenderChart(genderIndex[0]);
      }
      else{
        rightChart.setSelection([{'row': null, 'column': null}]);
        var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
        var titleList = document.getElementById('listTitle');
        if(leftIndex.length > 0 && titleList.selectedIndex==0){
          removeHighLightInLeftData(leftIndex[0]);
        }
        /*var centerTopIndex = centerTopData.getFilteredRows([{column:1, value: 0},{column:2, value: 0},{column:3, value: 0},{column:4, value: 0}]);
        if(centerTopIndex.length > 0){
          removeHighlightInCenterTopData(centerTopIndex[0]);
        }*/
        if(titleList.selectedIndex==0)
          removeHighlightInCenterTopData();
        var centerBottomIndex = centerBottomData.getFilteredRows([{column:1, value: 0}]);
        var deptList = document.getElementById('listDept');
        if(centerBottomIndex.length > 0 && deptList.selectedIndex==0){
          removeHighlightInCenterBottomData(centerBottomIndex[0]);
        }
        var genderIndex = genderData.getFilteredRows([{column:1, value: 0}]);
        if(genderIndex.length > 0){
          removeHighlightInGenderChart(genderIndex[0]);
        }
      }
    }

function rangeMouseOver(e) {
  if(selectedTitle==""){
    var leftIndex = leftData.getFilteredRows([{column:0, value: centerTopData.getValue(e.row,0)}]);
    if (leftIndex.length > 0){
      /*Modify leftData*/
      highlightRowInLeftData(leftIndex[0]);
    }
  }
  //centerTopChart.setSelection([e]);
  //leftChart.setSelection([e]);
}

function rangeMouseOut(e) {
  if(selectedTitle==""){
      var leftIndex = leftData.getFilteredRows([{column:1, value: 0}]);
      if(leftIndex.length > 0){
        removeHighLightInLeftData(leftIndex[0]);
    }
  }
      //centerTopChart.setSelection([{'row': null, 'column': null}]);
      //leftChart.setSelection([{'row': null, 'column': null}]);
    }

function barMouseOver(e) {
    //alert('Mouserover');
      //leftChart.setSelection([e]);
      //centerTopChart.highlightRow([e],false);
  if(selectedTitle==""){
    var centerTopIndex = centerTopData.getFilteredRows([{column:0, value: leftData.getValue(e.row,0)}]);
    if (centerTopIndex.length > 0){
        highlightSeriesInCenterTopData(centerTopIndex[0]);
    }
  }
}

function barMouseOut(e) {
      /*var centerTopIndex = centerTopData.getFilteredRows([{column:1, value: 0},{column:2, value: 0},{column:3, value: 0},{column:4, value: 0}]);
      if(centerTopIndex.length > 0){
        removeHighlightInCenterTopData(centerTopIndex[0]);
      }*/
      if(selectedTitle=="")
        removeHighlightInCenterTopData();
      //leftChart.setSelection([{'row': null, 'column': null}]);
      //centerTopChart.setSelection([{'row': null, 'column': null}]);
}


function highlightRowInLeftData(rowInd){
  var tempData = new google.visualization.DataTable();
  tempData.addRows(leftData.getNumberOfRows());
  tempData.addColumn('string','Title');
  tempData.addColumn('number','Average Salary');
  tempData.addColumn('number','Average Salary');
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
  var formatter = new google.visualization.NumberFormat({prefix: '$'});
      formatter.format(leftData, 2); // Apply formatter to second column
  drawLeftChart();  
}

function removeHighLightInLeftData(rowInd){
  leftData.setValue(rowInd,1,leftData.getValue(rowInd,2));
  leftData.setValue(rowInd,2,0);
  drawLeftChart();
}

function highlightInGenderChart(rowInd){
  var tempData = new google.visualization.DataTable();
  tempData.addRows(genderData.getNumberOfRows());
  tempData.addColumn('string','Gender');
  tempData.addColumn('number','Average Salary');
  tempData.addColumn('number','Average Salary');
  for(var i=0; i<genderData.getNumberOfRows(); i++){
    tempData.setValue(i,0,genderData.getValue(i,0));
    if(i==rowInd){
      tempData.setValue(i,1,0);
      tempData.setValue(i,2,genderData.getValue(i,1));
    }
    else{
      tempData.setValue(i,1,genderData.getValue(i,1));
      tempData.setValue(i,2,0);
    }
  }
  genderData = tempData;
  var formatter = new google.visualization.NumberFormat({prefix: '$'});
      formatter.format(genderData, 2); // Apply formatter to second column
  drawGenderChart();  
}

function removeHighlightInGenderChart(rowInd){
    genderData.setValue(rowInd,1,genderData.getValue(rowInd,2));
    genderData.setValue(rowInd,2,0);
    drawGenderChart();
}

function highlightSeriesInCenterTopData(rowInd){
  var temp = centerTopData.getValue(rowInd,2);
  centerTopData.setValue(rowInd,2,centerTopData.getValue(rowInd,3));
  centerTopData.setValue(rowInd,3,temp);
  drawCenterTopChart(); 
}

function removeHighlightInCenterTopData(){
  for(var i=0; i<centerTopData.getNumberOfRows(); i++){
    if(centerTopData.getValue(i,2) > centerTopData.getValue(i,3))
      break;
  }
  if(i==centerTopData.getNumberOfRows())
    return;
  var temp = centerTopData.getValue(i,2);
  centerTopData.setValue(i,2,centerTopData.getValue(i,3));
  centerTopData.setValue(i,3,temp);
  /*for(var j=0; j<4; j++){
      centerTopData.setValue(rowInd,j+1,centerTopData.getValue(rowInd,j+5));  
      centerTopData.setValue(rowInd,j+5,0);
    }*/
    drawCenterTopChart();
}

function highlightColumnInCenterBottomData(rowInd){
  if(centerBottomData.getValue(rowInd,1)==0 && centerBottomData.getValue(rowInd,2)!=0)
    return;
  var tempData = new google.visualization.DataTable();
  tempData.addRows(centerBottomData.getNumberOfRows());
  tempData.addColumn('string','Department');
  tempData.addColumn('number','Average Salary');
  tempData.addColumn('number','Average Salary');
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
  var formatter = new google.visualization.NumberFormat({prefix: '$'});
      formatter.format(centerBottomData, 2); // Apply formatter to second column  
  drawCenterBottomChart();
}

function removeHighlightInCenterBottomData(rowInd){
  centerBottomData.setValue(rowInd,1,centerBottomData.getValue(rowInd,2));
    centerBottomData.setValue(rowInd,2,0);
    drawCenterBottomChart();
}

function removeHighlightFromMapMarker(){
  for(var i=0; i<markers.length; i++){
    if(markers[i].getIcon().fillColor == "red"){
      var bubble = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "gold",
        fillOpacity: 0.7,
        scale: markers[i].get('scale'),
        strokeColor: "white",
        strokeWeight: 3
      };
      markers[i].setIcon(bubble);      
      break;
    }
  }
  if(infoWindow!=null)
    infoWindow.close();
}

function highlightMapMarker(marker){
  var selectedBubble = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
  fillOpacity: 0.7,
  scale: marker.get('scale'),
  strokeColor: "white",
  strokeWeight: 3
  };
  marker.setIcon(selectedBubble);
  marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
}

function highlightDepartmentInMap(dept){
  removeHighlightFromMapMarker();
  for(var i=0; i<markers.length; i++){
    if(markers[i].get('deptName')==dept){
      highlightMapMarker(markers[i]);
      if(infoWindow == null)
            infoWindow = new google.maps.InfoWindow({position: this.position,content: markers[i].get('deptName')});
          infoWindow.setPosition(markers[i].position);
          infoWindow.setContent(buildContentString(markers[i]));
        infoWindow.open(map);
      break;
    }
  }
}

function setDepartmentFromMap(dept){
  var deptList = document.getElementById('listDept');
  for(var i=0; i<deptList.options.length; i++){
    if(deptList.options[i].value==dept){
      deptList.selectedIndex = i;
      break;
    }
  }
}

function clearMapSelection(){
  removeHighlightFromMapMarker();
  var deptList = document.getElementById('listDept');
  deptList.selectedIndex = 0;
  changeDepartment(deptList.options[0].value);
}

var title2011Data;
var dept2011Data;
var title2010Data;
var dept2010Data;
var title2009Data;
var dept2009Data;
var title2008Data;
var dept2008Data;

var title2011Div = "title2011";
var dept2011Div = "dept2011";
var title2010Div = "title2010";
var dept2010Div = "dept2010";
var title2009Div = "title2009";
var dept2009Div = "dept2009";
var title2008Div = "title2008";
var dept2008Div = "dept2008";

var title2011Key = "0Aihk8d-ie1rgdFR4Z0x3YXJHOUhSdHVOY2cybFNXQ0E&transpose=0&headers=1&range=A1%3AD1066&gid=7&pub=1";
var dept2011Key = "0Aihk8d-ie1rgdGNmWGw2YnVrZXFaaExwbmdvS3liN1E&transpose=0&headers=1&range=A1%3AD1099&gid=5&pub=1";
var title2010Key = "0Aihk8d-ie1rgdFR4Z0x3YXJHOUhSdHVOY2cybFNXQ0E&transpose=0&headers=1&range=A1%3AD1055&gid=6&pub=1";
var dept2010Key = "0Aihk8d-ie1rgdGNmWGw2YnVrZXFaaExwbmdvS3liN1E&transpose=0&headers=1&range=A1%3AD1088&gid=4&pub=1";
var title2009Key = "0Aihk8d-ie1rgdFR4Z0x3YXJHOUhSdHVOY2cybFNXQ0E&transpose=0&headers=1&range=A1%3AD1068&gid=5&pub=1";
var dept2009Key = "0Aihk8d-ie1rgdGNmWGw2YnVrZXFaaExwbmdvS3liN1E&transpose=0&headers=1&range=A1%3AD1101&gid=3&pub=1";
var title2008Key = "0Aihk8d-ie1rgdFR4Z0x3YXJHOUhSdHVOY2cybFNXQ0E&transpose=0&headers=1&range=A1%3AD1066&gid=4&pub=1";
var dept2008Key = "0Aihk8d-ie1rgdGNmWGw2YnVrZXFaaExwbmdvS3liN1E&transpose=0&headers=1&range=A1%3AD1099&gid=2&pub=1";

// make the tooltip div follow the mouse
$(function () {
  // First item is div name, second is div suffix
    positionTooltip ('#2011-bytitle',title2011Div);
    positionTooltip ('#2011-bydept',dept2011Div);
    positionTooltip ('#2010-bytitle',title2010Div);
    positionTooltip ('#2010-bydept',dept2010Div);
    positionTooltip ('#2009-bytitle',title2009Div);
    positionTooltip ('#2009-bydept',dept2009Div);
    positionTooltip ('#2008-bytitle',title2008Div);
    positionTooltip ('#2008-bydept',dept2008Div);
});

function positionTooltip (divName, divSuffix) {
   $(divName).mousemove(function (e) {
        $('#tooltip-' + divSuffix).css({
            left: e.pageX + 3,
            top: e.pageY - 50
        });
    });
}

google.load("visualization", "1", {packages:["treemap"]});
google.setOnLoadCallback(function() {drawTreeMaps()});
//google.setOnLoadCallback(function() {initializeTreeMaps()});

function initializeTreeMaps() {
  drawTreeMaps();
  changeTreeMap("2011");
  fetchAutocompleteData("2011");
}

/*$(function() {
	//changeTreeMap("2011");
	fetchAutocompleteData("2011");
});*/
/*
function drawTreeMaps(){
  switch (year) {
    case 2011:
      var query1 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2011Key);
      query1.send(title2011Callback);
    
      var query2 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2011Key);
      query2.send(dept2011Callback);
      break;
    
    case 2010:
      var query3 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2010Key);
      query3.send(title2010Callback);
    
      var query4 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2010Key);
      query4.send(dept2010Callback);
      break;
    
    case 2009:
      var query5 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2009Key);
      query5.send(title2009Callback);
    
      var query6 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2009Key);
      query6.send(dept2009Callback);
      break;
    
    case 2008:
      var query7 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2008Key);
      query7.send(title2008Callback);
    
      var query8 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2008Key);
      query8.send(dept2008Callback); 
      break;
  }
}*/

function drawTreeMaps(){
    showHideMaps();
    
    var query1 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2011Key);
    query1.send(title2011Callback);
    
    var query2 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2011Key);
    query2.send(dept2011Callback);

    var query3 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2010Key);
    query3.send(title2010Callback);
    
    var query4 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2010Key);
    query4.send(dept2010Callback);

    var query5 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2009Key);
    query5.send(title2009Callback);
    
    var query6 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2009Key);
    query6.send(dept2009Callback);

    var query7 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2008Key);
    query7.send(title2008Callback);
    
    var query8 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2008Key);
    query8.send(dept2008Callback); 
}

function showHideMaps(){
  $("#2010-bytitle, #2010-bydept").css({
    'position': 'absolute',
    'left': '-2000px',
		//'padding': '4px 57px 3px'
	});
}

// treemap options
var titleOptions = {
  "showTip":true,
  "titleTextStyle":{"fontSize":16},
  "fontColor":"#fff",
  "midColor":"#EFE6DC",
  "animation":{"duration":0},
  "headerColor":"#666666",
  "maxColor":"#6d9eeb",
  "headerHeight":40,
  "fontSize":"14",
  "showScale":true,
  "hAxis":{"title":"Horizontal axis title","useFormatFromData":true,"minValue":null,"viewWindow":{"min":null,"max":null},"maxValue":null},
  "vAxes":[{"title":"Left vertical axis title","useFormatFromData":true,"minValue":null,"viewWindow":{"min":null,"max":null},"maxValue":null},{"useFormatFromData":true,"minValue":null,"viewWindow":{"min":null,"max":null},"maxValue":null}],
  "title":"Treemap by Title",
  "booleanRole":"certainty",
  "maxDepth":1,
  "annotations":{"domain":{"style":"line"}},
  "showTooltips":false,
  "minColor":"#c27ba0",
  "width":960,
  "height":400,
  "state":{},
  "view":{"columns":[0,{"label":"Title","properties":{"role":"annotation"},"sourceColumn":1},2,3]},
  "chartType":"TreeMap",
  "chartName":"Chart 1"
  };

var deptOptions = {
    "showTip":true,
    "titleTextStyle":{"fontSize":16},
    "fontColor":"#fff",
    "midColor":"#EFE6DC",
    "animation":{"duration":0},
    "headerColor":"#666666",
    "maxColor":"#6d9eeb",
    "headerHeight":40,
    "fontSize":"14",
    "showScale":true,
    "hAxis":{"title":"Horizontal axis title","useFormatFromData":true,"minValue":null,"viewWindow":{"min":null,"max":null},"maxValue":null},
    "vAxes":[{"title":"Left vertical axis title","useFormatFromData":true,"minValue":null,"viewWindow":{"min":null,"max":null},"maxValue":null},{"useFormatFromData":true,"minValue":null,"viewWindow":{"min":null,"max":null},"maxValue":null}],
    "title":"Treemap by Department",
    "booleanRole":"certainty",
    "maxDepth":1,
    "annotations":{"domain":{"style":"line"}},
    "showTooltips":false,
    "minColor":"#c27ba0",
    "width":960,
    "height":400,
    "state":{},
    "view":{"columns":[0,{"label":"Title","properties":{"role":"annotation"},"sourceColumn":1},2,3]},
    "chartType":"TreeMap",
    "chartName":"Chart 1"
    };

function title2011Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    title2011Data = response.getDataTable();
    title2011 = new google.visualization.TreeMap(document.getElementById('2011-bytitle'));
    title2011.draw(title2011Data, titleOptions);
    google.visualization.events.addListener(title2011, 'select', function () {titleSelectHandler (title2011,title2011Data,title2011Div)});
    // Go up button
    document.getElementById('goUp-' + title2011Div).disabled = true;
    document.getElementById('goUp-' + title2011Div).onclick = function () {
      title2011.goUpAndDraw();
      document.getElementById('goUp-' + title2011Div).disabled = true;
    }; 
    // hover window - visName, dataName, divSuffix
    addTooltip (title2011,title2011Data,title2011Div);
}

function dept2011Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    dept2011Data = response.getDataTable();
    dept2011 = new google.visualization.TreeMap(document.getElementById('2011-bydept'));
    dept2011.draw(dept2011Data, deptOptions);
    google.visualization.events.addListener(dept2011, 'select', function () {deptSelectHandler (dept2011,dept2011Data,dept2011Div)});
    // Go up button
    document.getElementById('goUp-dept2011').disabled = true;
    document.getElementById('goUp-dept2011').onclick = function () {
      dept2011.goUpAndDraw();
      document.getElementById('goUp-dept2011').disabled = true;
    };
    addTooltip (dept2011,dept2011Data,'dept2011');
}

function title2010Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    title2010Data = response.getDataTable();
    title2010 = new google.visualization.TreeMap(document.getElementById('2010-bytitle'));
//    google.visualization.events.addListener(title2010, 'ready', hideMap);
    title2010.draw(title2010Data, titleOptions);
    google.visualization.events.addListener(title2010, 'select', function () {titleSelectHandler (title2010,title2010Data,title2010Div)});
    // Go up button
    document.getElementById('goUp-' + title2010Div).disabled = true;
    document.getElementById('goUp-' + title2010Div).onclick = function () {
      title2010.goUpAndDraw();
      document.getElementById('goUp-' + title2010Div).disabled = true;
    }; 
    // hover window - visName, dataName, divSuffix
    addTooltip (title2010,title2010Data,title2010Div);
}
/*
function hideMap() {
  $('#2010-bytitle').hide();
}*/

function dept2010Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    dept2010Data = response.getDataTable();
    dept2010 = new google.visualization.TreeMap(document.getElementById('2010-bydept'));
    dept2010.draw(dept2010Data, deptOptions);
    google.visualization.events.addListener(dept2010, 'select', function () {deptSelectHandler (dept2010,dept2010Data,dept2010Div)});
    // Go up button
    document.getElementById('goUp-dept2010').disabled = true;
    document.getElementById('goUp-dept2010').onclick = function () {
      dept2010.goUpAndDraw();
      document.getElementById('goUp-dept2010').disabled = true;
    };
    addTooltip (dept2010,dept2010Data,'dept2010');
}

function title2009Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    title2009Data = response.getDataTable();
    title2009 = new google.visualization.TreeMap(document.getElementById('2009-bytitle'));
    title2009.draw(title2009Data, titleOptions);
    google.visualization.events.addListener(title2009, 'select', function () {titleSelectHandler (title2009,title2009Data,title2009Div)});
    // Go up button
    document.getElementById('goUp-' + title2009Div).disabled = true;
    document.getElementById('goUp-' + title2009Div).onclick = function () {
      title2009.goUpAndDraw();
      document.getElementById('goUp-' + title2009Div).disabled = true;
    }; 
    // hover window - visName, dataName, divSuffix
    addTooltip (title2009,title2009Data,title2009Div);
}

function dept2009Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    dept2009Data = response.getDataTable();
    dept2009 = new google.visualization.TreeMap(document.getElementById('2009-bydept'));
    dept2009.draw(dept2009Data, deptOptions);
    google.visualization.events.addListener(dept2009, 'select', function () {deptSelectHandler (dept2009,dept2009Data,dept2009Div)});
    // Go up button
    document.getElementById('goUp-dept2009').disabled = true;
    document.getElementById('goUp-dept2009').onclick = function () {
      dept2009.goUpAndDraw();
      document.getElementById('goUp-dept2009').disabled = true;
    };
    addTooltip (dept2009,dept2009Data,'dept2009');
}

function title2008Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    title2008Data = response.getDataTable();
    title2008 = new google.visualization.TreeMap(document.getElementById('2008-bytitle'));
    title2008.draw(title2008Data, titleOptions);
    google.visualization.events.addListener(title2008, 'select', function () {titleSelectHandler (title2008,title2008Data,title2008Div)});
    // Go up button
    document.getElementById('goUp-' + title2008Div).disabled = true;
    document.getElementById('goUp-' + title2008Div).onclick = function () {
      title2008.goUpAndDraw();
      document.getElementById('goUp-' + title2008Div).disabled = true;
    }; 
    // hover window - visName, dataName, divSuffix
    addTooltip (title2008,title2008Data,title2008Div);
}

function dept2008Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    dept2008Data = response.getDataTable();
    dept2008 = new google.visualization.TreeMap(document.getElementById('2008-bydept'));
    dept2008.draw(dept2008Data, deptOptions);
    google.visualization.events.addListener(dept2008, 'select', function () {deptSelectHandler (dept2008,dept2008Data,dept2008Div)});
    // Go up button
    document.getElementById('goUp-dept2008').disabled = true;
    document.getElementById('goUp-dept2008').onclick = function () {
      dept2008.goUpAndDraw();
      document.getElementById('goUp-dept2008').disabled = true;
    };
    addTooltip (dept2008,dept2008Data,'dept2008');
}

function titleSelectHandler(visualizationName,dataName,divSuffix) {
  var selection = visualizationName.getSelection();
  var item = selection[0]
  if(item.row > 8)
    {
      var name = dataName.getValue(item.row, 0);
      sessionStorage.clear();
      sessionStorage.setItem(name,'selectedPerson');
      // Open in a pop-up window
      window.open("Personal.html","Employee Details","status=1,width=650,height=400,resizable=1");
    }
  // Don't enable button at root level  
  else if (item.row > 0)
    {
      document.getElementById('goUp-' + divSuffix).disabled = false;
    }
}

function deptSelectHandler(visualizationName,dataName,divSuffix) {
  var selection = visualizationName.getSelection();
  var item = selection[0]
  if(item.row > 41)
    {
      var name = dataName.getValue(item.row, 0);
      sessionStorage.clear();
      sessionStorage.setItem(name,'selectedPerson');
      // Open in a pop-up window
      window.open("Personal.html","Employee Details","status=1,width=650,height=400,resizable=1");
    }
  // Don't enable button at root level  
  else if (item.row > 0)
    {
      document.getElementById('goUp-' + divSuffix).disabled = false;
    }
}

function addTooltip (visualizationName,dataName,divSuffix) {
  google.visualization.events.addListener(visualizationName, 'onmouseover', function (e) {
      var name = dataName.getValue(e.row, 0);
      // format currency
      var salary = addCommas(parseFloat(dataName.getValue(e.row, 2).toFixed(2)));
      // populate the tooltip with data
      $('#tooltipTopLine-' + divSuffix).html(name);
      $('#tooltipBottomLine-' + divSuffix).html("$" + salary);
      // show the tooltip
      $('#tooltip-' + divSuffix).show();
  });
  google.visualization.events.addListener(visualizationName, 'onmouseout', function (e) {
      // hide the tooltip
      $('#tooltip-' + divSuffix).hide();
  });
}

function changeTreeMap(year){
    //drawTreeMaps(year);
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
		
	if(year == "2011"){
  	$('#2011-bytitle, #2011-bydept').css({
      'position': 'relative',
      'left': '0',
  	});	  
  	$('#2010-bytitle, #2010-bydept, #2009-bytitle, #2009-bydept, #2008-bytitle, #2008-bydept').css({
      'position': 'absolute',
      'left': '-2000px',
  	});
  	$('#goUp-title2011').show();
		$('#goUp-dept2011').show();
		$('#goUp-title2010').hide();
		$('#goUp-dept2010').hide();
		$('#goUp-title2009').hide();
		$('#goUp-dept2009').hide();
		$('#goUp-title2008').hide();
		$('#goUp-dept2008').hide();
	}
	if(year == "2010"){
  	$('#2010-bytitle, #2010-bydept').css({
      'position': 'relative',
      'left': '0',
  	});	  
  	$('#2011-bytitle, #2011-bydept, #2009-bytitle, #2009-bydept, #2008-bytitle, #2008-bydept').css({
      'position': 'absolute',
      'left': '-2000px',
  	});
  	$('#goUp-title2011').hide();
		$('#goUp-dept2011').hide();
		$('#goUp-title2008').hide();
		$('#goUp-dept2008').hide();
		$('#goUp-title2010').show();
		$('#goUp-dept2010').show();
		$('#goUp-title2009').hide();
		$('#goUp-dept2009').hide();
	}
	if(year == "2009"){
  	$('#2009-bytitle, #2009-bydept').css({
      'position': 'relative',
      'left': '0',
  	});	  
  	$('#2010-bytitle, #2010-bydept, #2011-bytitle, #2011-bydept, #2008-bytitle, #2008-bydept').css({
      'position': 'absolute',
      'left': '-2000px',
  	});
  	$('#goUp-title2011').hide();
		$('#goUp-dept2011').hide();
		$('#goUp-title2008').hide();
		$('#goUp-dept2008').hide();
		$('#goUp-title2010').hide();
		$('#goUp-dept2010').hide();
		$('#goUp-title2009').show();
		$('#goUp-dept2009').show();
	}
	if(year == "2008"){
  	$('#2008-bytitle, #2008-bydept').css({
      'position': 'relative',
      'left': '0',
  	});	  
  	$('#2010-bytitle, #2010-bydept, #2009-bytitle, #2009-bydept, #2011-bytitle, #2011-bydept').css({
      'position': 'absolute',
      'left': '-2000px',
  	});
  	$('#goUp-title2011').hide();
		$('#goUp-dept2011').hide();
		$('#goUp-title2008').show();
		$('#goUp-dept2008').show();
		$('#goUp-title2010').hide();
		$('#goUp-dept2010').hide();
		$('#goUp-title2009').hide();
		$('#goUp-dept2009').hide();
	}
}

(function($) {
    $.fn.invisible = function() {
        return this.css("visibility", "hidden");
    };
    $.fn.visible = function() {
        return this.css("visibility", "visible");
    };
})(jQuery);
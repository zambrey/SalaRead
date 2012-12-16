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

function drawTreeMaps(){
    var query1 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2011Key);
    // Send the query with a callback function.
    query1.send(title2011Callback);
    
    var query2 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2011Key);
    // Send the query with a callback function.
    query2.send(dept2011Callback);

/*    var query3 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2010Key);
    // Send the query with a callback function.
    query3.send(title2010Callback);
    
    var query4 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2010Key);
    // Send the query with a callback function.
    query4.send(dept2010Callback);

    var query5 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2009Key);
    // Send the query with a callback function.
    query5.send(title2009Callback);
    
    var query6 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2009Key);
    // Send the query with a callback function.
    query6.send(dept2009Callback);

    var query7 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + title2008Key);
    // Send the query with a callback function.
    query7.send(title2008Callback);
    
    var query8 = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + dept2008Key);
    // Send the query with a callback function.
    query8.send(dept2008Callback); */
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
    google.visualization.events.addListener(title2011, 'select', function () {titleSelectHandler (title2011,title2011Data,'title2011')});
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
//    google.visualization.events.addListener(dept2011, 'select', deptSelectHandler);
    google.visualization.events.addListener(dept2011, 'select', deptSelectHandler);
    // Go up button
    document.getElementById('goUp-dept2011').disabled = true;
    document.getElementById('goUp-dept2011').onclick = function () {
      dept2011.goUpAndDraw();
      document.getElementById('goUp-dept2011').disabled = true;
    };
    addTooltip (dept2011,dept2011Data,'dept2011');
}

function selectHandler() {
  var selection = visualization.getSelection();
  var item = selection[0]
  if(item.row > 8)
    {
      var name = title2011Data.getValue(item.row, 0);
      sessionStorage.clear();
      sessionStorage.setItem(name,'selectedPerson');
      // Open in a pop-up window
      window.open("Personal.html","Employee Details","status=1,width=650,height=400,resizable=1");
    }
  // Don't enable button at root level  
  else if (item.row > 0)
    {
      document.getElementById('goUp').disabled = false;
    }
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

function deptSelectHandler() {
  var selection = dept2011.getSelection();
  var item = selection[0]
  if(item.row > 41)
    {
      var name = dept2011Data.getValue(item.row, 0);
      sessionStorage.clear();
      sessionStorage.setItem(name,'selectedPerson');
      // Open in a pop-up window
      window.open("Personal.html","Employee Details","status=1,width=650,height=400,resizable=1");
    }
  // Don't enable button at root level  
  else if (item.row > 0)
    {
      document.getElementById('goUp-dept2011').disabled = false;
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
		
	if(year == "2008"){
		$('#2008-bytitle').show();
		$('#2008-bydept').show();
		$('#2011-bytitle').hide();
		$('#2011-bydept').hide();
		$('#2010-bytitle').hide();
		$('#2010-bydept').hide();
		$('#2009-bytitle').hide();
		$('#2009-bydept').hide();
	}
	if(year == "2009"){
		$('#2009-bytitle').show();
		$('#2009-bydept').show();
		$('#2011-bytitle').hide();
		$('#2011-bydept').hide();
		$('#2010-bytitle').hide();
		$('#2010-bydept').hide();
		$('#2008-bytitle').hide();
		$('#2008-bydept').hide();
	}
	if(year == "2010"){
		$('#2010-bytitle').show();
		$('#2010-bydept').show();
		$('#2011-bytitle').hide();
		$('#2011-bydept').hide();
		$('#2008-bytitle').hide();
		$('#2008-bydept').hide();
		$('#2009-bytitle').hide();
		$('#2009-bydept').hide();
	}
	if(year == "2011"){
		$('#2011-bytitle').show();
		$('#2011-bydept').show();
		$('#2008-bytitle').hide();
		$('#2008-bydept').hide();
		$('#2010-bytitle').hide();
		$('#2010-bydept').hide();
		$('#2009-bytitle').hide();
		$('#2009-bydept').hide();
	}
}
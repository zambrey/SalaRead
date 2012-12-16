var title2011Data;
var dept2011Data;
var title2010Data;
var dept2010Data;
var title2009Data;
var dept2009Data;
var title2008Data;
var dept2008Data;


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
    positionTooltip ('#2011-bytitle','title2011');
    positionTooltip ('#2011-bydept','dept2011');
    positionTooltip ('#2010-bytitle','title2010');
    positionTooltip ('#2010-bydept','dept2010');
    positionTooltip ('#2009-bytitle','title2009');
    positionTooltip ('#2009-bydept','dept2009');
    positionTooltip ('#2008-bytitle','title2008');
    positionTooltip ('#2008-bydept','dept2008');
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
    
    visualization = new google.visualization.TreeMap(document.getElementById('2011-bytitle'));
    visualization.draw(title2011Data, titleOptions);
    google.visualization.events.addListener(visualization, 'select', selectHandler);
    // Go up button
    document.getElementById('goUp').disabled = true;
    document.getElementById('goUp').onclick = function () {
      visualization.goUpAndDraw();
      document.getElementById('goUp').disabled = true;
    };
    // hover window
    addTooltip (visualization,title2011Data,'title2011');
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

function dept2011Callback(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    dept2011Data = response.getDataTable();
    
    dept2011 = new google.visualization.TreeMap(document.getElementById('2011-bydept'));
    dept2011.draw(dept2011Data, deptOptions);
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
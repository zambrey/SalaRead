var query;
var title2011Data;

var key1 = "0Aihk8d-ie1rgdFR4Z0x3YXJHOUhSdHVOY2cybFNXQ0E";
var querytext1;

var title2011Key = "0Aihk8d-ie1rgdFR4Z0x3YXJHOUhSdHVOY2cybFNXQ0E&transpose=0&headers=1&range=A1%3AD1066&gid=7&pub=1";
var dept2011Key;
var title2010Key;
var dept2010Key;
var title2009Key;
var dept2009Key;
var title2008Key;
var dept2008Key;

// make the tooltip div follow the mouse
$(function () {
    $('#2011-bytitle').mousemove(function (e) {
        $('#tooltip').css({
            left: e.pageX + 3,
            top: e.pageY - 50
        });
    });
});

google.load("visualization", "1", {packages:["treemap"]});
//google.setOnLoadCallback(function() {drawTreeMap(key1)});
google.setOnLoadCallback(function() {drawMaps(title2011Key)});

function drawMaps(title2011) {
  drawTreeMap(title2011);
}

// treemap options
var options = {
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

function drawTreeMap(sheet) {
    //var queryText1 = sheet + "&transpose=0&headers=1&range=A1%3AD1066&gid=7&pub=1";
    //queryText1 = encodeURIComponent(queryText1);
    var query = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + sheet);
    //var query = new google.visualization.Query("http://spreadsheets.google.com/tq?key=" + key1 + "&transpose=0&headers=1&range=A1%3AD1066&gid=7&pub=1");

    // Send the query with a callback function.
    query.send(handleQueryResponse);
  }

  function handleQueryResponse(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    title2011data = response.getDataTable();
    
    visualization = new google.visualization.TreeMap(document.getElementById('2011-bytitle'));
    visualization.draw(title2011data, options);
    google.visualization.events.addListener(visualization, 'select', selectHandler);
    document.getElementById('goUp').disabled = true;
    document.getElementById('goUp').onclick = function () {
      visualization.goUpAndDraw();
      document.getElementById('goUp').disabled = true;
    };
    // hover window
    google.visualization.events.addListener(visualization, 'onmouseover', function (e) {
        var name = title2011data.getValue(e.row, 0);
        // format currency
        var salary = addCommas(parseFloat(title2011data.getValue(e.row, 2).toFixed(2)));
        
        // populate the tooltip with data
        $('#tooltipTopLine').html(name);
        $('#tooltipBottomLine').html("$" + salary);
        // show the tooltip
        $('#tooltip').show();
    });
    google.visualization.events.addListener(visualization, 'onmouseout', function (e) {
        // hide the tooltip
        $('#tooltip').hide();
    });
}

function selectHandler() {
  var selection = visualization.getSelection();
  var item = selection[0]
  if(item.row > 8)
    {
      var name = title2011data.getValue(item.row, 0);
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
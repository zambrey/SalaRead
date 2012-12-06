
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
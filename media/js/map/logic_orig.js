var data_obj = {};
var highlighted_states = {};
var need_refresh = false;	

var sel = false;
colorRegion = '#12AE9E';//'#4BBEB4'; // Цвет всех регионов
focusRegion = '#F1C938'; // Цвет подсветки регионов при наведении на объекты из списка
selectRegion = '#0B6B61'; // Цвет изначально подсвеченных регионов

$(document).ready(function() {
	$('#vmap').vectorMap({
	    map: 'russia',
	    backgroundColor: '#FBFBFB',
		borderColor: '#ffffff',
		borderWidth: 0,
	    color: colorRegion,
		colors: highlighted_states,
		selectedColor: '#0991EC',			
	    //hoverOpacity: 1.0,
	    hoverColor: '#7CC2F0',

	    enableZoom: false,
	    showTooltip: true,			
		
		// Отображаем объекты если они есть
		onLabelShow: function(event, label, code){
			name = '<strong>'+label.text()+'</strong><br>';				
			if(data_obj[code]){
				list_obj = '<ul>';
				for(ob in data_obj[code]){					
					list_obj += '<li>'+data_obj[code][ob]+'</li>';
				}
				list_obj += '</ul>';
			}else{
				list_obj = '';
			}				
			label.html(name + list_obj);				
			list_obj = '';				
		},			
		// Клик по региону
		onRegionClick: function(element, code, region){
			
		}			
	});
	});

	// Выводим список объектов из массива
	$(document).ready(function() {
	for(region in data_obj){
		for(obj in data_obj[region]){
			$('.list-object').append('<li><a href="'+selectRegion+'" id="'+region+'" class="focus-region">'+data_obj[region][obj]+' ('+region+')</a></li>');
		}
	}

	});

	jQuery( document ).ready( function( $ ) {
	$(".footer").css("margin-top","0px");

	$('input[name=gender]').change(filterChanged);
	$('input[name=tabak]').change(filterChanged);
	$('#noz').change(filterChanged);
	$('#age_group_id').change(filterChanged);
	$('#weight_group_id').change(filterChanged);
	$('#height_group_id').change(filterChanged);
	$('#id_social_status').change(filterChanged);
	$('#menu').mouseleave(SendRequest);

	} );

	function filterChanged(){
	need_refresh = true;
	}

	function SendRequest(){
	if(!need_refresh) return;
	need_refresh = false;
	$(".map_wait").css("left","0px");
	$.post(
	        $('#map_menu').prop( 'action' ),
	        {
	            "_token": $('#map_menu').find( 'input[name=_token]' ).val(),
	            "gender": $('input[name=gender]:checked','#map_menu').val(),
	            "tabak": $('input[name=tabak]:checked','#map_menu').val(),
	            "noz" : $('#noz').val(),
	            "age_group_id" : $('#age_group_id').val(),
	            "weight_group_id" : $('#weight_group_id').val(),
	            "height_group_id" : $('#height_group_id').val(),
	            "id_social_status" : $('#id_social_status').val()
	        },
	        function( data ) {
	        	if(data['check'] != 'true'){
				  	var MaxVal = 0;
				  	var MainCount = 0;
				  	for(var i = 0; i<data.length; i++){
				  		var numb = Number(data[i]['value']);
				  		MainCount += numb;
				  		data[i]['value'] = numb;
				  		data[i]['region_count'] = Number(data[i]['region_count']);
				  		if(numb > MaxVal) MaxVal = numb;
				  	}

				  	var Percents = [];

					for(var i = 0; i<data.length; i++){
				  		Percents[i] = Math.round((data[i]['value']/MainCount)*10000)/100;
				  	}


				  	var RegPercents = [];

					for(var i = 0; i<data.length; i++){
				  		RegPercents[i] = Math.round((data[i]['value']/data[i]['region_count'])*10000)/100;
				  	}

				  	var CountryCount = 0;
				  	for(var i = 0; i<data.length; i++){
				  		CountryCount += data[i]['region_count'];
				  	}

				  	var CountryPercents = [];

					for(var i = 0; i<data.length; i++){
				  		CountryPercents[i] = Math.round((data[i]['value']/CountryCount)*100000)/1000;
				  	}

				  	for(var i = 0; i<data.length; i++){
				  		if(data[i]['value_ill']>-1){
				  			data_obj[data[i]['key']] = ['Количество опрошенных имеющих симптомы: '+data[i]['value'],'Количество опрошенных имеющих диагноз: '+data[i]['value_ill'],'Доля по региону: '+RegPercents[i]+'%','Доля по России: '+CountryPercents[i]+'%'];
				  		}
				  		else{
				  			data_obj[data[i]['key']] = ['Количество: '+data[i]['value'], 'Доля по региону (симптомы): '+RegPercents[i]+'%','Доля по России (симптомы): '+CountryPercents[i]+'%'];
				  		}
				  	}
				  	/* ___2____
				  	0%   R:42   G:209  B: 160 (117)
				  	50%  R:225   G:227 B: 43   (0)
				  	100% R:227   G:130 B: 43*/
				  	
				  	
				  	for(var i = 0; i<data.length; i++){
				  		var perc = data[i]['value']/MaxVal;
				  		var r = Math.round(perc*366)+42;
				  		var g = Math.round((1-perc)*170)+130;
				  		var b = 43;
				  		if(r > 225) r=225;
				  		if(g > 215) g=215;
				  		if(perc < 0.5){
				  			b += Math.round((1-(perc/0.5))*117);
				  		}

				  		highlighted_states[data[i]['key']] = "rgb("+r+","+g+","+b+")";
				  	}

				  	/* ___3____
				  	0%   R:20  G:200  B: 140
				  	50%  R:45   G:140 B: 210
				  	100% R:45   G:35 B: 110*/
				  	

				  	/*for(var i = 0; i<data.length; i++){
				  		var perc = data[i]['value']/MaxVal;
				  		var r = 20;
				  		var g = 140;
				  		var b = 210;
				  		if(perc < 0.5){
				  			g += Math.round((1-(perc/0.5))*60);
				  			b -= Math.round((1-(perc/0.5))*70);
				  			r -= Math.round((1-(perc/0.5))*25);
				  		}
				  		else{
				  			b -= Math.round(((perc-0.5)/0.5)*100);
				  			g -= Math.round(((perc-0.5)/0.5)*105);
				  		}

				  		highlighted_states[data[i]['key']] = "rgb("+r+","+g+","+b+")";
				  	}*/
			    }
			    else{
			    	for(var i in data){
			    		highlighted_states[data[i]] = "#12AE9E";
			    	}
			    	data_obj = {};
			    }

			  	jQuery('#vmap').vectorMap('set', 'colors', highlighted_states);

				$(".map_wait").css("left","-9999px");
	        },
	        'json'
	    );
	}

	// Подсветка регионов при наведении на объекты
	$(function(){
	$('.focus-region').mouseover(function(){			
		iso = $(this).prop('id');
		fregion = {};
		fregion[iso] = focusRegion;
		$('#vmap').vectorMap('set', 'colors', fregion);
	});
	$('.focus-region').mouseout(function(){
		c = $(this).attr('href');			
		cl = (c === '#')?colorRegion:c;
		iso = $(this).prop('id');
		fregion = {};
		fregion[iso] = cl;
		$('#vmap').vectorMap('set', 'colors', fregion);
		// $("#panel").animate({opacity: "1.0", left: "-=200"}, 600)
	});
	});
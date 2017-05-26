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
	        		var RegPercents = [];
	        		var CountryPercents = [];
	        		var length = data['r_count'];

	        		for(var i = 0; i<length; i++){
	        			RegPercents[i] = Number(data['reg_percents'][i]);
	        			CountryPercents[i] = Number(data['country_percents'][i]);
	        		}

				  	for(var i = 0; i<length; i++){
				  		if(data[i]['value_ill']>-1){
				  			data_obj[data[i]['key']] = ['Количество опрошенных имеющих симптомы: '+data[i]['value'],'Количество опрошенных имеющих диагноз: '+data[i]['value_ill'],'Доля по региону: '+RegPercents[i]+'%','Доля по России: '+CountryPercents[i]+'%'];
				  		}
				  		else{
				  			data_obj[data[i]['key']] = ['Количество: '+data[i]['value'], 'Доля по региону: '+RegPercents[i]+'%','Доля по России: '+CountryPercents[i]+'%'];
				  		}
				  	}
				  	
				  	
				  	for(var i = 0; i<length; i++){
				  		highlighted_states[data[i]['key']] = data['colors'][i];
				  	}
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
	});
	});
var chart_type = 'pie';
var need_refresh = false;

google.load("visualization", "1", {packages:["corechart"]});

function drawChart(data,options,testarr) {
  var chart = null;
  if(chart_type == 'pie'){
    chart = new google.visualization.PieChart(document.getElementById('chart'));
  }
  else if(chart_type == 'line'){
    chart = new google.visualization.LineChart(document.getElementById('chart'));
  }
  else if(chart_type == 'col'){
    chart = new google.visualization.ColumnChart(document.getElementById('chart'));
  }
  chart.draw(data, options);
}

jQuery( document ).ready( function( $ ) {
    HTML_backup = $('#m_cont_block').html();
    $(".footer").css("margin-top","0px");

    setEvents();
    $('#menu').mouseleave(SendRequest);
} );

function filterChanged(){
  need_refresh = true;
}

function setEvents(){
    $('input[name=chart_type]').change(ChangeChartType);
    $('input[name=gender]').change(filterChanged);
    $('input[name=tabak]').change(filterChanged);
    $('#noz').change(filterChanged);
    $('#age_group_id').change(filterChanged);
    $('#weight_group_id').change(filterChanged);
    $('#height_group_id').change(filterChanged);
    $('#id_social_status').change(filterChanged);
    $('#region').change(filterChanged);
}

function timeCountChanged(){
  need_refresh = true;
  var yf = $("#year_list_from").prop('selectedIndex');
  var yt = $("#year_list_to").prop('selectedIndex');
  var mf = $("#month_list_from").prop('selectedIndex');
  var mt = $("#month_list_to").prop('selectedIndex');
  if(yf >= yt){
    $("#year_list_to").prop('selectedIndex', yf);
    if(mf>=mt){
      if(mf < 11){
        $("#month_list_to").prop('selectedIndex', mf+1);
      }
      else{
        $("#month_list_from").prop('selectedIndex', mf-1);
        $("#month_list_to").prop('selectedIndex', mf+1);
      }
    }
  }
}

function ChangeChartType(){
  need_refresh = true;
  var old_type = chart_type;
  chart_type = $('input[name=chart_type]:checked','#charts_menu').val();
  if( chart_type == 'line' ){
    setLineFilters('#gender_group');
  }
  else if( chart_type == 'col' ){
    expandFilters();
  }

  if(old_type == 'line'){
      removeLineFilters();
  }
  else if ( old_type == 'col' ){
      narrowFilters();
  }
}

function setLineFilters(nextEL){
    var month = Number((new Date()).getMonth());
    var year = Number((new Date()).getFullYear());

    var year_list_label = document.createElement('p');
    $(year_list_label).addClass("smenup");
    $(year_list_label).html("<b>Временной отрезок</b>");
    $(year_list_label).attr("id", "year_list_label");

    var from_label = document.createElement('p');
    $(from_label).addClass("smenup");
    $(from_label).html("<b>Начало:</b>");
    $(from_label).attr("id", "from_label");

    var to_label = document.createElement('p');
    $(to_label).addClass("smenup");
    $(to_label).html("<b>Конец:</b>");
    $(to_label).attr("id", "to_label");

    var year_list_from = document.createElement('select');
    $(year_list_from).attr("class","spisok");
    $(year_list_from).attr("id","year_list_from");
    $(year_list_from).attr("name","year");
    $(year_list_from).css("width",100);
    $(year_list_from).change(timeCountChanged);

    var year_list_to = document.createElement('select');
    $(year_list_to).attr("class","spisok");
    $(year_list_to).attr("id","year_list_to");
    $(year_list_to).attr("name","year");
    $(year_list_to).css("width",100);
    $(year_list_to).change(timeCountChanged);

    var month_list_from = document.createElement('select');
    $(month_list_from).attr("class","spisok");
    $(month_list_from).attr("id","month_list_from");
    $(month_list_from).attr("name","year");
    $(month_list_from).css("width",150);
    $(month_list_from).change(timeCountChanged);

    var month_list_to = document.createElement('select');
    $(month_list_to).attr("class","spisok");
    $(month_list_to).attr("id","month_list_to");
    $(month_list_to).attr("name","year");
    $(month_list_to).css("width",150);
    $(month_list_to).change(timeCountChanged);

    var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    var html_m = "";
    for(var i = 0; i < 12; i++){
      html_m += "<option value='"+i+"'>"+months[i]+"</option>";
    }

    var html = "";
    for(var i = 2014; i <= year; i++){
      if(i == year){
        html += "<option value='"+i+"' selected>"+i+"</option>";
      }
      else{
        html += "<option value='"+i+"'>"+i+"</option>";
      }
    }

    $(month_list_from).html(html_m);
    $(month_list_to).html(html_m);
    $(month_list_from).prop('selectedIndex', 0);
    $(month_list_to).prop('selectedIndex', month);
    $(year_list_from).html(html);
    $(year_list_to).html(html);
    $(year_list_from).val("2014");

    var divv = document.createElement('div');
    $(divv).css('text-align','center');

    var div1 = document.createElement('div');
    $(div1).attr("class","date_div");

    var div2 = document.createElement('div');
    $(div2).attr("class","date_div");


    $(div1).append($(from_label));
    $(div1).append($(month_list_from));
    $(div1).append($(year_list_from));
    $(div2).append($(to_label));
    $(div2).append($(month_list_to));
    $(div2).append($(year_list_to));

    $(divv).append($(year_list_label));
    $(divv).append($(div1));
    $(divv).append($(div2));

    $(divv).hide().insertBefore(nextEL).fadeIn(200);
}

function removeLineFilters(){
  $("#year_list_label").fadeOut(200,function(){$(this).remove();});
  $("#from_label").fadeOut(200,function(){$(this).remove();});
  $("#to_label").fadeOut(200,function(){$(this).remove();});
  $("#year_list_from").fadeOut(200,function(){$(this).remove();});
  $("#year_list_to").fadeOut(200,function(){$(this).remove();});
  $("#month_list_from").fadeOut(200,function(){$(this).remove();});
  $("#month_list_to").fadeOut(200,function(){$(this).remove();});

}

function expandFilters(){
    $('#menu').removeClass('slide_menu1');
    $('#menu').addClass('slide_menu2');
    $('#m_cont_block').removeClass('menu_content1');
    $('#m_cont_block').addClass('menu_content2');
    
    $('#m_cont_block').html(expandedHTML);
    $('input[id=type_col]').prop('checked',true);
    
    setEvents();
    $("#ListBox_age").on('checkChange',filterChanged);
    $("#ListBox_height").on('checkChange',filterChanged);
    $("#ListBox_weight").on('checkChange',filterChanged);
    $("#ListBox_soc").on('checkChange',filterChanged);
    $("#ListBox_region").on('checkChange',filterChanged);
    $('input[name="diag_only"]').change(filterChanged);

    $("#ListBox_age").jqxListBox({ source: ages, checkboxes: true, width: '110', height: '250px', theme: 'summer'});
    $("#ListBox_height").jqxListBox({ source: heights, checkboxes: true, width: '140', height: '250px', theme: 'summer'});
    $("#ListBox_weight").jqxListBox({ source: weights, checkboxes: true, width: '150', height: '250px', theme: 'summer'});
    $("#ListBox_soc").jqxListBox({ source: s_st, checkboxes: true, width: '170', height: '250px', theme: 'summer'});
    $("#ListBox_region").jqxListBox({ source: regions, checkboxes: true, width: '280', height: '250px', theme: 'summer'});
}

function narrowFilters(){
  $('#menu').removeClass('slide_menu2');
  $('#menu').addClass('slide_menu1');
  $('#m_cont_block').removeClass('menu_content2');
  $('#m_cont_block').addClass('menu_content1');

  $('#m_cont_block').html(HTML_backup);
  $('input[id=type_'+chart_type+']').prop('checked',true);
  setEvents();
  if(chart_type=='line'){
    setLineFilters('#gender_group');
  }
  else{
    removeLineFilters();
  }
}

function SendRequest(){
  if(!need_refresh) return;
  need_refresh = false;

  var inputMass = {};

  if(chart_type == 'col'){
      var ages_list = [];
      var heights_list = [];
      var weights_list = [];
      var soc_list = [];
      var region_list = [];

      var a_l = $("#ListBox_age").jqxListBox('getCheckedItems');
      var h_l = $("#ListBox_height").jqxListBox('getCheckedItems');
      var w_l = $("#ListBox_weight").jqxListBox('getCheckedItems');
      var s_l = $("#ListBox_soc").jqxListBox('getCheckedItems');
      var r_l = $("#ListBox_region").jqxListBox('getCheckedItems');

      for(var i = 0; i<a_l.length; i++){
          ages_list[i] = a_l[i]['value'];
      }

      for(var i = 0; i<h_l.length; i++){
          heights_list[i] = h_l[i]['value'];
      }

      for(var i = 0; i<w_l.length; i++){
          weights_list[i] = w_l[i]['value'];
      }

      for(var i = 0; i<s_l.length; i++){
          soc_list[i] = s_l[i]['value'];
      }

      for(var i = 0; i<r_l.length; i++){
          region_list[i] = r_l[i]['value'];
      }

      inputMass = {
        "_token": $('#charts_menu').find( 'input[name=_token]' ).val(),
        "gender": $('input[name=gender]:checked','#charts_menu').val(),
        "tabak": $('input[name=tabak]:checked','#charts_menu').val(),
        "chart_type": $('input[name=chart_type]:checked','#charts_menu').val(),
        "noz" : $('#noz').val(),
        "diag_only": $('input[name="diag_only"]').prop('checked'),
        "age_group_id": ages_list,
        "height_group_id": heights_list,
        "weight_group_id": weights_list,
        "id_social_status": soc_list,
        "okato": region_list 
      }
  }
  else{
    inputMass = {
      "_token": $('#charts_menu').find( 'input[name=_token]' ).val(),
      "gender": $('input[name=gender]:checked','#charts_menu').val(),
      "tabak": $('input[name=tabak]:checked','#charts_menu').val(),
      "chart_type": $('input[name=chart_type]:checked','#charts_menu').val(),
      "year_from" : $('#year_list_from').val(),
      "year_to" : $('#year_list_to').val(),
      "month_from" : $('#month_list_from').val(),
      "month_to" : $('#month_list_to').val(),
      "noz" : $('#noz').val(),
      "age_group_id" : $('#age_group_id').val(),
      "weight_group_id" : $('#weight_group_id').val(),
      "height_group_id" : $('#height_group_id').val(),
      "id_social_status" : $('#id_social_status').val(),
      "okato" : $('#region').val()
    };
  }

  $(".map_wait").css("left","0px");
  $.post(
    $('#charts_menu').prop( 'action' ),

    inputMass,

    function( data ) {
      var options = {};
      
      if(data['null'] != 'true'){
        var ChartData = new google.visualization.DataTable();
        var colors = [];

        if(chart_type == 'pie'){
          colors = ['rgb(225,200,43)','rgb(130,225,90)'];
          if(data['names'].length==3){
            colors = ['rgb(225,200,43)','rgb(227,130,43)','rgb(130,225,90)'];
          }

          ChartData.addColumn('string', 'Topping');
          ChartData.addColumn('number', 'Slices');
          
          if(data['names'].length == 3){
             ChartData.addRow( [ data['names'][0], Number(data['value'])-Number(data['value_ill']) ] );
             ChartData.addRow( [ data['names'][1], Number(data['value_ill']) ] );
             ChartData.addRow( [ data['names'][2], Number(data['main_count'])-Number(data['value']) ] );
             
          }
          else{
             ChartData.addRow( [data['names'][0], Number(data['value']) ] );
             ChartData.addRow( [data['names'][1], Number(data['main_count'])-Number(data['value']) ] );
          }

          options = {
            'title' : 'Процентная зависимость признака от факторов',
            'backgroundColor' : '#FBFBFB',
            'colors': colors
          };
        }
        else if(chart_type == 'line'){
          
          colors = ['rgb(225,200,43)'];

          var noz = false;

          var names = ['Месяц','Количество'];
          var months = ['янв','фев','март','апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'];
          
          if(data['signs'] != null) var signs = data['signs'];

          if(data['value_ill'].length > 0){
            noz = true;
            names = ['Месяц','Количество опрошенных имеющих симптомы','Количество опрошенных имеющих диагноз'];
            colors = ['rgb(225,200,43)','rgb(227,130,43)'];
          }

          var data_arr = [];
          data_arr[0] = names;

          for(var i = 0; i<data['value'].length; i++){
            var arr = [];
            arr[0] = signs[i];
            arr[1] = Number(data['value'][i]);
            if(noz){
              arr[2] = Number(data['value_ill'][i]);
            }
            data_arr[i+1] = arr;
          }

          ChartData = google.visualization.arrayToDataTable(data_arr);

          options = {
            'title' : 'Процентная зависимость признака от факторов',
            'backgroundColor' : '#FBFBFB',
            'colors': colors
          };
        }
        else if(chart_type == 'col'){
          var data_arr = [];
          var headers = ['Group_name','Количество с симптомами','Количество с диагнозом'];
          var have_noz = data['have_noz'];
          var diag_only = data['diag_only'];
          colors = ['rgb(225,200,43)'];

          if(have_noz == 'true'){
            if(diag_only == 'false') colors = ['rgb(225,200,43)','rgb(227,130,43)'];
            else{
              colors = ['rgb(227,130,43)'];
              headers = ['Group_name','Количество с диагнозом'];
            }
          }
          else{
            headers = ['Group_name','Количество'];
          }

          data_arr[0] = headers;

          for(var i = 0; i<data['res_keys'].length; i++){
            var temp = [];
            temp[0] = data['res_keys'][i];
            if(have_noz == 'true' && diag_only == 'true'){
              temp[1] = Number(data['res_values_ill'][i]);
            }
            else{
              temp[1] = Number(data['res_values'][i]);
              if(have_noz == 'true') temp[2] = Number(data['res_values_ill'][i]);
            }
            data_arr[i+1] = temp;
          }

          ChartData = google.visualization.arrayToDataTable(data_arr);

          options = {
            'title' : 'Зависимость признака от факторов',
            'backgroundColor' : '#FBFBFB',
            'colors': colors,
            isStacked: true,
          };

        }

        drawChart(ChartData,options);
        $("#chart").css("visibility","visible");
      }
      else{
        $("#chart").css("visibility","hidden");
      }

      $(".map_wait").css("left","-9999px");
    },

    'json'
  );
}

function resetSelection(){
  $("#ListBox_age").jqxListBox('clearSelection'); 
  $("#ListBox_height").jqxListBox('clearSelection'); 
  $("#ListBox_weight").jqxListBox('clearSelection'); 
  $("#ListBox_soc").jqxListBox('clearSelection'); 
  $("#ListBox_region").jqxListBox('clearSelection');
  $("#ListBox_age").jqxListBox('uncheckAll'); 
  $("#ListBox_height").jqxListBox('uncheckAll'); 
  $("#ListBox_weight").jqxListBox('uncheckAll'); 
  $("#ListBox_soc").jqxListBox('uncheckAll'); 
  $("#ListBox_region").jqxListBox('uncheckAll');
}

var HTML_backup = '';
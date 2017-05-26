
$(document).ready(function(){
    setLineFilters('#after_dates');
});

function setLineFilters(nextEL){
    var month = Number((new Date()).getMonth());
    var year = Number((new Date()).getFullYear());

    $(month_list_from).change(timeCountChanged);
    $(year_list_from).change(timeCountChanged);
    $(month_list_to).change(timeCountChanged);
    $(year_list_to).change(timeCountChanged);

    var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    var html_m = "";
    for(var i = 1; i < 13; i++){
      html_m += "<option value='"+i+"'>"+months[i-1]+"</option>";
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

function sendRequest(){
    var p_tip = document.createElement('center');
    $(p_tip).attr("id","p_tip");
    $(p_tip).html('<h3>Пожалуйста, подождите, загрузка начнется автоматически...</h3>');
    $(p_tip).hide().insertAfter('#btn_export').fadeIn(200);

    inputMass = {
      "_token": $('#charts_menu').find( 'input[name=_token]' ).val(),
      "gender": $('input[name=gender]:checked','#charts_menu').val(),
      "tabak": $('input[name=tabak]:checked','#charts_menu').val(),
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

    $.post(
        $('#charts_menu').prop( 'action' ),

        inputMass,

        function( data ) {
            window.location = host_url+'download_file/'+data;
            $("#p_tip").fadeOut(200,function(){$(this).remove();});
        },

        'json'
    );

}
function init() {
    printMonth();
}

function nextMonth(month) {
    var monthBase = moment('2018-'+ (month+1) , 'YYYY-M');
    var year = monthBase.year();
    var month = monthBase.month();
    var nameMonth = monthBase.format('MMMM');
    var daysInMonth = monthBase.daysInMonth();
    var template = $('#calendar-template').html();
    var compiled = Handlebars.compile(template);
    var target = $('.days-month');
    target.html('');
    var template2 = $('#calendar-month-template').html();
    var compiled2 = Handlebars.compile(template2);
    var target2 = $('#month-selected');
    target2.html('');
    for (var i = 1; i <= daysInMonth; i++) {
        var datecomplete = moment({ year : year, month: month, day : i});
       var daysHTML = compiled({
           'value': i,
           'datecomplete': datecomplete.format('YYYY-MM-DD')
       });
       target.append(daysHTML); 
    }
    var monthNameHTML = compiled2 ({nameMonth});
    target2.append(monthNameHTML);
    $.ajax({
        url : 'https://flynn.boolean.careers/exercises/api/holidays',
        method : 'GET',
        data : {
            'month': month,
            'year': year
        },
        success: function (data) {

            var response = data.response;
            var success = data.success;
            console.log(data);
            console.log(success);

            if (success) {
                
                for (var i = 0; i < response.length; i++) {
                    var element =  $(".days-month li[data-datecomplete='" + response[i].date + "']");
                    element.addClass('holidays');
                    element.append("  ----  " + response[i].name);
                }
                    
            } else {
                alert('errore');
            }
            
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function prevMonth(month) {
    var monthBase = moment('2018-'+ (month-1) , 'YYYY-M');
    var nameMonth = monthBase.format('MMMM');
    var year = monthBase.year();
    var month = monthBase.month();
    var daysInMonth = monthBase.daysInMonth();
    var template = $('#calendar-template').html();
    var compiled = Handlebars.compile(template);
    var target = $('.days-month');
    target.html('');
    var template2 = $('#calendar-month-template').html();
    var compiled2 = Handlebars.compile(template2);
    var target2 = $('#month-selected');
    target2.html('');
    for (var i = 1; i <= daysInMonth; i++) {
        var datecomplete = moment({ year : year, month: month, day : i});
        var daysHTML = compiled({
           'value': i,
           'datecomplete': datecomplete.format('YYYY-MM-DD')
       });
       target.append(daysHTML);

    }
    var monthNameHTML = compiled2 (nameMonth);
    target2.append(monthNameHTML);

    $.ajax({
        url : 'https://flynn.boolean.careers/exercises/api/holidays',
        method : 'GET',
        data : {
            'month': month,
            'year': year
        },
        success: function (data) {

            var response = data.response;
            var success = data.success;

            if (success) {
                
                for (var i = 0; i < response.length; i++) {
                    var element =  $(".days-month li[data-datecomplete='" + response[i].date + "']");
                    element.addClass('holidays');
                    element.append("  ----  " + response[i].name);
                }
                    
            } else {
                alert('errore');
            }
            
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function printMonth() {
    var currentMonth = 0;
    $('.fa-chevron-right').click(function(){
    console.log(currentMonth);
    if (currentMonth>=0 & currentMonth<=11) {
        nextMonth(currentMonth);
      currentMonth++;
    } else{
      currentMonth = 0;
      alert('non puoi scegliere una data fuori dal 2018');
    }
  });
  $('.fa-chevron-left').click(function(){
  console.log(currentMonth);
  if (currentMonth>=0 & currentMonth<=11) {
    prevMonth(currentMonth);
    currentMonth--;
  } else{
    currentMonth = 11;
    alert('non puoi scegliere una data fuori dal 2018');
  }
  
  });
}

$(document).ready(init);

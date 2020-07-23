// Creiamo un calendario dinamico con le festività. Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività. 
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista 
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista
// Consigli e domande del giorno:
// Abbiamo visto assieme una libereria che serve per gestire le date... quale sarà?
// Una chiamata ajax può anche non andare a buon fine, che si fa in quel caso? Lasciamo l'utente ad attendere? ;) 
//API: https://flynn.boolean.careers/exercises/api/holidays


function init() {
    
    var monthBase = moment("2018-01-01");
    printMonth(monthBase);
    printHoliday(monthBase);
}

function printMonth(monthBase) {
    var daysInMonth = monthBase.daysInMonth();
    var template = $('#calendar-template').html();
    var compiled = Handlebars.compile(template);
    var target = $('.days-month');
    target.html('');
    for (var i = 1; i <= 31; i++) {
        var datecomplete = moment({ year : monthBase.year(), month: monthBase.month(), day : i});
       var daysHTML = compiled({
           'value': i,
           'datecomplete': datecomplete.format('YYYY-MM-DD')
       });
       target.append(daysHTML); 
    }
}

function printHoliday(monthBase) {
    var year = monthBase.year();
    var month = monthBase.month();
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
            
            for (var i = 0; i < response.length; i++) {
                var element =  $(".days-month li[data-datecomplete='" + response[i].date + "']");
                element.addClass('holidays');
                element.append("  ----  " + response[i].name);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

$(document).ready(init);
// https://en.wikipedia.org/wiki/VCard

// FORMAT VCARD
// --------------------------------------------------------------------
// BEGIN:VCARD
// VERSION:4.0
// N:Tan,;Dennis
// ORG:The Everly Group
// TITLE:Managing Director
// ADR:;;8 Tinggian Tunku;50480;Kuala Lumpur Malaysia;Bukit Tunku;
// TEL;CELL:+60 19 262-6868
// EMAIL;WORK;INTERNET:dt@theeverlygroup.com
// END:VCARD
// --------------------------------------------------------------------

var VCARD_STRING = 'BEGIN:VCARD\nVERSION:4.0\n';
var VCARD_END = 'END:VCARD';
var GOOGLE_CHART = 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=';

function init() {

    clean();

    $('.btn-submit').click(vCard_save);
    $('.btn-reset').click(clean);
}

function vCard_save() {

    if(!build_name()) {
        return;
    }

    build_detail();

    VCARD_STRING += VCARD_END;

    console.log(GOOGLE_CHART + encodeURIComponent(VCARD_STRING))

    $('#qr').attr('src', GOOGLE_CHART + encodeURIComponent(VCARD_STRING));

    $("#vCardModal").modal("show");

    VCARD_STRING = 'BEGIN:VCARD\nVERSION:4.0\n';
    console.log(VCARD_STRING)
}

function build_name() {
    var first_name, last_name

    first_name = $('.f-name-input').val();
    last_name = $('.l-name-input').val();

    if (first_name.length == 0 || last_name.length == 0) {
        alert("Please ensure first and/or last name fill up .");
        return false;
    }

    VCARD_STRING += 'N:' + last_name + ';' + first_name + '\n';
    VCARD_STRING += 'FN:' + last_name + ' ' + first_name + '\n';

    return true;
};

function build_detail() {
    var comp_name, position, phone_num, email, url;

    comp_name = $('.comp-name-input').val();
    position = $('.position-input').val();
    phone_num = $('.phone-num-input').val();
    email = $('.email-input').val();
    url = $('.url-input').val();    
    addresses = [
                $('.street-input').val(),
                $('.city-input').val(),
                $('.postal-input').val(),
                $('.state-input').val(),
                $('.country-input').val(),
            ];
    
    let address = addresses.join(';');

    VCARD_STRING += 'ORG:' + comp_name + '\n';
    VCARD_STRING += 'TITLE:' + position + '\n';
    VCARD_STRING += 'TEL;CELL:' + phone_num + '\n';
    VCARD_STRING += 'EMAIL:' + email + '\n';
    VCARD_STRING += 'URL:' + url + '\n';
    VCARD_STRING += 'ADR:;;' + address + '\n';
};

function clean() {

    var input_field = $('input');

    for (var ii = 0; ii < input_field.length; ii++) {
        if (input_field[ii].type == "text") {
            input_field[ii].value = "";
        }
    }
}

$(function () {
    init();
});
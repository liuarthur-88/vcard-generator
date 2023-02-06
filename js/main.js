// https://en.wikipedia.org/wiki/VCard

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

    console.log(VCARD_STRING)

    $('#qr').attr('src', GOOGLE_CHART + VCARD_STRING.replace(/\n/g, '%0A'));

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
    VCARD_STRING += 'FN:' + first_name + ' ' + last_name + '\n';

    return true;
};

function build_detail() {
    var comp_name, position, phone_num, email, url;

    comp_name = $('.comp-name-input').val();
    position = $('.position-input').val();
    phone_num = $('.phone-num-input').val();
    email = $('.email-input').val();
    url = $('.url-input').val();

    VCARD_STRING += 'ORG:' + comp_name + '\n';
    VCARD_STRING += 'TITLE:' + position + '\n';
    VCARD_STRING += 'TEL;TYPE=cell:' + phone_num + '\n';
    VCARD_STRING += 'EMAIL:' + email + '\n';
    VCARD_STRING += 'URL:' + url + '\n';
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
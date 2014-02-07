var $form = $('form');

$(document).ready( function () {
  // I only have one form on the page but you can be more specific if need be.
  if ( $form.length > 0 ) {
    $('form input[type="submit"]').bind('click', function ( event ) {
      if ( event ) event.preventDefault();
      // validate_input() is a validation function I wrote, you'll have to substitute this with your own.
      if ( validate_input($form) ) { register($form); }
    });
  }
});

function register() {
  var url = $form.attr('action').replace( '/post?', '/post-json?' );
  var method = 'get';

  $.ajax({
    type: method,
    url: url,
    data: $form.serialize(),
    cache       : false,
    dataType    : 'jsonp',
    jsonp       : 'c',
    contentType: "application/json; charset=utf-8",
    error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
    success     : function(data) {
      if (data.result != "success") {
        // Something went wrong, do something to notify the user. maybe alert(data.msg);
      } else {
        // It worked, carry on...
        registrationSuccess();
      }
    }
  });
}

function registrationSuccess() {
  $form.slideUp();
}

function validate_input() {
  return true;
}
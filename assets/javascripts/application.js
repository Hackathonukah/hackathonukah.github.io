(function() {
  $.fn.serializeObject = function(omit) {
    var a, o;
    o = {};
    a = this.serializeArray();
    $.each(a, function() {
      if (omit.indexOf(this.name) === -1) {
        if (o[this.name] !== void 0) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || "");
        } else {
          o[this.name] = this.value || "";
        }
      }
    });
    return o;
  };

  $("#contact-form input[type='submit']").on("click", function(e) {
    e.preventDefault();
    $.ajax({
      url: $("#contact-form").attr("action"),
      method: "POST",
      data: $("#contact-form").serializeObject(["_gotcha"]),
      dataType: "json",
      beforeSend: function() {
        return $("#contact-form").append("<div class='alert-loading'>Sending message...</div>");
      },
      success: function(data) {
        $("#contact-form").find(".alert-loading").hide();
        $("#contact-form").append("<div class='alert-success'>Message sent!</div>");
        return $("#contact-form").find("input[type='text'], textarea").val("");
      },
      error: function(err) {
        $("#contact-form").find(".alert-loading").hide();
        return $("#contact-form").append("<div class='alert-error'>Oops, something went wrong.</div>");
      }
    });
  });

}).call(this);
$(document).ready(function() {
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
});

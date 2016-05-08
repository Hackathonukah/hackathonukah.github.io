# inspired by http://adamboro.com/blog/web/middleman-snippets/ and
# https://gist.github.com/edmundojr/975b08c39ab0a7a1b514
$.fn.serializeObject = (omit) ->
  o = {}
  a = @serializeArray()
  $.each a, ->
    if omit.indexOf(@name) == -1
      if o[@name] != undefined
        if !o[@name].push
          o[@name] = [ o[@name] ]
        o[@name].push @value or ""
      else
        o[@name] = @value or ""
    return
  o

$("#contact-form input[type='submit']").on "click", (e) ->
  e.preventDefault()
  $.ajax
    url: $("#contact-form").attr("action")
    method: "POST"
    data: $("#contact-form").serializeObject(["_gotcha"])
    dataType: "json"
    beforeSend: ->
      $("#contact-form").append("<div class='alert-loading'>Sending message...</div>")
    success: (data) ->
      $("#contact-form").find(".alert-loading").hide()
      $("#contact-form").append("<div class='alert-success'>Message sent!</div>")
      $("#contact-form").find("input[type='text'], textarea").val("")
    error: (err) ->
      $("#contact-form").find(".alert-loading").hide()
      $("#contact-form").append("<div class='alert-error'>Oops, something went wrong.</div>")
  return

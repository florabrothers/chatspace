$(function() {
  function buildHTML(message) {
    // prebuild if function for the rendering of ajax
    var swap = `${message.text}`;
    if (`${message.image.url}` != "null") {
      swap = `${message.text}<img src="${message.image.url}">`
    }

    var html = `
                  <div class="message" data-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__username">
                          ${message.username}
                      </div>
                      <div class="upper-message__date">
                          ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">`
                      + swap +
                      `</p>
                    </div>
                  </div>
                  `
    return html;
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $(".messages").append(html);
        $(".form__message").val("");
        $(".hidden").val("");
        $(".form__submit").removeAttr("disabled")

        // replacing group message in sidebar (a little bit spaghetti)
        var lastMessage = $(".lower-message__content").last();
        if (lastMessage.find("img").length === 0) {
          lastMessage = $(".lower-message__content").last().text();
        } else {
          lastMessage = "An image is uploaded";
        }

        var grouphref = "a[href*=\'" + String(gon.group) + '/messages\']';
        $(grouphref).find(".group__message").text(lastMessage);

        autoButtom();

      })
      .fail(function() {
        alert("error");
      });
  });

  // autorefresh
  setInterval(function() {
      var message_id = $('.message:last').data('id');
      $.ajax({
        url: window.location.href,
        dataType: "json",
        type: 'GET',
        data: {
          id: message_id
        },
      })
      .done(function(json) {
        json.forEach(function(message){
          $(".messages").append(buildHTML(message));
          var lastMessage = $(".lower-message__content").last();
          if (lastMessage.find("img").length === 0) {
            lastMessage = $(".lower-message__content").last().text();
          } else {
            lastMessage = "An image is uploaded";
          }

          var grouphref = "a[href*=\'" + String(gon.group) + '/messages\']';
          $(grouphref).find(".group__message").text(lastMessage);
        })
        autoButtom();
      })
      .fail(function () {
      })
    } , 5000 )

    function autoButtom (){
      var messageBody = $('.messages')[0];
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
    }

})

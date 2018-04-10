$(function() {
  function buildHTML(message) {
    // prebuild if function for the rendering of ajax
    var imgTag = `${message.image.url}`;
    var swap =   `${message.text}<img src="${message.image.url}">`;
    if (imgTag === "null" ){
      swap = `${message.text}`
    }

    var html = `
                  <div class="upper-message">
                    <div class="upper-message__username">
                        ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                        ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">`
                      +  swap +
                    `</p>
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
        $(".message").append(html);
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

        // Always show the bottom message
        var messageBody = document.querySelector('.messages');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

      })
      .fail(function() {
        alert("error");
      });
  });
});

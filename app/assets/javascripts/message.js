$(function() {
  function buildHTML(message) {
    var html = `
                  <div class="upper-message">
                    <div class="upper-message__username">
                        ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                        ${message.ca}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                        ${message.text}
                        ${message.image}
                    </p>
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
        if (lastMessage.find("img").attr("src") === "") {
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

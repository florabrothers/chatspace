$(function() {

  var list = $("#user-search-result");

  // build list html
  function buildList(user) {
    var names = $(".chat-group-user__name").text()
    if (names.indexOf(`${user.name}`) < 0){
      var html = `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
        </div>
        `
      list.append(html);
    }
  }

  // add user to list html
  function addedUser(userId, userName) {
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
        <input name='group[user_ids][]' type='hidden' value='${userId}'>
        <p class='chat-group-user__name'>${userName}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>
      `
    $("#chat-group-users").append(html);
  }

  // when there is no search match
  function noUser(text) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${text}</p>
      `
    list.append(html);
  }

  // add user to list
  $(document).on("click", ".user-search-add", function() {
    console.log("clicked");
    var id = $(this).attr("data-user-id");
    var name = $(this).attr("data-user-name");
    $(this).parent().remove();
    $("#chat-group-users").append(addedUser(id, name));
  })

  // remove user from list
  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  })

  // execution
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var href = '/users'
    $.ajax({
        type: 'GET',
        url: href,
        data: {
          keyword: input
        },
        dataType: 'json'
      })
      .done(function(users) {
        $(list).empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            buildList(user);
          });
        } else {
          noUser("No such user");
        }
      })
      .fail(function() {
        alert("something wrong");
      })
  });
});

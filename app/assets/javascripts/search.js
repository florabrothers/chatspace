$(function() {
  function buildHTML(user) {
    var html = `
  <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
  </div>
                `
    return html;
  }

  $(".chat-group-form__search").on("keyup", function() {
    var input = $(".chat-group-form__search").val();
    var href = "/groups/search"
    $.ajax({
    type: 'GET',
    url: href,
    data: { members: input },
    dataType: 'json'
    })

    .done(function(products) {
      $(".listview.js-lazy-load-images").empty();
      if (products.length !== 0) {
        products.forEach(function(product){
          appendProduct(product);
        });
      }
      else {
        appendNoProduct("No such user");
      }
    })
  });
});

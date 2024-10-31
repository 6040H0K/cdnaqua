$('html').click(function() {
    $('.js-search-box').html('');
    $('.js-search-box').removeClass('d-block');
  });
  
$('.search-form').click(function(event){
    event.stopPropagation();
});

$(".js-search-form").on("input", '.js-search-input',function(e){
    $('.js-search-box').addClass('d-block');
    e.preventDefault();
    $.ajax({
        url: $(this).attr('data-url'),
        data: {
            'query': $(this).val(),
        },
        type: "GET",
        success: function (data) {
            if (data['status'] == 'success') {
                $('.js-search-box').html(data.html);
            }
            else if (data['status'] == 'error') {
                console.log("Missing some error")
            }
        },
    });
});
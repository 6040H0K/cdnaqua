$(document).ready(function () {
    $('body').on('click', '.js-next', function(e){
        e.preventDefault();
        $.ajax({
            url: $(this).attr('data-url'),
            type: "GET",
            data: {
                'count': $('.js-single-item .js-slide').length,
            },
            success: function (data) {
                if (data['status'] == 'success') {
                    $('.js-single-item').append(data.html);
                }
                else if (data['status'] == 'error') {
                    console.log("Missing some error")
                }
            },
        });
        $('.js-single-item .js-slide').first().addClass('hide-prev');

        setTimeout(function() {
            $('.js-single-item .js-slide').first().remove();
            $('.js-single-item .js-prev').first().remove();
            $('.js-single-item .js-next').first().remove();
        }, 500);
    });
});

$(document).ready(function () {
    $('body').on('click', '.js-prev', function(e){
        e.preventDefault();
        $.ajax({
            url: $(this).attr('data-url'),
            type: "GET",
            data: {
                'count': $('.js-single-item .js-slide').length,
            },
            success: function (data) {
                if (data['status'] == 'success') {
                    $('.js-single-item').prepend(data.html);
                    $('.js-single-item .js-slide').first().addClass('hide-prev');
                    setTimeout(function() {
                        $('.js-single-item .js-slide').first().removeClass('hide-prev');
                    }, 1);
                }
                else if (data['status'] == 'error') {
                    console.log("Missing some error")
                }
            },
        });
        setTimeout(function() {
            $('.js-single-item .js-slide').last().remove();
            $('.js-single-item .js-prev').last().remove();
            $('.js-single-item .js-next').last().remove();
        }, 500);
    });
});

$(document).ready(function() {
    if(!$('.js-promo-slider').length)
      return;

    var data_url = $('.js-promo-slider').attr('data-url');

    if (innerWidth > 1499) {
        count = 6;
    }
    else if (innerWidth > 991) {
        count = 4;
    }
    else if (innerWidth > 767) {
        count = 3;
    }
    else if (innerWidth > 575) {
        count = 2;
    }
    else {
        count = 1;
    }

    $.ajax({
        url: data_url,
        type: "GET",
        data: {
            'count': count,
        },
        success: function(data) {
            if (data['status'] == 'success') {
                $('.js-promo-slider').html(data.html);
            }
            else if (data['status'] == 'error') {
                console.log("Missing some error")
            }
        },
    });

    window.addEventListener('resize', function(event){

        if (innerWidth > 1499) {
            count = 6;
        }
        else if (innerWidth > 991) {
            count = 4;
        }
        else if (innerWidth > 767) {
            count = 3;
        }
        else if (innerWidth > 575) {
            count = 2;
        }
        else {
            count = 1;
        }

        $.ajax({
            url: data_url,
            type: "GET",
            data: {
                'count': count,
            },
            success: function(data) {
                if (data['status'] == 'success') {
                    $('.js-promo-slider').html(data.html);
                }
                else if (data['status'] == 'error') {
                    console.log("Missing some error")
                }
            },
        });
    }, {passive: true});
});

$(document).ready(function () {
    $('body').on('click', '.js-next-product', function(e){
        var count = $('.js-promo-slider .js-slide').length;
        var prev_class = 'hide-prev-' + count;
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
            type: "GET",
            data: {
                'count': count,
                'status': 'next',
            },
            success: function (data) {
                if (data['status'] == 'success') {
                    $('.js-promo-slider').append(data.html);
                    $('.js-promo-slider .js-next-product').addClass('disable-link');
                    $('.js-promo-slider .js-prev-product').addClass('disable-link');
                }
                else if (data['status'] == 'error') {
                    console.log("Missing some error")
                }
            },
        });
        $('.js-promo-slider .js-slide').first().addClass(prev_class);

        setTimeout(function() {
            $('.js-promo-slider .js-slide').first().remove();
            $('.js-promo-slider .js-prev-product').first().remove();
            $('.js-promo-slider .js-next-product').first().remove();
            $('.js-promo-slider .js-next-product').removeClass('disable-link');
            $('.js-promo-slider .js-prev-product').removeClass('disable-link');
        }, 500);
    });
});

$(document).ready(function () {
    $('body').on('click', '.js-prev-product', function(e){
        var count = $('.js-promo-slider .js-slide').length;
        var next_class = 'hide-next-' + count;
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
            type: "GET",
            data: {
                'count': count,
                'status': 'prev',
            },
            success: function (data) {
                if (data['status'] == 'success') {
                    $('.js-promo-slider').prepend(data.html);
                    $('.js-promo-slider .js-next-product').addClass('disable-link');
                    $('.js-promo-slider .js-prev-product').addClass('disable-link');
                    $('.js-promo-slider .js-slide').first().addClass(next_class);
                    setTimeout(function() {
                        $('.js-promo-slider .js-slide').first().removeClass(next_class);
                    }, 1);
                }
                else if (data['status'] == 'error') {
                    console.log("Missing some error")
                }
            },
        });
        setTimeout(function() {
            $('.js-promo-slider .js-slide').last().remove();
            $('.js-promo-slider .js-prev-product').last().remove();
            $('.js-promo-slider .js-next-product').last().remove();
            $('.js-promo-slider .js-next-product').removeClass('disable-link');
            $('.js-promo-slider .js-prev-product').removeClass('disable-link');
        }, 500);
    });
});

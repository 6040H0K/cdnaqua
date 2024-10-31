/* Show top navbar on home page when scrolling */
var scrollStart = 10;

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll > scrollStart && window.scrollY > scrollStart) {
    $(".js-scroll-header").addClass("scroll-header");
  } else {
    $(".js-scroll-header").removeClass("scroll-header");
  }
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var csrftoken = getCookie("csrftoken");

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  },
});

/**************************** ФОРМА КОНТАКТОВ ************************/
$().ready(function () {
  var form = $("#contact-form");

  $("body").on("submit", "#contact-form", function (e) {
    $("#contact-form-send").attr("disabled", true);
    var form = this,
      $this = $(this);
    $.ajax({
      type: this.method || "GET",
      url: $this.data("url") || this.action,
      data: $this.serializeArray(),
      success: function (data) {
        $this.html(data.html);
        $(".thanks").css("display", "block");
      },
      error: function (xhr) {
        console.log('d"oh');
      },
    });
    $("#contact-form-send").attr("disabled", false);
    return false;
  });
});

// Language switcher related
$("#langs a").click(function () {
  var el = $(this);
  $("#id_language").val(el.data("lang-code"));
  $("#change-lang-form").trigger("submit");
  return false;
});

$("#change-lang-form #id_language").change(function () {
  $("#change-lang-form").trigger("submit");
});
/*************************** Modal *********************************/
$("body").on("click", ".js-callback-order", function (event) {
  event.preventDefault();
  var url = $(this).attr("href") || $(this).data("url");
  var title = $(this).text().trim();

  $.ajax({
    url: url,
    type: "get",

    success: function (data) {
      $("#js-modal #js-modal-label").html(title);
      $("#js-modal .modal-body").html(data.html);
      $("#js-modal").modal("show");
      $("#id_phone").mask("+38(099)-999-99-99");
    },

    error: function () {
      console.log("d'oh");
    },
  });
  return false;
});

$("body").on("submit", ".js-send-callback-order-form", function (event) {
  event.preventDefault();
  var url = $(this).attr("action");
  var $this = $(this);

  $.ajax({
    url: url,
    type: "post",
    data: $(this).serializeArray(),

    success: function (data) {
      $this.replaceWith(data.html);
    },

    error: function () {
      console.log("d'oh");
    },
  });
  return false;
});

$(document).ready(function () {
  $(".modal").on("hidden.bs.modal", function () {
    $(".modal-dialog").removeClass("modal-size");
    $(".modal-dialog").removeClass("modal-login-size");
    $(".modal-dialog").removeClass("modal-xl");
  });
});

/*************************** Top-category *********************************/

$(".js-all-categories").on("click", function () {
  $(".js-excess-cat").toggleClass("d-inline-block");

  if (!$(this).data("status")) {
    $(this).html("Згорнути");
    $(this).data("status", true);
  } else {
    $(this).html("Усі категорії");
    $(this).data("status", false);
  }
  return false;
});

/*************************** Sidebar-category *****************************/
$(".js-button-down").click(function () {
  var data = $(this).data("name");
  $(this).toggleClass("open");

  if ($(this).hasClass("open")) {
    $(this).children("span").text("Згорнути");
  } else {
    $(this).children("span").text(data);
  }
});

/*************************** OPEN - SIDEBAR - MD *****************************/
function OpenSideBar() {
  $(".js-button-open-sidebar").click(function () {
    $(".js-show-sidebar").toggleClass("show");
  });
}
$(document).ready(OpenSideBar);
/*************************** Anchor-Link *******************************/

$("#js-up").click(function () {
  $("body,html").animate({ scrollTop: 0 }, 500);
  return false;
});

/*************************** Підказка *******************************/

$(function () {
  $('[data-toggle="popover"]').popover();
});
/*************************** fixed-button ***************************/

$("document").ready(function ($) {
  var nav = $(".js-scrollTop");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 170) {
      nav.addClass("anchor");
    } else {
      nav.removeClass("anchor");
    }
  });
});
/*************************** stop-video *******************************/
$(".slider-for").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
  var slide = $(slick.$slides.get(currentSlide));
  if (slide.hasClass("product-video")) {
    var src = slide.children("iframe").attr("src");
    slide.children("iframe").attr("src", "");
    slide.children("iframe").attr("src", src);
  }
});

/************************** fixed-filter ************************/
$(document).ready(function () {
  var pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  var bottom_height = $("#footer").outerHeight();
  var break_point = pageHeight - bottom_height - 300;

  $(window).on("scroll", function (event) {
    var target = $(".js-fixblock");
    var top_scroll = window.scrollY;
    var top_offset = top_scroll + $(".js-fixblock").outerHeight();
    var bot_offset = top_scroll + document.documentElement.clientHeight - break_point - 200;
    var widthWindow = $(window).width();

    if (widthWindow <= 991) {
      if (top_scroll > 335 && top_offset < break_point) {
        target.addClass("fixed");
      } else if (top_scroll > 335 && top_offset >= break_point) {
      } else if (top_scroll < 335) {
        target.removeClass("fixed");
        target.css({
          bottom: "inherit",
        });
      }
    }
    if (widthWindow <= 767) {
      if (top_scroll > 390 && top_offset < break_point) {
        target.addClass("fixed");
      } else if (top_scroll > 390 && top_offset >= break_point) {
      } else if (top_scroll < 390) {
        target.removeClass("fixed");
        target.css({
          bottom: "inherit",
        });
      }
    }
    if (widthWindow <= 575) {
      if (top_scroll > 550 && top_offset < break_point) {
        target.addClass("fixed");
      } else if (top_scroll > 550 && top_offset >= break_point) {
      } else if (top_scroll < 390) {
        target.removeClass("fixed");
        target.css({
          bottom: "inherit",
        });
      }
    }
  });

  $(window).trigger("scroll");
});

/************************** close-dropdown************************/
function set_cat_dropdown_size() {
  var xOffset;
  if ($(window).width() >= 1340) {
    xOffset = 130;
  } else {
    xOffset = 126;
  }

  if ($(".js-scroll-header").hasClass("scroll-header")) {
    xOffset = $(".js-scroll-header").outerHeight(true);
  }
  var height = $(window).outerHeight(true) - xOffset;
  $(".js-category-menu-wrap").css({
    top: xOffset + "px",
    height: height,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  $("body").on("click", ".js-dropdown-cat-btn", function () {
    set_cat_dropdown_size();
    $(".js-category-menu-wrap").toggleClass("show");
    $(".js-caret-down").toggleClass("caret-down-rotate");
  });
});

$(window).on("scroll", set_cat_dropdown_size);
$("body").on("click", ".js-category-menu-wrap", function () {
  $(".js-category-menu-wrap").removeClass("show");
});

$(".js-open-dropdown").click(function () {
  $(".js-list-categories").toggleClass("show");
});

function set_category_dropdown() {
  var container_width = $(".container-wide").outerWidth();
  if (container_width <= 1810 && container_width > 756) {
    var geting_width = $(".js-dropdown-cat").outerWidth();
    $(".js-category-menu").width(geting_width);
    $(".js-category-li").width(geting_width);
  }
  if ($(window).width() < 1121 && $(window).width() > 991) {
    $(".js-category-menu").width("100%");
  }
}
set_category_dropdown();

$(window).resize(function () {
  set_category_dropdown();
});

function show_sub_category(category) {
  var base_heigth = $(window).height() - $("#header").height();
  var set_height = $(".js-category-menu").outerHeight();
  var container = $(".container-wide");
  var container_width = container.outerWidth();
  if (container_width > 756) {
    var drop_list_width = $(".js-dropdown-cat").outerWidth();
    $(".js-category-menu").width(drop_list_width);
    $(".js-category-li").width(drop_list_width);
    var set_width = container_width - drop_list_width;
    $(category).height(set_height);
    // $(".js-category-menu-wrap").height(set_height);
    $(category).width(set_width);
  }
}

$(".js-category-li").hover(function () {
  let category = $(this).children(".js-dropdown-subcat-menu");
  show_sub_category(category);
});

$("body").on("click", ".js-open-sub-cat-menu", function () {
  if (window.outerWidth <= 991) {
    $(this).toggleClass("rotate");
    let parent = $(this).parent().parent();
    parent.toggleClass("active");
    let category = parent.children(".js-dropdown-subcat-menu");
    category.toggleClass("show");
  }
});

/*************** SM-close-dropdown ***************************/

$(".js-header_button").click(function () {
  $(".js-wrap-sm-menu").toggleClass("show");
  $(".js-header_button-open").toggleClass("d-none");
  $(".js-header_button-close").toggleClass("d-none");
  if ($(".js-multi-collapse").hasClass("show")) {
    $("body").addClass("overflow-hidden");
  }
  if (!$(".js-wrap-sm-menu").hasClass("show")) {
    $("body").removeClass("overflow-hidden");
  }
});

/************************* custom product edit form *************/

$(function () {
  var categories = $(".js-product-modern-form #id_categories");
  if (categories.length) {
    categories[0].onchange = function () {
      var cats = categories.val(),
        url = location.pathname + "?categories=" + cats.join(",");
      $(".js-modern-form-attrs").load(url);
    };
  }

  var modernFormValidation = function () {
    var videoUrl = $(".js-product-video-url"),
      urlVal = videoUrl.val();
    videoUrl.val("");
    var is_valid = $(".js-product-modern-form")[0].checkValidity();
    $(".js-modern-tabs li a").removeClass("text-danger");
    videoUrl.val(urlVal);
    if (!is_valid) {
      $(".js-product-modern-form")
        .find("input, select, textarea")
        .not(videoUrl)
        .each(function () {
          var t = $(this),
            selection = t.next(".select2").find(".select2-selection"),
            content = t.closest(".tab-content");
          t.removeClass("is-invalid");
          selection.removeClass("is-invalid border-danger");
          if (!this.checkValidity()) {
            t.addClass("is-invalid");
            selection.addClass("is-invalid border-danger");
            if (content.length) {
              var index = $(".js-modern-tabs-container .tab-content").index(content[0]);
              $(".js-modern-tabs li a").eq(index).addClass("text-danger");
            }
          }
        });
    }

    return is_valid;
  };

  $(".js-modern-form-save").click(function () {
    var is_valid = modernFormValidation();
    if (is_valid) {
      var form_action = $(this).is(".js-modern-form-continue") ? "continue" : "return";
      $(".js-product-modern-form #form_action").val(form_action);
      $(".js-product-modern-form button, .js-modern-form-save, .js-product-delete").prop(
        "disabled",
        true
      );
      $(".js-product-modern-form")[0].submit();
    }
  });

  $(".js-product-modern-form").bind("submit", modernFormValidation);

  $(".js-modern-form-button").click(function () {
    var is_valid = modernFormValidation();
    if (is_valid) {
      $(".js-product-modern-form button, .js-modern-form-save, .js-product-delete").prop(
        "disabled",
        true
      );
      $(".js-product-modern-form")[0].submit();
    }
    return is_valid;
  });

  $(".js-product-upload-files").on("change", function () {
    var t = $(this),
      data = new FormData(t.closest("form")[0]),
      files = t.closest(".js-product-files");
    (url = t.data("url")),
      (loading = files.find(".js-files-loading")),
      (label = files.find(".js-files-label")),
      (errors = files.find(".js-product-files-upload-errors")),
      (success = files.find(".js-product-files-upload-success")),
      (fcount = this.files.length);
    label.addClass("d-none");
    errors.addClass("d-none");
    success.addClass("d-none");
    loading.removeClass("d-none");
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: data,
      cache: false,
      processData: false,
      contentType: false,
      success: function (response) {
        files.find(".js-product-files-list").html(response["html"]);
        label.removeClass("d-none");
        loading.addClass("d-none");
        if (response.errors.length) {
          errors
            .removeClass("d-none")
            .find(".js-product-alert-content")
            .html(response.errors.join("<br>"));
        }
        if (response.errors.length < fcount) {
          success.removeClass("d-none");
        }
        t.val("");
      },
    });
  });

  $(".js-product-video-url").bind("keydown", function (e) {
    if (e.keyCode == 10 || e.keyCode == 13) {
      $(".js-product-add-video").click();
      e.preventDefault();
      return false;
    }
  });
});

$(document).on("click", ".js-product-file-delete", function () {
  var t = $(this);
  $.post(t.data("url"), function () {
    t.closest(".js-product-file-column").remove();
  });
});

$(document).on("click", ".js-product-video-delete", function () {
  var t = $(this);
  $.post(t.data("url"), function () {
    t.closest(".js-product-video-entry").remove();
  });
  return false;
});

$(document).on("click", ".js-product-delete", function () {
  $("#js-confirm-modal").modal("show");
});

$(document).on("click", ".js-product-delete-finish", function () {
  $(`
        .modal.show button, .js-product-modern-form button,
        .js-modern-form-save, .js-product-delete
    `).prop("disabled", true);
  $.post($(this).data("url"), function (response) {
    location.replace(response.url);
  });
});

$(document).on("click", ".js-product-alert .close", function () {
  $(this).closest(".js-product-alert").addClass("d-none");
});

$(document).on("click", ".js-product-add-video", function () {
  var videoUrl = $(".js-product-video-url");
  videoUrl.removeClass("is-invalid");
  if (!videoUrl[0].checkValidity() || !videoUrl.val()) {
    videoUrl.addClass("is-invalid");
  } else {
    $.post(videoUrl.data("url"), videoUrl.serialize(), function (response) {
      $(".js-product-videos-list").html(response.html);
      videoUrl.val("");
    });
  }
  return false;
});

$(document).ready(function () {
  $(document).on("hidden.bs.modal", ".ordering-finish", function (e) {
    window.location.reload();
  });
});

// Review form Ajax
$(document).ready(function () {
  $("body").on("click", ".js-review-modal", function () {
    var url = $(this).attr("data-url");
    $.ajax({
      type: "GET",
      url: url,
      success: function (data) {
        $(".js-modal-body").html(data);
        $(".js-modal").modal("show");
      },
    });
  });
});

$(document).ready(function () {
  $("body").on("click", ".js-open-review-question", function () {
    var title_str = $(this).text();
    var url = $(this).attr("data-url");
    $.ajax({
      type: "GET",
      url: url,
      success: function (data) {
        $(".js-modal-body").html(data.html);
        $("#js-modal #js-modal-label").text(title_str);
        $(".modal-dialog").addClass("modal-review");
        $(".js-modal").modal("show");
      },
    });
  });
});
var is_look_more = false;
$(document).on("click", ".js-look-more", function () {
  if (is_look_more) {
    var title = $(this).attr("data-title-default");
  } else {
    var title = $(this).attr("data-title");
  }

  is_look_more = !is_look_more;
  $(this).text(title);
  $(".js-toggleable-review").toggleClass("d-none");
  return false;
});

//Select rating star for review form
$(document).on("click", ".js_ratings_part", function () {
  var value = $(this).data("value");
  $("#id_score").val(value);
  var stars = $(".js_ratings_part");
  for (i = 0; i < stars.length; i++) {
    $(stars[i]).children().removeClass("active");
  }
  for (i = 0; i < stars.length; i++) {
    if (i >= 5 - value) {
      $(stars[i]).children().addClass("active");
    }
  }
});

//Product's question form
$(document).on("submit", ".js-product-question-form", function (e) {
  var form = $(this);
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: form.attr("action"),
    data: form.serialize(),
    dataType: "json",
    success: function (data) {
      if (data.success) {
        $(".js-modal-body").html(data.html);
        $(".js-modal").modal("show");
        $(".js-review-form-wrap").html(data.form_html);
      } else {
        $(".js-product-question-form-wrap").html(data.html);
      }
    },
  });
});

/**********COUNTDOWN**********/

function milliseconds_to_end(datetime_end) {
  var current_datetime = new Date().getTime();
  datetime_end = Date.parse(datetime_end);
  var milliseconds = datetime_end - current_datetime;

  if (milliseconds < 0) return 0;

  return milliseconds;
}

setInterval(function () {
  $("body")
    .find(".js-countdown")
    .each(function () {
      datetime_end = $(this).attr("data-end");
      var milliseconds = milliseconds_to_end(datetime_end);
      var seconds = Math.floor((milliseconds / 1000) % 60);
      var minutes = Math.floor((milliseconds / 60000) % 60);
      var hours = Math.floor((milliseconds / 3600000) % 24);
      var days = Math.floor(milliseconds / 86400000);
      $(this).find(".js-seconds").html(seconds);
      $(this).find(".js-minutes").html(minutes);
      $(this).find(".js-hours").html(hours);
      $(this).find(".js-days").html(days);
    });
}, 1000);

/************* LIST FOOTER *********************/

$(".js-title-list-footer").click(function () {
  var list = $(this).next(".js-open-list-footer");
  $(this).toggleClass("rotate");
  list.toggleClass("show");
});

$(document).ready(function () {
  const connect_file = $("#id_connect_file");
  if (connect_file[0]) {
    connect_file[0].addEventListener("change", handleFiles, false);
  }
  function handleFiles() {
    const fileList = this.files;
    var file = fileList[0];
    $(".js-connect-file-text").text(file.name);
  }
  $("body").on("submit", "#js-counter-price", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: new FormData(this),
      dataType: "json",
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        $(".js-cost-wrap").html(data.html);
      },
    });
  });
});

$(document).ready(function () {
  $("body").on("click", ".js-btn-read-more", function () {
    var title_str = $(this).attr("data-title");

    $("#js-modal #js-modal-label").text(title_str);
    $(".js-modal").modal("show");
    var t = $(this),
      title_str = t.data("title"),
      url = t.data("url");
    $.ajax({
      type: "GET",
      url: url,
      success: function (data) {
        $(".js-modal").modal("show");
        $("#js-modal #js-modal-label").text(title_str);
        $(".js-modal-body").html(data);
      },
    });
  });
});

$(document).ready(function () {
  var is_change_title = false;
  $(document).on("click", ".js-open-product-accordion", function () {
    var curr_acordion = $(this).attr("data-accordion-id");
    var selector = ".js-products-accordion#" + curr_acordion;
    var title_element = $(this).children("span");
    is_change_title = !is_change_title;
    $(selector).toggleClass("open");
    if ($(selector).hasClass("open")) {
      $(title_element).text($(title_element).attr("data-title-hide"));
    } else {
      $(title_element).text($(title_element).attr("data-title-show"));
    }
  });
});

$(document).ready(function () {
  $(".js-brand-filter").on("click", function (e) {
    e.stopImmediatePropagation();
    var brand_slug = $(this).attr("data-slug");
    $("#" + brand_slug).trigger("click");
    $("#" + brand_slug).blur();
  });
  $("input[type='number']").on("change", function () {
    var number = $(this).val();
    var pattern = /\d/;
    if (!pattern.exec(number)) {
      $(this).val(0);
    }
  });
  $(".js-set-count-one").val(1);
});

$("body").on("submit", ".js-cooperation-form", function (event) {
  event.preventDefault();
  var url = $(this).attr("action");
  var $this = $(this);

  $.ajax({
    url: url,
    type: "post",
    data: $(this).serialize(),

    success: function (data) {
      $this.replaceWith(data.html);
    },

    error: function () {
      console.log("Missing some error check network");
    },
  });
  return false;
});

//Add comment Ajax
$(document).ready(function () {
  $("body").on("click", ".js-add-comment", function () {
    var obj = $("#productModal .modal-dialog");
    var ModalWidth = $(this).data("widthmodal");
    var addComment = $(this).data("addcomment");
    var title = $(this).data("title");
    console.log("Comment form");
    $.ajax({
      url: $(this).attr("data-form-url"),
      type: "GET",
      data: {},
      success: function (data) {
        $(".js-modal-body").html(data.html);
        $("#js-modal #js-modal-label").text(title);
        $("#id_phone").mask("+38(099)-999-99-99");
        $(".js-modal").modal("show");
      },
    });
    obj.css({
      "max-width": ModalWidth,
    });
    obj.addClass(addComment);
  });
  $("body").on("submit", ".js-comment-form", function (event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      data: $(this).serialize(),
      success: function (data) {
        $(".js-modal-body").html(data.html);
        if (data.review_id) {
          $(".js-comment-count[data-review-id='review-" + data.review_id + "']").html(
            data.count_html
          );
        }
      },
      error: function (data) {
        console.log("Missing some error. Look Network");
      },
    });
  });
});

$(document).ready(function () {
  $(".js-look-more-questions").click(function () {
    $(".js-toggleable-questions").toggleClass("d-none");
  });
  $(".js-comment-count").on("click", function () {
    $(this).parent().siblings(".js-comments-block").toggleClass("d-none");
  });
});

$(document).ready(function () {
  function set_sidebar_width() {
    var container = $(".container-wide");
    var container_width = container.width();
    if (container_width < 1810 && container_width > 756) {
      var drop_list_width = $(".js-list-categories").width();
      var set_width = container_width - drop_list_width - 20;
      $(".js-open-category").children(".js-child-categories").width(set_width);
    }
  }
  set_sidebar_width();
  window.addEventListener(
    "resize",
    function () {
      set_sidebar_width();
    },
    { passive: true }
  );
});

var autocompliteItemSelected = function (event) {
  $(this).parent(".js-search-result").siblings("input").val($(this).text());
  $(this).parent(".js-search-result").removeClass("show");
  let input_field_id = $(this).parent(".js-search-result").siblings("input").attr("id");
  if (input_field_id == "id_shipping_settlement") {
    $("#id_shipping_point, #id_shipping_index").val("");
  }
};
$(document).on("click", ".js-autocomplite-item", autocompliteItemSelected);

$(document).ready(function () {
  $("#lightgallery").lightGallery({
    selector: ".lightgallery-item a",
  });

  $(".js-product-gallery").lightGallery({
    selector: ".js-product-gallery-item a",
    thumbnail: false,
    showThumbByDefault: false,
  });
});

function updatePopper(element) {
  if (element.hasClass("active") || element.hasClass("added-in-cart")) {
    let new_text = element.attr("data-added-text");
    element.attr("data-content", new_text);
    element.popover({
      content: new_text,
    });
  } else {
    let new_text = element.attr("data-default-text");
    element.attr("data-content", new_text);
    element.popover({
      content: new_text,
    });
  }
  element.popover("update");
  element.popover("show");

  setTimeout(function () {
    element.popover("hide");
  }, 500);
}

/*************NOVELTY/SALES PAGINATION*********************/
$(function () {
  if (typeof $.endlessPaginate != "undefined")
    $(".js-paginated-categories").endlessPaginate({
      paginateOnScroll: true,
      paginateOnScrollMargin: 1210,
    });
});

$(function () {
  if (window.innerWidth < 991) {
    $(".js-title-dropdown-sm").click(function () {
      $("body").toggleClass("overflow-hidden");
    });
  }
});

$(window).on("load", function () {
  let thumbsSwiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 5,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
  });

  new Swiper(".main-image-wapper", {
    loop: true,
    initialSlide: $(".swiper-slide.js-product-gallery-item").index(),
    speed: 1000,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
});

$(window).on("load", function () {
  new Swiper(".main-slider", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: ".main-slider-btn.next",
      prevEl: ".main-slider-btn.prev",
    },
  });
});

$(window).on("load", function () {
  new Swiper(".products-list-compare", {
    spaceBetween: 30,
    speed: 1000,
    slidesPerView: 1,
    navigation: {
      nextEl: ".product-compare-btn.next",
      prevEl: ".product-compare-btn.prev",
    },
    breakpoints: {
      1600: {
        slidesPerView: 6,
      },
      1350: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      450: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
    },
  });
});

$(window).on("load", function () {
  new Swiper(".revised-list", {
    spaceBetween: 30,
    speed: false,
    slidesPerView: 1,
    breakpoints: {
      1600: {
        slidesPerView: 6,
      },
      1350: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      450: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
    },
  });
});

$(window).on("load", function () {
  new Swiper(".sale-product-slider", {
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    slidesPerGroupAuto: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: ".sale-product-btn.next",
      prevEl: ".sale-product-btn.prev",
    },
    breakpoints: {
      1600: {
        slidesPerView: 6,
      },
      1350: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      450: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
    },
  });
});
$(window).on("load", function () {
  new Swiper(".list-brand-product", {
    loop: true,
    speed: 1000,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".list-brand-btn.next",
      prevEl: ".list-brand-btn.prev",
    },
  });
});

$(window).on("load", function () {
  new Swiper(".sub-category-list", {
    loop: true,
    speed: 1000,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".sub-category-btn.next",
      prevEl: ".sub-category-btn.prev",
    },
  });
});

/*************YOUTUBE IFRAME*********************/
$(document).on("click", ".js-load-youtube-iframe", function () {
  var video_id = $(this).attr("data-video-id");
  $.ajax({
    type: "GET",
    url: $(this).attr("data-url"),
    data: { id: video_id },
    success: function (data) {
      $(`#js-replace-with-iframe-${video_id}`).html(data.html);
    },
    error: function () {
      console.log("Some error occurred. See detail on Network");
    },
  });
});

/*************GOOGLE MEASUREMENT ANALYTICS*********************/

function sendAnalyticsEvent(
  user_event,
  analytics_items,
  value,
  shipping_tier,
  payment_type,
  quantity,
  transaction_id
) {
  var items = [];

  for (var i = 0; i < analytics_items.length; i++) {
    var item = analytics_items[i];
    var item_name = item.getAttribute("data-item-name").trim();
    var item_id = item.getAttribute("data-item-id");
    var price = item.getAttribute("data-price").trim();
    var item_brand = item.getAttribute("data-item-brand");
    var item_category = item.getAttribute("data-item-category");
    var item_variant = item.getAttribute("data-item-variant").trim();
    var item_discount = item.getAttribute("data-discount");
    var item_quantity = item.getAttribute("data-item-quantity");

    items.push({
      item_name: item_name,
      item_id: item_id,
      price: price,
      item_brand: item_brand,
      item_category: item_category,
      item_variant: item_variant,
      quantity: item_quantity ? item_quantity : 1,
      discount: item_discount,
    });
  }
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: user_event,
    ecommerce: {
      transaction_id: transaction_id ? transaction_id : "",
      value: value ? value : "",
      shipping_tier: shipping_tier ? shipping_tier : "",
      payment_type: payment_type ? payment_type : "",
      currency: "UAH",
      items: items,
    },
  });
}

// view_item event
document.addEventListener("DOMContentLoaded", function () {
  var productDetail = document.querySelector(".js-product-detail");
  if (productDetail) {
    var googleAnalyticsItems = productDetail.querySelectorAll(".js-google-analytics-item");
    var userEvent = "view_item";
    if (userEvent && googleAnalyticsItems.length > 0) {
      sendAnalyticsEvent(userEvent, googleAnalyticsItems);
    }
  }
});

const viewedProductsTargetElement = document.querySelector("#viewed-products");
if (viewedProductsTargetElement) {
  var actionExecuted = false;

  window.addEventListener("scroll", function () {
    if (isElementInViewport(viewedProductsTargetElement) && !actionExecuted) {
      actionExecuted = true;
      const googleAnalyticsItems = viewedProductsTargetElement.querySelectorAll(
        ".js-google-analytics-item"
      );
      const userEvent = "view_item_list";
      if (userEvent && googleAnalyticsItems.length > 0) {
        sendAnalyticsEvent(userEvent, googleAnalyticsItems);
      }
    }
  });
}

if (viewedProductsTargetElement) {
  const productList = viewedProductsTargetElement.querySelectorAll(".product-item");
  productList.forEach(function (product) {
    product.addEventListener("click", function () {
      const googleAnalyticsItems = product.querySelector(".js-google-analytics-item");
      const userEvent = "select_item";
      sendAnalyticsEvent(userEvent, [googleAnalyticsItems]);
    });
  });
}

// add to cart on product page
cartButtons = document.querySelectorAll("#add-to-cart-product-detail");

if (cartButtons) {
  cartButtons.forEach(function (element) {
    element.addEventListener("click", function () {
      const productItem = element.closest(".js-google-analytics-item");
      if (productItem) {
        var analytics_items = productItem.querySelectorAll(".js-google-analytics-item");
        var user_event = "add_to_cart";
        sendAnalyticsEvent(user_event, analytics_items, false, false, false, 1);
      } else {
        var analytics_items = document
          .querySelector(".js-product-detail")
          .querySelector(".js-google-analytics-item");
        var user_event = "add_to_cart";
        sendAnalyticsEvent(user_event, [analytics_items], false, false, false, 1);
      }
    });
  });
}

// add to cart on all pages of the site
document.querySelectorAll(".js-analytics-cart").forEach(function (element) {
  element.addEventListener("click", function () {
    var productItem = element.closest(".product-item");
    if (productItem) {
      var analytics_items = productItem.querySelectorAll(".js-google-analytics-item");
      var user_event = "add_to_cart";
      sendAnalyticsEvent(user_event, analytics_items);
    }
  });
});

document.body.addEventListener("cart-update", function (event) {
  var button = event.target;
  var productItem = button.closest(".product-item");
  if (productItem) {
    var analytics_items = productItem.querySelectorAll(".js-google-analytics-item");
    var user_event = "remove_from_cart";
    sendAnalyticsEvent(user_event, analytics_items);
    if (!button.classList.contains("btn-not-in-cart")) {
      button.addEventListener("click", function () {
        var user_event = "add_to_cart";
        sendAnalyticsEvent(user_event, analytics_items);
      });
    }
  }
});

// this event init only when we open the cart after custom htmx trigger
document.body.addEventListener("cart-init", function (event) {
  // view cart
  const analytics_items = document
    .querySelector("#modal-result")
    .querySelectorAll(".js-google-analytics-item");
  const user_event = "view_cart";
  sendAnalyticsEvent(user_event, analytics_items);

  // decreasing count the product in cart
  var removeButtons = document
    .querySelector("#modal-result")
    .querySelectorAll("#button-cart-minus");
  removeButtons.forEach(function (element) {
    element.addEventListener("click", function () {
      var user_event = "remove_from_cart";
      var analytics_items = [element.closest(".js-cart-item").childNodes[1]];
      sendAnalyticsEvent(user_event, analytics_items);
    });
  });

  // increasing count the product in cart
  var addButtons = document.querySelector("#modal-result").querySelectorAll("#button-cart-plus");
  addButtons.forEach(function (element) {
    element.addEventListener("click", function () {
      var user_event = "add_to_cart";
      var analytics_items = [element.closest(".js-cart-item").childNodes[1]];
      sendAnalyticsEvent(user_event, analytics_items);
    });
  });
  // delete product from the cart
  var deleteButtons = document
    .querySelector("#modal-result")
    .querySelectorAll("#cart-button-delete");
  deleteButtons.forEach(function (element) {
    element.addEventListener("click", function () {
      var quantity = element
        .closest(".js-cart-item")
        .querySelector(".block-cart")
        .querySelector(".js-number").value;
      var user_event = "remove_from_cart";
      var analytics_items = [element.closest(".js-cart-item").childNodes[1]];
      sendAnalyticsEvent(user_event, analytics_items, false, false, false, quantity);
    });
  });
});

// SEO OPTIMIZATION

document.addEventListener("DOMContentLoaded", function () {
  const metaTag = document.querySelector('meta[name="robots"]');

  if (metaTag) {
    const filterBlocks = document.querySelectorAll(".block-categories");
    const filterBlocksArray = Array.from(filterBlocks).filter(function (_, index) {
      return index !== 1;
    });

    filterBlocksArray.forEach(function (block) {
      const checkboxes = block.querySelectorAll(".form-check");

      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("input", function () {
          const currentBlockCategories = checkbox
            .closest(".block-categories")
            .querySelectorAll(".form-check");

          const allCurrentChecked = Array.from(currentBlockCategories).filter(function (checked) {
            return checked.classList.contains("checked");
          });

          const allBlocksExceptCurrent = Array.from(filterBlocksArray).filter(function (b) {
            return b !== block;
          });

          const checkOtherBlocks = [];
          allBlocksExceptCurrent.forEach(function (block) {
            const otherCheckBoxes = block.querySelectorAll(".form-check");
            otherCheckBoxes.forEach(function (formChek) {
              if (formChek.classList.contains("checked")) {
                checkOtherBlocks.push(true);
              }
            });
          });

          const currentAndOtherCount = allCurrentChecked.length + checkOtherBlocks.length;

          if (allCurrentChecked.length >= 2 || currentAndOtherCount >= 3) {
            metaTag.setAttribute("content", "noindex, nofollow");
          } else {
            metaTag.setAttribute("content", "index, follow");
          }
        });
      });
    });
  }
});

//top categories
$(document).ready(function () {
  const menuElements = document.querySelectorAll(".losb-menu-element");

  menuElements.forEach(function (menuElement) {
    menuElement.addEventListener("click", function () {
      const losbContentFirstElements = document.querySelectorAll('[data-id="losb-content-sub-1"]');
      const losbContentElements = document.querySelectorAll(".losb-content-sub");

      if (menuElement.dataset.id === "2") {
        losbContentFirstElements.forEach(function (element) {
          element.classList.add("active");
        });
      } else {
        losbContentElements.forEach(function (element) {
          element.classList.remove("active");
        });
      }
    });
  });

  $(".losb-menu-element").on("click", function () {
    $(".losb-menu-element").removeClass("active");
    $(this).addClass("active");

    var id = $(this).attr("data-id");
    if (id) {
      switchLosb(id);
    }
  });

  $(".losb-menu-element-sub").on("click", function () {
    $(".losb-menu-element-sub").removeClass("active");
    $(this).addClass("active");

    var id = $(this).attr("data-id");
    if (id) {
      switchLosbSub(id);
    }
  });

  function switchLosb(id) {
    $(".losb-content").removeClass("active");
    $('.losb-content[data-id="losb-content-' + id + '"]').addClass("active");
  }

  function switchLosbSub(id) {
    $(".losb-content-sub").removeClass("active");
    $('.losb-content-sub[data-id="losb-content-sub-' + id + '"]').addClass("active");
  }
});

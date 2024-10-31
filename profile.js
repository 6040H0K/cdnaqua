//User Profile get photo
$(document).ready(function (){

    $(".profile-phone-number").mask("+38(099)999-99-99");

    htmx.on('#id_photo', 'change', function(evt) {
        let fr = new FileReader();
        fr.addEventListener("load", () => {
            htmx.find('img.js-avatar-img').src = fr.result;
        })
        fr.readAsDataURL(this.files[0]);
    });

    $('body').on('input','.js-code-input', function() {
        var element = this;
        element.value = element.value.replace(/[^0-9]/gi, "");
    });
});



// Preloader
$(window).load(function () {
     "use strict";
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");

    // Placeholder support for older browsers
    $('[placeholder]').focus(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur().parents('form').submit(function () {
        $(this).find('[placeholder]').each(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });
});


(function ($) {
     "use strict";
    // Background image
    $.backstretch("images/background/1.jpg");

    // date Format: mm/dd/yyyy
    $('.countdown').downCount({
        date: '10/05/2014 16:30:00',
        offset: -3
    });

    // Dropdown hover
    $(".dropdown-panel-handle ul").fadeTo(0, 0);
    $(".dropdown-panel-handle").hover(
      function () {
          $(".dropdown-panel-handle ul").stop(true).fadeTo("normal", 1);
      },
      function () {
          $(".dropdown-panel-handle ul").fadeTo("normal", 0);
      }
    );

    // Show/hide page content on click
    $("#content-area").each(function () {
        $(this).find("section:lt(1)").show()
    })

    $('.tab-container a').click(function () {
        var index = $('.tab-container a').index(this);
        $('#content-area').children().hide().eq(index).fadeIn();
        $('.tab-container').children().removeClass('active');
        $(this).addClass('active');
    });

    // Slider
    $("#owl-slider").owlCarousel({
        navigation: true,
        pagination: true,
        items: 3,
        navigationText: false
    });

    var showAnotherPerson = function(index){
        var $newPerson = '<div class="person empty" style="display:none;" onkeyup="" index="'+index+'"><div class="separator"></div><input class="subscribe-box p-input" type="text" placeholder="Otro nombre" value="" name="name['+index+']"/><input type="hidden" name="email['+index+']" value=""/></div>';
        $('form').append($newPerson);
        $('form .person:last-child').fadeIn();
        $('.p-input').unbind().keyup(onInputKeyUp);
        $('#confirm-btn').unbind().click(iWillAssist);
    };

    var onInputKeyUp = function(event){

        var $person = $(event.currentTarget).parents('.person');
        var nextIndex = parseInt($person.attr('index'))+1;

        if ($person.hasClass('first')) {
            var name = $person.find('.p-input')[0].value;
            var email = $person.find('.p-input')[1].value;
            
            if (name !== 'Nombre' && email !== 'Email') {
                if ($('.person[index='+nextIndex+']').length == 0) {
                    showAnotherPerson(nextIndex);
                }
            } else {
                $('.person:not(.first)').fadeOut(function(){
                    $(this).remove();
                });
            }
        }
        else {
            var name = $person.find('input')[0].value;
            if (name !== '') {
                $person.removeClass('empty');
                if ($('.person[index='+nextIndex+']').length == 0) {
                    showAnotherPerson(nextIndex);
                }
            } else {
                $person.addClass('empty');
                $('.person[index='+nextIndex+']').fadeOut(function(){
                    $(this).remove();
                });
            }
        }
    };

    var iWillAssist = function() {

        $('#confirm-btn').hide();

        var confirmhash = CryptoJS.MD5($('.c-input').val());

        if (confirmhash == '32d4cd6bdd1bd5900eee8ce3c51ea4ca') {
            var arr = [];
            var mainPersonName = $('.p-input:first').val();
            $('form .person').each(function(index){
                if ($(this).find('input[name^=name]').val() !== '') {
                    arr.push({
                        name: $(this).find('input[name^=name]').val(),
                        email: $(this).find('input[name^=email]').val(),
                        related: mainPersonName
                    });
                }
            });
            var obj = {toma:arr};

            $.ajax({
                type: 'post',
                url: 'http://app.konacloud.io/api/airuleguy/casamiento/mr_confirmacion',
                data: JSON.stringify(obj),
                success: function(){
                    showMessage('Te esperamos!', true);
                    $('.p-input').unbind();
                },
                error: function(){
                    showMessage("Nuestra paloma mensajera est&aacute; de paro en este momento. Vuelve a intentarlo mas tarde.", false);
                }
            });
        } else {
            showMessage("Ese no es el c&oacute;digo de confirmaci&oacute;n correcto...", false);
            $('.c-input').val('').focus();
        }
    };

    var showMessage = function(msg, ok) {
        var fn = null;
        if (!ok) {
            fn = function(){
                setTimeout(function(){
                    $('#message').fadeOut();
                }, 3500);
            }
            $('#confirm-btn').show();
        }
        $('#message').html(msg).removeClass().addClass(ok ? 'good' : 'bad').fadeIn(fn);
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    };

    var addVideo = function(){
        var size = getSize();
        var iframe = '<iframe style="border: none; width:'+size[0]+'px; height:'+size[1]+'px" frameborder="0" src="http://www.youtube.com/embed/gardzZ-c1W4?autoplay=1&amp;vq=hd1080&amp;rel=0" class="video"></iframe>';
        $('.video').append(iframe);
        $('.video').height(size[1]);
    };

    var getSize = function() {
        var width = $(window).width();
        var height = width*0.7;
        if (height > $(window).height()) {
            height = $(window).height();
        }
        return [width, height];
    };

    var resizeAll = function(){

        var size = getSize();

        // reiseze video
        $('.video iframe').width(size[0]).height(size[1]);
        $('.video').height(size[1]);

    };

    $(window).resize(resizeAll);
    $('.p-input').keyup(onInputKeyUp);
    $('#confirm-btn').click(iWillAssist);
    addVideo();
    resizeAll();

})(jQuery);


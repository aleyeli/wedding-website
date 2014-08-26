

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
        date: '10/05/2014 17:30:00',
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

    // Subscribe
     $('#submit').click(function () {

        var name = $('input[name=name]');
        var email = $('input[name=email]');
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var emailVal = email.val();
        var website = $('input[name=website]');
        var comment = $('textarea[name=comment]');

        //validate
        if (name.val() == '') {
            name.addClass('hightlight');
            return false;
        } else name.removeClass('hightlight');

        if (email.val() == '') {
            email.addClass('hightlight');
            email.attr('placeholder', 'Email required');
            return false;
        } else email.removeClass('hightlight');

        if (!emailReg.test(emailVal)) {
            email.addClass('hightlight');
            return false;
        } else email.removeClass('hightlight');

        if (comment.val() == '') {
            comment.addClass('hightlight');
            return false;
        } else comment.removeClass('hightlight');

        var data = 'name=' + name.val() + '&email=' + email.val() + '&website=' +
		website.val() + '&comment=' + encodeURIComponent(comment.val());

        //disabled all the text fields
        $('.text').attr('disabled', 'true');

        $('#loading').show();

        $.ajax({
            //this is the php file that processes the data and send mail
            url: "subscribe.php",
            type: "GET",
            data: data,
            cache: false,

            //success
            success: function (html) {
                //if process.php returned 1/true (send mail success)
                if (html == 1) {
                    $('.form').hide();
                    $('.done').fadeIn('slow');

                    //if process.php returned 0/false (send mail failed)
                } else alert('Sorry, unexpected error. Please try again later.');
            }
        });
        //cancel the submit button default behaviours
        return false;
    });

    var showAnotherPerson = function(index){
        var $newPerson = '<div class="person empty" style="display:none;" onkeyup="" index="'+index+'"><div class="separator"></div><input class="subscribe-box" type="text" placeholder="Otro nombre" value="" name="name['+index+']"/><input type="hidden" name="email['+index+']" value=""/></div>';
        $('form').append($newPerson);
        $('form .person:last-child').fadeIn();
        $('input').unbind().keyup(onInputKeyUp);
    };

    var onInputKeyUp = function(event){

        var $person = $(event.currentTarget).parents('.person');
        var nextIndex = parseInt($person.attr('index'))+1;

        if ($person.hasClass('first')) {
            var name = $person.find('input')[1].value;
            var email = $person.find('input')[2].value;
            
            if (name !== '' && email !== '') {
                console.log(name + ' ' + email);
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
            var name = $person.find('input')[1].value;
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

    var confirm = function(){

        $('button').hide();

        var arr = [];
        var mainPersonName = $('.person:first input:first').val();
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
            },
            error: function(){
                showMessage("Nuestra paloma mensajera est&aacute; de paro en este momento. Vuelve a intentarlo mas tarde.", false);
            }
        });
    };

    var showMessage = function(msg, ok) {
        var fn = null;
        if (!ok) {
            $('button').show();
            fn = function(){
                setTimeout(function(){
                    $('#message').fadeOut();
                }, 3500);
            }
        }
        $('#message').html(msg).removeClass().addClass(ok ? 'good' : 'bad').fadeIn(fn);
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    };

    $('input').keyup(onInputKeyUp);

})(jQuery);


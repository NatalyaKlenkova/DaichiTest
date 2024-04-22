$(document).ready(function () {
    // Отключение / включение скролла на странице
    let bodyScrollControls = {
        scrollBarWidth: (window.innerWidth - $('body').clientWidth),

        disable: function () {
            $('body').css('margin-right', `${this.scrollBarWidth}px`);
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                $('body').css('margin-right', 'null');
            }
            $('html').addClass('stop-scroll');
        },

        enable: function () {
            $('body').css('margin-right', 'null');
            $('html').removeClass('stop-scroll');
        }
    }

    // Product Swiper
    const thumbsSwiper = new Swiper('.thumbs-swiper', {
        spaceBetween: 13,
        slidesPerView: 7,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            991: {
              slidesPerView: 7,
              spaceBetween: 5
            },
        
            320: {
              slidesPerView: 5.8,
              spaceBetween: 14
            },
          },
    });
    var productSwiper = new Swiper(".product-swiper", {
        loop: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: thumbsSwiper,
        },
      });

    // Add to fav
    $('.product__fav').click(function () {
        $(this).toggleClass('active');

        let favStatus = !!($(this).hasClass('active')),
            favText = favStatus ? "В избранном" : "В избранное";
        $(this).find('.text-12').text(favText);
    })

    // Accordion
    $(function () {
        $("#accordion").accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });
    });

    // Popups
    $('.product-feedback').click(function () {
        enablePopup()

        // Клик по оверлэю
        $('.product__overlay').click(function (evt) {
            let target = $(evt.target);
            if (target.is('.product__overlay')) {
                disablePopup()
            }
        })
        // Клики по кнопкам закрытия попапов или кнопке Ок
        $('.popup__close-btn, .popup__confirm-btn').click(function () {
            disablePopup()
        })
        $('.popup__confirm-btn').click(function () {
            $('.popup--thanks').removeClass('active');

            $('.popup--form .form__input').val('');
            $('#form #submit-btn').attr('disabled', true);
            $('.popup--form').addClass('active');
        })
        // После успешной отправки формы показываем второй попап
        $('#form').submit(function () {
            $('.popup--form').removeClass('active');
            $('.popup--thanks').addClass('active');
        })
    })

    function enablePopup() {
        $('.product__overlay').addClass('active');
        bodyScrollControls.disable()
    }

    function disablePopup() {
        $('.product__overlay').removeClass('active');
        bodyScrollControls.enable();
    }


    // Form
    //// Disable Form Btn
    let filledFields,
        fieldsNum = $('#form .form__input').length;

    $('#form #submit-btn').attr('disabled', true);
    $('#form .form__input').each(function (i, elem) {
        $(elem).keyup(function () {
            filledFields = 0;
            $('#form .form__input').each(function (i, elem) {
                if ($(elem).val() !== '') {
                    filledFields++
                }
            })
            $('#form #submit-btn').attr('disabled', !(filledFields === fieldsNum))
        })
    })

    //// Mask
    var selector = document.getElementById('phone');
    var im = new Inputmask('+7 (999) 999-99-99');
    im.mask(selector);

    //// Validate
    const validation = new JustValidate('#form', {
        errorFieldCssClass: 'is-invalid',
        errorLabelCssClass: 'is-label-invalid',
        errorLabelStyle: {
            color: '#ef6461',
        },
    });

    validation
        .addField('#name', [
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Слишком короткое имя',
            },
            {
                rule: 'maxLength',
                value: 30,
                errorMessage: 'Слишком длинное имя',
            },
            {
                rule: 'required',
                errorMessage: 'Вы не ввели имя',
            },
        ])
        .addField('#phone', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели телефон',
            },
            {
                validator: (name, value) => {
                    const phone = selector.inputmask.unmaskedvalue()
                    return phone.length === 10
                },
                errorMessage: 'Введите 10 символов',
            },
        ])
})
"use strict";$(document).ready((function(){var e={scrollBarWidth:window.innerWidth-$("body").clientWidth,disable:function(){$("body").css("margin-right","".concat(this.scrollBarWidth,"px")),/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&$("body").css("margin-right","null"),$("html").addClass("stop-scroll")},enable:function(){$("body").css("margin-right","null"),$("html").removeClass("stop-scroll")}};function t(){$(".product__overlay").removeClass("active"),e.enable()}$(".product__fav").click((function(){$(this).toggleClass("active");var e=!!$(this).hasClass("active")?"В избранном":"В избранное";$(this).find(".text-12").text(e)})),$((function(){$("#accordion").accordion({collapsible:!0,active:!1,heightStyle:"content"})})),$(".product-feedback").click((function(){$(".product__overlay").addClass("active"),e.disable(),$(".product__overlay").click((function(e){$(e.target).is(".product__overlay")&&t()})),$(".popup__close-btn, .popup__confirm-btn").click((function(){t()})),$(".popup__confirm-btn").click((function(){$(".popup--thanks").removeClass("active"),$(".popup--form .form__input").val(""),$("#form #submit-btn").attr("disabled",!0),$(".popup--form").addClass("active")})),$("#form").submit((function(){$(".popup--form").removeClass("active"),$(".popup--thanks").addClass("active")}))}));var r,o=$("#form .form__input").length;$("#form #submit-btn").attr("disabled",!0),$("#form .form__input").each((function(e,t){$(t).keyup((function(){r=0,$("#form .form__input").each((function(e,t){""!==$(t).val()&&r++})),$("#form #submit-btn").attr("disabled",!(r===o))}))}));var a=document.getElementById("phone");new Inputmask("+7 (999) 999-99-99").mask(a),new JustValidate("#form",{errorFieldCssClass:"is-invalid",errorLabelCssClass:"is-label-invalid",errorLabelStyle:{color:"#ef6461"}}).addField("#name",[{rule:"minLength",value:2,errorMessage:"Слишком короткое имя"},{rule:"maxLength",value:30,errorMessage:"Слишком длинное имя"},{rule:"required",errorMessage:"Вы не ввели имя"}]).addField("#phone",[{rule:"required",errorMessage:"Вы не ввели телефон"},{validator:function(e,t){return 10===a.inputmask.unmaskedvalue().length},errorMessage:"Введите 10 символов"}])}));
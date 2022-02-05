$(document).ready(() => {
  document.getElementById('burger').onclick = function () {
    document.getElementById('header-menu').classList.add('open');
  };
  document.querySelectorAll('#header-menu > *').forEach((item) => {
    item.onclick = () => {
      document.getElementById('header-menu').classList.remove('open');
    };
  });

  new WOW().init();

  // $('.test-popup-link').magnificPopup({
  //   type: 'image',
  //   removalDelay: 300,
  //   mainClass: 'mfp-fade',
  // });

  // $('.open-popup-link').magnificPopup({
  //   type: 'inline',
  //   midClick: true,
  // });

  // FORM CHECKING
  let loader = $('#loader');
  let form = $('.order-form');
  let submitBtn = $('#submit');

  submitBtn.click(() => {
    $('.error').hide();
    let formName = $('#inpName');
    let formAdress = $('#inpAdress');
    let formPhone = $('#inpPhone');
    let inputs = $('input');
    let hasError = false;

    for (let i = 0; i < inputs.length; i++) {
      if (!$($(inputs)[i]).val()) {
        $($(inputs)[i]).siblings('.error').show();
        $($(inputs)[i]).css('border-color', 'red').css('margin-bottom', '0px');
        hasError = true;
      } else {
        $($(inputs)[i]).css('border-color', 'rgb(185, 145, 80');
        $($(inputs)[i]).css('margin-bottom', '24px');
      }
    }

    if (!hasError) {
      loader.css('display', 'flex');

      $.ajax({
        method: 'POST',
        // url: 'https://itlogia.ru/test/checkout',
        url: 'mail.php',
        data: {
          name: formName.val(),
          adress: formAdress.val(),
          phone: formPhone.val(),
        },
      })
        .done((message) => {
          loader.hide();
          if (message.success) {
            form.hide();
            $('.thanks').css('display', 'block');
          } else {
            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
          }
        })
        .fail((message) => {
          console.log(message);
        });
    }
  });

  // COOKIE
  $('.cookie-close').click(() => {
    $('#cookie').hide();
    localStorage.setItem('cookieHide', '1');
  });

  let cookieHide = localStorage.getItem('cookieHide');
  if (!cookieHide) {
    $('#cookie').show();
  }

  $('.item-button').click((event) => {
    let productTitle = $(event.target).siblings('.item-title').text().trim();
    let cart = localStorage.getItem('cart');
    let cartArr = [];
    if (cart) {
      cartArr = JSON.parse(cart);
    }

    cartArr.push(productTitle);
    localStorage.setItem('cart', JSON.stringify(cartArr));

    console.log(localStorage);
  });
});

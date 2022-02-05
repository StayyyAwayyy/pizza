<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $adress = $_POST['adress'];
  $phone = $_POST['phone'];

  $content = $name . ' оформил заказ на адрес ' . $adress . '. Его телефон: ' . $phone;

  $succes = mail('admin.local', 'Заказ на сайте pizza', $content);

  if($succes) {
    http_response_code(200);
    echo 'Заказ отправлен';
  } else {
    http_response_code(500);
    echo 'Заказ не отправлен';
  }

} else {
  http_response_code(403);
  echo 'Такой запрос не поддерживается';
}
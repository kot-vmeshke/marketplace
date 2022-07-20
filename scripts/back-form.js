/*
  {
    "data": {
        "order": {
            "cost": 18000.0,
            "plan_id": 3544961
        },
        "org": {
            "conf_policy": "Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. Политика конфиденциальности 1. ",
            "oferta": "Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. Оферта текст 1. ",
            "org_data": "ИНН: 772970301386\nОГРНИП: 322774600363410",
            "org_name": "Индивидуальный предприниматель\nЛеднев Артем Юрьевич\n"
        },
        "user": {
            "email": "pavloffbiz@Yandex.ru",
            "name": "Лев",
            "phone": "79999999999",
            "user_guid": "edd789ef-e1c6-4b88-95ea-41e1e736f6c8"
        }
    },
    "error": 0,
    "message": "User and order data updated successfully"
  }
*/
if (searchString.get('order_id') != null) {
  const orderRecall = searchString.get('order_id');
  fetch(`https://marketplace-academica.ru/academica/recall_order?order_id=${orderRecall}`, {
    method: 'post',
  }).then((response) => {
    return response.json();
  }).then(data => {
    console.log(data);
    if (data.data.user.name.length === 0 || data.data.user.phone.length === 0 || data.data.user.email.length === 0) {
      tab1.style.display = 'block';
      tab2.style.display = 'none';
    } else {
      tab1.style.display = 'none';
      tab2.style.display = 'block';
      price.innerText = `${data.data.order.cost}₽`;
      order.innerText = `Заказ №${orderRecall}`;
      userName.innerText = data.data.user.name;
      userPhone.innerText = data.data.user.phone;
      userMail.innerText = data.data.user.email;
      regBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (ip.checked) {
          fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${localStorage.getItem('guid')}&merchant=tinkoff_ul&ul_name=${inputIp.value}&inn=${inputInn.value}&kpp=${inputKpp.value || '000000000'}`, {
            method: 'POST',
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('error');
            }
          }).then(data => {
            console.log(data);
            setTimeout(() => {
              window.location.href = './order.html';
            }, 0)
            window.open(`${data.data.payment_link}`, '_blank').focus();
          })
        } else if (part.checked) {
          fetch(`https://marketplace-academica.ru/academica/generate_paylink?guid=${data.data.user.user_guid}&order_id=${orderRecall}&merchant=loan&loan_fname=${inputFullname.value}&loan_mname=${inputFathername.value}&loan_lname=${inputSurname.value}&loan_phone=${data.data.user.phone.substring(1)}&loan_cost=1000000000`, {
            method: 'POST',
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 500){
              alert('Слишком много запросов. Повторите через несколько минут');
            } else {
              console.error('error');
            }
          }).then(data => {
            console.log(data);
            alert(`${data.message}`);
            window.location.href = '../index.html';
          })
        } else if(robokassa.checked && card.checked) {
          fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=robokassa`, {
            method: 'POST',
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('error');
            }
          }).then(data => {
            console.log(data);
            window.location.href = data.data.payment_link;
          })
        } else if(prodamus.checked && card.checked) {
          fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=prodamus`, {
            method: 'POST',
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('error');
            }
          }).then(data => {
            console.log(data);
            window.location.href = data.data.payment_link;
          })
        } else if(robokassa.checked && prepay.checked) {
          fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=robokassa&prepay=1`, {
            method: 'POST',
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('error');
            }
          }).then(data => {
            console.log(data);
            window.location.href = data.data.payment_link;
          })
        } else if(prodamus.checked && prepay.checked) {
          fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=prodamus&prepay=1`, {
            method: 'POST',
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('error');
            }
          }).then(data => {
            console.log(data);
            window.location.href = data.data.payment_link;
          })
        }
      })
    }
  })
}
window.addEventListener('load', () => {
  /*определяем, какой тариф выбрал пользователь*/
  const searchString = new URLSearchParams(window.location.search);
  const currentTarif = searchString.get('tarif');

  /* utm */
  const utmSource = searchString.get("utm_source") || "";
  const utmMedium = searchString.get("utm_medium") || "";
  const utmContent = searchString.get("utm_content") || "";
  const utmCampaign = searchString.get("utm_campaign") || "";
  const utmGroup = searchString.get("utm_group") || "";

  /* переменные */
  const footer = document.querySelector('.reg__footer'); // футер
  const btnNext = document.querySelector(".reg__btn"); // кнопка на первом шаге формы
  const pageTitle = document.querySelector('.reg__title'); // заголовок страницы
  const salary = document.querySelector('.reg__subtitle span'); // зарплата
  const price = document.querySelector(".reg__price"); // сумма оплаты, которую видит пользователь
  const spinner = document.querySelector('#preloader'); // прелоадер
  const tab1 = document.querySelector(".tab-1"); // первая часть формы
  const tab2 = document.querySelector(".tab-2"); // вторая часть формы
  let fullCost; // полная стоимость тарифа
  let costPart6; // цена рассрочки на 6 месяцев
  let costPart10; // цена рассрочки на 10 месяцев
  let costPart12; // цена рассрочки на 12 месяцев
  let cost; // сумма, которую видит юзер в рассрочке
  let partCost; // полная сумма рассрочки, отправляем в заявке
  let planID; // ID тарифа
  const order = document.querySelector(".reg__order"); // номер заказа
  const userName = document.querySelector(".reg__user-name"); // имя пользователя
  const userPhone = document.querySelector(".reg__user-phone"); // телефон пользователя
  const userMail = document.querySelector(".reg__user-mail"); // почта
  const set2 = document.querySelector(".reg__set2"); // робокасса и продамус
  const prodamus = set2.querySelector("#prodamus"); // кнопка продамуса
  const robokassa = set2.querySelector("#robokassa"); // кнопка робокассы
  const set1 = document.querySelector(".reg__set1"); // кнопки выбора способа оплаты
  const ipTextUserId = document.querySelector(".ip-text__user-id"); // номер заказа с оплате по ИП
  const regBtn = document.querySelector(".btn-pay"); // кнопка перехода к оплате
  const regIp = document.querySelector(".reg__ip"); 
  const ip = document.querySelector("#ip-ooo");
  const regPart = document.querySelector(".reg__partpay");
  const part = document.querySelector("#part");
  const card = document.querySelector("#card");
  const prepay = document.querySelector("#prepay");
  const months = document.querySelector(".months"); // месяцы рассрочки
  const part6 = months.querySelector("#month-6");
  const part10 = months.querySelector("#month-10");
  const part12 = months.querySelector("#month-12");

  /* инпуты */
  const inputName = document.querySelector("#user-name");
  const inputPhone = document.querySelector("#user-phone");
  const inputMail = document.querySelector("#user-mail");
  const inputIp = document.querySelector("#user-ip");
  const inputInn = document.querySelector("#user-inn");
  const inputKpp = document.querySelector("#user-kpp");
  const inputFullname = document.querySelector("#user-fullname");
  const inputSurname = document.querySelector("#user-surname");
  const inputFathername = document.querySelector("#user-fathername");

  /* данные из ответа сервера */
  let resName;
  let resEmail;
  let resPhone;
  let resOrder;
  let resCost;
  let resOferta;
  let resPolicy;
  let resOrgName;
  let resOrgData;

  /* в зависимости от выбранного тарифа присваиваем переменным значения */
  switch (currentTarif) {
    case '3544961':
      pageTitle.innerText = "Ассистент + аккаунт-менеджер Wildberries";
      salary.innerText = 'от 45 000 руб.';
      fullCost = 23000;
      costPart6 = 20000; 
      costPart10 = 21000; 
      costPart12 = 22000; 
      planID = '3544961';
      break;
    case '3544966':
      pageTitle.innerText = "Research manager + Специалист отдела закупок";
      salary.innerText = 'от 75 000 руб.';
      fullCost = 38000;
      costPart6 = 36600; 
      costPart10 = 38200; 
      costPart12 = 39200;
      planID = '3544966';
      break;
    case '3544972':
      pageTitle.innerText = "Project manager / Управляющий проектом";
      salary.innerText = 'от 90 000 руб.';
      fullCost = 53000;
      costPart6 = 53250; 
      costPart10 = 55800; 
      costPart12 = 56900;
      planID = '3544972';
      break;
  }

  /* выводим на страницу сумму оплаты */
  price.innerText = `${fullCost}₽`;

  /* промокод */
  const inputPromo = document.querySelector(".promo");
  const btnPromo = document.querySelector(".promo-btn");

  btnPromo.addEventListener("click", () => {
    if (inputPromo.value.toUpperCase() === "chek3000".toUpperCase()) {
      btnPromo.style.backgroundColor = "#00904B";
      inputPromo.style.color = "#00904B";
      fullCost = fullCost - 3000;
      price.innerText = `${fullCost}₽`;
    } else if (inputPromo.value.toUpperCase() !== "chek3000".toUpperCase()) {
      btnPromo.style.backgroundColor = "#FF0000";
      inputPromo.value = "";
      inputPromo.placeholder = "Неверный промокод";
    }
  });

  /* кнопка отправки данных */
  btnNext.addEventListener('click', (e) => {
    e.preventDefault();

    /* проверяем все ли поля заполнены*/
    if (inputName.value && inputPhone.value && inputMail.value) {

      /* выводим в консоль то, что собираемся отправлять */
      console.log({
        name: inputName.value,
        email: inputMail.value,
        phone: inputPhone.value,
        plan_id: planID,
        cost: fullCost,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_content: utmContent,
        utm_campaign: utmCampaign,
        utm_group: utmGroup,
      });

      /* показываем прелоадер */
      spinner.classList.remove('hidden');

      /* создаем новый запрос */
      const xhr = new XMLHttpRequest();
      
      /* открываем */
      xhr.open('POST', `https://marketplace-academica.ru/academica/create_order?name=${inputName.value}&email=${inputMail.value}&phone=${inputPhone.value}&plan_id=${planID}&cost=${fullCost}&utm_source=${utmSource}&utm_medium=${utmMedium}&utm_content=${utmContent}&utm_campaign=${utmCampaign}&utm_group=${utmGroup}`);

      /* отправляем */
      xhr.send();

      /* когда придет ответ с сервера */
      xhr.onload = () => {
        if (xhr.status != 200) { // проверяем, все ли ок
          alert(`Ошибка ${xhr.status}: ${xhr.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`); 
          spinner.classList.add('hidden');
          throw new Error(`${response.status}: ${response.statusText}`);
        } else { // если ответ пришел
          let data = JSON.parse(xhr.response);
          if (data.error == 1) { // если пришел с ошибкой
            alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
            spinner.classList.add('hidden');
            throw new Error(`Error: ${data.message}`);
          } else { // если все норм
            spinner.classList.add('hidden'); // скрываем прелоадер
            console.log(data);

            /* сохраняем денные из ответа */
            resName = data.data.user.name;
            resEmail = data.data.user.email;
            resPhone = data.data.user.phone;
            resOrder = data.data.order_data.order_id;
            resCost = data.data.order_data.cost;
            resOferta = data.data.ul_data.oferta;
            resPolicy = data.data.ul_data.conf_policy;
            resOrgName = data.data.ul_data.org_name;
            resOrgData = data.data.ul_data.org_data;

            /* скрываем первую часть формы и показываем вторую */
            tab1.style.display = "none";
            tab2.style.display = "block";

            /* выводим данные пользователя */
            order.innerText = `Заказ №${resOrder}`;
            userName.innerText = resName;
            userPhone.innerText = resPhone;
            userMail.innerText = resEmail;
            price.innerText = `${resCost}₽`;
            ipTextUserId.innerText = `id-${resOrder}`;

            /* выводим данные в футер и показываем его */
            document.querySelector(".oferta").setAttribute("href", resOferta);
            document.querySelector(".privacy").setAttribute("href", resPolicy);
            document.querySelector(".footer__center").innerText = `${resOrgName}${resOrgData}`;
            footer.style.display = 'block';


          }          
        }
      }
    } else {
      alert("Заполните все поля");
    }
  })

  /* переключение способов оплаты */
  set1.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-radio-set1") && event.target.classList.contains("ip-ooo")) { // ИП
      set2.style.display = "none";
      regIp.style.display = "block";
      price.style.marginTop = "0";
      regPart.style.display = "";
      robokassa.checked = false;
      regBtn.querySelector(".reg__btn-text").innerText = "Перейти к оплате";
      price.innerText = `${resCost}₽`;
    } else if (event.target.classList.contains("js-radio-set1") && event.target.classList.contains("part")) { // рассрочка
      set2.style.display = "none";
      regPart.style.display = "block";
      price.style.marginTop = "0";
      regIp.style.display = "";
      robokassa.checked = false;
      regBtn.querySelector(".reg__btn-text").innerText = "оставить заявку";
      part10.checked = true;
      cost = Math.floor(costPart10 / 10);
      partCost = costPart10;
      price.innerText = `от ${cost}₽/мес`;
      months.addEventListener("click", () => {
        if (part6.checked) {
          cost = Math.floor(costPart6 / 6);
          partCost = costPart6;
          price.innerText = `от ${cost}₽/мес`;
        } else if (part10.checked) {
          cost = Math.floor(costPart10 / 10);
          partCost = costPart10;
          price.innerText = `от ${cost}₽/мес`;
        } else if (part12.checked) {
          cost = Math.floor(costPart12 / 12);
          partCost = costPart12;
          price.innerText = `от ${cost}₽/мес`;
        }
      });
    } else if ( event.target.classList.contains("js-radio-set1") && event.target.classList.contains("card") ) { // полная оплата картой
      set2.style.display = "";
      price.style.marginTop = "";
      regIp.style.display = "";
      regPart.style.display = "";
      regBtn.querySelector(".reg__btn-text").innerText = "Перейти к оплате";
      robokassa.checked = true;
      price.innerText = `${resCost}₽`;
    } else if ( event.target.classList.contains("js-radio-set1") && event.target.classList.contains("prepay") ) { // предоплата 2000
      set2.style.display = "";
      price.style.marginTop = "";
      regIp.style.display = "";
      regPart.style.display = "";
      regBtn.querySelector(".reg__btn-text").innerText = "Перейти к оплате";
      robokassa.checked = true;
      price.innerText = "2 000₽";
    }
  });

  /* кнопка перехода на оплату */
  regBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (ip.checked) { // ИП
      fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${resOrder}&merchant=tinkoff_ul&ul_name=${inputIp.value}&inn=${inputInn.value}&kpp=${inputKpp.value || "000000000"}&email=${resEmail}`, 
      {
        method: "POST",
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`${response.status}: ${response.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
        .then((data) => {
          console.log(data);
          if (data.error == 1) {
            alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
            throw new Error(`Error: ${data.message}`);
          } else {
            setTimeout(() => {
              window.location.href = "./order.html";
            }, 0);
            window.open(`${data.data.payment_link}`, "_blank").focus();
          }
        });
    } else if (part.checked) { // рассрочка
      console.log(userPhone.innerText.substring(1));
      console.log(cost);
      fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${resOrder}&merchant=loan&loan_fname=${inputFullname.value}&loan_mname=${inputFathername.value}&loan_lname=${inputSurname.value}&loan_phone=${userPhone.innerText.substring(1)}&loan_cost=${partCost}&email=${resEmail}`,
        {
          method: "POST",
        }
      )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 500) {
          alert("Слишком много запросов. Повторите через несколько минут");
        } else {
          alert(`${response.status}: ${response.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
        .then((data) => {
          console.log(data);
          alert(`${data.message}`);
          window.location.href = "../index.html";
        });
    } else if (robokassa.checked && card.checked) { // робокасса полная
      fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${resOrder}&email=${resEmail}&merchant=robokassa`,
        {
          method: "POST",
        }
      )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`${response.status}: ${response.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
        .then((data) => {
          console.log(data);
          if (data.error == 1) {
            alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
            throw new Error(`Error: ${data.message}`);
          } else {
            window.location.href = data.data.payment_link;
          }
        });
    } else if (prodamus.checked && card.checked) { // продамус полная
      fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${resOrder}&email=${resEmail}&merchant=prodamus`,
        {
          method: "POST",
        }
      )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`${response.status}: ${response.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
        .then((data) => {
          console.log(data);
          if (data.error == 1) {
            alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
            throw new Error(`Error: ${data.message}`);
          } else {
            window.location.href = data.data.payment_link;
          }
        });
    } else if (robokassa.checked && prepay.checked) { // робокасса 2000
      fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${resOrder}&email=${resEmail}&merchant=robokassa&prepay=1`,
        {
          method: "POST",
        }
      )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`${response.status}: ${response.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
        .then((data) => {
          console.log(data);
          if (data.error == 1) {
            alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
            throw new Error(`Error: ${data.message}`);
          } else {
            window.location.href = data.data.payment_link;
          }
        });
    } else if (prodamus.checked && prepay.checked) { // продамус 2000
      fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${resOrder}&email=${resEmail}&merchant=prodamus&prepay=1`,
        {
          method: "POST",
        }
      )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`${response.status}: ${response.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
        .then((data) => {
          console.log(data);
          if (data.error == 1) {
            alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
            throw new Error(`Error: ${data.message}`);
          } else {
            window.location.href = data.data.payment_link;
          }
        });
    }
  });
})
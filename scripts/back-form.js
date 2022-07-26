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
const searchString = new URLSearchParams(window.location.search);
window.addEventListener("load", () => {
  if (console.everything === undefined) {
    console.everything = [];

    console.defaultLog = console.log.bind(console);
    console.log = function () {
      console.everything.push({
        type: "log",
        datetime: Date().toLocaleString(),
        value: Array.from(arguments),
      });
      console.defaultLog.apply(console, arguments);
    };
    console.defaultError = console.error.bind(console);
    console.error = function () {
      console.everything.push({
        type: "error",
        datetime: Date().toLocaleString(),
        value: Array.from(arguments),
      });
      console.defaultError.apply(console, arguments);
    };
    console.defaultWarn = console.warn.bind(console);
    console.warn = function () {
      console.everything.push({
        type: "warn",
        datetime: Date().toLocaleString(),
        value: Array.from(arguments),
      });
      console.defaultWarn.apply(console, arguments);
    };
    console.defaultDebug = console.debug.bind(console);
    console.debug = function () {
      console.everything.push({
        type: "debug",
        datetime: Date().toLocaleString(),
        value: Array.from(arguments),
      });
      console.defaultDebug.apply(console, arguments);
    };
  }

  if (searchString.get("order_id") != null) {
    const orderRecall = searchString.get("order_id");
    fetch(
      `https://marketplace-academica.ru/academica/recall_order?order_id=${orderRecall}`,
      {
        method: "post",
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
          if (
            data.data.user.user_guid === "be2d5df5-6735-463c-8e32-648dc62d15b1"
          ) {
            let archive = [];
            function allStorage() {
              let keys = Object.keys(localStorage);
              let i = 0;
              let key;
  
              for (; (key = keys[i]); i++) {
                archive.push(key + "=" + localStorage.getItem(key));
              }
  
              return archive;
            }
            allStorage();
            fetch(
              "https://marketplace-academica.ru/academica/tech/frontend_logs",
              {
                method: "post",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  console: console.everything,
                  local_storage: archive,
                  browser: navigator,
                  name: "recall_order",
                  user: data.data.user,
                }),
              }
            ).then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                alert(`${response.status}: ${response.statusText}`);
                throw new Error(`${response.status}: ${response.statusText}`);
              }
            }).then(data => {
              console.log(data);
              if (data.error == 1) {
                alert(`Error: ${data.message}`);
                throw new Error(`Error: ${data.message}`);
              }
            });
          }
  
          localStorage.setItem("guid", data.data.user.user_guid);
          localStorage.setItem("order", orderRecall);
          //переменные
          const set2 = document.querySelector(".reg__set2");
          const prodamus = set2.querySelector("#prodamus");
          const robokassa = set2.querySelector("#robokassa");
  
          const btnNext = document.querySelector(".reg__btn");
          const tab1 = document.querySelector(".tab-1");
          const tab2 = document.querySelector(".tab-2");
          const title = document.querySelector(".reg__title");
          const salary = document.querySelector(".reg__subtitle span");
          const ipTextUserId = document.querySelector(".ip-text__user-id");
  
          if (data.data.order.plan_id == "3544961") {
            title.innerText = "Ассистент + аккаунт-менеджер Wildberries";
            salary.innerText = `от 45 000 руб`;
          } else if (data.data.order.plan_id == "3544966") {
            title.innerText = "Research manager + Специалист отдела закупок";
            salary.innerText = `от 75 000 руб`;
          } else if (data.data.order.plan_id == "3544972") {
            title.innerText = "Project manager / Управляющий проектом";
            salary.innerText = `от 90 000 руб`;
          }
  
          ipTextUserId.innerText = `id-${orderRecall}`;
  
          const order = document.querySelector(".reg__order");
          const userName = document.querySelector(".reg__user-name");
          const userPhone = document.querySelector(".reg__user-phone");
          const userMail = document.querySelector(".reg__user-mail");
  
          const inputName = document.querySelector("#user-name");
          const inputPhone = document.querySelector("#user-phone");
          const inputMail = document.querySelector("#user-mail");
          const inputIp = document.querySelector("#user-ip");
          const inputInn = document.querySelector("#user-inn");
          const inputKpp = document.querySelector("#user-kpp");
          const inputFullname = document.querySelector("#user-fullname");
          const inputSurname = document.querySelector("#user-surname");
          const inputFathername = document.querySelector("#user-fathername");
          const regBtn = document.querySelector(".btn-pay");
          const regIp = document.querySelector(".reg__ip");
          const ip = document.querySelector("#ip-ooo");
          const regPart = document.querySelector(".reg__partpay");
          const part = document.querySelector("#part");
          const card = document.querySelector("#card");
          const prepay = document.querySelector("#prepay");
          const months = document.querySelector(".months");
          const part6 = months.querySelector("#month-6");
          const part10 = months.querySelector("#month-10");
          const part12 = months.querySelector("#month-12");
          const inputPromo = document.querySelector(".promo");
          const btnPromo = document.querySelector(".promo-btn");
  
          let fullCost;
          let cost = data.data.order.cost;
  
          const price = document.querySelector(".reg__price");
          price.innerText = `${data.data.order.cost}₽`;
          setTimeout(() => {
            price.innerText = `${data.data.order.cost}₽`;
          }, 0);
  
          const formLink = document.querySelector(".reg__link");
          formLink.setAttribute("href", localStorage.getItem("conf_policy"));
          //======================================================================
          if (
            data.data.user.name.length === 0 ||
            data.data.user.phone.length === 0 ||
            data.data.user.email.length === 0
          ) {
            tab1.style.display = "block";
            tab2.style.display = "none";
          } else {
            tab1.style.display = "none";
            tab2.style.display = "block";
            order.innerText = `Заказ №${orderRecall}`;
            userName.innerText = data.data.user.name;
            userPhone.innerText = data.data.user.phone;
            userMail.innerText = data.data.user.email;
            // ============= set radio 1 ===============
            const set1 = document.querySelector(".reg__set1");
            set1.addEventListener("click", (event) => {
              if (
                event.target.classList.contains("js-radio-set1") &&
                event.target.classList.contains("ip-ooo")
              ) {
                set2.style.display = "none";
                regIp.style.display = "block";
                price.style.marginTop = "0";
                regPart.style.display = "";
                robokassa.checked = false;
                regBtn.querySelector(".reg__btn-text").innerText =
                  "Перейти к оплате";
                price.innerText = `${data.data.order.cost}₽`;
              } else if (
                event.target.classList.contains("js-radio-set1") &&
                event.target.classList.contains("part")
              ) {
                set2.style.display = "none";
                regPart.style.display = "block";
                price.style.marginTop = "0";
                regIp.style.display = "";
                robokassa.checked = false;
                regBtn.querySelector(".reg__btn-text").innerText =
                  "оставить заявку";
                part10.checked = true;
                let partSum6, partSum10, partSum12;
                // let diff;
                if (data.data.order.plan_id == "3544961") {
                  //'Ассистент + аккаунт-менеджер Wildberries'
                  partSum6 = 20000;
                  partSum10 = 21000;
                  partSum12 = 22000;
                } else if (data.data.order.plan_id == "3544966") {
                  //'Research manager + Специалист отдела закупок'
                  partSum6 = 36600;
                  partSum10 = 38200;
                  partSum12 = 39200;
                } else if (data.data.order.plan_id == "3544972") {
                  //'Project manager / Управляющий проектом'
                  partSum6 = 53250;
                  partSum10 = 55800;
                  partSum12 = 56900;
                }
                fullCost = partSum10;
                cost = Math.floor(partSum10 / 10);
                price.innerText = `от ${cost}₽/мес`;
                months.addEventListener("click", () => {
                  if (part6.checked) {
                    cost = Math.floor(partSum6 / 6);
                    fullCost = partSum6;
                    price.innerText = `от ${cost}₽/мес`;
                  } else if (part10.checked) {
                    cost = Math.floor(partSum10 / 10);
                    fullCost = partSum10;
                    price.innerText = `от ${cost}₽/мес`;
                  } else if (part12.checked) {
                    cost = Math.floor(partSum12 / 12);
                    fullCost = partSum12;
                    price.innerText = `от ${cost}₽/мес`;
                  }
                });
              } else if (
                event.target.classList.contains("js-radio-set1") &&
                event.target.classList.contains("card")
              ) {
                set2.style.display = "";
                price.style.marginTop = "";
                regIp.style.display = "";
                regPart.style.display = "";
                regBtn.querySelector(".reg__btn-text").innerText =
                  "Перейти к оплате";
                robokassa.checked = true;
                price.innerText = `${data.data.order.cost}₽`;
              } else if (
                event.target.classList.contains("js-radio-set1") &&
                event.target.classList.contains("prepay")
              ) {
                set2.style.display = "";
                price.style.marginTop = "";
                regIp.style.display = "";
                regPart.style.display = "";
                regBtn.querySelector(".reg__btn-text").innerText =
                  "Перейти к оплате";
                robokassa.checked = true;
                price.innerText = "2 000₽";
              }
            });
            //======================= button pay =============================
            regBtn.addEventListener("click", (event) => {
              event.preventDefault();
              if (ip.checked) {
                fetch(
                  `https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${
                    data.data.user.user_guid
                  }&merchant=tinkoff_ul&ul_name=${inputIp.value}&inn=${
                    inputInn.value
                  }&kpp=${inputKpp.value || "000000000"}`,
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
                      setTimeout(() => {
                        window.location.href = "./order.html";
                      }, 0);
                      window.open(`${data.data.payment_link}`, "_blank").focus();
                    }
                  });
              } else if (part.checked) {
                fetch(
                  `https://marketplace-academica.ru/academica/generate_paylink?guid=${
                    data.data.user.user_guid
                  }&order_id=${orderRecall}&merchant=loan&loan_fname=${
                    inputFullname.value
                  }&loan_mname=${inputFathername.value}&loan_lname=${
                    inputSurname.value
                  }&loan_phone=${data.data.user.phone.substring(
                    1
                  )}&loan_cost=${fullCost}`,
                  {
                    method: "POST",
                  }
                )
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  } else if (response.status === 500) {
                    alert(
                      "Слишком много запросов. Повторите через несколько минут"
                    );
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
              } else if (robokassa.checked && card.checked) {
                fetch(
                  `https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=robokassa`,
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
              } else if (prodamus.checked && card.checked) {
                fetch(
                  `https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=prodamus`,
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
              } else if (robokassa.checked && prepay.checked) {
                fetch(
                  `https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=robokassa&prepay=1`,
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
              } else if (prodamus.checked && prepay.checked) {
                fetch(
                  `https://marketplace-academica.ru/academica/generate_paylink?order_id=${orderRecall}&guid=${data.data.user.user_guid}&merchant=prodamus&prepay=1`,
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
          }
        }
      });
  }
});

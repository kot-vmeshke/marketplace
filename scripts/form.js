function form() {
  const set2 = document.querySelector(".reg__set2");
  const prodamus = set2.querySelector("#prodamus");
  const robokassa = set2.querySelector("#robokassa");

  const btnNext = document.querySelector(".reg__btn");
  const tab1 = document.querySelector(".tab-1");
  const tab2 = document.querySelector(".tab-2");
  const title = document.querySelector(".reg__title");
  const salary = document.querySelector(".reg__subtitle span");
  const ipTextUserId = document.querySelector(".ip-text__user-id");

  title.innerText = localStorage.getItem("title");
  salary.innerText = `от ${localStorage.getItem("salary")} руб`;
  ipTextUserId.innerText = `id-${localStorage.getItem("order")}`;

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

  let pricePromo;
  let cost;
  let fullCost;

  const price = document.querySelector(".reg__price");
  price.innerText = `${localStorage.getItem("price")}₽`;

  const formLink = document.querySelector(".reg__link");
  formLink.setAttribute("href", localStorage.getItem("conf_policy"));

  btnPromo.addEventListener("click", () => {
    if (inputPromo.value.toUpperCase() === "chek3000".toUpperCase()) {
      btnPromo.style.backgroundColor = "#00904B";
      inputPromo.style.color = "#00904B";
      pricePromo = +localStorage.getItem("price") - 3000;
      price.innerText = `${pricePromo}₽`;
    } else if (inputPromo.value.toUpperCase() !== "chek3000".toUpperCase()) {
      btnPromo.style.backgroundColor = "#FF0000";
      inputPromo.value = "";
      inputPromo.placeholder = "Неверный промокод";
    }
  });

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
      regBtn.querySelector(".reg__btn-text").innerText = "Перейти к оплате";
      if (pricePromo) {
        price.innerText = `${pricePromo}₽`;
      } else {
        price.innerText = `${localStorage.getItem("price")}₽`;
      }
    } else if (
      event.target.classList.contains("js-radio-set1") &&
      event.target.classList.contains("part")
    ) {
      set2.style.display = "none";
      regPart.style.display = "block";
      price.style.marginTop = "0";
      regIp.style.display = "";
      robokassa.checked = false;
      regBtn.querySelector(".reg__btn-text").innerText = "оставить заявку";
      part10.checked = true;
      cost = Math.floor(+localStorage.getItem("part10") / 10);
      fullCost = localStorage.getItem("part10");
      price.innerText = `от ${cost}₽/мес`;
      months.addEventListener("click", () => {
        if (part6.checked) {
          cost = Math.floor(+localStorage.getItem("part6") / 6);
          fullCost = localStorage.getItem("part6");
          price.innerText = `от ${cost}₽/мес`;
        } else if (part10.checked) {
          cost = Math.floor(+localStorage.getItem("part10") / 10);
          fullCost = localStorage.getItem("part10");
          price.innerText = `от ${cost}₽/мес`;
        } else if (part12.checked) {
          cost = Math.floor(+localStorage.getItem("part12") / 12);
          fullCost = localStorage.getItem("part12");
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
      regBtn.querySelector(".reg__btn-text").innerText = "Перейти к оплате";
      robokassa.checked = true;
      if (pricePromo) {
        price.innerText = `${pricePromo}₽`;
      } else {
        price.innerText = `${localStorage.getItem("price")}₽`;
      }
    } else if (
      event.target.classList.contains("js-radio-set1") &&
      event.target.classList.contains("prepay")
    ) {
      set2.style.display = "";
      price.style.marginTop = "";
      regIp.style.display = "";
      regPart.style.display = "";
      regBtn.querySelector(".reg__btn-text").innerText = "Перейти к оплате";
      robokassa.checked = true;
      price.innerText = "2 000₽";
    }
  });

  const searchString = new URLSearchParams(window.location.search);
  const utmSource = searchString.get("utm_source") || "";
  const utmMedium = searchString.get("utm_medium") || "";
  const utmContent = searchString.get("utm_content") || "";
  const utmCampaign = searchString.get("utm_campaign") || "";
  const utmGroup = searchString.get("utm_group") || "";

  btnNext.addEventListener("click", () => {
    if (inputName.value && inputPhone.value && inputMail.value) {
      tab1.style.display = "none";
      tab2.style.display = "block";
      console.log({
        user_guid: localStorage.getItem("guid"),
        name: inputName.value,
        email: inputMail.value,
        phone: inputPhone.value,
        order_id: localStorage.getItem("order"),
        new_cost: pricePromo || "",
        back_link: `https://marketplace-academica.ru/pages/form.html?order_id=${localStorage.getItem(
          "order"
        )}`,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_content: utmContent,
        utm_campaign: utmCampaign,
        utm_group: utmGroup,
      });
      if (
        localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1"
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
        let nav = [];
        for (var property in navigator) {
          nav.push(`${property}=${navigator[property]}`);
        }
        fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            console: console.everything,
            local_storage: archive,
            browser: navigator,
            name: "update_userdata",
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert(`${response.status}: ${response.statusText}`);
              throw new Error(`${response.status}: ${response.statusText}`);
            }
          })
          .then((data) => {
            console.log(data);
            if (data.error == 1) {
              alert(`Error: ${data.message}`);
              throw new Error(`Error: ${data.message}`);
            }
          });
      }
      fetch(
        "https://marketplace-academica.ru/academica/update_userdata?" +
        new URLSearchParams({
          user_guid: localStorage.getItem("guid"),
          name: inputName.value,
          email: inputMail.value,
          phone: inputPhone.value,
          order_id: localStorage.getItem("order"),
          new_cost: pricePromo || "",
          back_link: `https://marketplace-academica.ru/pages/form.html?order_id=${localStorage.getItem(
            "order"
          )}`,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_content: utmContent,
          utm_campaign: utmCampaign,
          utm_group: utmGroup,
        }),
        {
          method: "post",
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert(
              `${response.status}: ${response.statusText}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`
            );
            throw new Error(`${response.status}: ${response.statusText}`);
          }
        })
        .then((data) => {
          console.log(data);
          if (data.error == 1) {
            alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
            throw new Error(`Error: ${data.message}`);
          }
        });
      order.innerText = `Заказ №${localStorage.getItem("order")}`;
      userName.innerText = inputName.value;
      userPhone.innerText = inputPhone.value;
      userMail.innerText = inputMail.value;
    } else {
      alert("Заполните все поля");
    }
  });

  regBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (ip.checked) {
      if (
        localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1"
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
        let nav = [];
        for (var property in navigator) {
          nav.push(`${property}=${navigator[property]}`);
        }
        fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            console: console.everything,
            local_storage: archive,
            browser: navigator,
            name: "generate_paylink tinkoff",
          }),
        }).then((response) => {
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
      fetch(
        `https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem(
          "order"
        )}&guid=${localStorage.getItem("guid")}&merchant=tinkoff_ul&ul_name=${inputIp.value
        }&inn=${inputInn.value}&kpp=${inputKpp.value || "000000000"}`,
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
      console.log(cost);
      if (
        localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1"
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
        let nav = [];
        for (var property in navigator) {
          nav.push(`${property}=${navigator[property]}`);
        }
        fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            console: console.everything,
            local_storage: archive,
            browser: navigator,
            name: "generate_paylink loan",
          }),
        }).then((response) => {
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
      fetch(
        `https://marketplace-academica.ru/academica/generate_paylink?guid=${localStorage.getItem(
          "guid"
        )}&order_id=${localStorage.getItem("order")}&merchant=loan&loan_fname=${inputFullname.value
        }&loan_mname=${inputFathername.value}&loan_lname=${inputSurname.value
        }&loan_phone=${userPhone.innerText.substring(1)}&loan_cost=${fullCost}`,
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
      if (
        localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1"
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
        let nav = [];
        for (var property in navigator) {
          nav.push(`${property}=${navigator[property]}`);
        }
        fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            console: console.everything,
            local_storage: archive,
            browser: navigator,
            name: "generate_paylink robokassa full",
          }),
        }).then((response) => {
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
      fetch(
        `https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem(
          "order"
        )}&guid=${localStorage.getItem("guid")}&merchant=robokassa`,
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
      if (
        localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1"
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
        let nav = [];
        for (var property in navigator) {
          nav.push(`${property}=${navigator[property]}`);
        }
        fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            console: console.everything,
            local_storage: archive,
            browser: navigator,
            name: "generate_paylink prodamus full",
          }),
        }).then((response) => {
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
      fetch(
        `https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem(
          "order"
        )}&guid=${localStorage.getItem("guid")}&merchant=prodamus`,
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
      if (
        localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1"
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
        let nav = [];
        for (var property in navigator) {
          nav.push(`${property}=${navigator[property]}`);
        }
        fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            console: console.everything,
            local_storage: archive,
            browser: navigator,
            name: "generate_paylink robokassa prepay",
          }),
        }).then((response) => {
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
      fetch(
        `https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem(
          "order"
        )}&guid=${localStorage.getItem("guid")}&merchant=robokassa&prepay=1`,
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
      if (
        localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1"
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
        let nav = [];
        for (var property in navigator) {
          nav.push(`${property}=${navigator[property]}`);
        }
        fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            console: console.everything,
            local_storage: archive,
            browser: navigator,
            name: "generate_paylink prodamus prepay",
          }),
        }).then((response) => {
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
      fetch(
        `https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem(
          "order"
        )}&guid=${localStorage.getItem("guid")}&merchant=prodamus&prepay=1`,
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

  if (localStorage.getItem("guid")) {
    let guid = localStorage.getItem("guid");
    if (guid === "be2d5df5-6735-463c-8e32-648dc62d15b1") {
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
      let nav = [];
      for (var property in navigator) {
        nav.push(`${property}=${navigator[property]}`);
      }
      fetch("https://marketplace-academica.ru/academica/tech/frontend_logs", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          console: console.everything,
          local_storage: archive,
          browser: navigator,
          name: "get_ul from form if localStorage.getItem('guid')",
        }),
      }).then((response) => {
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
    fetch(
      `https://marketplace-academica.ru/academica/get_ul?user_guid=${guid}`,
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
          localStorage.setItem("org_name", data.data.org_name);
          localStorage.setItem("org_data", data.data.org_data);
          localStorage.setItem("conf_policy", data.data.conf_policy);
          localStorage.setItem("oferta", data.data.oferta);
          document
            .querySelector(".oferta")
            .setAttribute("href", localStorage.getItem("oferta"));
          document
            .querySelector(".privacy")
            .setAttribute("href", localStorage.getItem("conf_policy"));
          const formLink = document.querySelector(".reg__link");
          if (formLink) {
            formLink.setAttribute("href", localStorage.getItem("conf_policy"));
          }
          const centerFooter = document.querySelector(".footer__center");
          centerFooter.innerText = `${localStorage.getItem(
            "org_name"
          )}${localStorage.getItem("org_data")}`;
  
          form();
        }
      });
  } else {
    fetch("https://marketplace-academica.ru/academica/get_ul", {
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
          if (data.data.user_guid === "be2d5df5-6735-463c-8e32-648dc62d15b1") {
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
            let nav = [];
            for (var property in navigator) {
              nav.push(`${property}=${navigator[property]}`);
            }
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
                  name: "get_ul from form",
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
          localStorage.setItem("guid", data.data.user_guid);
          localStorage.setItem("org_name", data.data.org_name);
          localStorage.setItem("org_data", data.data.org_data);
          localStorage.setItem("conf_policy", data.data.conf_policy);
          localStorage.setItem("oferta", data.data.oferta);
          document
            .querySelector(".oferta")
            .setAttribute("href", localStorage.getItem("oferta"));
          document
            .querySelector(".privacy")
            .setAttribute("href", localStorage.getItem("conf_policy"));
          const formLink = document.querySelector(".reg__link");
          if (formLink) {
            formLink.setAttribute("href", localStorage.getItem("conf_policy"));
          }
          const centerFooter = document.querySelector(".footer__center");
          centerFooter.innerText = `${localStorage.getItem(
            "org_name"
          )}${localStorage.getItem("org_data")}`;
  
          form();
        }
      });
  }
});

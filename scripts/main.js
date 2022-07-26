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

  const buttons = [
    document.querySelector(".price__btn_research"),
    document.querySelector(".price__btn_assistant"),
    document.querySelector(".price__btn_project"),
  ];
  const btnsMain = document.querySelectorAll(".rate__offer-btn");

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
            browser: nav,
            name: "get_ul if localStorage.getItem('guid')",
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
          const formLink = document.querySelector(".form__link");
          if (formLink) {
            formLink.setAttribute("href", localStorage.getItem("conf_policy"));
          }
          const centerFooter = document.querySelector(".footer__center");
          centerFooter.innerText = `${localStorage.getItem(
            "org_name"
          )}${localStorage.getItem("org_data")}`;
          const [btn] = buttons.filter((item) => item !== null);
          btnsMain.forEach((btn) => {
            btn.addEventListener("click", () => {
              localStorage.setItem("title", btn.dataset.title);
              localStorage.setItem("salary", btn.dataset.salary);
              localStorage.setItem("price", btn.dataset.price);
              localStorage.setItem("part6", btn.dataset.part6);
              localStorage.setItem("part10", btn.dataset.part10);
              localStorage.setItem("part12", btn.dataset.part12);
              if (localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1") {
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
                      name: "choose_plan",
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
              fetch(
                `https://marketplace-academica.ru/academica/choose_plan?user_guid=${localStorage.getItem(
                  "guid"
                )}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`,
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
                  if (data.error == 1) {
                    alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
                    throw new Error(`Error: ${data.message}`);
                  } else {
                    localStorage.setItem("order", data.data.order_id);
                    window.location.href = "./pages/form.html";
                  }
                });
            });
          });
          if (btn) {
            btn.addEventListener("click", () => {
              localStorage.setItem("title", btn.dataset.title);
              localStorage.setItem("salary", btn.dataset.salary);
              localStorage.setItem("price", btn.dataset.price);
              localStorage.setItem("part6", btn.dataset.part6);
              localStorage.setItem("part10", btn.dataset.part10);
              localStorage.setItem("part12", btn.dataset.part12);
              if (localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1") {
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
                      name: "choose_plan",
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
              fetch(
                `https://marketplace-academica.ru/academica/choose_plan?user_guid=${localStorage.getItem(
                  "guid"
                )}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`,
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
                  if (data.error == 1) {
                    alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
                    throw new Error(`Error: ${data.message}`);
                  } else {
                    localStorage.setItem("order", data.data.order_id);
                    window.location.href = "./form.html";
                  }
                });
            });
          }
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
                  browser: nav,
                  name: "get_ul",
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
          const formLink = document.querySelector(".form__link");
          if (formLink) {
            formLink.setAttribute("href", localStorage.getItem("conf_policy"));
          }
          const centerFooter = document.querySelector(".footer__center");
          centerFooter.innerText = `${localStorage.getItem(
            "org_name"
          )}${localStorage.getItem("org_data")}`;
          const [btn] = buttons.filter((item) => item !== null);
          btnsMain.forEach((btn) => {
            btn.addEventListener("click", () => {
              localStorage.setItem("title", btn.dataset.title);
              localStorage.setItem("salary", btn.dataset.salary);
              localStorage.setItem("price", btn.dataset.price);
              localStorage.setItem("part6", btn.dataset.part6);
              localStorage.setItem("part10", btn.dataset.part10);
              localStorage.setItem("part12", btn.dataset.part12);
              if (localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1") {
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
                      name: "choose_plan",
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
              fetch(
                `https://marketplace-academica.ru/academica/choose_plan?user_guid=${localStorage.getItem(
                  "guid"
                )}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`,
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
                  if (data.error == 1) {
                    alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
                    throw new Error(`Error: ${data.message}`);
                  } else {
                    localStorage.setItem("order", data.data.order_id);
                    window.location.href = "./pages/form.html";
                  }
                });
            });
          });
          if (btn) {
            btn.addEventListener("click", () => {
              localStorage.setItem("title", btn.dataset.title);
              localStorage.setItem("salary", btn.dataset.salary);
              localStorage.setItem("price", btn.dataset.price);
              localStorage.setItem("part6", btn.dataset.part6);
              localStorage.setItem("part10", btn.dataset.part10);
              localStorage.setItem("part12", btn.dataset.part12);
              if (localStorage.getItem("guid") === "be2d5df5-6735-463c-8e32-648dc62d15b1") {
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
                      name: "choose_plan",
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
              fetch(
                `https://marketplace-academica.ru/academica/choose_plan?user_guid=${localStorage.getItem("guid")}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`,
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
                  if (data.error == 1) {
                    alert(`Error: ${data.message}\nЧто-то пошло не так, воспользуйтесь виджетом для обратной связи или напишите письмо на info@marketplace-academica.ru`);
                    throw new Error(`Error: ${data.message}`);
                  } else {
                    localStorage.setItem("order", data.data.order_id);
                    window.location.href = "./form.html";
                  }
                });
            });
          }
        }
      });
  }
});

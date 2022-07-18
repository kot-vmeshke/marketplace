const set2 = document.querySelector('.reg__set2');
const prodamus = set2.querySelector('#prodamus');
const robokassa = set2.querySelector('#robokassa');

const btnNext = document.querySelector('.reg__btn');
const tab1 = document.querySelector('.tab-1');
const tab2 = document.querySelector('.tab-2');
const title = document.querySelector('.reg__title');
const salary = document.querySelector('.reg__subtitle span');

title.innerText = localStorage.getItem('title');
salary.innerText = `от ${localStorage.getItem('salary')} руб`;

const order = document.querySelector('.reg__order');
const userName = document.querySelector('.reg__user-name');
const userPhone = document.querySelector('.reg__user-phone');
const userMail = document.querySelector('.reg__user-mail');

const inputName = document.querySelector('#user-name');
const inputPhone = document.querySelector('#user-phone');
const inputMail = document.querySelector('#user-mail');
const inputIp = document.querySelector('#user-ip');
const inputInn = document.querySelector('#user-inn');
const inputKpp = document.querySelector('#user-kpp');
const inputFullname = document.querySelector('#user-fullname');
const inputSurname = document.querySelector('#user-surname');
const inputFathername = document.querySelector('#user-fathername');
const regBtn = document.querySelector('.btn-pay');
const regIp = document.querySelector('.reg__ip');
const ip = document.querySelector('#ip-ooo');
const regPart = document.querySelector('.reg__partpay');
const part = document.querySelector('#part');
const price = document.querySelector('.reg__price');
price.innerText = `${localStorage.getItem('price')}₽`;

const set1 = document.querySelector('.reg__set1');
set1.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('ip-ooo')) {
    set2.style.display = 'none';
    regIp.style.display = 'block';
    price.style.marginTop = '0';
    regPart.style.display = '';
    price.innerText = `${localStorage.getItem('price')}₽`;
  } else if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('part')) {
    set2.style.display = 'none';
    regPart.style.display = 'block';
    price.style.marginTop = '0';
    regIp.style.display = '';
    price.innerText = `${localStorage.getItem('price')}₽`;
  } else if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('card')) {
    set2.style.display = '';
    price.style.marginTop = '';
    regIp.style.display = '';
    regPart.style.display = '';
    price.innerText = `${localStorage.getItem('price')}₽`;
  } else if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('prepay')) {
    set2.style.display = '';
    price.style.marginTop = '';
    regIp.style.display = '';
    regPart.style.display = '';
    price.innerText = '2 000₽'
  }
})

const searchString = new URLSearchParams(window.location.search);
console.log('searchString: ', searchString);
const utmSource = searchString.get('utm_source') || '';
const utmMedium = searchString.get('utm_medium') || '';
const utmContent = searchString.get('utm_content') || '';
const utmCampaign = searchString.get('utm_campaign') || '';
const utmGroup = searchString.get('utm_group') || '';

prodamus.addEventListener('change', () => {
  set2.style.left = 'auto';
  set2.style.right = '25px';
  console.log(localStorage.getItem('order'));
  console.log(userMail.innerText);
  console.log(localStorage.getItem('guid'));
  fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem('order')}&guid=${localStorage.getItem('guid')}&merchant=prodamus`, {
    method: 'POST',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.error('error');
    }
  }).then(data => {
    console.log(data);
    regBtn.addEventListener('click', () => {
      window.location.href = data.data.payment_link;
      console.log('data.data.payment_link: ', data.data.payment_link);
    })
  })
})
robokassa.addEventListener('change', () => {
  set2.style.left = '';
  set2.style.right = '';
  fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem('order')}&guid=${localStorage.getItem('guid')}&merchant=robokassa`, {
    method: 'POST',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.error('error');
    }
  }).then(data => {
    console.log(data);
    regBtn.addEventListener('click', () => {
      window.location.href = data.data.payment_link;
      console.log('data.data.payment_link: ', data.data.payment_link);
    })
  })
})
btnNext.addEventListener('click', () => {
  if (inputName.value && inputPhone.value && inputMail.value) {
    tab1.style.display = 'none';
    tab2.style.display = 'block';
    console.log({
      user_guid: localStorage.getItem('guid'),
      name: inputName.value,
      email: inputMail.value,
      phone: inputPhone.value,
      order_id: localStorage.getItem('order'),
      back_link: `https://front.end/index.html?order_id=${localStorage.getItem('order')}`,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_content: utmContent,
      utm_campaign: utmCampaign,
      utm_group: utmGroup,
    })
    fetch('https://marketplace-academica.ru/academica/update_userdata?' + new URLSearchParams({
      user_guid: localStorage.getItem('guid'),
      name: inputName.value,
      email: inputMail.value,
      phone: inputPhone.value,
      order_id: localStorage.getItem('order'),
      back_link: `https://front.end/index.html?order_id=${localStorage.getItem('order')}`,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_content: utmContent,
      utm_campaign: utmCampaign,
      utm_group: utmGroup
    }), {
      method: 'post',
    }).then((response) => {
      return response.json();
    }).then(data => console.log(data))
    order.innerText = `Заказ №${localStorage.getItem('order')}`;
    userName.innerText = inputName.value;
    userPhone.innerText = inputPhone.value;
    userMail.innerText = inputMail.value;
  } else {
    alert('Заполните все поля');
  }
})

regBtn.addEventListener('click', () => {
  if (ip.checked) {
    fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem('order')}&guid=${localStorage.getItem('guid')}&merchant=tinkoff_ul&ul_name=${inputIp.value}&inn=${inputInn.value}&kpp=${inputKpp.value}`, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('error');
      }
    }).then(data => {
      console.log(data);
      console.log('inputIp.value: ', inputIp.value);
      console.log('inputInn.value: ', inputInn.value);
      console.log('inputKpp.value: ', inputKpp.value);
      //window.location.href = data.data.payment_link;
    })
  }
  if (part.checked) {
    fetch(`https://marketplace-academica.ru/academica/generate_paylink?guid=${localStorage.getItem('guid')}&order_id=${localStorage.getItem('order')}&merchant=loan&loan_fname=${inputFullname.value}&loan_mname=${inputFathername.value}&loan_lname=${inputSurname.value}&loan_phone=${userPhone.innerText.substring(2)}`, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('error');
      }
    }).then(data => {
      console.log(data);
      console.log(inputFullname.value);
      console.log(inputFathername.value);
      console.log(inputSurname.value);
      console.log(userPhone.innerText.substring(1));
      //window.location.href = data.data.payment_link;
    })
  }
})
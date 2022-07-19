const set2 = document.querySelector('.reg__set2');
const prodamus = set2.querySelector('#prodamus');
const robokassa = set2.querySelector('#robokassa');

const btnNext = document.querySelector('.reg__btn');
const tab1 = document.querySelector('.tab-1');
const tab2 = document.querySelector('.tab-2');
const title = document.querySelector('.reg__title');
const salary = document.querySelector('.reg__subtitle span');
const ipTextUserId = document.querySelector('.ip-text__user-id');

title.innerText = localStorage.getItem('title');
salary.innerText = `от ${localStorage.getItem('salary')} руб`;
ipTextUserId.innerText = `id-${localStorage.getItem('order')}`;

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
const card = document.querySelector('#card');
const prepay = document.querySelector('#prepay');
const months = document.querySelector('.months');
const part6 = months.querySelector('#month-6');
const part10 = months.querySelector('#month-10');
const part12 = months.querySelector('#month-12');
const inputPromo = document.querySelector('.promo');
const btnPromo = document.querySelector('.promo-btn');

let pricePromo;
let cost;

const price = document.querySelector('.reg__price');
price.innerText = `${localStorage.getItem('price')}₽`;

btnPromo.addEventListener('click', () => {
  if (inputPromo.value === 'Academica3000') {
    pricePromo = +localStorage.getItem('price') - 3000;
    price.innerText = `${pricePromo}₽`;
  }
})

const set1 = document.querySelector('.reg__set1');
set1.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('ip-ooo')) {
    set2.style.display = 'none';
    regIp.style.display = 'block';
    price.style.marginTop = '0';
    regPart.style.display = '';
    robokassa.checked = false;
    regBtn.querySelector('.reg__btn-text').innerText = 'Перейти к оплате';
    if (pricePromo) {
      price.innerText = `${pricePromo}₽`;
    } else {
      price.innerText = `${localStorage.getItem('price')}₽`;
    }
  } else if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('part')) {
    set2.style.display = 'none';
    regPart.style.display = 'block';
    price.style.marginTop = '0';
    regIp.style.display = '';
    robokassa.checked = false;
    regBtn.querySelector('.reg__btn-text').innerText = 'оставить заявку';
    part10.checked = true;
    cost = Math.floor(+localStorage.getItem('part10') / 10);
    price.innerText = `${cost}₽`;
    months.addEventListener('click', () => {
      if(part6.checked) {
        cost = Math.floor(+localStorage.getItem('part6') / 6);
        price.innerText = `${cost}₽`;
      } else if(part10.checked) {
        cost = Math.floor(+localStorage.getItem('part10') / 10);
        price.innerText = `${cost}₽`;
      } else if(part12.checked) {
        cost = Math.floor(+localStorage.getItem('part12') / 12);
        price.innerText = `${cost}₽`;
      }
    })
  } else if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('card')) {
    set2.style.display = '';
    price.style.marginTop = '';
    regIp.style.display = '';
    regPart.style.display = '';
    regBtn.querySelector('.reg__btn-text').innerText = 'Перейти к оплате';
    robokassa.checked = true;
    if (pricePromo) {
      price.innerText = `${pricePromo}₽`;
    } else {
      price.innerText = `${localStorage.getItem('price')}₽`;
    }
  } else if (event.target.classList.contains('js-radio-set1') && event.target.classList.contains('prepay')) {
    set2.style.display = '';
    price.style.marginTop = '';
    regIp.style.display = '';
    regPart.style.display = '';
    regBtn.querySelector('.reg__btn-text').innerText = 'Перейти к оплате';
    robokassa.checked = true;
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
})
robokassa.addEventListener('change', () => {
  set2.style.left = '';
  set2.style.right = '';
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
      new_cost: pricePromo || '',
      back_link: `https://marketplace-academica.ru/form.html?order_id=${localStorage.getItem('order')}`,
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
      new_cost: pricePromo || '',
      back_link: `https://marketplace-academica.ru/form.html?order_id=${localStorage.getItem('order')}`,
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

regBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (ip.checked) {
    fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem('order')}&guid=${localStorage.getItem('guid')}&merchant=tinkoff_ul&ul_name=${inputIp.value}&inn=${inputInn.value}&kpp=${inputKpp.value || '000000000'}`, {
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
  } else if (part.checked) {
    console.log(cost);
    fetch(`https://marketplace-academica.ru/academica/generate_paylink?guid=${localStorage.getItem('guid')}&order_id=${localStorage.getItem('order')}&merchant=loan&loan_fname=${inputFullname.value}&loan_mname=${inputFathername.value}&loan_lname=${inputSurname.value}&loan_phone=${userPhone.innerText.substring(2)}&loan_cost=${cost}`, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('error');
      }
    }).then(data => {
      console.log(data);
      alert(`${data.message}`);
      window.location.href = '../index.html';
    })
  } else if(robokassa.checked && card.checked) {
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
      window.location.href = data.data.payment_link;
    })
  } else if(prodamus.checked && card.checked) {
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
      window.location.href = data.data.payment_link;
    })
  } else if(robokassa.checked && prepay.checked) {
    fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem('order')}&guid=${localStorage.getItem('guid')}&merchant=robokassa&prepay=1`, {
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
    fetch(`https://marketplace-academica.ru/academica/generate_paylink?order_id=${localStorage.getItem('order')}&guid=${localStorage.getItem('guid')}&merchant=prodamus&prepay=1`, {
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
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
      back_link: `https://front.end/index.html?order_id=${localStorage.getItem('order')}`,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_content: utmContent,
      utm_campaign: utmCampaign,
      utm_group: utmGroup,
    })
/*
    fetch(`https://tdmnewreal.fvds.ru/academica/update_userdata`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      })
    }).then((response) => {
      return response.json();
    }).then(data => console.log(data))
*/
    fetch('https://tdmnewreal.fvds.ru/academica/update_userdata?' + new URLSearchParams({
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
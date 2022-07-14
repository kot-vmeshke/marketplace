const set2 = document.querySelector('.reg__set2');
const prodamus = set2.querySelector('#prodamus');
const robokassa = set2.querySelector('#robokassa');

const btnNext = document.querySelector('.reg__btn');
const tab1 = document.querySelector('.tab-1');
const tab2 = document.querySelector('.tab-2');

const order = document.querySelector('.reg__order');
const userName = document.querySelector('.reg__user-name');
const userPhone = document.querySelector('.reg__user-phone');
const userMail = document.querySelector('.reg__user-mail');

const inputName = document.querySelector('#user-name');
const inputPhone = document.querySelector('#user-phone');
const inputMail = document.querySelector('#user-mail');

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
    order.innerText = `Заказ №${localStorage.getItem('order')}`;
    userName.innerText = inputName.value;
    console.log('inputName.value: ', inputName.value);
    userPhone.innerText = inputPhone.value;
    console.log('inputPhone.value: ', inputPhone.value);
    userMail.innerText = inputMail.value;
    console.log('inputMail.value: ', inputMail.value);
  } else {
    alert('Заполните все поля');
  }

})
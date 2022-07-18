const overlay = document.querySelector('.overlay');
const telegram = document.querySelector('.telegram');
const webForm = document.querySelector('.hero__offer');
const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-phone');
const userEmail = document.querySelector('#user-mail');

webForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`https://webhook.site/a3180ce4-c030-43cd-9e88-42a9d0d52726?name=${userName.value}&email=${userEmail.value}&phone=${userPhone.value.replaceAll('-', '').replaceAll('(', '').replaceAll(')', '')}`, {
    method: "post",
  })
    .then((response) => {
      if (response.ok) {
        console.log('ok')
        // открытие попапа
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
})

telegram.addEventListener('click', () => {
  overlay.style.display = 'none';
  document.body.style.overflow = '';
})
/* UTM если до этого не объявляли на странице */

const searchString = new URLSearchParams(window.location.search);
console.log('searchString: ', searchString);
const utmSource = searchString.get('utm_source') || '';
const utmMedium = searchString.get('utm_medium') || '';
const utmContent = searchString.get('utm_content') || '';
const utmCampaign = searchString.get('utm_campaign') || '';
const utmGroup = searchString.get('utm_group') || '';

/* Константы формы */ 
const userNameF = document.querySelector('input#user-name');
const userPhoneF = document.querySelector('input#user-phone');
const userMailF = document.querySelector('input#user-mail');
const userFormF = document.querySelector('.quetions__form');

/* Обработчик формы */

userFormF.addEventListener('submit', (e)=> {
    e.preventDefault();
    fetch(`https://marketplace-academica.ru/academica/help_form?` + new URLSearchParams({
        user_guid: localStorage.getItem('guid'),
        name: userNameF.value,
        email: userMailF.value,
        phone: userPhoneF.value,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_content: utmContent,
        utm_campaign: utmCampaign,
        utm_group: utmGroup
      }), {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        alert('Спасибо за заявку. Наш менеджер скоро свяжется с вами!');
        return response.json();
        
      } else {
        console.error('error');
        alert('Ошибка, попробуйте позже!')
      }
    })
})
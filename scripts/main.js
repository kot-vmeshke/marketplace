window.addEventListener('load', () => {

  const buttons = [document.querySelector('.price__btn_research'), document.querySelector('.price__btn_assistant'), document.querySelector('.price__btn_project')];

  if (localStorage.getItem('guid')) {
    let guid = localStorage.getItem('guid');
    fetch(`https://tdmnewreal.fvds.ru/academica/get_ul?user_guid=${guid}`, {
      method: 'POST'
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('error');
      }
    }).then(data => {
      const [btn] = buttons.filter(item => item !== null);
      if(btn) {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          fetch(`https://tdmnewreal.fvds.ru/academica/choose_plan?user_guid=${guid}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST'
          }).then((response) => {
            return response.json();
          }).then(data => {
            localStorage.setItem('order', data.data.order_id);
            window.location.href = './form.html';
          })
        })
      }
    });   
  } else {
    fetch('https://tdmnewreal.fvds.ru/academica/get_ul', {
      method: 'POST',      
      mode: 'no-cors',
    }).then((response) => {
      return response.json();
    }).then(data => {
      localStorage.setItem('guid', data.data.user_guid);
      // TODO: data to footer
    })
  }
})

document.querySelector('.form__btn').addEventListener('click', () => {
  console.log(document.querySelector('#user-phone').value);
})
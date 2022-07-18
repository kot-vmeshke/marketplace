window.addEventListener('load', () => {
  const oferta = document.querySelector('.oferta');
  const privacy = document.querySelector('.privacy');
  const centerFooter = document.querySelector('.footer__center');

  const buttons = [document.querySelector('.price__btn_research'), document.querySelector('.price__btn_assistant'), document.querySelector('.price__btn_project')];

  if (localStorage.getItem('guid')) {
    let guid = localStorage.getItem('guid');
    fetch(`https://marketplace-academica.ru/academica/get_ul?user_guid=${guid}`, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('error');
      }
    }).then(data => {
      console.log(data);
      const oferta = document.querySelector('.oferta');
      const privacy = document.querySelector('.privacy');
      const centerFooter = document.querySelector('.footer__center');
      localStorage.setItem('org_name', data.data.org_name);
      localStorage.setItem('org_data', data.data.org_data);
      centerFooter.innerText = `${localStorage.getItem('org_name')}${localStorage.getItem('org_data')}`;
      const [btn] = buttons.filter(item => item !== null);
      if(btn) {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          fetch(`https://marketplace-academica.ru/academica/choose_plan?user_guid=${guid}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST',
          }).then((response) => {
            return response.json();
          }).then(data => {
            console.log(data);
            localStorage.setItem('order', data.data.order_id);
            window.location.href = './form.html';
          })
        })
      }
    });   
  } else {
    fetch('https://marketplace-academica.ru/academica/get_ul', {
      method: 'POST',      
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('error');
      }
    }).then(data => {
      console.log(data);
      localStorage.setItem('guid', data.data.user_guid);
      const oferta = document.querySelector('.oferta');
      const privacy = document.querySelector('.privacy');
      const centerFooter = document.querySelector('.footer__center');
      localStorage.setItem('org_name', data.data.org_name);
      localStorage.setItem('org_data', data.data.org_data);
      centerFooter.innerText = `${localStorage.getItem('org_name')}${localStorage.getItem('org_data')}`;
      const [btn] = buttons.filter(item => item !== null);
      if(btn) {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          fetch(`https://marketplace-academica.ru/choose_plan?user_guid=${guid}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST',
          }).then((response) => {
            return response.json();
          }).then(data => {
            localStorage.setItem('order', data.data.order_id);
            window.location.href = './form.html';
          })
        })
      }
    })    
  }
})


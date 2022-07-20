window.addEventListener('load', () => {

  const buttons = [document.querySelector('.price__btn_research'), document.querySelector('.price__btn_assistant'), document.querySelector('.price__btn_project')];
  const btnsMain = document.querySelectorAll('.rate__offer-btn');
  
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
      localStorage.setItem('org_name', data.data.org_name);
      localStorage.setItem('org_data', data.data.org_data);
      localStorage.setItem('conf_policy', data.data.conf_policy);
      localStorage.setItem('oferta', data.data.oferta);
      document.querySelector(".oferta").setAttribute('href', localStorage.getItem('oferta'));
      document.querySelector(".privacy").setAttribute('href', localStorage.getItem('conf_policy'));
      const formLink = document.querySelector(".form__link");
      if (formLink) {
        formLink.setAttribute('href', localStorage.getItem('conf_policy'));
      }
      const centerFooter = document.querySelector('.footer__center');
      centerFooter.innerText = `${localStorage.getItem('org_name')}${localStorage.getItem('org_data')}`;
      const [btn] = buttons.filter(item => item !== null);
      btnsMain.forEach(btn => {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          localStorage.setItem('price', btn.dataset.price);
          localStorage.setItem('part6', btn.dataset.part6);
          localStorage.setItem('part10', btn.dataset.part10);
          localStorage.setItem('part12', btn.dataset.part12);
          fetch(`https://marketplace-academica.ru/academica/choose_plan?user_guid=${localStorage.getItem('guid')}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST',
          }).then((response) => {
            return response.json();
          }).then(data => {
            localStorage.setItem('order', data.data.order_id);
            window.location.href = './pages/form.html';
          })
        })
      })
      if(btn) {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          localStorage.setItem('price', btn.dataset.price);
          localStorage.setItem('part6', btn.dataset.part6);
          localStorage.setItem('part10', btn.dataset.part10);
          localStorage.setItem('part12', btn.dataset.part12);
          fetch(`https://marketplace-academica.ru/academica/choose_plan?user_guid=${localStorage.getItem('guid')}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST',
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
      localStorage.setItem('org_name', data.data.org_name);
      localStorage.setItem('org_data', data.data.org_data);
      localStorage.setItem('conf_policy', data.data.conf_policy);
      localStorage.setItem('oferta', data.data.oferta);
      document.querySelector(".oferta").setAttribute('href', localStorage.getItem('oferta'));
      document.querySelector(".privacy").setAttribute('href', localStorage.getItem('conf_policy'));
      const formLink = document.querySelector(".form__link");
      if (formLink) {
        formLink.setAttribute('href', localStorage.getItem('conf_policy'));
      }
      const centerFooter = document.querySelector('.footer__center');
      centerFooter.innerText = `${localStorage.getItem('org_name')}${localStorage.getItem('org_data')}`;
      const [btn] = buttons.filter(item => item !== null);
      btnsMain.forEach(btn => {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          localStorage.setItem('price', btn.dataset.price);
          localStorage.setItem('part6', btn.dataset.part6);
          localStorage.setItem('part10', btn.dataset.part10);
          localStorage.setItem('part12', btn.dataset.part12);
          fetch(`https://marketplace-academica.ru/academica/choose_plan?user_guid=${localStorage.getItem('guid')}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST',
          }).then((response) => {
            return response.json();
          }).then(data => {
            localStorage.setItem('order', data.data.order_id);
            window.location.href = './pages/form.html';
          })
        })
      })
      if(btn) {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          localStorage.setItem('price', btn.dataset.price);
          localStorage.setItem('part6', btn.dataset.part6);
          localStorage.setItem('part10', btn.dataset.part10);
          localStorage.setItem('part12', btn.dataset.part12);
          fetch(`https://marketplace-academica.ru/academica/choose_plan?user_guid=${guid}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
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


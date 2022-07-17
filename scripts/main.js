window.addEventListener('load', () => {

  const buttons = [document.querySelector('.price__btn_research'), document.querySelector('.price__btn_assistant'), document.querySelector('.price__btn_project')];

  if (localStorage.getItem('guid')) {
    let guid = localStorage.getItem('guid');
    fetch(`https://marketplace-academica.ru/academica/get_ul?user_guid=${guid}`, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        console.error('error');
      }
    }).then(data => {
      const [btn] = buttons.filter(item => item !== null);
      if(btn) {
        btn.addEventListener('click', () => {
          localStorage.setItem('title', btn.dataset.title);
          localStorage.setItem('salary', btn.dataset.salary);
          fetch(`https://marketplace-academica.ru/choose_plan?user_guid=${guid}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST',
          }).then((response) => {
            return response.text();
          }).then(data => {
            localStorage.setItem('order', data.data.order_id);
            window.location.href = './form.html';
          })
        })
      }
    });   
  } else {
    // fetch('https://marketplace-academica.ru/get_ul', {
    //   method: 'POST',      
    // }).then((response) => {
    //   if (response.ok) {
    //     return response.text();
    //   } else {
    //     console.error('error');
    //   }
    // }).then(data => {
    //   console.log(data);
    //   localStorage.setItem('guid', data.data.user_guid);
    // })
    fetch('https://webhook.site/a3180ce4-c030-43cd-9e88-42a9d0d52726', {
      method: 'POST',      
    }).then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        console.error('error');
      }
    }).then(data => {
      console.log(data);
      localStorage.setItem('guid', '0000000000');
      // TODO: data to footer
    })
  }
})


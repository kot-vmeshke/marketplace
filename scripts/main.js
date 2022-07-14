window.addEventListener('load', () => {

  const buttons = [document.querySelector('.price__btn_research'), document.querySelector('.price__btn_assistant'), document.querySelector('.price__btn_project')];

  if (localStorage.getItem('guid')) {
    let guid = localStorage.getItem('guid');
    fetch(`https://tdmnewreal.fvds.ru/academica/get_ul?user_guid=${guid}`, {
      method: 'POST',
    }).then((response) => {
      return response.json();
    }).then(data => {
      const [btn] = buttons.filter(item => item !== null);
      if(btn) {
        btn.addEventListener('click', () => {
          console.log('click');
          fetch(`https://tdmnewreal.fvds.ru/academica/choose_plan?user_guid=${guid}&plan_id=${btn.dataset.id}&cost=${btn.dataset.price}`, {
            method: 'POST',
          }).then((response) => {
            return response.json();
          }).then(data => {
            console.log(data.data.order_id);
            localStorage.setItem('order', data.data.order_id);
            window.location.href = './form.html';
          })
        })
      }
    });   
  } else {
    fetch('https://tdmnewreal.fvds.ru/academica/get_ul', {
      method: 'POST',
    }).then((response) => {
      return response.json();
    }).then(data => {
      localStorage.setItem('guid', data.data.user_guid);
      // TODO: data to footer
    })
  }
})
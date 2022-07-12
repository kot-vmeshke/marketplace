window.addEventListener('load', () => {
  if (localStorage.getItem('guid')) {
    let guid = localStorage.getItem('guid');
    fetch(`https://tdmnewreal.fvds.ru/academica/get_ul?user_guid=${guid}`, {
      method: 'POST',
    }).then((response) => {
      return response.json();
    }).then(data => console.log(data));   
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
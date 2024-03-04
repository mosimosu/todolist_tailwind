import apiNext from './apiNext.js';

// let path = "https://todoo.5xcamp.us/users/sign_in";
const logingBtn = document.querySelector('button');
const path = apiNext.signin;
const account = {
  user: {
    email: '',
    password: '',
  },
};

async function getJSON(url, account) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account),
    });
    const data = await res.json();
    const token = res.headers.get('authorization');
    return { data, token };
  } catch (err) {
    console.log(err);
  }
}

logingBtn.addEventListener('click', (e) => {
  account.user.email = e.target.parentNode[0].value;
  account.user.password = e.target.parentNode[1].value;
  const constraints = {
    email: { presence: true },
    password: { presence: true },
  };
  const result = validate(account, constraints);

  // 用async fetch寫法
  getJSON(path, account).then((data) => {
    localStorage.setItem('todo', data.token);
    localStorage.setItem('nickname', data.data.nickname);
    if (data.data.message == '登入成功') {
      location.assign('./list.html');
    } else {
      alert(data.data.message);
    }
  });
});

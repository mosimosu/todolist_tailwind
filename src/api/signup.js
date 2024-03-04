import apiNext from "./apiNext.js";

const signupBtn = document.querySelector("button");
const path = apiNext.signup;

async function getJSON(url, account) {
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    });
    let token = res.headers.get("authorization");
    let data = await res.json();
    return { data, token };
  } catch (err) {
    console.log(err);
  }
}

signupBtn.addEventListener("click", (e) => {
  let account = {
    user: {
      email: "",
      nickname: "",
      password: "",
    },
  };
  account.user.email = e.target.parentNode[0].value;
  account.user.nickname = e.target.parentNode[1].value;

  if (e.target.parentNode[2].value !== e.target.parentNode[3].value) {
    return alert("請輸入正確密碼");
  } else {
    account.user.password = e.target.parentNode[3].value;
  }

  getJSON(path, account).then((data) => {
    console.log(data.token);
    if (data.message == "帳號註冊成功") {
      alert("註冊成功！開始您的第一堂課吧！");
      localStorage.setItem("todo", JSON.stringify(data.token));
      location.assign("./login.html");

      return;
    } else {
      alert(data.data.message);
    }
  });
});

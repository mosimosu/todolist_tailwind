import apiNext from "./apiNext.js";

const logoutBtn = document.querySelectorAll(".logout");
const path = apiNext.signout;
const todsPath = apiNext.todos;
const todosNone = document.querySelector(".todos-none");
const todoList = document.querySelector(".todos");
const addBtn = document.querySelector(".add");
const list = document.querySelector(".list");
const finishedItems = document.querySelector(".finishedItems");
const allList = document.querySelector(".all-list");
const waitingList = document.querySelector(".waiting-list");
const finishedList = document.querySelector(".finished-list");
const userName = document.querySelector(".userName");

load();

// API:登出
async function signOut(url) {
  try {
    let token = localStorage.getItem("todo");
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: token,
      },
    });

    let data = await res.json();
    return { data, token };
  } catch (err) {
    console.log(err);
  }
}

// API:登入
async function todos(url) {
  try {
    let token = localStorage.getItem("todo");
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// API:載入畫面
function load() {
  let nickname = localStorage.getItem("nickname");
  userName.textContent = `${nickname}的代辦`;

  todos(todsPath).then((data) => {
    if (data.todos.length <= 0) {
      todoList.classList.add("hidden");
      todosNone.classList.remove("hidden");
    } else {
      todosNone.classList.add("hidden");
      todoList.classList.remove("hidden");
      list.innerHTML = "";

      data.todos.forEach((item) => {
        let li = document.createElement("li");
        if (item["completed_at"] !== null) {
          li.innerHTML = `<li class="flex w-fulle bordr-b-2 mt-4 pb-4 relative">
          <img src="../public/check.png" class="finished w-5 h-5" alt="" data-name = "${item.id}"
          data-time = "${item.completed_at}" />
          <p class="text-sm ml-4">${item.content}</p>
          <img
            src="../public/close.png"
            class="w-4 h-4 absolute right-0"
            alt=""
            data-id = "${item.id}"
          />
          </li>`;

          list.append(li);
        } else {
          li.innerHTML = `<li class="flex w-fulle bordr-b-2 mt-4 pb-4 relative">
          <img src="../public/Rectangle.png" class="unfinished w-5 h-5" alt="" data-name = "${item.id}"
          data-time = "${item.completed_at}" />
          <p class="text-sm ml-4">${item.content}</p>
          <img
            src="../public/close.png"
            class="w-4 h-4 absolute right-0"
            alt=""
            data-id = "${item.id}"
          />
          </li>`;

          list.append(li);
        }
      });
    }

    finishedItems.textContent = `${data.todos.length} 個待完成項目`;
  });
}

// API:新增
async function add(url, todo) {
  const token = localStorage.getItem("todo");
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: token,
      },
      body: JSON.stringify({ todo: { content: todo } }),
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// API:剛除
async function fndelete(url, id) {
  const token = localStorage.getItem("todo");
  const finUrl = url + "/" + id;
  let res = await fetch(finUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
      accept: "application/json",
    },
  });
  let data = await res.json();
  return data;
}

// API: 切換狀態;
async function toggle(id) {
  const token = localStorage.getItem("todo");
  const finUrl = apiNext.toggle(id);

  try {
    let res = await fetch(finUrl, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

//feature:登出
logoutBtn[0].addEventListener("click", () => {
  signOut(path).then((data) => {
    try {
      if (localStorage.getItem("todo") !== null) {
        localStorage.removeItem("todo");
        localStorage.removeItem("nickname");
        location.assign("./login.html");
      } else {
        alert(data.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

// feature:新增事項
addBtn.addEventListener("click", (e) => {
  let todo = e.target.parentNode.parentNode.childNodes[1].value;
  add(todsPath, todo).then((data) => {
    e.target.parentNode.parentNode.childNodes[1].value = "";
    load();
    return data;
  });
});

//feature:刪除
list.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-id");
  const url = apiNext.todos;
  if (id !== undefined || id !== null) {
    fndelete(url, id).then((res) => {
      load();
      return res;
    });
  }
});

//feature:切換
list.addEventListener("click", (e) => {
  const isUnfinished = e.target.classList.contains("unfinished");
  const id = e.target.getAttribute("data-name");
  if (isUnfinished === true) {
    toggle(id).then((res) => {
      load();
      return res;
    });
  } else {
    toggle(id).then((res) => {
      load();
      return res;
    });
  }
});

//feature: 切換(全)
allList.addEventListener("click", () => {
  load();
});

//feature: 切換(未完成)
waitingList.addEventListener("click", () => {
  todos(todsPath).then((data) => {
    if (data.todos.length <= 0) {
      todoList.classList.add("hidden");
      todosNone.classList.remove("hidden");
    } else {
      todosNone.classList.add("hidden");
      todoList.classList.remove("hidden");
      list.innerHTML = "";

      let newTodos = 0;
      data.todos.forEach((item) => {
        let li = document.createElement("li");
        if (!item["completed_at"]) {
          li.innerHTML = `<li class="flex w-fulle bordr-b-2 mt-4 pb-4 relative">
          <img src="../public/Rectangle.png" class="unfinished w-5 h-5" alt="" data-name = "${item.id}"
          data-time = "${item.completed_at}" />
          <p class="text-sm ml-4">${item.content}</p>
          <img
            src="../public/close.png"
            class="w-4 h-4 absolute right-0"
            alt=""
            data-id = "${item.id}"
          />
          </li>`;

          list.append(li);
          newTodos += 1;
        }
      });

      finishedItems.textContent = `${newTodos} 個待完成項目`;
    }
  });
});

//feature: 切換(已完成)
finishedList.addEventListener("click", () => {
  todos(todsPath).then((data) => {
    if (data.todos.length <= 0) {
      todoList.classList.add("hidden");
      todosNone.classList.remove("hidden");
    } else {
      todosNone.classList.add("hidden");
      todoList.classList.remove("hidden");
      list.innerHTML = "";

      let newTodos = 0;
      data.todos.forEach((item) => {
        let li = document.createElement("li");
        if (item["completed_at"]) {
          li.innerHTML = `<li class="flex w-fulle bordr-b-2 mt-4 pb-4 relative">
          <img src="../public/check.png" class="finished w-5 h-5" alt="" data-name = "${item.id}"
          data-time = "${item.completed_at}" />
          <p class="text-sm ml-4">${item.content}</p>
          <img
            src="../public/close.png"
            class="w-4 h-4 absolute right-0"
            alt=""
            data-id = "${item.id}"
          />
          </li>`;

          list.append(li);
          newTodos += 1;
        }
      });
      finishedItems.textContent = `${newTodos} 個待完成項目`;
    }
  });
});

//タスクを保存する配列
let tasks = [];

//ページ読み込み時に実行
window.onload = function() {
  let savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    //文字列から配列に戻す
    tasks = JSON.parse(savedTasks);

    //保存されているタスクを画面に表示
    tasks.forEach(function(task) {
      addTaskToList(task);
    });
  }
};

//タスク追加
function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value;

  //空なら追加しない
  if (text === "") return;

  let task = {
    id: Date.now(), //ID
    text: text,
    done: false
  };

  //配列に追加
  tasks.push(task);

  //保存
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //画面に表示
  addTaskToList(task);
  
  //入力欄リセット
  input.value = "";
}

//画面に表示する処理(共通化)
function addTaskToList(task) {
  let li = document.createElement("li");

  //チェックボックス
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;

  //テキスト
  let span = document.createElement("span");
  span.textContent = task.text;

  //完了状態の見た目
  if (task.done) {
    span.style.textDecoration = "line-through";
  }

  //チェックされたとき
  checkbox.onchange = function() {
    task.done = checkbox.checked;

    if(task.done) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  //削除ボタン作成
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";

  //ボタンが押されたらliを削除
  deleteBtn.onclick = function() {
    //画面から削除
    li.remove();

    //IDで削除
    tasks = tasks.filter(function(t) {
      return t.id !== task.id;
    });

    //保存しなおす
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  //liの中にボタンを追加
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  //リストに追加
  document.getElementById("taskList").appendChild(li);
}
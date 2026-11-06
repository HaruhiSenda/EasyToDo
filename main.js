let list = [];
let idCount = 1;
//セーブデータがあればlist及びidCountに代入。
if (localStorage.getItem("tasks")) {
    const saved = localStorage.getItem("tasks");
    list = JSON.parse(saved);
    idCount = Number(localStorage.getItem("idCount"));
};

//HTML要素取得
const form = document.querySelector("#input-area");
const incompleteList = document.querySelector("#incomplete-list")
const completeList = document.querySelector("#complete-list");

//保存する関数
const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(list));
};

//受け取った一つのタスクからliを作って返す関数。インポート
import { createListItem } from "./create.js";

//削除ボタンの処理を設定。createListItemに渡すため
const deleteTask = (task) => {
    const index = list.findIndex((item) => {
        return item.id === task.id;
    });
    list.splice(index, 1);
};

//並べ替え関数インポート
import { sortTasks } from "./sort.js";

//並べ替えルールを変更したら再描画するよう設定
const ruleSelect = document.querySelector("#sort-rule");
ruleSelect.addEventListener('change', () => {
    renderTask();
});
const starFirst = document.querySelector("#star-first");
starFirst.addEventListener('change', () => {
    renderTask();
});

//空白ではないタスクが追加されたら、初期値で配列に入れて再描画。
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector("#task-input");
    const todo = {
        id: idCount,
        name: input.value.trim(),
        star: false,
        limit: null,
        type: "voluntary",
        completed: false,
    };
    if (input.value.trim()) {
        list.push(todo);
        idCount += 1;
        localStorage.setItem("idCount", idCount);
        input.value = "";
        saveTask();
        renderTask();
    };
});

//再描画する関数
const renderTask = () => {
    //一旦それぞれのリストをまっさらに
    incompleteList.innerHTML = "";
    completeList.innerHTML = "";

    //終わっていないタスクがなければ、
    const hasIncomplete = list.some((task) => {
        return task.completed === false;
    });
    if (!hasIncomplete) {
        const messageArea = document.createElement("div");
        messageArea.classList.add("massage-area");
        const noTaskMessage = document.createElement("h4");
        noTaskMessage.textContent = "現在タスクはありません。いつもお疲れ様です。"
        const emptyImage = document.createElement("div");
        emptyImage.classList.add("empty-image");
        messageArea.appendChild(emptyImage);
        messageArea.appendChild(noTaskMessage);
        incompleteList.appendChild(messageArea);
    }
    //終わったタスクについて
    const hasCompleted = list.some((task) => {
        return task.completed === true;
    });
    const completeListArea = document.querySelector(".complete-list-area");
    const completeTitle = document.querySelector(".complete-title");
    const completedTasks = list.filter((task) => {
        return task.completed === true;
    });
    completeTitle.textContent = "完了済（" + completedTasks.length + "件）";
    completeListArea.hidden = !hasCompleted;

    //条件を確認してコピーした配列を並べ替えて返す。
    const sortedList = sortTasks(list, ruleSelect.value, starFirst.checked);
    
    //並べ替えられた配列のオブジェクト一つ一つについて
    sortedList.forEach((task) => {
        //リストアイテムを作成
        const item = createListItem(task, renderTask, saveTask, deleteTask);
        //完了または未完了に表示
        if (!task.completed) {
            incompleteList.appendChild(item);
        } else {
            completeList.appendChild(item);
        };
    });
};
renderTask();

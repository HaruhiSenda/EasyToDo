export const createListItem = (task, renderTask, saveTask, deleteTask) => {

    //完了未完了チェック。変更したら保存して再描画。
    const item = document.createElement("li");
    const name = document.createElement("span");
    const checkbox = document.createElement("input");
    checkbox.classList.add("complete-check");
    checkbox.checked = task.completed;
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        renderTask();
        saveTask();
    });

    //タスクの内容を表示する。
    name.textContent = task.name;

    //重要なタスクかどうかの情報を保持する。変更したら保存して再描画。
    const star = document.createElement("input");
    star.classList.add("task-star");
    star.type = "checkbox";
    star.checked = task.star;
    star.addEventListener('change', () => {
        task.star = star.checked;
        renderTask();
        saveTask();
    });

    //必須か自主のどちらか。ただ選択を保持するだけ。変更したら保存。
    const radioVoluntary = document.createElement("input");
    radioVoluntary.type = "radio";
    radioVoluntary.name = task.id;
    radioVoluntary.value = "voluntary"
    radioVoluntary.checked = true;
    const radioRequired = document.createElement("input");
    radioRequired.type = "radio";
    radioRequired.name = task.id;
    radioRequired.value = "required"
    radioVoluntary.addEventListener('change', () => {
        task.type = "voluntary";
        saveTask();
    });
    radioRequired.addEventListener('change', () => {
        task.type = "required";
        saveTask();
    });
    radioVoluntary.checked = task.type === "voluntary";
    radioRequired.checked = task.type === "required";

    //期限選択。日付の情報が変わったらその情報を保存して再描画。
    const dateSelect = document.createElement("input");
    dateSelect.classList.add("task-date");
    dateSelect.type = "date";
    dateSelect.value = task.limit;
    dateSelect.addEventListener('change', () => {
        if (dateSelect.value === "") {
            task.limit = null;
        } else {
            task.limit = dateSelect.value;
        }
        renderTask();
        saveTask();
    });

    //削除ボタン。押したボタンの参照するIDタスクを配列から消す。
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener('click', () => {
        deleteTask(task);
        renderTask();
        saveTask();
    });

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");

    const taskRight = document.createElement("div");
    taskRight.classList.add("task-right");

    const taskCheckbox = document.createElement("div");
    taskCheckbox.classList.add("task-checkbox");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const taskType = document.createElement("div");
    taskType.classList.add("task-type");

    // 左側：完了チェック・タスク情報
    taskCheckbox.appendChild(checkbox);

    taskInfo.appendChild(name);
    taskInfo.appendChild(dateSelect);

    taskLeft.appendChild(taskCheckbox);
    taskLeft.appendChild(taskInfo);

    // 右側：操作ボタン・タスクの種類
    taskActions.appendChild(star);
    taskActions.appendChild(deleteButton);

    const voluntaryLabel = document.createElement("label");
    voluntaryLabel.textContent = "自主";
    voluntaryLabel.appendChild(radioVoluntary);

    const requiredLabel = document.createElement("label");
    requiredLabel.textContent = "必須";
    requiredLabel.appendChild(radioRequired);

    taskType.appendChild(voluntaryLabel);
    taskType.appendChild(requiredLabel);

    taskRight.appendChild(taskActions);
    taskRight.appendChild(taskType);

    // liに左右のdivを追加
    item.appendChild(taskLeft);
    item.appendChild(taskRight);


    return item;
};
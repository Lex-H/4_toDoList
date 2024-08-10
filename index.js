// 物件：資料處理
let listDada = {
  // 預設data，若localStorage無資料則將預設data存入
  data: [
    {
      title: "代辦清單",
      checked: false,
    },
    {
      title: "代辦清單小技巧 by Copilot AI：",
      checked: false,
    },
    {
      title: "使用代辦清單可以有效提升工作效率。首先，將相似的任務一起處理，減少切換時間。其次，一次專注在一項重要任務上，避免分心。限制每日清單上的任務數量，避免過度負擔。完成任務後，給自己一個小獎勵，保持動力。最後，定期回顧清單，調整計劃，確保持續進步 ",
      checked: false,
    },
  ],
  load: function() {
    let value = JSON.parse(localStorage.getItem("toDoList"));
    if (value === null) {
      this.save(this.data)
    }else {
      this.data = value;
    }
  },
  save: function(toDoListArray) {
    localStorage.setItem("toDoList", JSON.stringify(toDoListArray));
  },
}


// --- 初始化：載入頁面時 ---
// 從localStorage載入數據
listDada.load()
// 渲染列表


// 點擊事件：li裡面所有的點擊事件
var list = document.getElementById("myUL");
list.addEventListener('click', function(ev) {
  var classClicked =  ev.target.getAttribute('class');
  if (classClicked === null) {
    console.log("class=null，這行代碼阻止報錯，沒有問題，請勿刪除")
    return
  }

  // 點擊事件：CheckBox
  const checkBoxSrc = "src/img/checkBox.svg";
  const checkBoxCheckedSrc = "src/img/checkBoxChecked.svg";
  if (classClicked.includes('checkBox')) {
    // 更改checkBox圖片路徑，以此切換是否打勾
    if (ev.target.getAttribute('src') === checkBoxSrc) {
      ev.target.setAttribute('src', checkBoxCheckedSrc)
    }else{
      ev.target.setAttribute('src', checkBoxSrc)
    }
    // 控制父節點的class，以此改變樣式
    ev.target.parentElement.classList.toggle('checked');
  }

  // 點擊事件：toDo
  if (classClicked.includes('toDo')) {    
    var toDoTextarea = `<textarea class="inputToDoContent">${ev.target.innerText}</textarea>`;
    ev.target.outerHTML = toDoTextarea;

    // 自動儲存內容到變數 toDoSave
    var newInput = document.getElementsByClassName("inputToDoContent")[0];
    toDoSave = newInput.value; // 使用 value 屬性

setTimeout(function() {
  var newInput = document.getElementsByClassName("inputToDoContent")[0];
  newInput.focus();

  // 設置光標位置
  var clickPosition = ev.clientX - newInput.getBoundingClientRect().left;
  var lineHeight = parseInt(window.getComputedStyle(newInput).lineHeight);
  var lines = newInput.value.substr(0, newInput.selectionStart).split("\n");
  var cursorPosition = lines.length - 1;
  var charWidth = newInput.scrollWidth / newInput.cols;
  var charPosition = Math.floor(clickPosition / charWidth);
  var finalPosition = lines.slice(0, cursorPosition).join("\n").length + charPosition;

  // 確保光標位置在有效範圍內
  finalPosition = Math.min(finalPosition, newInput.value.length);
  newInput.setSelectionRange(finalPosition, finalPosition);

  // 自動調整高度
  newInput.style.height = 'auto';
  newInput.style.height = newInput.scrollHeight + 'px';
}, 0);

// 監聽輸入事件，自動調整高度
document.addEventListener('input', function(event) {
  if (event.target.classList.contains('inputToDoContent')) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';

    // 自動儲存內容到變數 toDoSave
    var newInput = document.getElementsByClassName("inputToDoContent")[0];
    toDoSave = newInput.value; // 使用 value 屬性
  }
});

// 監聽失去焦點事件，恢復原本內容
document.addEventListener('blur', function(event) {
  if (event.target.classList.contains('inputToDoContent')) {
    if (event.target.parentNode) { // 確認元素是否有父節點
      var toDo = `<div class="toDo">
                    ${toDoSave}
                  </div>`;
      event.target.outerHTML = toDo;
      // toDoSave = "";
    }
  }
}, true);

  }

  // 點擊事件：delete
  if (classClicked.includes('delete')) {
    var div = ev.target.parentElement;
    div.remove();
  }
  
}, false);


// 新增Todo
function addToDo() {
  var li = document.createElement("li");
  var liContent = `
    <li>
            <img src="src/img/handle.png" class="handle">
            <img src="src/img/checkBox.svg" class="checkBox">
            <div class="toDo">
            </div>
            <img src="src/img/delete.svg" class="delete">
    </li>
  `;
  
  var list = document.getElementById("myUL");
  var referenceNode = list.children[list.children.length - 1]; // 倒數第一個子節點
  list.insertBefore(li, referenceNode);
  li.outerHTML = liContent;
}
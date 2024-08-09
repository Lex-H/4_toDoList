// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// Click on a close button to delete the current list item
// var close = document.getElementsByClassName("delete");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.remove();
//   }
// }

// 點擊事件：li裡面所有的點擊事件
var list = document.getElementById("myUL");
list.addEventListener('click', function(ev) {
  // 舊的代碼
  // if (ev.target.tagName === 'LI') {
  //   ev.target.classList.toggle('checked');
  //   console.log("點擊到LI：" );
  //   console.log(ev.target);
  // }

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
    // var inputToDoContent = `<textarea class="inputToDoContent">${ev.target.innerText}</textarea>`;
    // ev.target.outerHTML = inputToDoContent;
    // setTimeout(function() {
    //   var newInput = document.getElementsByClassName("inputToDoContent")[0];
    //   newInput.focus();

    //   // 設置光標位置
    //   var clickPosition = ev.clientX - newInput.getBoundingClientRect().left;
    //   var lineHeight = parseInt(window.getComputedStyle(newInput).lineHeight);
    //   var lines = newInput.value.substr(0, newInput.selectionStart).split("\n");
    //   var cursorPosition = lines.length - 1;
    //   var charWidth = newInput.scrollWidth / newInput.cols;
    //   var charPosition = Math.floor(clickPosition / charWidth);
    //   var finalPosition = lines.slice(0, cursorPosition).join("\n").length + charPosition;

    //   // 確保光標位置在有效範圍內
    //   finalPosition = Math.min(finalPosition, newInput.value.length);
    //   newInput.setSelectionRange(finalPosition, finalPosition);

    //   // 自動調整高度
    //   newInput.style.height = 'auto';
    //   newInput.style.height = newInput.scrollHeight + 'px';
    // }, 0);

    // // 監聽輸入事件，自動調整高度
    // document.addEventListener('input', function(event) {
    //   if (event.target.classList.contains('inputToDoContent')) {
    //     event.target.style.height = 'auto';
    //     event.target.style.height = event.target.scrollHeight + 'px';

    //     // 自動儲存內容到變數inputToDoContent
    //     var newInput = document.getElementsByClassName("inputToDoContent")[0];
    //     inputToDoContent = newInput.value; // 使用value屬性
    //   }
    // });

    // // 監聽失去焦點事件，恢復原本內容
    // document.addEventListener('blur', function(event) {
    //   if (event.target.classList.contains('inputToDoContent')) {
    //     if (event.target.parentNode) { // 確認元素是否有父節點
    //       var toDo = `<div class="toDo">
    //                     ${inputToDoContent}
    //                   </div>
    //                   `;
    //       event.target.outerHTML = toDo;
    //       // inputToDoContent = "";
    //     }
    //   }
    // }, true);

    
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

// Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }

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
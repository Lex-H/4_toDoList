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
var close = document.getElementsByClassName("delete");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.remove();
  }
}

// 點擊事件：CheckBox
var list = document.getElementById("myUL");
list.addEventListener('click', function(ev) {
  // 舊的代碼
  // if (ev.target.tagName === 'LI') {
  //   ev.target.classList.toggle('checked');
  //   console.log("點擊到LI：" );
  //   console.log(ev.target);
  // }
  const checkBoxSrc = "src/img/checkBox.svg";
  const checkBoxCheckedSrc = "src/img/checkBoxChecked.svg";
  if (ev.target.getAttribute('class').includes('checkBox')) {
    // 更改checkBox圖片路徑，以此切換是否打勾
    if (ev.target.getAttribute('src') === checkBoxSrc) {
      ev.target.setAttribute('src', checkBoxCheckedSrc)
    }else{
      ev.target.setAttribute('src', checkBoxSrc)
    }
    // 控制父節點的class，以此改變樣式
    ev.target.parentElement.classList.toggle('checked');
  }
  
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
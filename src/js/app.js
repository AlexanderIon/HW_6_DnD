import AddListCard from './widgetListTask.js';

const board = document.querySelector('.board');
const haveToDo = document.getElementById('haveToDo');
const inProcessing = document.getElementById('inProcessing');
const isDoneTask = document.getElementById('isDone');
const myTasks = new AddListCard(haveToDo, 'have to');
const myProcessingTasks = new AddListCard(inProcessing, 'processing');
const myDoneTasks = new AddListCard(isDoneTask, 'done');
myTasks.addList();
myProcessingTasks.addList();
myDoneTasks.addList();
let itemActiv = false;
let elemUnder;
let itemActivBound;
let shiftX;
// console.log(haveToDo);
// board.addEventListener('click', (e) => {

// })
const boardMouseOver = (e) => {
  if (!itemActiv) return;
  elemUnder = e.fromElement;
  itemActiv.style.top = `${e.pageY - itemActiv.offsetHeight / 2}px`;
  itemActiv.style.left = `${e.pageX - shiftX + itemActivBound.left}px`;
};
const boardMouseUp = () => {
  // console.log('UP')
  console.log(elemUnder);
  if (elemUnder === undefined) return;
  if (elemUnder.parentNode.classList.contains('list')) {
    elemUnder.parentNode.insertBefore(itemActiv, elemUnder);
  } else if (elemUnder.classList.contains('board')) {
    console.log('Ты на доске');
  } else {
    const activCont = elemUnder.closest('.container-for-card');
    const activList = activCont.querySelector('.list');
    activList.appendChild(itemActiv);
    // activList.parentNode.insertBefore(itemActiv, activList)
    // console.log(activList)
    // activList.insertAdjacentHTML('afterbegin',itemActiv.innerHTML)
    // const avticList = elemUnder.closest('.container');
  }

  // console.log(elemUnder.classList);

  itemActiv.classList.remove('dragger');
  // elemUnder.parentNode.insertBefore(itemActiv,elemUnder);
  itemActiv = undefined;
  elemUnder = undefined;
  document.documentElement.removeEventListener('mouseover', boardMouseOver);
  document.documentElement.removeEventListener('mouseup', boardMouseUp);
};

board.addEventListener('mousedown', (e) => {
  e.preventDefault();
  //   console.log('FFFF');
  itemActiv = e.target;
  console.log(itemActiv.classList.contains('item-list'));
  if (!itemActiv.classList.contains('item-list')) return;
  itemActivBound = e.target.getBoundingClientRect();
  shiftX = e.pageX;
  //   console.log(itemActivBound);

  itemActiv.classList.add('dragger');
  document.documentElement.addEventListener('mouseover', boardMouseOver);
  document.documentElement.addEventListener('mouseup', boardMouseUp);
});

window.addEventListener('beforeunload', () => {
  const myHaveTo = Array.from(haveToDo.querySelectorAll('.item-list'));
  const myInProsec = Array.from(inProcessing.querySelectorAll('.item-list'));
  const myDone = Array.from(isDoneTask.querySelectorAll('.item-list'));
  const myData = {};
  myHaveTo.forEach((el, i) => {
    myData[`${haveToDo.id}_${i}`] = el.textContent;
  });
  myInProsec.forEach((el, i) => {
    myData[`${inProcessing.id}_${i}`] = el.textContent;
  });
  myDone.forEach((el, i) => {
    myData[`${isDoneTask.id}_${i}`] = el.textContent;
  });
  localStorage.setItem('myBoard', JSON.stringify(myData));
});

document.addEventListener('DOMContentLoaded', () => {
  const json = localStorage.getItem('myBoard');
  let myBoard;
  try {
    myBoard = JSON.parse(json);
  } catch (error) {
    console.log(error);
  }
  if (myBoard) {
    let insertList;
    console.log(myBoard);
    Object.keys(myBoard).forEach((key) => {
      if (key.includes(haveToDo.id)) {
        insertList = haveToDo.querySelector('.list');
        insertList.insertAdjacentHTML('beforeend', myTasks.newItem(myBoard[key]));
        console.log(myBoard[key]);
        itemActiv = undefined;
      } else if (key.includes(inProcessing.id)) {
        insertList = inProcessing.querySelector('.list');
        insertList.insertAdjacentHTML('beforeend', myProcessingTasks.newItem(myBoard[key]));

        itemActiv = undefined;
      } else if (key.includes(isDoneTask.id)) {
        insertList = isDoneTask.querySelector('.list');
        insertList.insertAdjacentHTML('beforeend', myDoneTasks.newItem(myBoard[key]));

        itemActiv = undefined;
      }
    });
  }
});

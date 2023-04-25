export default class AddListCard {
  constructor(parentEl, title) {
    this.parentEl = parentEl;
    this.title = title;
    this.actualItem = false;
    this.addItem = false;
    this.clikcBtn = this.clikcBtn.bind(this);
    this.mouseDownOnList = this.mouseDownOnList.bind(this);
    this.mouseUpOnList = this.mouseUpOnList.bind(this);
    this.mouseOverItem = this.mouseOverItem.bind(this);
    this.mouseOutItem = this.mouseOutItem.bind(this);
    // this.newItem = this.newItem.bind(this);
  }

  static get getHtlm() {
    return `
        <div class="container-for-card">
            <div class="title">
            Title
            </div>
            <div class="container-for-list">
            <ul class="list">
                
          
               

            </ul>    
            </div>
            
            <button class='btn-add-task'>
            ADD another card
            </button>
            </div>
        </div>     
        `;
  }

  static get getTitle() {
    return '.title';
  }

  static get getbtn() {
    return '.btn-add-task';
  }

  static get getList() {
    return '.list';
  }

  static get addItem() {
    return `<li class='item-list'>
    <button class='delete-item'></button> </li>
            `;
  }

  static get getItem() {
    return 'item-list';
  }

  static get getActive() {
    return '.dragger';
  }

  static newItem(textItem) {
    return `<li class='item-list'>${textItem}
      <button class='delete-item'></button> </li>
              `;
  }

  addList() {
    this.parentEl.insertAdjacentHTML('beforeend', AddListCard.getHtlm);
    this.contain = this.parentEl.querySelector('.container-for-card');
    this.listCards = this.parentEl.querySelector(AddListCard.getList);
    this.titleList = this.parentEl.querySelector(AddListCard.getTitle);
    this.titleList.textContent = this.title;
    this.btnAdd = this.contain.querySelector(AddListCard.getbtn);
    this.btnAdd.addEventListener('click', this.clikcBtn);
    this.listCards.addEventListener('mouseover', this.mouseOverItem);
    this.listCards.addEventListener('mouseout', this.mouseOutItem);
    this.listCards.addEventListener('mousedown', this.mouseDownOnList);
    this.listCards.addEventListener('mouseup', this.mouseUpOnList);
  }

  clikcBtn(e) {
    e.stopPropagation();

    // console.log(this.addItem);

    const activeContainer = e.target.closest('.container');
    const btn = activeContainer.querySelector(AddListCard.getbtn);
    const changeList = activeContainer.querySelector(AddListCard.getList);
    if (!this.addItem) {
      btn.classList.add('active');
      // const activeList = activeContainer.querySelector(AddListCard.getList);
      // activeList.insertAdjacentHTML('beforeend',AddListCard.addItem);

      // const newItem = document.createElement('INPUT');
      // newItem.classList.add('item-list')
      // newItem.setAttribute('type','text')
      // activeList.insertAdjacentHTML('beforeend',newItem.outerHTML);

      const inputItem = document.createElement('INPUT');
      inputItem.classList.add('item-list');
      inputItem.setAttribute('type', 'text');
      // changeList.parentNode.insertBefore(newItem,changeList)
      changeList.insertBefore(inputItem, changeList.lastaChild);
      inputItem.focus();
      this.addItem = true;
      this.actualItem = activeContainer.querySelector('input');
    } else {
      // console.log('FORM IS NOT FULLED');

      if (!this.actualItem.value) return;
      const newItem = document.createElement('LI');
      const newBtnDel = document.createElement('BUTTON');

      // newBtnDel.textContent = 'X';
      newBtnDel.classList.add('delete-item');
      // console.log(newBtnDel);
      newItem.textContent = this.actualItem.value;
      newItem.classList.add('item-list');
      newItem.insertBefore(newBtnDel, newItem.lastaChild);
      changeList.insertBefore(newItem, changeList.lastaChild);

      btn.classList.remove('active');
      this.actualItem.remove();
      this.actualItem = undefined;
      this.addItem = false;

      // activeList.insertAdjacentHTML('beforeend',newItem_.outerHTML)
      // newItem.innerHTML = this.actualItem.innerHTML;
      // this.actualItem.replaceChild(newItem,this.actualItem)
      // this.actualItem = undefined;
      // this.addItem = false;
    }
  }

  mouseOutItem() {
    // e.stopPropagation()
    if (this.addItem) return;
    // console.log('OUT-ITem');
    this.actualItem.classList.remove('active');
  }

  mouseOverItem(e) {
    // e.stopPropagation();
    if (this.addItem) return;
    if (!e.target.classList.contains('item-list')) return;
    this.actualItem = e.target;
    e.target.classList.add('active');
  }

  mouseDownOnList(e) {
    // e.stopPropagation();
    if (e.target.classList.contains('delete-item')) {
      // console.log('del');
      e.target.closest('.item-list').remove();
    }
    if (e.target.classList.contains('list')) return;
    this.actualItem = e.target;
    // console.log("mouseDown");
    this.actualItem.classList.remove('active');
    this.listCards.removeEventListener('mouseout', this.mouseOutItem);
    this.listCards.removeEventListener('mouseover', this.mouseOverItem);

    // console.log('mouseDown');
  }

  mouseUpOnList() {
    // e.stopPropagation();
    // console.log('UP');
    this.listCards.addEventListener('mouseout', this.mouseOutItem);
    this.listCards.addEventListener('mouseover', this.mouseOverItem);
  }
}

'use strict';

// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
//
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.
const STORE = {
  items: [{
    name: 'apples',
    checked: true,
    isEditing: false
  },
  {
    name: 'oranges',
    checked: false,
    isEditing: false
  },
  {
    name: 'milk',
    checked: true,
    isEditing: false
  },
  {
    name: 'bread',
    checked: false,
    isEditing: false
  }
  ],
  searchTerm: null,
  hiddenSwitch: false

};

function renderShoppingList() {
  // this function will be repsonsible for rendering the shopping list in
  // the DOM
  const itemLists = STORE.items.map((item, index) => {
    return generateItem(item, index);
  });
  $('ul.shopping-list').html(itemLists);
  console.log('render');
  handleRenameStart();
  handleRenameSubmit();
  handleRenameCancel();
}
/**
 * 
 * @param {object} item 
 * @param {number} index 
 * @return {string} html
 */
function generateItem(item, index) {
  //Get item from STORE
  //Generate <li>
  const newTemp = generateDynamicHtml(item);
  return (
    `<li id='${index}'>
          ${newTemp}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-edit">
            <span class="button-label">edit</span>
          </button>
          <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
        </div>
      </li>`
  );
}

/**
 * 
 * @param {object} item
 * @return {string} html 
 */
function generateDynamicHtml(item) {
  const itemClassCheck = item.checked ? 'shopping-item__checked' : ' ';
  const newItem = item.name;
  if (item.isEditing) {
    return ` <form id = "formNewName">
    <input id = "newName" placeholder = "Rename item" autofocus></input>
    <button type="submit">Ok</button>
    <button type="button" id ="cancel">Cancel</button>
    </form>`;
  }
  return `<span class="shopping-item ${itemClassCheck}">${newItem}</span>`;
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  //fetch data from input
  //store into our STORE object
  //re-render DOM
  $('#js-shopping-list-form').submit(e => {
    e.preventDefault();
    const newItem = {};
    newItem.name = $('.js-shopping-list-entry').val();
    newItem.checked = false;
    STORE.item.push(newItem);
    renderShoppingList();

  });
  console.log('handle newinput');
}


function handleItemCheckClicked() {
  // this function will be reponsible for when users click the "check" button on
  // a shopping list item.
  $('ul.js-shopping-list').on('click', '.shopping-item-toggle', e => {
    const myId = $(e.currentTarget).closest('li').attr('id');
    STORE.items[myId].checked = STORE.items[myId].checked === true ? false : true;
    renderShoppingList();
  });

  console.log('`handleItemCheckClicked` ran');
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  // remove item from STORE using index
  // re - render

  $('ul.js-shopping-list').on('click', '.shopping-item-delete', e => {
    const myId = $(e.currentTarget).closest('li').attr('id');
    STORE.items.splice(myId, 1);
    renderShoppingList();
    console.log('completed delete');
  });
  console.log('handle delete');
}

function handleRenameStart() {
  $('.shopping-item-edit').on('click', e => {
    const myId = $(e.target).closest('li').attr('id');
    STORE.items[myId].isEditing = true;
    renderShoppingList();
    //handleRenameSubmit();
  });
}

function handleRenameSubmit() {
  //listern to newName submitssion
  // make change to STORE data
  //re-render
  $('#formNewName').submit(event => {
    event.preventDefault();
    const newItemName = $('#newName').val();
    const myId = $(event.target).closest('li').attr('id');
    STORE.items[myId].name = newItemName;
    STORE.items[myId].isEditing = false;
    renderShoppingList();
    console.log('called handle rename submit');
  });
  
  
}

function handleRenameCancel() {
  $('#formNewName').on('click', '#cancel', e => {
    const myId = $(event.target).closest('li').attr('id');
    STORE.items[myId].isEditing = false;
    renderShoppingList();
  });
  
}
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleRenameStart();
  handleRenameCancel();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
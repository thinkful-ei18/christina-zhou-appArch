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
const STORE = [{
    name: "apples",
    checked: true
  },
  {
    name: "oranges",
    checked: false
  },
  {
    name: "milk",
    checked: true
  },
  {
    name: "bread",
    checked: false
  }
];
function renderShoppingList() {
  // this function will be repsonsible for rendering the shopping list in
  // the DOM
  const itemLists = STORE.map((item, index) => {
    return generateItem(item, index);
  });
  $('ul.shopping-list').html(itemLists);
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
  const itemClassCheck = item.checked ? 'shopping-item__checked' : ' ';
  const newItem = item.name;
  return `
    <li id='${index}'>
      <span class="shopping-item ${itemClassCheck}">${newItem}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  //fetch data from input
  //store into our STORE object
  //re-render DOM
  $("#js-shopping-list-form").submit(e => {
    e.preventDefault()
    const newItem = {}
    newItem.name = $(".js-shopping-list-entry").val()
    newItem.checked = false
    STORE.push(newItem)
    renderShoppingList();

  })
  console.log(`handle newinput`);
}


function handleItemCheckClicked() {
  // this function will be reponsible for when users click the "check" button on
  // a shopping list item.
  $('ul.js-shopping-list').on('click','.shopping-item-toggle', e=> {
    const myId = $(e.currentTarget).closest('li').attr('id')
    STORE[myId].checked = STORE[myId].checked === true? false : true
    renderShoppingList()
  })
  
  console.log('`handleItemCheckClicked` ran');
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  // remove item from STORE using index
  // re - render

$('ul.js-shopping-list').on('click', '.shopping-item-delete', e => {
  const myId = $(e.currentTarget).closest('li').attr('id');
  STORE.splice(myId, 1);
  renderShoppingList()
  console.log('completed delete');
})
  console.log('handle delete');
}

function editItemName () {
  const editText = $('<input id = "newName" placeholder = "Rename item" autofocus></input>');
  $('.shopping-item').on('click', e => {
    $(e.currentTarget).replaceWith(editText);
    $('#newName').keydown( e => {
      if (e.keyCode === 13) {
        replaceItemName();
      }
    })
    console.log('edited name');
  })
}

function replaceItemName () {
  //grab new name
  //change back to span
  //replace name in object
  //refresh
  const newItemName = $('#newName').val();
  $('#newName').replaceWith(`<span class="shopping-item">${newItemName}</span>`);
  console.log('replaced name');
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
  editItemName();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
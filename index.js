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
  const itemClassCheck = item.checked ? 'shopping-item__checked' : '';
  const newItem = item.name;
  return `
    <li data-index = '${index}'>
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
  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
  // this function will be reponsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran')
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

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
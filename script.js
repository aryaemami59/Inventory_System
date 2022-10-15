const inputText = document.querySelector("#text");
const generateButton = document.querySelector("#generate");
const countInput = document.querySelector("#count");
const itemNameInput = document.querySelector(".item-name");
const container = document.querySelector(".container");
const list = document.querySelector(".list");
const removeAll = document.querySelector("#remove-all");
let itemsArr = [];

class ListItem {
  constructor(itemNumber, count, itemName) {
    this.itemNumber = itemNumber;
    this.count = count;
    this.itemName = itemName;
    this.addItem();
  }

  createBarcode() {
    const { itemNumber } = this;
    const barcode = document.createElement("img");
    JsBarcode(barcode, itemNumber, {
      text: itemNumber,
      width: 1,
    });
    barcode.classList.add("barcode");
    this.barcode = barcode;
  }

  createCountField() {
    const countField = document.createElement("input");
    countField.setAttribute("id", "count-container");
    countField.setAttribute("type", "number");
    countField.setAttribute("min", "0");
    countField.setAttribute("max", "9999");
    countField.setAttribute("maxlength", "4");
    countField.setAttribute("size", "4");
    countField.classList.add("form-control", "count-container");
    countField.value = this.count || 0;
    countField.onclick = () => countField.select();
    countField.addEventListener("keydown", () => {
      if (event.which === 13) {
        this.count = countField.value;
        countField.blur();
      }
    });
    this.countField = countField;
  }

  createDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "delete-button",
      "btn",
      "btn-close",
      "btn-close-white",
      "btn-sm"
    );
    deleteButton.setAttribute("aria-label", "Close");
    deleteButton.setAttribute("type", "button");
    deleteButton.addEventListener("click", () => {
      this.li.remove();
      itemsArr = itemsArr.filter(e => e !== this);
    });
    this.deleteButton = deleteButton;
  }

  createEditItemNameField() {
    const editItemName = document.createElement("input");
    editItemName.setAttribute("type", "text");
    editItemName.setAttribute("id", "edit-name");
    editItemName.classList.add("form-control", "edit-name");
    editItemName.value = this.itemName;
    editItemName.addEventListener("click", () => editItemName.select());
    editItemName.addEventListener("keydown", () => {
      if (event.which === 13) {
        this.itemName = editItemName.value;
        editItemName.blur();
      }
    });
    this.editItemName = editItemName;
  }

  resetInputValues() {
    inputText.value = "";
    countInput.value = "";
    itemNameInput.value = "";
  }

  addItem() {
    this.createBarcode();
    this.createCountField();
    this.createDeleteButton();
    this.createEditItemNameField();
    const li = document.createElement("li");
    const inputContainerCol = document.createElement("div");
    console.log(
      "🚀 ~ file: script.js ~ line 124 ~ ListItem ~ addItem ~ inputContainerCol",
      inputContainerCol
    );
    inputContainerCol.classList.add("input-container-column");
    const editItemNameDiv = document.createElement("div");
    editItemNameDiv.classList.add(
      "input-group",
      "input-group-lg",
      "input-container-name"
    );
    const editItemNameSpan = document.createElement("span");
    editItemNameSpan.classList.add("input-group-text");
    editItemNameSpan.textContent = "Item Name: ";
    const countFieldSpan = document.createElement("span");
    countFieldSpan.classList.add("input-group-text");
    countFieldSpan.textContent = "Item Count: ";
    editItemNameDiv.append(editItemNameSpan, this.editItemName);
    const countFieldDiv = document.createElement("div");
    countFieldDiv.classList.add(
      "input-group",
      "input-group-lg",
      "input-container-count"
    );
    countFieldDiv.append(countFieldSpan, this.countField);
    inputContainerCol.append(this.deleteButton, editItemNameDiv, countFieldDiv);
    li.append(this.barcode, inputContainerCol);
    this.li = li;
    li.listItem = this;
    list.appendChild(li);
    this.resetInputValues();
    inputText.focus();
  }
}

generateButton.addEventListener("click", clickHandler);

inputText.addEventListener("keydown", () => {
  event.which === 13 && clickHandler();
});

countInput.addEventListener("keydown", () => {
  event.which === 13 && clickHandler();
});

itemNameInput.addEventListener("keydown", () => {
  event.which === 13 && clickHandler();
});

removeAll.addEventListener("click", () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
});

function clickHandler() {
  const { value } = inputText;
  const itemNumbersArr = itemsArr.map(({ itemNumber }) => itemNumber);
  if (!value || itemNumbersArr.includes(value)) return;
  const item = new ListItem(value, countInput.value, itemNameInput.value);
  itemsArr.push(item);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = `${this.scrollHeight}px`;
}

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
			// height: 100,
		});
		barcode.classList.add(
			"barcode"
			// "p-0",
			// "col-auto",
			// "col-xl-auto",
			// "col-xxl-auto",
			// "col-lg-auto",
			// "col-md-auto",
			// "col-sm-auto",
			// "col-auto",
			// "mw-75"
		);
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
		// countField.classList.add("col-1", "col-sm-1", "col-md-1", "col-lg-1", "col-xl-1", "col-xxl-1", "p-0");
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
		// deleteButton.textContent = "X";
		deleteButton.classList.add("delete-button", "btn", "btn-close", "btn-close-white", "btn-sm");
		deleteButton.setAttribute("aria-label", "Close");
		deleteButton.setAttribute("type", "button");
		deleteButton.addEventListener("click", () => {
			this.li.remove();
			itemsArr = itemsArr.filter(e => e !== this);
			// console.log(itemsArr);
		});
		this.deleteButton = deleteButton;
	}

	createEditItemNameField() {
		const editItemName = document.createElement("input");
		// const editItemName = document.createElement("textarea");
		editItemName.setAttribute("type", "text");
		// editItemName.setAttribute("size", "15");
		editItemName.setAttribute("id", "edit-name");
		// editItemName.setAttribute("id", "edit-name");
		editItemName.classList.add("form-control", "edit-name");
		// editItemName.setAttribute("style", "height:" + editItemName.scrollHeight + "px;overflow-y:hidden;");
		// editItemName.addEventListener("input", OnInput, false);
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
		// const bigContainer = document.createElement("div");
		// bigContainer.classList.add("big-container", "form-group", "col-6");
		// bigContainer.append(this.deleteButton, this.countField);
		const li = document.createElement("li");
		// const firstRow = document.createElement("div");
		// const secondRow = document.createElement("div");
		// firstRow.classList.add("row", "col-12");
		// secondRow.classList.add("row", "col-12", "second-row");
		// firstRow.append(this.editItemName, this.deleteButton);
		// secondRow.append(this.barcode, this.countField);
		// li.append(firstRow, secondRow);
		// const liContainer = document.createElement("span");
		// liContainer.classList.add("li-container")
		// liContainer.append(this.barcode, this.editItemName, this.deleteButton, this.countField);
		// li.appendChild(liContainer);
		const inputContainerCol = document.createElement("div");
		inputContainerCol.classList.add("input-container-column");
		const editItemNameDiv = document.createElement("div");
		editItemNameDiv.classList.add("input-group", "input-group-lg", "input-container-name");
		const editItemNameSpan = document.createElement("span");
		editItemNameSpan.classList.add("input-group-text");
		editItemNameSpan.textContent = "Item Name: ";
		const countFieldSpan = document.createElement("span");
		countFieldSpan.classList.add("input-group-text");
		countFieldSpan.textContent = "Item Count: ";
		editItemNameDiv.append(editItemNameSpan, this.editItemName);
		const countFieldDiv = document.createElement("div");
		countFieldDiv.classList.add("input-group", "input-group-lg", "input-container-count");
		countFieldDiv.append(countFieldSpan, this.countField);
		inputContainerCol.append(this.deleteButton, editItemNameDiv, countFieldDiv);
		li.append(this.barcode, inputContainerCol);
		// li.append(this.barcode, this.editItemName, this.deleteButton, this.countField);
		// li.classList.add("row", "row-cols-auto", "col-8");
		// li.classList.add("col-12");
		this.li = li;
		li.listItem = this;
		// li.append(this.editItemName, this.barcode);
		// li.appendChild(bigContainer);
		list.appendChild(li);
		this.resetInputValues();
		inputText.focus();
		// this.editItemName.style.width = window.getComputedStyle(this.barcode).width;
		// this.editItemName.style.width = this.barcode.offsetWidth
		// this.editItemName.style.width = this.editItemName.value.length;
		// console.log(window.getComputedStyle(this.barcode).width);
		// window.addEventListener(
		// 	"resize",
		// 	() => (this.editItemName.style.width = window.getComputedStyle(this.barcode).width)
		// );
		// setTimeout(() => {
		// 	this.editItemName.style.width = window.getComputedStyle(this.barcode).width;
		// }, 0.1);
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
	this.style.height = this.scrollHeight + "px";
}

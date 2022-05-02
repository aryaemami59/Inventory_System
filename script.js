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
		this.createBarcode();
		this.addItem();
	}

	createBarcode() {
		const { itemNumber } = this;
		const barcode = document.createElement("img");
		JsBarcode(barcode, itemNumber, { text: itemNumber, height: 60 });
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
		countField.classList.add("form-control", "count-container");
		countField.value = this.count;
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
		deleteButton.textContent = "X";
		deleteButton.classList.add("delete-button", "btn", "btn-danger", "btn-sm");
		deleteButton.addEventListener("click", () => {
			this.li.remove();
			itemsArr = itemsArr.filter(e => e !== this);
			console.log(itemsArr);
		});
		this.deleteButton = deleteButton;
	}

	createEditItemNameField() {
		const editItemName = document.createElement("input");
		editItemName.setAttribute("type", "text");
		editItemName.setAttribute("id", "edit-name");
		editItemName.classList.add("form-control", "edit-name");
		editItemName.value = this.itemName;
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
		countInput.value = "0";
		itemNameInput.value = "";
	}

	addItem() {
		this.createCountField();
		this.createDeleteButton();
		this.createEditItemNameField();
		const bigContainer = document.createElement("div");
		bigContainer.classList.add("big-container", "form-group");
		bigContainer.append(this.deleteButton, this.countField);
		const li = document.createElement("li");
		this.li = li;
		li.listItem = this;
		li.append(this.editItemName, this.barcode);
		li.appendChild(bigContainer);
		list.appendChild(li);
		this.resetInputValues();
		inputText.focus();
		setTimeout(() => {
			this.editItemName.style.width = `${this.barcode.offsetWidth}px`;
		}, 0.1);
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
	if (!value || itemsArr.includes(value)) return;
	const item = new ListItem(value, countInput.value, itemNameInput.value);
	itemsArr.push(item);
}

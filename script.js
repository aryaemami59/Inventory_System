const inputText = document.querySelector("#text");
const generetaeButton = document.querySelector("#generate");
const countInput = document.querySelector("#count");
const itemNameInput = document.querySelector(".item-name");
const container = document.querySelector(".container");
const list = document.querySelector(".list");
const removeAll = document.querySelector("#remove-all");
const itemsArr = [];
function clickHandler() {
	const { value } = inputText;
	if (!value || itemsArr.includes(value)) return;
	const li = document.createElement("li");
	const barcode = document.createElement("img");
	const countValue = countInput.value;
	const countContainer = document.createElement("input");
	const editItemName = document.createElement("input");
	const editButton = document.createElement("button");
	editButton.classList.add("btn", "btn-info");
	editItemName.setAttribute("type", "text");
	editItemName.setAttribute("id", "edit-name");
	editItemName.classList.add("form-control", "edit-name");
	countContainer.setAttribute("id", "count-container");
	countContainer.value = "0";
	countContainer.setAttribute("type", "number");
	countContainer.setAttribute("min", "0");
	countContainer.setAttribute("max", "9999");
	countContainer.setAttribute("maxlength", "4");
	const bigContainer = document.createElement("div");
	countContainer.classList.add("form-control", "count-container");
	countContainer.onclick = () => countContainer.select();
	bigContainer.classList.add("big-container", "form-group");
	countContainer.value = countValue;
	JsBarcode(barcode, value, { text: value, height: 60 });
	barcode.classList.add("barcode");
	li.append(editItemName, barcode);
	list.appendChild(li);
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "X";
	deleteButton.classList.add("delete-button", "btn", "btn-danger", "btn-sm");
	bigContainer.append(deleteButton, countContainer);
	li.appendChild(bigContainer);
	itemsArr.push(value);
	editItemName.value = itemNameInput.value;
	deleteButton.onclick = () => event.target.parentNode.parentNode.remove();
	inputText.value = "";
	countInput.value = "0";
	itemNameInput.value = "";
	inputText.focus();
	setTimeout(() => {
		editItemName.style.width = `${barcode.offsetWidth}px`;
	}, 0.1);
}
generetaeButton.addEventListener("click", clickHandler1);
inputText.addEventListener("keydown", () => {
	event.which === 13 && clickHandler1();
});
// generetaeButton.addEventListener("click", clickHandler);
// inputText.addEventListener("keydown", () => {
// 	event.which === 13 && clickHandler();
// });
countInput.addEventListener("keydown", () => {
	event.which === 13 && clickHandler1();
});
itemNameInput.addEventListener("keydown", () => {
	event.which === 13 && clickHandler1();
});
// countInput.addEventListener("keydown", () => {
// 	event.which === 13 && clickHandler();
// });
// itemNameInput.addEventListener("keydown", () => {
// 	event.which === 13 && clickHandler();
// });
removeAll.addEventListener("click", () => {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
});

class ListItem {
	constructor(itemNumber, count, itemName) {
		this.itemNumber = itemNumber;
		this.count = count;
		this.itemName = itemName;
		itemsArr.push(this);
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
		// countField.value = "0";
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
		// countField.onchange = () => (this.count = countField.value);
		this.countField = countField;
	}

	createDeleteButton() {
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "X";
		deleteButton.classList.add("delete-button", "btn", "btn-danger", "btn-sm");
		deleteButton.onclick = () => event.target.parentNode.parentNode.remove();
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

	addItem() {
		// const countField = document.createElement("input");
		// countField.setAttribute("id", "count-container");
		// countField.value = "0";
		// countField.setAttribute("type", "number");
		// countField.setAttribute("min", "0");
		// countField.setAttribute("max", "9999");
		// countField.setAttribute("maxlength", "4");
		this.createCountField();
		this.createDeleteButton();
		this.createEditItemNameField();
		// const deleteButton = document.createElement("button");
		// deleteButton.textContent = "X";
		// deleteButton.classList.add("delete-button", "btn", "btn-danger", "btn-sm");
		// deleteButton.onclick = () => event.target.parentNode.parentNode.remove();
		// countField.classList.add("form-control", "count-container");
		// countField.onclick = () => countField.select();
		const bigContainer = document.createElement("div");
		bigContainer.classList.add("big-container", "form-group");
		bigContainer.append(this.deleteButton, this.countField);
		// const editItemName = document.createElement("input");
		// editItemName.setAttribute("type", "text");
		// editItemName.setAttribute("id", "edit-name");
		// editItemName.classList.add("form-control", "edit-name");
		const li = document.createElement("li");
		li.append(this.editItemName, this.barcode);
		li.appendChild(bigContainer);
		list.appendChild(li);
		inputText.value = "";
		countInput.value = "0";
		itemNameInput.value = "";
		inputText.focus();
		setTimeout(() => {
			this.editItemName.style.width = `${this.barcode.offsetWidth}px`;
		}, 0.1);
	}
}

function clickHandler1() {
	const { value } = inputText;
	if (!value || itemsArr.includes(value)) return;
	const item = new ListItem(value, countInput.value, itemNameInput.value);
	console.log(item);
	// const li = document.createElement("li");
	// const barcode = document.createElement("img");
	// const countValue = countInput.value;
	// const countContainer = document.createElement("input");
	// const editItemName = document.createElement("input");
	// const editButton = document.createElement("button");
}

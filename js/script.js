let idProduct = document.getElementById("index");
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

//initial mood of app
let mood = "create";

//Helping global variable
let temp;

// console.log(title, price, taxes, ads, discount, total, count, category, submit);

// Function get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "0000";
    total.style.background = "#870404";
  }
}

// Function Create Data and save items at localStorage
//main array of objects
let productData;
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}
submit.onclick = function createProData() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && newProduct.count < 501) {
    if (mood === "create") {
      if (count.value > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productData.push(newProduct);
        }
      } else {
        productData.push(newProduct);
      }
    } else {
      productData[temp] = newProduct;
      mood = "create";
      submit.innerHTML = mood;
    }
    clearInputs();
  } else {
  }

  //save items at localStorage
  localStorage.setItem("product", JSON.stringify(productData));

  // clearInputs();
  showData();

  // x.innerHTML = JSON.stringify(productData);
};

//clear inputs
function clearInputs() {
  idProduct.value = "";
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "......";
  total.style.background = "#870404";
  count.value = "";
  category.value = "";
}

//out put

//read Data
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
    <tr>
      <td>${[i + 1]}</td>
      <td>${productData[i].title}</td>
      <td>${productData[i].price}</td>
      <td>${productData[i].taxes}</td>
      <td>${productData[i].ads}</td>
      <td>${productData[i].discount}</td>
      <td>${productData[i].total}</td>
      <td>${productData[i].category}</td>
      <td><button onclick='updateData(${i})' id="update">update</button></td>
      <td><button onclick='deleteProduct(${i})' id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDeleteAll = document.getElementById("deleteAll");
  if (productData.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick='deleteAll()' id="delete">Delete All (${productData.length})</button`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

// Delete one product
function deleteProduct(i) {
  console.log(i);
  productData.splice(i, 1);
  localStorage.product = JSON.stringify(productData);
  showData();
}

// Delete all products
function deleteAll() {
  localStorage.clear();
  productData.splice(0);
  showData();
}

//count

//update
function updateData(i) {
  idProduct.style.visibility = "visible";
  idProduct.value = `ID : ${i + 1}`;
  title.value = productData[i].title;
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  getTotal();

  category.value = productData[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//initial mood to search in app
let searchMood = "title";

//Function search
function getSearchMood(id) {
  let searchInput = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    searchInput.placeholder = "Search in Title";
  } else {
    searchMood = "category";
    searchInput.placeholder = "Search in Category";
  }
  searchInput.focus();
  searchInput.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${[i + 1]}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick='deleteProduct(${i})' id="delete">delete</button></td>
          </tr>
          `;
      }
    }
  } else {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${[i + 1]}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick='deleteProduct(${i})' id="delete">delete</button></td>
          </tr>
          `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

const API = "http://localhost:5000/api/products";

function loadProducts() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#productTable tbody");
      tbody.innerHTML = "";
      data.forEach(p => {
        tbody.innerHTML += `
          <tr>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td>
              <button onclick="deleteProduct('${p._id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, stock }),
  }).then(loadProducts);
}

function deleteProduct(id) {
  fetch(`${API}/${id}`, { method: "DELETE" }).then(loadProducts);
}

loadProducts();

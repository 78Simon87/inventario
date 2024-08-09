document.addEventListener('DOMContentLoaded', () => {
    const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    const addProductBtn = document.getElementById('addProductBtn');
    const productForm = document.getElementById('productForm');
    const saveProductBtn = document.getElementById('saveProductBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    let editingIndex = -1;
    let products = JSON.parse(localStorage.getItem('products')) || []; // Recuperar productos de localStorage

    // Función para actualizar la tabla de inventario
    function updateTable() {
        inventoryTable.innerHTML = '';
        products.forEach((product, index) => {
            const row = inventoryTable.insertRow();
            row.insertCell().textContent = product.code;
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = product.description;
            row.insertCell().textContent = `$${product.price.toFixed(2)}`;
            row.insertCell().textContent = product.quantity;
            const actionsCell = row.insertCell();
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => editProduct(index));
            actionsCell.appendChild(editBtn);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', () => deleteProduct(index));
            actionsCell.appendChild(deleteBtn);
        });
    }

    // Función para mostrar el formulario
    function showForm() {
        productForm.style.display = 'block';
    }

    // Función para ocultar el formulario
    function hideForm() {
        productForm.style.display = 'none';
    }

    // Función para agregar o editar un producto
    function saveProduct() {
        const code = document.getElementById('code').value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const quantity = parseInt(document.getElementById('quantity').value);

        if (editingIndex > -1) {
            products[editingIndex] = { code, name, description, price, quantity };
        } else {
            products.push({ code, name, description, price, quantity });
        }

        localStorage.setItem('products', JSON.stringify(products)); // Guardar productos en localStorage
        updateTable();
        hideForm();
    }

    // Función para editar un producto
    function editProduct(index) {
        editingIndex = index;
        const product = products[index];
        document.getElementById('code').value = product.code;
        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description;
        document.getElementById('price').value = product.price;
        document.getElementById('quantity').value = product.quantity;
        showForm();
    }

    // Función para eliminar un producto
    function deleteProduct(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products)); // Actualizar localStorage
        updateTable();
    }

    // Eventos
    addProductBtn.addEventListener('click', () => {
        editingIndex = -1;
        document.getElementById('code').value = '';
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';
        document.getElementById('quantity').value = '';
        showForm();
    });

    saveProductBtn.addEventListener('click', saveProduct);
    cancelBtn.addEventListener('click', hideForm);

    // Inicializar la tabla con los datos cargados
    updateTable();
});

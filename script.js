document.getElementById('addItem').addEventListener('click', () => {
    const table = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="itemDescription"></td>
        <td><input type="number" class="itemQuantity" value="1"></td>
        <td><input type="number" class="itemPrice" value="0.00"></td>
        <td class="itemTotal">0.00</td>
    `;
});

document.getElementById('generateInvoice').addEventListener('click', () => {
    const yourName = document.getElementById('yourName').value;
    const yourAddress = document.getElementById('yourAddress').value;
    const yourCity = document.getElementById('yourCity').value;
    const yourState = document.getElementById('yourState').value;
    const yourZip = document.getElementById('yourZip').value;
    
    const clientName = document.getElementById('clientName').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientCity = document.getElementById('clientCity').value;
    const clientState = document.getElementById('clientState').value;
    const clientZip = document.getElementById('clientZip').value;
    
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const dueDate = document.getElementById('dueDate').value;
    
    let items = '';
    let subtotal = 0;
    document.querySelectorAll('#itemsTable tbody tr').forEach(row => {
        const description = row.querySelector('.itemDescription').value;
        const quantity = parseFloat(row.querySelector('.itemQuantity').value);
        const price = parseFloat(row.querySelector('.itemPrice').value);
        const total = quantity * price;
        subtotal += total;
        items += `
            <tr>
                <td>${description}</td>
                <td>${quantity}</td>
                <td>${price.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
            </tr>
        `;
    });

    const sgst = parseFloat(document.getElementById('sgst').value) || 0;
    const cgst = parseFloat(document.getElementById('cgst').value) || 0;
    const cess = parseFloat(document.getElementById('cess').value) || 0;

    const sgstAmount = (sgst / 100) * subtotal;
    const cgstAmount = (cgst / 100) * subtotal;
    const cessAmount = (cess / 100) * subtotal;
    const totalTax = sgstAmount + cgstAmount + cessAmount;
    const totalAmount = subtotal + totalTax;
    
    const notes = document.getElementById('notes').value;
    
    document.getElementById('invoiceOutput').innerHTML = `
        <h2>Invoice</h2>
        <p><strong>From:</strong> ${yourName}, ${yourAddress}, ${yourCity}, ${yourState}, ${yourZip}</p>
        <p><strong>To:</strong> ${clientName}, ${clientAddress}, ${clientCity}, ${clientState}, ${clientZip}</p>
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <p><strong>Invoice Date:</strong> ${invoiceDate}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${items}
            </tbody>
        </table>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>SGST (${sgst}%):</strong> ${sgstAmount.toFixed(2)}</p>
        <p><strong>CGST (${cgst}%):</strong> ${cgstAmount.toFixed(2)}</p>
        <p><strong>CESS (${cess}%):</strong> ${cessAmount.toFixed(2)}</p>
        <p><strong>Total Tax:</strong> ${totalTax.toFixed(2)}</p>
        <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
        <p><strong>Notes:</strong> ${notes}</p>
    `;
});

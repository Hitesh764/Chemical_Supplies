const chemicals = [
    { id: 1, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 3172.15, packaging: "Bag", packSize: 48.22, unit: "kg", quantity: 100 },
    { id: 2, chemicalName: "Caustic Potash", vendor: "Formosa", density: 8435.37, viscosity: 0, packaging: "Barrel", packSize: 100.00, unit: "kg", quantity: 100 },
    { id: 3, chemicalName: "Dimethylaminopropylamine", vendor: "Sinopec", density: 1597.65, viscosity: 66.63, packaging: "Bag", packSize: 12.62, unit: "kg", quantity: 6495.18 },
    { id: 4, chemicalName: "Mono Ammonium Phosphate", vendor: "DowDuPont", density: 364.04, viscosity: 0, packaging: "Bag", packSize: 12.62, unit: "kg", quantity: 105 },
    { id: 5, chemicalName: "Ferric Nitrate", vendor: "Sinopec", density: 4535.26, viscosity: 0, packaging: "Bag", packSize: 14.90, unit: "kg", quantity: 105 },
    { id: 6, chemicalName: "n-Pentane", vendor: "LG Chem", density: 6495.18, viscosity: 66.63, packaging: "Barrel", packSize: 75.00, unit: "L", quantity: 8751.90 },
    { id: 7, chemicalName: "Glycol Ether PM", vendor: "Formosa", density: 5964.61, viscosity: 76.51, packaging: "Bag", packSize: 14.90, unit: "kg", quantity: 66.76 },
    { id: 8, chemicalName: "Benzene", vendor: "Sinopec", density: 8183.73, viscosity: 72.12, packaging: "Bag", packSize: 250.00, unit: "kg", quantity: 8749.54 },
    { id: 9, chemicalName: "Toluene", vendor: "LG Chem", density: 6272.34, viscosity: 72.12, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 6272.34 },
    { id: 10, chemicalName: "Methanol", vendor: "Formosa", density: 2527.39, viscosity: 48.23, packaging: "Bag", packSize: 12.60, unit: "kg", quantity: 125 },
    { id: 11, chemicalName: "Acetone", vendor: "DowDuPont", density: 1354.78, viscosity: 28.12, packaging: "Bag", packSize: 12.20, unit: "kg", quantity: 200 },
    { id: 12, chemicalName: "Ethanol", vendor: "Sinopec", density: 7534.22, viscosity: 82.34, packaging: "Barrel", packSize: 50.00, unit: "L", quantity: 150 },
    { id: 13, chemicalName: "Propylene Glycol", vendor: "LG Chem", density: 6234.77, viscosity: 73.12, packaging: "Bag", packSize: 60.23, unit: "kg", quantity: 125 },
    { id: 14, chemicalName: "Formaldehyde", vendor: "Sinopec", density: 3291.56, viscosity: 54.22, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 175 },
    { id: 15, chemicalName: "Sulfuric Acid", vendor: "DowDuPont", density: 6271.34, viscosity: 92.32, packaging: "Barrel", packSize: 80.00, unit: "L", quantity: 200 }
];

let selectedRowIndex = null;
let currentEditIndex = null;

window.onload = function() {
    populateTable();

    // Sort functionality
    window.sortTable = function(n) {
        const rows = Array.from(document.getElementById("tableBody").getElementsByTagName("tr"));
        const isAscending = document.getElementById("tableBody").getAttribute('data-order') === 'asc';

        rows.sort((a, b) => {
            let x = a.getElementsByTagName("td")[n].textContent;
            let y = b.getElementsByTagName("td")[n].textContent;
            return isAscending ? x.localeCompare(y) : y.localeCompare(x);
        });

        rows.forEach(row => document.getElementById("tableBody").appendChild(row));
        document.getElementById("tableBody").setAttribute('data-order', isAscending ? 'desc' : 'asc');
    };
};

// Populate the table
function populateTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
    chemicals.forEach((chemical, index) => {
        const row = document.createElement('tr');
        row.onclick = () => selectRow(index);
        row.innerHTML = `
            <td>${chemical.id}</td>
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.chemicalName}</td>
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.vendor}</td>
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.density}</td>
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.viscosity}</td>
            
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.packaging}</td>
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.packSize}</td>
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.unit}</td>
            <td class="editable-cell" onclick="openEditor(${index})">${chemical.quantity}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Add new row
function addRow() {
    const newId = chemicals.length + 1;
    chemicals.push({ id: newId, 
        chemicalName: "",
         vendor: "",
         density: 0, viscosity: 0,
          packaging: "", packSize: 0,
           unit: "", 
          quantity: 0 });
    populateTable();
}

// Move row up
function moveRowUp() {
    if (selectedRowIndex > 0) {
        [chemicals[selectedRowIndex], 
        chemicals[selectedRowIndex - 1]] = [chemicals[selectedRowIndex - 1], 
        chemicals[selectedRowIndex]];
        selectedRowIndex--;
        populateTable();
    }
}

// Move row down
function moveRowDown() {
    if (selectedRowIndex < chemicals.length - 1) {
        [chemicals[selectedRowIndex],
         chemicals[selectedRowIndex + 1]] = [chemicals[selectedRowIndex + 1], 
         chemicals[selectedRowIndex]];
        selectedRowIndex++;
        populateTable();
    }
}

// Delete selected row
function deleteRow() {
    if (selectedRowIndex !== null) {
        chemicals.splice(selectedRowIndex, 1);
        selectedRowIndex = null;
        populateTable();
    }
}

// Refresh the data
function refreshData() {
    populateTable();
}

function saveData() {
    // Show the modal
    var myModal = new bootstrap.Modal(document.getElementById('saveModal'), {
        backdrop: 'static',
        keyboard: false
    });
    myModal.show();

    document.getElementById('flashingDots').style.display = 'block';
    document.getElementById('successTick').style.display = 'none';
    document.getElementById('savingText').innerText = 'Saving Data...';

    setTimeout(() => {
        console.log("Saved Data");

        document.getElementById('flashingDots').style.display = 'none';
        document.getElementById('successTick').style.display = 'block';
        document.getElementById('savingText').innerText = 'Saved Successfully!';

        setTimeout(() => {
            myModal.hide();
        }, 2000); 
    }, 2000);
}





function selectRow(index) {
    selectedRowIndex = index;
    document.querySelectorAll("tr").forEach((row, i) => {
        row.classList.toggle("table-active", i === index + 1);
    });
}

// Open editor modal
function openEditor(index) {
    currentEditIndex = index;
    const chemical = chemicals[index];

    document.getElementById("editChemicalName").value = chemical.chemicalName;
    document.getElementById("editVendor").value = chemical.vendor;
    document.getElementById("editDensity").value = chemical.density;

    document.getElementById("editViscosity").value = chemical.viscosity;
    document.getElementById("editPackaging").value = chemical.packaging;

    document.getElementById("editPackSize").value = chemical.packSize;
    document.getElementById("editUnit").value = chemical.unit;
    document.getElementById("editQuantity").value = chemical.quantity;

    document.getElementById("editorModal").style.display = 'block';
    document.getElementById("overlay").style.display = 'block';
}

function saveEdit() {
    const editedChemical = {
        chemicalName: document.getElementById("editChemicalName").value,
        vendor: document.getElementById("editVendor").value,
        density: parseFloat(document.getElementById("editDensity").value),

        viscosity: parseFloat(document.getElementById("editViscosity").value),
        packaging: document.getElementById("editPackaging").value,
        packSize: parseFloat(document.getElementById("editPackSize").value),
        unit: document.getElementById("editUnit").value,
        quantity: parseFloat(document.getElementById("editQuantity").value),
    };
    
    chemicals[currentEditIndex] = { ...chemicals[currentEditIndex], ...editedChemical };
    closeEditor();
    populateTable();
}

function closeEditor() {
    document.getElementById("editorModal").style.display = 'none';
    document.getElementById("overlay").style.display = 'none';
}
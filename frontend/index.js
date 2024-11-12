import { backend } from "declarations/backend";

// Function to display a single taxpayer
function displayTaxpayer(taxpayer) {
    return `
        <div class="taxpayer-card">
            <p><strong>TID:</strong> ${taxpayer.tid}</p>
            <p><strong>Name:</strong> ${taxpayer.firstName} ${taxpayer.lastName}</p>
            <p><strong>Address:</strong> ${taxpayer.address}</p>
        </div>
    `;
}

// Function to refresh the taxpayers list
async function refreshTaxpayersList() {
    try {
        const taxpayers = await backend.getAllTaxPayers();
        const taxpayersList = document.getElementById('taxpayersList');
        taxpayersList.innerHTML = taxpayers.map(displayTaxpayer).join('');
    } catch (error) {
        console.error('Error fetching taxpayers:', error);
    }
}

// Add new taxpayer form handler
document.getElementById('addTaxPayerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    try {
        await backend.addTaxPayer(tid, firstName, lastName, address);
        e.target.reset();
        refreshTaxpayersList();
    } catch (error) {
        console.error('Error adding taxpayer:', error);
    }
});

// Search button handler
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTid = document.getElementById('searchTid').value;
    const searchResult = document.getElementById('searchResult');
    
    try {
        const taxpayer = await backend.searchByTID(searchTid);
        searchResult.style.display = 'block';
        
        if (taxpayer) {
            searchResult.innerHTML = displayTaxpayer(taxpayer);
        } else {
            searchResult.innerHTML = '<p>No taxpayer found with this TID.</p>';
        }
    } catch (error) {
        console.error('Error searching taxpayer:', error);
        searchResult.innerHTML = '<p>Error searching for taxpayer.</p>';
    }
});

// Initial load of taxpayers list
window.addEventListener('load', refreshTaxpayersList);

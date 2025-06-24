document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('tradeTable');
    const tbody = table.querySelector('tbody');

    const getTableData = () => {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        // Don't include the last (empty) row in the data to be saved.
        const rowsToSave = rows.slice(0, -1);

        return rowsToSave.map(row => {
            const action = row.querySelector('.action-btn.selected').textContent;
            const inputs = row.querySelectorAll('input[type="text"]');
            return {
                action,
                quantity: inputs[0].value,
                price: inputs[1].value,
                time: inputs[2].value,
                commission: inputs[3].value,
                pnl: inputs[4].value,
            };
        });
    };

    const updateUrl = () => {
        const data = getTableData();
        if (data.length > 0) {
            // Use btoa for simple base64 encoding.
            const base64Data = btoa(JSON.stringify(data));
            window.location.hash = base64Data;
        } else {
            // If no data, remove the hash from the URL.
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    };

    const addEventListenersToRow = (row) => {
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateUrl);
        });

        const actionButtons = row.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                actionButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');

                const isLastRow = row === tbody.lastElementChild;
                if (isLastRow) {
                    createRow(); // Add a new blank row for the next entry
                }

                updateUrl();
            });
        });
    };

    const getCurrentTime = () => {
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
        const day = now.getDate();
        const time = now.toTimeString().split(' ')[0];
        return `${month} ${day} ${time}`;
    };

    const createRow = (data = {}) => {
        const newRow = document.createElement('tr');
        const botSelected = data.action === 'BOT' || !data.action ? 'selected' : '';
        const sldSelected = data.action === 'SLD' ? 'selected' : '';
        const timeValue = data.time || getCurrentTime();

        newRow.innerHTML = `
            <td>
                <button class="action-btn bot ${botSelected}">BOT</button>
                <button class="action-btn sld ${sldSelected}">SLD</button>
            </td>
            <td><input type="text" placeholder="100" value="${data.quantity || ''}"></td>
            <td><input type="text" placeholder="123.45" value="${data.price || ''}"></td>
            <td>USD</td>
            <td><input type="text" value="${timeValue}"></td>
            <td><input type="text" placeholder="1.25" value="${data.commission || ''}"></td>
            <td><input type="text" placeholder="50.00" value="${data.pnl || ''}"></td>
        `;
        tbody.appendChild(newRow);
        addEventListenersToRow(newRow);
    };

    const loadFromUrl = () => {
        try {
            const hash = window.location.hash.substring(1);
            if (hash) {
                // Use atob for simple base64 decoding.
                const decodedData = JSON.parse(atob(hash));
                if (Array.isArray(decodedData) && decodedData.length > 0) {
                    tbody.innerHTML = ''; // Clear the initial row from HTML
                    decodedData.forEach(rowData => createRow(rowData));
                    return true; // Indicate that data was loaded.
                }
            }
        } catch (e) {
            console.error("Failed to load or parse data from URL hash.", e);
        }
        return false; // No data loaded.
    };

    // --- Initial Page Load ---
    const dataLoaded = loadFromUrl();
    if (!dataLoaded) {
        // If no data from URL, clear the default HTML and start with one fresh row.
        tbody.innerHTML = '';
    }
    // Always ensure there is one empty row at the end for new entries.
    createRow();
});
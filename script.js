document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('tradeTable');
    const tbody = table.querySelector('tbody');

    const createNewRow = () => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <button class="action-btn bot selected">BOT</button>
                <button class="action-btn sld">SLD</button>
            </td>
            <td><input type="text" placeholder="100"></td>
            <td><input type="text" placeholder="123.45"></td>
            <td>USD</td>
            <td><input type="text" placeholder="JUN 24 21:06:50"></td>
            <td><input type="text" placeholder="1.25"></td>
            <td><input type="text" placeholder="50.00"></td>
        `;
        tbody.appendChild(newRow);
        addEventListenersToRow(newRow);
    };

    const addEventListenersToRow = (row) => {
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                
            });
        });

        const actionButtons = row.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                actionButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                const isLastRow = row === tbody.lastElementChild;
                if (isLastRow) {
                    createNewRow();
                }
            });
        });
    };

    addEventListenersToRow(tbody.querySelector('tr'));
});
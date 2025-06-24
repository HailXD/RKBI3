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
            <td><input type="number" value="100"></td>
            <td><input type="number" placeholder="Enter price"></td>
            <td>USD</td>
            <td><input type="datetime-local"></td>
            <td><input type="number" placeholder="Enter commission"></td>
            <td><input type="number" placeholder="Enter P&L"></td>
        `;
        tbody.appendChild(newRow);
        addEventListenersToRow(newRow);
    };

    const formatTime = (input) => {
        if (!input.value) return;
        const date = new Date(input.value);
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
        const day = date.getDate();
        const time = date.toTimeString().split(' ')[0];
        const display = input.parentElement.querySelector('.time-display');
        if (display) {
            display.textContent = `${month} ${day} ${time}`;
        } else {
            const newDisplay = document.createElement('span');
            newDisplay.className = 'time-display';
            newDisplay.textContent = `${month} ${day} ${time}`;
            input.style.display = 'none';
            input.parentElement.appendChild(newDisplay);
        }
    };

    const addEventListenersToRow = (row) => {
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                
            });

            if (input.type === 'datetime-local') {
                input.addEventListener('change', () => formatTime(input));
            }
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
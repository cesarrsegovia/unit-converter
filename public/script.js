// 1. Definimos las unidades disponibles por categoría
const units = {
    length: [ { id: 'm', name: 'Meters' }, { id: 'km', name: 'Kilometers' }, { id: 'ft', name: 'Feet' }, { id: 'mi', name: 'Miles' }],
    weight: [ { id: 'g', name: 'Grams' }, { id: 'kg', name: 'Kilograms' }, { id: 'lb', name: 'Pounds' }, { id: 'oz', name: 'Ounces' }],
    temperature: [ { id: 'c', name: 'Celsius' }, { id: 'f', name: 'Fahrenheit' }, { id: 'k', name: 'Kelvin' }]
};

// 2. Referencias a los elementos del DOM
const form = document.getElementById('converter-form');
const resultContainer = document.getElementById('result-container');
const fromUnitSelect = document.getElementById('from-unit-select');
const toUnitSelect = document.getElementById('to-unit-select');
const tabs = document.querySelector('.tabs');
let currentCategory = 'length'; // Categoría activa por defecto

// 3. Función para llenar los menús <select>
function populateSelectors(category) {
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    units[category].forEach(unit => {
        fromUnitSelect.innerHTML += `<option value="${unit.id}">${unit.name}</option>`;
        toUnitSelect.innerHTML += `<option value="${unit.id}">${unit.name}</option>`;
    });
}

// 4. Lógica para cambiar de pestaña
tabs.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab-link')) {
        document.querySelector('.tab-link.active').classList.remove('active');
        event.target.classList.add('active');
        currentCategory = event.target.dataset.category;
        populateSelectors(currentCategory);
        resetConverter();
    }
});

// 5. Lógica del formulario de conversión
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = document.getElementById('value-input').value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    const response = await fetch(`/convert/${currentCategory}/${value}/${fromUnit}/${toUnit}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById('result-display').textContent = `Error: ${data.error}`;
    } else {
        const resultText = `${data.originalValue} ${fromUnit} = ${data.result.toFixed(2)} ${toUnit}`;
        document.getElementById('result-display').textContent = resultText;
    }
    form.classList.add('hidden');
    resultContainer.classList.remove('hidden');
});

// 6. Lógica del botón de Reset
document.getElementById('reset-button').addEventListener('click', resetConverter);

function resetConverter() {
    form.reset();
    form.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

// 7. Inicializamos la vistaasfdsdsdsa
populateSelectors(currentCategory);
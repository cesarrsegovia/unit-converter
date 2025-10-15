const express = require('express');
const { convert, unitFactors } = require('./logic/converter.js');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('<h1>Servidor de conversor de unidades</h1>');
});

app.get('/convert/:category/:value/:fromUnit/:toUnit', (req, res) => {
    const { category, value, fromUnit, toUnit } = req.params;
    const numericValue = parseFloat(value);

    // --- NUEVA VALIDACIÓN ---
    const categoryUnits = unitFactors[category];
    if (!categoryUnits || !categoryUnits[fromUnit] || !categoryUnits[toUnit]) {
        return res.status(400).json({ error: "Categoría o unidades no válidas." });
    }

    const result = convert(numericValue, fromUnit, toUnit, category);

    //enviamos el resueltado en formato json
    res.json({
        originalValue: numericValue,
        originalUnit: fromUnit,
        targetUnit: toUnit,
        result: result
    })
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
const unitFactors = {
    //longitud
    length: {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    },
    //peso
    weight: {
        g: 1,
        kg: 1000,
        mg: 0.001,
        lb: 453.592,
        oz: 28.3495,
    },
    temperature:{
        c: true,
        f: true,
        k: true
    }
}

const temperatureFormulas = {
    c: { toBase: c => c, fromBase: c => c },
    f: { toBase: f => (f - 32) * 5 / 9, fromBase: c => (c * 9 / 5) + 32 },
    k: { toBase: k => k - 273.15, fromBase: c => c + 273.15 }
};

// Función auxiliar que maneja únicamente la lógica de temperatura
function convertTemperature(value, fromUnit, toUnit) {
    const valueInCelsius = temperatureFormulas[fromUnit].toBase(value);
    const result = temperatureFormulas[toUnit].fromBase(valueInCelsius);
    return result;
}

function convert(value, fromUnit, toUnit, category) {
    if (category === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }

    const factors = unitFactors[category];
    // Validación para asegurar que las unidades existen en la categoría.
    if (!factors || factors[fromUnit] === undefined || factors[toUnit] === undefined) {
        return null; // Devuelve null si las unidades no son válidas
    }

    // Primero, convertimos el valor de entrada a nuestra unidad base (metros)
    const valueInMeters = value * factors[fromUnit];
    // Luego, convertimos de la unidad base a la unidad de salida
    const result = valueInMeters / factors[toUnit];

    return result;
}

module.exports = { convert, unitFactors };
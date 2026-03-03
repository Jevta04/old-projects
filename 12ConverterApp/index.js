let convList = [
    { opt: 'CToF',       metric1: 'Celsius',    metric2: 'Fahrenheit', fn: v => v * 9/5 + 32 },
    { opt: 'CmToIn',     metric1: 'Centimeter', metric2: 'Inch',       fn: v => v / 2.54 },
    { opt: 'LbToKg',     metric1: 'Pound',      metric2: 'Kilogram',   fn: v => v / 2.20462 },
    { opt: 'LToGal',     metric1: 'Liter',      metric2: 'Gallon',     fn: v => v / 3.78541 },
    { opt: 'MsToKph',    metric1: 'm/s',        metric2: 'km/h',       fn: v => v * 3.6 },
    { opt: 'MphToKph',   metric1: 'mi/h',       metric2: 'km/h',       fn: v => v * 1.609344 },
    { opt: 'kJtoKcal',   metric1: 'kJ',         metric2: 'kcal',       fn: v => v / 4.184 },
    { opt: 'km2Tom2',    metric1: 'km²',        metric2: 'm²',         fn: v => v * 1_000_000 }
];

// u dva odvojena koraka se uzima value; u prvom se uzimaju samo dokumenti, a u drugom nastavci .value .innerHTML i slicno

const select = document.getElementById('metrics');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const metric1Span = document.getElementById('metric1');
const metric2Span = document.getElementById('metric2');

function convert() {
    const value = parseFloat(fromInput.value);
    const selectedOpt = select.value;
    const obj = convList.find(o => o.opt === selectedOpt); // koriscenje .find ; ponoviti Array poglavlje

    if (!obj) {
        toInput.value = '';
        metric1Span.textContent = '';
        metric2Span.textContent = '';
        return;
    }
    metric1Span.textContent = obj.metric1;
    metric2Span.textContent = obj.metric2;

    const result = obj.fn(value);
    toInput.value = isNaN(result) ? '' : result.toFixed(4);
}
document.getElementById('convert').addEventListener('click', convert);

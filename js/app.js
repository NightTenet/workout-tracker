console.log('app.js підключено');

const trainings = [
    {'type': 'фулбоді', 'minutes': 50, 'calories': 167},
    {'type': 'кросфіт', 'minutes': 90, 'calories': 223},
    {'type': 'кардіо', 'minutes': 35, 'calories': 346}
];

// ф-я підраховує витрачені калорії за всі тренування
function GetAllCalories(data)
{
    let result = 0;

    for (const train of data) result += train.calories;

    console.log(`Загальна к-ть спалених калорій: ${result}`);
}
GetAllCalories(trainings);

// Класифікація тренувань за тривалістю (коротке/довге)
for (const train of trainings)
{
    if (train.minutes > 60) console.log('Тренування - довге');
    else console.log('Тренування - коротке');
}

// ф-я підраховує к-ть витрачених калорій за хвилину на тренуванні
const caloriesPerMinute = w => Math.round(w.calories / w.minutes);
console.log(caloriesPerMinute(trainings[1]));
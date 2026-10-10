for (const card of document.querySelectorAll('.card')) card.remove();

const trainings = [
    {'type': 'фулбоді', 'minutes': 50, 'calories': 167},
    {'type': 'кросфіт', 'minutes': 90, 'calories': 223},
    {'type': 'кардіо', 'minutes': 35, 'calories': 346}
];

const listContainer = document.querySelector('#workouts-list');

// ф-я рендерить список карток тренувань з масиву даних
function renderTrainings(array)
{
    listContainer.innerHTML = '';
    for (const training of array) {
        const card = document.createElement('article');
        const title = document.createElement('h3');
        const data = document.createElement('p');
        const image = document.createElement('img');

        image.src = './assets/img/free-icon-dumbbell-3043888.png';
        image.alt = 'A workout icon';

        title.textContent = training.type;
        title.prepend(image);
        data.textContent = `${training.minutes} хв, ${training.calories} ккал`;
        card.dataset.calories = training.calories;

        if (training.minutes > 60) card.classList.add('card', 'long');
        else card.classList.add('card', 'short');

        switch (training.type)
        {
            case 'фулбоді':
                card.classList.add('fullbody');
                break;
            case 'кросфіт':
                card.classList.add('crossfit');
                break;
            case 'кардіо':
                card.classList.add('cardio');
                break;
            default:
                break;
        }
        
        card.append(title, data);
        listContainer.append(card);
    }
}
renderTrainings(trainings);

// ф-я підраховує витрачені калорії за всі тренування
function GetAllCalories(data)
{
    let result = 0;
    for (const train of data) result += train.calories;
    return result;
}
const allCalories = document.querySelector('#total-calories');
allCalories.textContent = `Загальна к-ть спалених калорій: ${GetAllCalories(trainings)}`;


// обробник подій обробряє надсилання форми пілся натискання кнопки "Додати"
const form = document.querySelector('#add-form');
form.addEventListener('submit', 
    event =>
    {
        event.preventDefault();

        const type = form.type.value;
        const minutes = Number(form.minutes.value);
        const calories = Number(form.calories.value);

        const training = {'type': type, 'minutes': minutes, 'calories': calories};
        trainings.push(training);

        renderTrainings(trainings);
        allCalories.textContent = `Загальна к-ть спалених калорій: ${GetAllCalories(trainings)}`;
        form.reset();

        resultOfCalPerMin.textContent = '';
    }
);

// обробник подій обробляє значення у полі "калорії"
const caloriesInput = document.querySelector('#calories-input');
caloriesInput.addEventListener('input',
    () =>
    {
        if (Number(caloriesInput.value) > 2000) caloriesInput.setCustomValidity('К-ть спалених калорій має бути до 2000');
        else if (Number(caloriesInput.value) < 0) caloriesInput.setCustomValidity('К-ть спалених калорій має бути додатним числом');
        else caloriesInput.setCustomValidity('');
    }
);

const minutesInput = document.querySelector('#minutes-input');

const resultOfCalPerMin = document.querySelector('#calories-per-minute');
function caloriesPerMinute()
{
    const calories = Number(caloriesInput.value);
    const minutes = Number(minutesInput.value);

    if (minutes > 0) resultOfCalPerMin.textContent = `${(calories / minutes).toFixed(1)} ккал/хв`;
    else resultOfCalPerMin.textContent = '';
}

// обробники подій обробляють значення "ккал/хв"
caloriesInput.addEventListener('input', caloriesPerMinute);
minutesInput.addEventListener('input', caloriesPerMinute);
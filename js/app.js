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
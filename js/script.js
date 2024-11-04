let currentSlide = 1; 
const totalSlides = 4; 

function switchSlide() {
    currentSlide++;
    
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }

    document.getElementById(`slide${currentSlide}`).checked = true;
}


setInterval(switchSlide, 5000);
function calculate() {
    const width = parseFloat(document.getElementById('width').value);
    const length = parseFloat(document.getElementById('length').value);
    
    if (!isNaN(width) && !isNaN(length)) {
        const perimeter = 2 * (width + length);
        const area = width * length;
        
        document.getElementById('perimetr_params').innerHTML = `Периметр дома: ${perimeter} м`;
        document.getElementById('area_params').innerHTML = `Площадь дома: ${area} м²`;
    } else {
        document.getElementById('perimetr_params').innerHTML = `Периметр дома: `;
        document.getElementById('area_params').innerHTML = `Площадь дома: `;
    }
}

document.getElementById('width').addEventListener('input', calculate);
document.getElementById('length').addEventListener('input', calculate);
function selectFoundation(element) {
    const allRows = document.querySelectorAll('.step-row');
    allRows.forEach(row => row.classList.remove('selected'));
    
    element.classList.add('selected');
}

function openModal(src) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function showAllImages() {
    var hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    hiddenItems.forEach(function(item) {
        item.classList.remove('hidden');
    });
    document.querySelector('.show-all').style.display = 'none';
}

// Цены за элементы калькулятора
const prices = {
    houseTypes: {
        "сруб": 10000,
        "каркасный": 8000,
        "клееный_брус": 12000
    },
    floors: {
        "1": 0,
        "1.5": 5000,
        "2": 10000
    },
    roofTypes: {
        "двускатная": 2000,
        "четырехскатная": 3000,
        "мансардная": 4000
    },
    materials: {
        "брус": 500,
        "бревно": 700,
        "клееный_брус": 900,
        "каркас": 400
    },
    finishes: {
        "эконом": 1000,
        "стандарт": 2000,
        "премиум": 3000
    },
    innerOptions: {
        "стены": 500,
        "потолки": 400,
        "полы": 600
    },
    additionalOptions: {
        "балкон": 1000,
        "терраса": 2000,
        "гараж": 5000,
        "камин": 3000,
        "сауна": 4000
    }
};

// Элементы DOM
const steps = document.querySelectorAll(".step");
const nextSteps = document.querySelectorAll(".next-step");
const totalCostElement = document.getElementById("totalCost");
const costDetailsElement = document.getElementById("costDetails");

// Текущий шаг
let currentStep = 0;

// Скрываем все шаги, кроме первого
steps.forEach((step, index) => {
    if (index !== currentStep) {
        step.style.display = "none";
    }
});

// Обработчик события для кнопки "Продолжить"
nextSteps.forEach(button => {
    button.addEventListener("click", () => {
        // Скрываем текущий шаг
        steps[currentStep].style.display = "none";

        // Переходим к следующему шагу
        currentStep++;

        // Отображаем следующий шаг
        steps[currentStep].style.display = "block";

        // Обновляем расчет стоимости
        calculateCost();
    });
});

// Функция для расчета стоимости
function calculateCost() {
    let totalCost = 0;
    const costDetails = [];

    // Получаем выбранные значения
    const houseType = document.querySelector('input[name="houseType"]:checked').value;
    const houseArea = parseInt(document.getElementById("houseArea").value);
    const floors = document.getElementById("floors").value;
    const roofType = document.getElementById("roofType").value;
    const material = document.getElementById("material").value;
    const finish = document.getElementById("finish").value;
    const innerOptions = Array.from(document.querySelectorAll('input[name="innerOptions"]:checked')).map(checkbox => checkbox.value);
    const additionalOptions = Array.from(document.querySelectorAll('input[name="additionalOptions"]:checked')).map(checkbox => checkbox.value);

    // Расчет стоимости по типам элементов
    totalCost += prices.houseTypes[houseType];
    totalCost += prices.floors[floors];
    totalCost += prices.roofTypes[roofType];
    totalCost += prices.materials[material] * houseArea;
    totalCost += prices.finishes[finish];

    innerOptions.forEach(option => {
        totalCost += prices.innerOptions[option] * houseArea;
        costDetails.push(`<li>${option}: ${prices.innerOptions[option] * houseArea} руб.</li>`);
    });

    additionalOptions.forEach(option => {
        totalCost += prices.additionalOptions[option];
        costDetails.push(`<li>${option}: ${prices.additionalOptions[option]} руб.</li>`);
    });

    // Отображение итоговой стоимости
    totalCostElement.textContent = totalCost;

    // Отображение детализации стоимости
    costDetailsElement.innerHTML = costDetails.join('');
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    const query = document.getElementById('search').value.toLowerCase();
    const items = document.querySelectorAll('#item-list li');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = ''; // Показываем элемент
        } else {
            item.style.display = 'none'; // Скрываем элемент
        }
    });
});
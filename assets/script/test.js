const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const inputs = Array.from(document.getElementsByClassName('firstTestForm'))
const form_check = Array.from(document.getElementsByClassName('firstTestFormCheck'))
const next = document.getElementById('next-test-btn');
const progress_counter = document.getElementById('progress-counter')
const progressBarFull = document.getElementById('progressBarFull')
const question_number = document.getElementById('question-number')
const numberOfAnswers = document.getElementById('numberOfAnswers');
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let score = 0;
let availableQuestions = [];
let answers = [];
let questions = [
    {
        question: 'В ситуации, когда у Вас есть два или более незакрытых кредитов, как Вы выберете кредит, который выгоднее погашать досрочно в первую очередь? ',
        choice1: 'сравню ставки по кредитам и выберу тот, по которому ставка выше',
        choice2: 'сравню ежемесячный платеж по кредитам и выберу тот, по которому он выше',
        choice3: 'выполню пункты указанные выше',
        choice4: 'брошу монетку 😊',
        choice5: 'ни один из вариантов не поможет найти оптимальное решение',
        answer: ['5'],
        view: true,
    },
    {
        question:
            "При принятии решения о покупке жилья в ипотеку Вы считаете важным учитывать",
        choice1: "стоимость жилья и величину первоначального взноса",
        choice2: "ставку и срок ипотеки",
        choice3: "стоимость аренды покупаемого жилья",
        choice4: "инфляцию",
        choice5: "доходность инвестиций",
        answer: ['1', '2', '3', '4', '5'],
        view: false,
    },
    {
        question: "При принятии решения о том, стоит ли досрочно погашать кредит, Вы считаете важным учитывать",
        choice1: "сумму и ставку кредита ",
        choice2: "величину ежемесячного платежа",
        choice3: "доходность инвестиций",
        choice4: "инфляцию",
        choice5: "расходы на страховку (по кредиту)",
        answer: ['1', '3', '4', '5'],
        view: false,
    },
    {
        question: "Как Вы определите, выгодно ли Вам рефинансировать свои кредиты?",
        choice1: "сравнив ежемесячные платежи по кредитам до и после рефинансирования ",
        choice2: "сравнив ставку по действующим кредитам и ставку, которая будет установлена при рефинансировании",
        choice3: "сравнив сумму уплаченных процентов за весь период кредитования в двух вариантах – с рефинансированием и без него",
        choice4: "сравнив сумму процентов, которые вы уплатите с момента рефинансирования, с суммой оставшихся к уплате процентов по действующим кредитам",
        choice5: "нет верного варианта",
        answer: ['4'],
        view: true,
    },
    {
        question: "Вы планируете покупку автомобиля в кредит и хотите оценить влияние этого решения на своё финансовое состояние.<br> Какие факторы Вы считаете необходимым при этом учитывать?",
        choice1: "проценты по кредиту",
        choice2: "расходы на страхование",
        choice3: "ликвидность и износ автомобиля (% потери его стоимости со временем)",
        choice4: "расходы на содержание автомобиля",
        choice5: "транспортные расходы, которые вы несете, не имея автомобиля",
        choice6: "доходность инвестиций",
        answer: ['1', '2', '3', '4', '5', '6'],
        view: false,
    },
    {
        question: "У Вас есть 1 млн. руб. и Вам нужно решать «жилищный вопрос». Вы можете выбрать один из двух вариантов:<br> <br>" +
            "&emsp;<i>Вариант 1.</i> Внести его как первоначальный взнос, купить квартиру за 6 млн. руб. в ипотеку на 20 лет со ставкой 10% и страховкой кредита 1% в год<br>" +
            "&emsp;<i>Вариант 2.</i> Арендовать эту квартиру за 20 тыс. руб. в месяц, а имеющийся 1 млн. руб. вложить под 10% годовых<br> <br>" +
            "Какой вариант является более выгодным, если ежегодный рост стоимости покупаемой квартиры равен росту арендной платы и годовой инфляции и составляет 6%?",
        choice1: "вариант 1",
        choice2: "вариант 2",
        choice3: "примерно одинаково ",
        answer: ['2'],
        view: true,
    },
    {
        question: "Год назад Вы взяли кредит 300 тыс. руб. сроком на 3 года со ставкой 18% годовых, в течение года платежи вносились по графику. Сегодня у Вас появилась возможность сделать досрочное погашение по этому кредиту на 200 тыс. руб. Но также Вы можете вложить эти деньги под 12% годовых. Что будет выгоднее?",
        choice1: "досрочное погашение кредита",
        choice2: "инвестирование свободных денег и погашение кредита по графику",
        choice3: "примерно одинаково",
        answer: ['2'],
        view: true,
    },
    {
        question: "На сегодняшний день у Вас есть два кредита:<br><br>" +
            "&emsp;1) Автокредит, взят 2 года назад на срок 5 лет, со ставкой 14% годовых и обязательством ежегодного страхования автомобиля (стоимость страховки – 4% от долга по кредиту)<br>" +
            "&emsp;2) Ипотека, взята 7 лет назад на срок 15 лет, со ставкой 9% годовых и обязательством ежегодного страхования квартиры (стоимость страховки – 0,7% от долга по кредиту)<br><br>" +
            "Какой из кредитов Вам сегодня выгоднее погашать досрочно, если ежегодная инфляция составляет 7%?",
        choice1: "автокредит",
        choice2: "ипотека",
        choice3: "примерно одинаково",
        answer: ['2'],
        view: true,
    },
    {
        question: "У Вас есть кредит на сумму 500 тыс. руб. по ставке 19% годовых, взятый 2 года назад на срок 3,5 года, платежи по кредиту вносились строго по графику. Сегодня Вам предложили рефинансирование этого кредита с новыми условиями – ставкой 9% годовых и сроком 3 года, с разовой уплатой страховки в 7 тыс. руб.<br>" +
            "Что для Вас было бы выгоднее?",
        choice1: "отказаться от рефинансирования",
        choice2: "провести рефинансирование",
        choice3: "разницы нет (очень несущественна)",
        answer: ['1'],
        view: true,
    },
    {
        question: "Вы планируете покупку автомобиля за 1 600 тыс. руб., сделав первоначальный взнос в 500 тыс. руб. и взяв оставшуюся сумму в кредит под 14% годовых на 5 лет с обязательством ежегодного страхования автомобиля (за 5% от остатка долга по кредиту). Вы знаете, что владение автомобилем также потребует ежемесячных расходов на его содержание в сумме 12 тыс. руб. и ежегодных расходов 45 тыс. руб. (транспортный налог, ОСАГО, тех. обслуживание). При этом сейчас Ваши ежемесячные расходы на транспорт составляют 15 тыс. руб.<br><br>" +
            "В то же время, Вы предполагаете, что даже с учетом износа, Ваш автомобиль будет расти в цене на 10% в год, поскольку это востребованная марка.<br><br>" +
            "Оцените свои финансовые последствия от покупки автомобиля, если принять во внимание, что Вы можете получать инвестиционный доход со своих средств в 10% годовых, а годовая инфляция не превышает 7%?",
        choice1: "получу выгоду более 200 тыс. руб",
        choice2: "получу выгоду более 100 тыс. руб.",
        choice3: "не будет ни выгод, ни потерь ",
        choice4: "понесу потери менее 100 тыс. руб.",
        choice5: "понесу потери от 100 до 200 тыс. руб.",
        choice6: "понесу потери более 200 тыс. руб. ",
        answer: ['6'],
        view: true,
    },
];
let MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
getNewQuestion = () => {
    answers = [];
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        document.getElementById('test-end').click()
    }
    if (questionCounter === MAX_QUESTIONS-1){
        next.innerText = "Завершить"
    }
    questionCounter++;
    const questionIndex = questionCounter-1;
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;
    question_number.innerText = "Вопрос " + questionCounter;
    progress_counter.innerText = questionCounter + " из " + MAX_QUESTIONS;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`
    inputs.forEach((e) => {
        e.checked = false;
        if (currentQuestion.view){
            e.type = "radio"
            numberOfAnswers.innerText = ""
        } else {
            e.type = "checkbox"
            numberOfAnswers.innerText = "* - можно выбрать несколько вариантов"
        }
    })
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        if (typeof currentQuestion['choice' + number] !== "undefined"){
            form_check[number-1].classList.remove("d-none")
        } else {
            form_check[number-1].classList.add("d-none")
        }
    });
    // availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
function scroll(){
    const modal_top = document.getElementById('modal_top')
    modal_top.scrollTop = 0;
}

next.addEventListener('click', async() =>{

    if (!acceptingAnswers) return;
    
    acceptingAnswers = false;
    inputs.forEach((e) =>{
        if (e.checked){
            const selectedAnswer = e.dataset["number"];
            answers.push(selectedAnswer);
        }
    })
    if (JSON.stringify(answers) === JSON.stringify(currentQuestion.answer)){
        score++
    }
    console.log(score)
    
    if (next.innerText === 'ЗАВЕРШИТЬ') {
        localStorage.setItem('firstTestResult', score)
    }
    getNewQuestion();
    scroll();
});
startGame();
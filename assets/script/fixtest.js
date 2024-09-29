const question2 = document.getElementById('secondTest-question');
const choices2 = Array.from(document.getElementsByClassName('secondTest-choice'));
const inputs2 = Array.from(document.getElementsByClassName('secondTestForm'));
const form_check2 = Array.from(document.getElementsByClassName('secondTestFormCheck'));
const next2 = document.getElementById('secondTest-next-test-btn');
const progress_counter2 = document.getElementById('secondTest-progress-counter');
const progressBarFull2 = document.getElementById('secondTest-progressBarFull');
const question_number2 = document.getElementById('question-number2');
const numberOfAnswers2 = document.getElementById('numberOfAnswers2');
let currentQuestion2 = {};
let acceptingAnswers2 = false;
let questionCounter2 = 0;
let score1 = 0;
let score2 = 0;
let availableQuestions2 = [];
let answers2 = [];
let questions2 = [
    {
        question: 'Как правило, Ваши расходы по итогам месяца',
        choice1: 'превышают запланированную сумму',
        choice2: 'не превышают запланированную сумму',
        choice3: 'у меня нет плана расходов на месяц',
        choice4: 'не знаю ',
        answer1: ['2'],
        view: true,
        axis: true,
    },
    {
        question: 'Ваши ежемесячные доходы (заработная плата, бизнес, фриланс) превышают ежемесячные расходы:',
        choice1: 'всегда',
        choice2: 'чаще «да», чем «нет» ',
        choice3: 'чаще «нет», чем «да»',
        choice4: 'никогда ',
        choice5: 'не знаю ',
        answer1: ['1'],
        half: ['2'],
        axis: true,
        view: true,
    },
    {
        question: 'Какую часть своих ежемесячных доходов Вам удается откладывать в накопления:',
        choice1: 'не знаю',
        choice2: 'никакую',
        choice3: 'менее 10%',
        choice4: 'от 10 до 20%',
        choice5: 'более 20%',
        answer1: ['3'],
        over1: ['4'],
        over2: ['5'],
        axis: true,
        view: true,
    },
    {
        question: 'Какую часть сделанных за месяц накоплений Вы, как правило, вкладываете в доходные активы (валюта, вклады, ценные бумаги и т.д.):',
        choice1: 'не знаю ',
        choice2: 'менее 30%',
        choice3: 'от 30 до 50%',
        choice4: 'более 50%',
        answer1: ['4'],
        half: ['3'],
        axis: true,
        view: true,
    },
    {
        question: 'Если взять за 100% общую сумму принадлежащих Вам активов (недвижимость, автомобили, деньги, вклады, ценные бумаги и пр.), какая доля приходится на финансовые активы (деньги, вклады, ценные бумаги):',
        choice1: 'не знаю ',
        choice2: 'менее 10% ',
        choice3: 'от 10 до 20% ',
        choice4: 'более 20% ',
        choice5: 'более 50% ',
        answer1: ['4'],
        answer2: ['5'],
        half: ['3'],
        axis: false,
        view: true,
    },
    {
        question: 'Какая часть Ваших активов приходится на имущество, которое может приносить Вам доход (сдаваемая в аренду недвижимость, ценные бумаги, вклады и т.д.):',
        choice1: 'не знаю',
        choice2: 'таких активов не имею',
        choice3: 'менее 20%',
        choice4: 'от 20% до 50%',
        choice5: 'более 50%',
        answer1: ['5'],
        half: ['4'],
        axis: false,
        view: true,
    },
    {
        question: 'Какой доход (в среднем) приносят Ваши активы:',
        choice1: 'не знаю ',
        choice2: 'никакого',
        choice3: 'меньше уровня инфляции',
        choice4: 'больше уровня инфляции, но меньше ключевой ставки ЦБ ',
        choice5: 'больше ключевой ставки ЦБ',
        answer1: ['5'],
        half: ['4'],
        axis: true,
        view: true,
    },
    {
        question: 'Как соотносятся между собой сумма Ваших активов (недвижимость, автомобили, деньги, вклады, ценные бумаги и пр.) и суммарные долги по кредитам и займам:',
        choice1: 'не знаю ',
        choice2: 'долги больше активов ',
        choice3: 'примерно равны между собой ',
        choice4: 'активы немного больше долгов ',
        choice5: 'активы больше долгов в 2 раза и более',
        answer1: ['5'],
        axis: false,
        view: true,
    },
    {
        question: 'Какая часть Ваших ежемесячных доходов уходит на платежи по кредитам:',
        choice1: 'не знаю ',
        choice2: 'менее 10% ',
        choice3: 'от 10 до 20% ',
        choice4: 'от 20 до 30% ',
        choice5: 'более 30% ',
        answer1: ['2'],
        answer2: ['3'],
        half: ['4'],
        axis: false,
        view: true,
    },
    {
        question: 'На сколько месяцев жизни Вам хватит сделанных накоплений (включая деньги, валюту, банковские вклады, ценные бумаги) в случае потери своих источников дохода:',
        choice1: 'менее 1 месяца ',
        choice2: 'от 1 до 3 месяцев ',
        choice3: 'от 3 до 6 месяцев ',
        choice4: 'более 6 месяцев ',
        answer1: ['2'],
        over1: ['4'],
        middle: ['3'],
        axis: false,
        view: true,
    }
]
let MAX_QUESTIONS2 = 10;
startGame2 = () => {
    questionCounter2 = 0;
    score1 = 0;
    score2 = 0;
    availableQuestions2 = [...questions2];
    getNewQuestion2();
};
function scroll(){
    const modal_top = document.getElementById('modal_top2')
    modal_top.scrollTop = 0;
}
getNewQuestion2 = () => {
    answers2 = [];
    if (availableQuestions2.length === 0 || questionCounter2 >= MAX_QUESTIONS2) {
        //go to the end page
        document.getElementById('test-end2').click()
    }
    if (questionCounter2 === MAX_QUESTIONS2-1){
        next2.innerText = "Завершить"
    }
    questionCounter2++;
    const questionIndex2 = questionCounter2-1;
    currentQuestion2 = availableQuestions2[questionIndex2];
    question2.innerText = currentQuestion2.question;
    question_number2.innerText = "Вопрос " + questionCounter2;
    progress_counter2.innerText = questionCounter2 + " из " + MAX_QUESTIONS2;
    progressBarFull2.style.width = `${(questionCounter2 / MAX_QUESTIONS2) * 100}%`
    inputs2.forEach((e) => {
        e.checked = false;
        if (currentQuestion2.view){
            e.type = "radio"
            numberOfAnswers2.innerText = ""
        } else {
            e.type = "checkbox"
            numberOfAnswers2.innerText = "* - можно выбрать несколько вариантов"
        }
    })
    choices2.forEach((choice2) => {
        const number2 = choice2.dataset['number'];
        choice2.innerText = currentQuestion2['choice' + number2];
        if (typeof currentQuestion2['choice' + number2] !== "undefined"){
            form_check2[number2-1].classList.remove("d-none")
        } else {
            form_check2[number2-1].classList.add("d-none")
        }
    });
    // availableQuestions2.splice(questionIndex2, 1);
    acceptingAnswers2 = true;
};

next2.addEventListener('click', () =>{
    if (!acceptingAnswers2) return;
    acceptingAnswers2 = false;
    inputs2.forEach((elem) =>{
        if (elem.checked){
            const selectedAnswer2 = elem.dataset["number"];
            answers2.push(selectedAnswer2);
        }

    })
    if (JSON.stringify(answers2) === JSON.stringify(currentQuestion2.answer1)){
        if (currentQuestion2.axis){
            score1++
        } else {
            score2++
        }
    } else if (JSON.stringify(answers2) === JSON.stringify(currentQuestion2.answer2)){
        if (currentQuestion2.axis){
            score1++
        } else {
            score2++
        }
    } else if (JSON.stringify(answers2) === JSON.stringify(currentQuestion2.half)){
        if (currentQuestion2.axis){
            score1 = score1+0.5
        } else {
            score2 = score2+0.5
        }

    }else if (JSON.stringify(answers2) === JSON.stringify(currentQuestion2.over1)){
        if (currentQuestion2.axis){
            score1 = score1+2
        } else {
            score2 = score2+2
        }
    } else if (JSON.stringify(answers2) === JSON.stringify(currentQuestion2.over2)){
        if (currentQuestion2.axis){
            score1 = score1+2
        } else {
            score2 = score2+2
        }
    }

    // Расчёт по оси «Финансовый результат»: суммируются набранные баллы по
    // вопросам 1, 2, 3, 4, 7, полученная сумма делится на 6 и умножается на
    // 100%
    //  Расчёт по оси «Финансовое состояние»: суммируются набранные баллы по
    // вопросам 5, 6, 8, 9, 10, полученная сумма делится на 6 и умножается на
    // 100%
    // Пузырек всегда имеет один и тот же размер (можно задать фиксированную
    // величину).
    console.log("Первый показатель="+ score1)
    console.log("Второй показатель="+ score2)
    getNewQuestion2();
    scroll();
});

startGame2();

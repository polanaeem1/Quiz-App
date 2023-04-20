const question =document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText=document.querySelector('#progressText')
const scoreText =document.querySelector('#score')
const progressBarFull =document.querySelector('#progressBarFull')
const quizOn=document.querySelector('.quiz-on')
const home=document.querySelector('#home')
const quizBtn=document.querySelector('#quiz-btn')
const endOn=document.querySelector('.end-on')
const finalScore = document.querySelector("#finalScore");
const endText=document.querySelector('#end-text')
const goHome=document.querySelector('.goHome')

let currentQuestion = {}
let acceptingAnswers= true
let score=0
let questionCounter=0
let availableQuestions=[]
let correctScore=0

let questions =[
    {
        question:"What is (2+8) * 2 ?",
        choice1:'20',
        choice2:'4',
        choice3:'21',
        choice4:'17',
        answer:1,
    },
    {
        question:"What is 3/3 + 5 ?",
        choice1:'7',
        choice2:'4',
        choice3:'21',
        choice4:'6',
        answer:4,
    },
    {
        question:"What is (9+1) - 10 ?",
        choice1:'2',
        choice2:'4',
        choice3:'0',
        choice4:'17',
        answer:3,
    },
    {
        question:"What is 2 + 20 ?",
        choice1:'2',
        choice2:'4',
        choice3:'22',
        choice4:'17',
        answer:3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS=4

startQuiz =()=>{
    questionCounter=0
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
}
getNewQuestion=()=>{
    if(availableQuestions.length === 0||questionCounter>MAX_QUESTIONS){
      finalScore.innerText = score;
      endText.innerText=`You Solved ${correctScore} Correct Questions  form 4 `
      quizOn.style.display=`none`
      endOn.style.display=`flex`
    }
    questionCounter++
    progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionIndex=Math.floor(Math.random()*availableQuestions.length)
    currentQuestion=availableQuestions[questionIndex]
    question.innerText=currentQuestion.question
    choices.forEach(choice => {
        const number=choice.dataset['number']
        choice.innerText=currentQuestion['choice' +number]
    });
    availableQuestions.splice(questionIndex,1)
    acceptingAnswers=true
}
choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers)return

        acceptingAnswers=false
        const selectedChoice=e.target
        const selectedAnswer=selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer?'correct':'incorrect'
        if (classToApply ==='correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
});
incrementScore =num=>{
    score +=num
    scoreText.innerText= score
    correctScore++
}

  startQuiz()

quizBtn.addEventListener('click',()=>{
  home.style.display=`none`
  quizOn.style.display=`flex`
})

goHome.addEventListener('click',()=>{
  location.reload()
})

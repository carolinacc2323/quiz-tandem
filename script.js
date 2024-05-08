const header= document.createElement('header');
document.body.appendChild(header);
const divLogo=document.createElement('div');
divLogo.classList.add('logo');
header.appendChild(divLogo);
const logoImage = document.createElement('img');
  // logoImage.src = 'img/rexygame2.png';
  // logoImage.alt = "logotipo";
  divLogo.appendChild(logoImage);
  const divTitulo=document.createElement('div');
  divLogo.classList.add('titulo');
  header.appendChild(divTitulo);
  const titulo = document.createElement('h1')
  const texTitulo = document.createTextNode('')
  titulo.appendChild(texTitulo)
  divTitulo.appendChild(titulo)
  const quizContainer = document.createElement('div')
  quizContainer.classList.add('quiz-container')
  quizContainer.innerHTML=
  `
  <div class="title" id="title">
  </div>
  <div id="section"></div>
  <article class="form-buttons">
      <button type="button" id="botonSig">Siguiente</button>
  </article>
  `
  document.body.appendChild(quizContainer)
// Obtener los datos del archivo JSON
fetch('./data.json')
.then(response => response.json())
.then(data => {
  const title = document.getElementById('title');
  title.className = "title";
  title.innerHTML = `
  <h1>${data.title}</h1>
  <h2>${data.description}</h2>
  <h3>${data.author}</h3>`;
  const img = document.createElement('img');
  img.setAttribute("src", data.img_feature.url);
  img.setAttribute("alt", data.img_feature.alt);
  img.className = "logotipo";
  title.appendChild(img);
  questionsData = data.questions[0];
  showQuestion(currentQuestionIndex);
})
.catch(err => console.error('Error fetching data:', err));
let currentQuestionIndex = 0;
let questionsData = [];
let correctAnswersCount = 0;
function createRadioInputs(questionData, articleElement) {
  const answers = questionData.answers;
  const imgQuestion = questionData.img_question;
  const questionImage = document.createElement('img');
  questionImage.src = imgQuestion.url;
  questionImage.alt = imgQuestion.alt;
  questionImage.classList.add('question-image');
  articleElement.appendChild(questionImage);
  const questionDesc = document.createElement('p');
  questionDesc.textContent = imgQuestion.desc;
  articleElement.appendChild(questionDesc);
  for (const option in answers) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question_${questionData.id}`;
    input.value = option;
    label.textContent = answers[option];
    label.appendChild(input);
    articleElement.appendChild(label);
  }
  articleElement.classList.add('question-pane');
}
function showQuestion(index) {
  const questions = questionsData[index];
  const section = document.getElementById('section');
  section.innerHTML = ''; // Clear previous question
  const articleElement = document.createElement('article');
  const questionTitle = document.createElement('h3');
  questionTitle.textContent = questions.question;
  articleElement.appendChild(questionTitle);
  createRadioInputs(questions, articleElement);
  section.appendChild(articleElement);
  // Habilitar el botón "Siguiente"
  document.getElementById('botonSig').disabled = false;
}
function validateAnswer(questionIndex, selectedAnswer) {
  const question = questionsData[questionIndex];
  const correctAnswer = Object.keys(question.results).find(key => question.results[key]);
  const radioInputs = document.querySelectorAll(`input[name="question_${question.id}"]`);
  radioInputs.forEach(input => {
    if (input.value === correctAnswer) {
      input.parentElement.style.backgroundColor = 'chartreuse'; // Colorear la respuesta correcta de verde
      if (selectedAnswer === correctAnswer) {
        correctAnswersCount++; // Incrementar el contador de respuestas correctas
      }
    } else if (input.value === selectedAnswer) {
      input.parentElement.style.backgroundColor = 'red'; // Colorear la respuesta seleccionada incorrecta de rojo
    }
    input.disabled = true; // Deshabilitar las opciones después de seleccionar una respuesta
  });
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showResult(correctAnswersCount); // Mostrar el resultado al final del quiz
    }
  }, 2000); // Esperar 2 segundos antes de pasar a la siguiente pregunta
}
document.getElementById('botonSig').addEventListener('click', function() {
  const selectedAnswer = document.querySelector(`input[name="question_${questionsData[currentQuestionIndex].id}"]:checked`);
  if (selectedAnswer) {
    validateAnswer(currentQuestionIndex, selectedAnswer.value);
  } else {
    alert('Por favor, selecciona una respuesta.');
  }
});
function showResult(correctCount) {
  const resultMessage = `Respuestas correctas: ${correctCount} de ${questionsData.length}`;
  const resultWindow = window.open('', 'Result Popup', 'width=400,height=200');
  resultWindow.document.write(`
    <html>
      <head>
        <title>Resultado del Quiz</title>
      </head>
      <body>
        <h2>¡Fin del juego!</h2>
        <p>${resultMessage}</p>
        <button onclick="window.close()">Cerrar</button>
      </body>
    </html>
  `);
}

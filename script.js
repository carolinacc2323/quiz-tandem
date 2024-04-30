let currentQuestionIndex = 0;
let questionsData = [];
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
  if (selectedAnswer === correctAnswer) {
    alert('¡Respuesta correcta!');
  } else {
    alert('Respuesta incorrecta. La respuesta correcta es: ' + question.answers[correctAnswer]);
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questionsData.length) {
    showQuestion(currentQuestionIndex);
  } else {
    alert('¡Fin del quiz!');
  }
}
document.getElementById('botonSig').addEventListener('click', function() {
  const selectedAnswer = document.querySelector(`input[name="question_${questionsData[currentQuestionIndex].id}"]:checked`);
  if (selectedAnswer) {
    validateAnswer(currentQuestionIndex, selectedAnswer.value);
  } else {
    alert('Por favor, selecciona una respuesta.');
  }
});
// Obtener los datos del archivo JSON
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const title = document.getElementById('title');
    title.innerHTML = `<h1>${data.title}</h1><h2>${data.description}</h2><h3>${data.author}</h3>`;
    const img = document.createElement('img');
    img.setAttribute("src", data.img_feature.url);
    img.setAttribute("alt", data.img_feature.alt);
    title.appendChild(img);
    questionsData = data.questions[0];
    showQuestion(currentQuestionIndex);
  })
  .catch(err => console.error('Error fetching data:', err));
fetch('./data.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    const title = document.getElementById('title')
    let h1= document.createElement('h1')
    h1.innerHTML= data.title
    title.appendChild(h1)

    let h2= document.createElement('h2')
    h2.innerHTML= data.description
    title.appendChild(h2)

    let h3= document.createElement('h3')
    h3.innerHTML= data.author
    title.appendChild(h3)
    
    let img = document.createElement('img')
    img.setAttribute ("src","./img/aranjuez1.jpg")
    title.appendChild(img)
    
    const formQuestions = document.getElementById('formulario'); // Mueve esta línea fuera del segundo bloque then

    // Fetch para obtener las preguntas
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        const questions = data.questions[0]; // Accede a la lista de preguntas del JSON
        // Encuentra la pregunta con id 1
        const questionId1 = questions.find(question => question.id === 1); 
        // Crea un elemento p y agrega la pregunta con id 1
        const pElement1 = document.createElement('p');
        pElement1.textContent = questionId1.question;
        // Agrega el elemento p al cuerpo del formulario
        formQuestions.appendChild(pElement1); 
        
        // Obtiene la segunda pregunta
        const questionId2 =  questions.find(question => question.id === 2); 
        const pElement2 = document.createElement('p');
        pElement2.textContent = questionId2.question;
        // Agrega el elemento p al cuerpo del formulario
        formQuestions.appendChild(pElement2); 
      })
      .catch((err) => {
        // Maneja errores aquí
        console.error('Error fetching questions:', err);
      });

  })
  .catch((err) => {
    // Maneja errores aquí
    console.error('Error fetching data:', err);
  });

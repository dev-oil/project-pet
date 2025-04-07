document.addEventListener('DOMContentLoaded', function () {
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let questions = [];

  fetch('data/questions.json')
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      showQuestion();
    });

  function showQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    if (currentQuestionIndex < questions.length) {
      const q = questions[currentQuestionIndex];

      const questionElem = document.createElement('div');
      questionElem.innerHTML = `<p class="question">${q.question}</p>`;

      q.options.forEach((option) => {
        const optionId = `option_${option.value}`;

        questionElem.innerHTML += `
          <div class="input_box">
            <input type="radio" id="${optionId}" name="answer" value="${option.value}">
            <label for="${optionId}" tabindex="0">${option.text}</label>
          </div>
        `;
      });

      questionContainer.appendChild(questionElem);

      document.getElementById('nextButton').style.display = 'none';

      document.querySelectorAll('input[name="answer"]').forEach((input) => {
        input.addEventListener('change', function () {
          document.getElementById('nextButton').style.display = 'block';
        });
      });
    } else {
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      window.location.href = 'result.html';
    }
  }

  document.getElementById('nextButton').addEventListener('click', function () {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (selectedAnswer) {
      userAnswers.push(selectedAnswer.value);
      currentQuestionIndex++;
      showQuestion();
    }
  });
});

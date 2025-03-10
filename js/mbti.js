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
    questionContainer.innerHTML = ''; // 이전 질문 지우기

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

      document.getElementById('nextButton').style.display = 'none'; // 다음 버튼 숨기기

      document.querySelectorAll('input[name="answer"]').forEach((input) => {
        input.addEventListener('change', function () {
          document.getElementById('nextButton').style.display = 'block'; // 사용자가 선택하면 버튼 활성화
        });
      });
    } else {
      // 질문이 끝나면 결과 페이지로 이동
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

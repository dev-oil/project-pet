document.addEventListener('DOMContentLoaded', function () {
  const answers = JSON.parse(localStorage.getItem('userAnswers'));

  let mbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach((value) => {
    mbtiScores[value]++;
  });

  const mbti =
    (mbtiScores['E'] > mbtiScores['I'] ? 'E' : 'I') +
    (mbtiScores['S'] > mbtiScores['N'] ? 'S' : 'N') +
    (mbtiScores['T'] > mbtiScores['F'] ? 'T' : 'F') +
    (mbtiScores['J'] > mbtiScores['P'] ? 'J' : 'P');

  document.getElementById('mbtiResult').textContent = mbti;

  fetch('data/animals.json')
    .then((response) => response.json())
    .then((animals) => {
      const recommendedPets = animals[mbti] || [];
      const petContainer = document.getElementById('petRecommendation');

      if (recommendedPets.length === 0) {
        petContainer.innerHTML = '<p>추천할 반려동물이 없습니다.</p>';
      } else {
        recommendedPets.forEach((pet) => {
          petContainer.innerHTML += `
                      <h3>${pet.name}</h3>
                      <p>${pet.description}</p>
                      <img src="${pet.image}" width="200">
                  `;
        });
      }
    });

  document
    .getElementById('restartButton')
    .addEventListener('click', function () {
      localStorage.clear();
      window.location.href = 'index.html';
    });
});

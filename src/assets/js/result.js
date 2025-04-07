document.addEventListener('DOMContentLoaded', function () {
  const answers = JSON.parse(localStorage.getItem('userAnswers')) || [];

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
        return;
      }

      document.getElementById('matchedBreed').textContent =
        recommendedPets[0].name;
      localStorage.setItem('matchedBreed', recommendedPets[0].name);

      recommendedPets.forEach((pet) => {
        const petItem = `
          <div class="pet_card">
            <strong class="pet">${pet.name}</strong>
            <p class="desc">${pet.description}</p>
            <div class="img_box">
              <img src="${pet.image}" alt="${pet.name}">
            </div>
          </div>
        `;
        petContainer.innerHTML += petItem;
      });

      fetchShelterAnimals(recommendedPets[0].name);
    })
    .catch((error) => {
      console.error('추천 동물 데이터 로딩 중 오류 발생:', error);
    });

  document
    .getElementById('restartButton')
    .addEventListener('click', function () {
      localStorage.clear();
      window.location.href = 'index.html';
    });
});

function fetchShelterAnimals(breed) {
  const apiKey = 'api 키 넣을 곳';
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1&pSize=50`;

  Promise.all([
    fetch(apiUrl).then((res) => res.json()),
    fetch('data/animals.json').then((res) => res.json()),
  ])
    .then(([apiData, animalsJson]) => {
      const animals = apiData.AbdmAnimalProtect[1].row;
      const adoptableAnimalsSummary = document.getElementById(
        'adoptableAnimalsSummary'
      );
      const summaryList =
        adoptableAnimalsSummary.querySelector('.summary_list');
      const desc = document.getElementById('desc');

      const filteredAnimals = animals.filter((animal) => {
        const breedName = animal.SPECIES_NM.replace(/^\[[^\]]+\] /, '');
        return breedName === breed;
      });

      if (filteredAnimals.length > 0) {
        if (desc) {
          desc.innerHTML = `당신과 잘 맞는 <strong>${breed}</strong> 품종의 유기동물을 확인하세요!`;
        }

        const displayAnimals = filteredAnimals.slice(0, 3);
        displayAnimals.forEach((animal) => {
          const listItem = createAnimalListItem(animal);
          summaryList.appendChild(listItem);
        });
        return;
      }

      if (desc) {
        desc.innerHTML = `<strong>${breed}</strong>이(가) 없어, 잘 맞는 다른 유기동물을 추천해드릴게요.`;
      }

      let category = '[기타축종]';
      outer: for (const mbti in animalsJson) {
        for (const item of animalsJson[mbti]) {
          if (item.name === breed) {
            category = item.category;
            break outer;
          }
        }
      }

      const similarAnimals = animals.filter((animal) =>
        animal.SPECIES_NM.startsWith(category)
      );

      const displayAnimals = similarAnimals.slice(0, 3);
      if (displayAnimals.length === 0) {
        desc.innerHTML = `
          현재 입양 가능한 유기동물이 없네요! 비슷한 종류도 없어요.
          <br>다른 아이들은 어떠세요?
        `;
        return;
      }

      displayAnimals.forEach((animal) => {
        const listItem = createAnimalListItem(animal);
        summaryList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('데이터 불러오기 중 오류 발생:', error);
      const summaryList = document
        .getElementById('adoptableAnimalsSummary')
        ?.querySelector('.summary_list');
      if (summaryList) {
        desc.innerHTML = `
          보호소 데이터를 불러오는 중 문제가 발생했습니다.
        `;
      }
    });
}

function createAnimalListItem(animal) {
  const listItem = document.createElement('li');
  listItem.className = 'list_item';
  listItem.innerHTML = `
    <div class="img_box">
      <img src="${animal.IMAGE_COURS}" alt="${animal.SPECIES_NM}">
    </div>
    <div class="info_box">
      <span class="name">${animal.SPECIES_NM}</span>
      <a href="tel:${animal.SHTER_TELNO}" class="shelter_number">${animal.SHTER_TELNO}</a>
      <span class="shelter">${animal.SHTER_NM}</span>
    </div>
  `;
  return listItem;
}

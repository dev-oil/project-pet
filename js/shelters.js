document.addEventListener('DOMContentLoaded', function () {
  // pages api 키 연동 방법 찾아두기
  const apiKey = 'API 키';
  const apiUrl = `https://openapi.gg.go.kr/AbdmAnimalProtect?Key=${apiKey}&Type=json&pIndex=1&pSize=50`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const shelterList = document.getElementById('shelterList');
      const shelters = data.AbdmAnimalProtect[1].row;

      if (!shelters || shelters.length === 0) {
        shelterList.innerHTML = '<p>보호소 정보를 불러올 수 없습니다.</p>';
        return;
      }

      shelters.forEach((shelter) => {
        const shelterItem = document.createElement('div');
        shelterItem.className = 'shelter_item';

        shelterItem.innerHTML = `
                  <h3 class="shelter_title">${shelter.SHTER_NM}</h3>
                  <img src="${shelter.IMAGE_COURS}" alt="유기동물 이미지" class="shelter_image">
                  <p class="shelter_address">주소: ${shelter.REFINE_ROADNM_ADDR}</p>
                  <p class="shelter_species">품종: ${shelter.SPECIES_NM}</p>
                  <p class="shelter_info">특징: ${shelter.SFETR_INFO}</p>
                  <p class="shelter_phone">연락처: <a href="tel:${shelter.SHTER_TELNO}">${shelter.SHTER_TELNO}</a></p>
              `;

        shelterList.appendChild(shelterItem);
      });
    })
    .catch((error) => {
      console.error('API 요청 중 오류 발생:', error);
      document.getElementById('shelterList').innerHTML =
        '<p>데이터를 불러오는 중 문제가 발생했습니다.</p>';
    });
});

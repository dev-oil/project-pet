import { useEffect, useState } from 'react';
import { fetchAllShelterAnimals, ShelterAnimal } from '../services/shelterAPI';

export const AnimalsPage = () => {
  const [animals, setAnimals] = useState<ShelterAnimal[]>([]);

  useEffect(() => {
    const loadAnimals = async () => {
      const result = await fetchAllShelterAnimals();
      setAnimals(result);
    };

    loadAnimals();
  }, []);

  return (
    <main className='container shelter_container'>
      <h2 className='title'>
        입양 가능한 <span id='shelterBreed'></span> 유기동물
      </h2>
      <span className='sub_title'>사지 말고, 입양하세요!</span>
      <p className='desc'>
        나의 털북숭이 친구와 친구를 보호 중인 보호소 정보를 함께 확인하세요.
      </p>
      <ul className='shelter_list'>
        {animals.map((animal) => (
          <li className='shelter_item' key={animal.ABDM_IDNTFY_NO}>
            <h3 className='shelter_title'>{animal.SHTER_NM}</h3>
            <img
              src={animal.IMAGE_COURS}
              alt='유기동물 이미지'
              className='shelter_image'
            />
            <p className='shelter_address'>주소: {animal.REFINE_ROADNM_ADDR}</p>
            <p className='shelter_species'>품종: {animal.SPECIES_NM}</p>
            <p className='shelter_info'>특징: {animal.SFETR_INFO}</p>
            <p className='shelter_phone'>
              연락처:
              <a href={`tel: ${animal.SHTER_TELNO}`} className='shelter_phone'>
                {animal.SHTER_TELNO}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

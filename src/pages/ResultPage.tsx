import { Link, useNavigate } from 'react-router-dom';
import animals from '../data/animals.json';
import { fetchShelterAnimals, ShelterAnimal } from '../services/shelterAPI';
import { useEffect, useState } from 'react';

// 타입 정의
type MBTILetter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
type MBTIType =
  | 'ENFP'
  | 'ENTP'
  | 'ESFP'
  | 'ESTP'
  | 'ISTJ'
  | 'INFJ'
  | 'INFP'
  | 'INTJ'
  | 'ISFJ'
  | 'ISTP'
  | 'ENFJ'
  | 'ESFJ'
  | 'INTP'
  | 'ISFP'
  | 'ENTJ'
  | 'ESTJ';
type Animal = {
  category: string;
  name: string;
  description: string;
  image: string;
};
type AnimalsMap = {
  [key in MBTIType]: Animal;
};

export const ResultPage = () => {
  const navigate = useNavigate();

  const animal = animals as AnimalsMap;
  const rawAnswers = localStorage.getItem('userAnswers');
  const answers: string[] = rawAnswers ? JSON.parse(rawAnswers) : [];

  const mbtiScores: Record<MBTILetter, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  answers.forEach((value) => {
    mbtiScores[value as MBTILetter]++;
  });

  const mbti =
    (mbtiScores['E'] > mbtiScores['I'] ? 'E' : 'I') +
    (mbtiScores['S'] > mbtiScores['N'] ? 'S' : 'N') +
    (mbtiScores['T'] > mbtiScores['F'] ? 'T' : 'F') +
    (mbtiScores['J'] > mbtiScores['P'] ? 'J' : 'P');

  const mbtiTyped = mbti as MBTIType;
  const pet = animal[mbtiTyped];

  const [shelterAnimals, setShelterAnimals] = useState<ShelterAnimal[]>([]);

  useEffect(() => {
    const loadShelters = async () => {
      const result = await fetchShelterAnimals(pet.name);
      setShelterAnimals(result);
    };

    loadShelters();
  }, [pet.name]);

  return (
    <main className='container result_container'>
      <section className='section'>
        <h2 className='title'>
          당신의 펫BTI 유형은? <span className='result'>{mbti}</span>
        </h2>
        <strong className='sub_title'>추천 반려동물</strong>
        <div className='recommendation_area'>
          <div className='pet_card' key={pet.name}>
            <strong className='pet'>{pet.name}</strong>
            <p className='desc'>{pet.description}</p>
            <div className='img_box'>
              <img src={pet.image} alt={pet.name} />
            </div>
          </div>
        </div>
        <button
          className='btn_black'
          onClick={() => {
            localStorage.clear();
            navigate('/test');
          }}
        >
          다시 시작하기
        </button>
      </section>
      <section className='section'>
        <h2 className='title'>입양 가능한 유기동물</h2>
        <p id='desc' className='desc'>
          당신과 잘 맞는 <strong>{pet.name}</strong> 품종의 유기동물을
          확인하세요!
        </p>
        <div className='summary'>
          <ul className='summary_list'>
            {shelterAnimals.map((animal) => {
              return (
                <li className='list_item' key={animal.ABDM_IDNTFY_NO}>
                  <div className='img_box'>
                    <img src={animal.IMAGE_COURS} alt='' />
                  </div>
                  <div className='info_box'>
                    <span className='name'>{animal.SPECIES_NM}</span>
                    <span className='shelter'>{animal.SHTER_NM}</span>
                    <a
                      href={`tel:${animal.SHTER_TELNO}`}
                      className='shelter_number'
                    >
                      {animal.SHTER_TELNO}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Link to='/shelters' className='btn_black'>
          더 많은 유기동물 보러가기
        </Link>
      </section>
    </main>
  );
};

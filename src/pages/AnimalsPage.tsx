import { useEffect, useState } from 'react';
import { fetchAllShelterAnimals, ShelterAnimal } from '../services/shelterAPI';
import { Link } from 'react-router-dom';

export const AnimalsPage = () => {
  const [animals, setAnimals] = useState<ShelterAnimal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<ShelterAnimal[]>([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [gender, setGender] = useState('');
  const [neutered, setNeutered] = useState('');
  const [region, setRegion] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadAnimals = async () => {
      const result = await fetchAllShelterAnimals();
      setAnimals(result);
      setFilteredAnimals(result);
    };

    loadAnimals();
  }, []);

  useEffect(() => {
    const keyword = searchKeyword.toLowerCase();

    const result = animals.filter((animal) => {
      const matchKeyword =
        animal.SPECIES_NM.toLowerCase().includes(keyword) ||
        animal.SHTER_NM.toLowerCase().includes(keyword);
      const matchAnimalType = animalType
        ? animal.SPECIES_NM.includes(animalType)
        : true;
      const matchGender = gender ? animal.SEX_NM === gender : true;
      const matchNeutered = neutered ? animal.NEUT_YN === neutered : true;
      const matchRegion = region
        ? animal.REFINE_ROADNM_ADDR?.includes(region)
        : true;

      return (
        matchKeyword &&
        matchAnimalType &&
        matchGender &&
        matchNeutered &&
        matchRegion
      );
    });

    setFilteredAnimals(result);
    setCurrentPage(1);
  }, [searchKeyword, animalType, gender, neutered, region, animals]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnimals = filteredAnimals.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);

  return (
    <main className='container shelter_container'>
      <h2 className='title'>입양 가능한 유기동물</h2>
      <span className='sub_title'>사지 말고, 입양하세요!</span>
      <p className='desc'>
        나의 털북숭이 친구와 친구를 보호 중인 보호소 정보를 함께 확인하세요.
      </p>

      <h3 className='summary'>
        {filteredAnimals.length}마리의 친구들이 평생의 친구를 기다리고 있어요!
      </h3>

      <div className='filter_container'>
        <input
          type='text'
          placeholder='품종 또는 보호소명을 검색하세요'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className='search_input'
        />
        <select
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
        >
          <option value=''>전체 유형</option>
          <option value='개'>개</option>
          <option value='고양이'>고양이</option>
          <option value='기타축종'>기타축종</option>
        </select>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value=''>전체 성별</option>
          <option value='M'>남아</option>
          <option value='F'>여아</option>
          <option value='Q'>미상</option>
        </select>
        <select value={neutered} onChange={(e) => setNeutered(e.target.value)}>
          <option value=''>전체 중성화</option>
          <option value='Y'>중성화 O</option>
          <option value='N'>중성화 X</option>
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value=''>전체 지역</option>
          <option value='가평군'>가평군</option>
          <option value='고양시'>고양시</option>
          <option value='과천시'>과천시</option>
          <option value='광명시'>광명시</option>
          <option value='광주시'>광주시</option>
          <option value='구리시'>구리시</option>
          <option value='군포시'>군포시</option>
          <option value='김포시'>김포시</option>
          <option value='남양주시'>남양주시</option>
          <option value='동두천시'>동두천시</option>
          <option value='부천시'>부천시</option>
          <option value='성남시'>성남시</option>
          <option value='수원시'>수원시</option>
          <option value='시흥시'>시흥시</option>
          <option value='안산시'>안산시</option>
          <option value='안성시'>안성시</option>
          <option value='안양시'>안양시</option>
          <option value='양주시'>양주시</option>
          <option value='양평군'>양평군</option>
          <option value='여주시'>여주시</option>
          <option value='연천군'>연천군</option>
          <option value='오산시'>오산시</option>
          <option value='용인시'>용인시</option>
          <option value='의왕시'>의왕시</option>
          <option value='의정부시'>의정부시</option>
          <option value='이천시'>이천시</option>
          <option value='파주시'>파주시</option>
          <option value='평택시'>평택시</option>
          <option value='포천시'>포천시</option>
          <option value='하남시'>하남시</option>
          <option value='화성시'>화성시</option>
        </select>

        <button
          onClick={() => {
            setSearchKeyword('');
            setAnimalType('');
            setGender('');
            setNeutered('');
            setRegion('');
          }}
          className='filter_reset_button'
        >
          필터 초기화
        </button>
      </div>

      <ul className='shelter_list'>
        {currentAnimals.map((animal) => (
          <li className='shelter_item' key={animal.ABDM_IDNTFY_NO}>
            <Link to={`/animals/${animal.ABDM_IDNTFY_NO}`} state={animal}>
              <div>
                <img
                  src={animal.IMAGE_COURS}
                  alt='유기동물 이미지'
                  className='shelter_image'
                />
              </div>
              <h3 className='shelter_title'>{animal.SPECIES_NM}</h3>
              <p className='shelter_address'>
                주소: {animal.REFINE_ROADNM_ADDR}
              </p>
              <p className='shelter_species'>{animal.SHTER_NM}</p>
              <p className='shelter_info'>특징: {animal.SFETR_INFO}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className='pagination'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ 이전
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          다음 ➡
        </button>
      </div>
    </main>
  );
};

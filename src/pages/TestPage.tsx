import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import questions from '../data/questions.json';
import { usePetBTIStore } from '../stores/petBTIStore';
import { MBTILetter } from '../types/mbti';

// type Question = {
//   question: string;
//   options: { text: string; value: string }[];
// };

export const TestPage = () => {
  const [current, setCurrent] = useState(0); // 몇번째 질문인지
  const [selected, setSelected] = useState<string | null>(null); // 사용자 선택 보기
  const { addAnswer } = usePetBTIStore();

  const navigate = useNavigate();

  const handleNext = () => {
    if (!selected) return;

    addAnswer(selected as MBTILetter); // 기존 상태에 추가
    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      navigate('/result');
    }
  };

  return (
    <main className='flex items-center h-[calc(100vh-75px)]'>
      <motion.section
        className='w-[90%] max-w-[800px] mx-auto text-center p-10 bg-white rounded-[16px] shadow-[10px_10px_30px_rgba(0,0,0,0.1)] flex flex-col'
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-[30px] font-bold'>🐾 펫BTI 테스트</h2>
        <div className='mt-5'>
          <p className='text-[20px] font-medium'>
            {questions[current].question}
          </p>

          {questions[current].options.map((option) => {
            const optionId = `option_${option.value}`;
            return (
              <div key={optionId} className='mt-5'>
                <input
                  type='radio'
                  id={optionId}
                  name='answer'
                  value={option.value}
                  checked={selected === option.value}
                  onChange={() => setSelected(option.value)}
                  className='sr-only peer'
                />
                <label
                  htmlFor={optionId}
                  tabIndex={0}
                  className='flex items-center justify-center bg-[#f7f7f7] px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 border-2 border-transparent text-center peer-checked:bg-black peer-checked:text-white peer-checked:border-black peer-checked:scale-[1.05] hover:bg-[#e0e0e0] peer-checked:hover:bg-black'
                >
                  {option.text}
                </label>
              </div>
            );
          })}
        </div>
        <button onClick={handleNext} disabled={!selected} className='btn_black'>
          다음
        </button>
      </motion.section>
    </main>
  );
};

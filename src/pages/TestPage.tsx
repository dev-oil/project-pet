import { useState } from 'react';
import questions from '../data/questions.json';
import { useNavigate } from 'react-router-dom';

type Question = {
  question: string;
  options: { text: string; value: string }[];
};

export const TestPage = () => {
  const [current, setCurrent] = useState(0); // 몇번째 질문인지
  const [selected, setSelected] = useState<string | null>(null); // 사용자 선택 보기
  const [answers, setAnswers] = useState<string[]>([]); // 사용자 전체 답변

  const navigate = useNavigate();

  const handleNext = () => {
    if (!selected) return;

    setAnswers((prev) => [...prev, selected]); // 답변에 추가
    setSelected(null); // 선택 초기화하기

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // 마지막 질문이면?
      localStorage.setItem(
        'userAnswers',
        JSON.stringify([...answers, selected])
      );
      navigate('/result');
    }
  };

  return (
    <main className='container test_container'>
      <section className='section'>
        <h2 className='title'>🐾 펫BTI 테스트</h2>
        <div className='question_area'>
          <p className='question'>{questions[current].question}</p>

          {questions[current].options.map((option) => {
            const optionId = `option_${option.value}`;
            return (
              <div key={optionId} className='input_box'>
                <input
                  type='radio'
                  id={optionId}
                  name='answer'
                  value={option.value}
                  checked={selected === option.value}
                  onChange={() => setSelected(option.value)}
                  className='sr-only'
                />
                <label htmlFor={optionId} tabIndex={0}>
                  {option.text}
                </label>
              </div>
            );
          })}
        </div>
        <button onClick={handleNext} disabled={!selected} className='btn_black'>
          다음
        </button>
      </section>
    </main>
  );
};

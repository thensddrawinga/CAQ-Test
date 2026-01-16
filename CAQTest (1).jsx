import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ChevronLeft, Share2, Download } from 'lucide-react';

const AQTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timings, setTimings] = useState({});
  const [currentTimer, setCurrentTimer] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);

  const questions = [
    {
      type: 'A',
      id: 'A1',
      difficulty: 'easy',
      question: '다음 중 가장 부조화한 색상 조합은?',
      options: [
        { colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'], correct: false },
        { colors: ['#FFA500', '#00FF00', '#FF00FF'], correct: true },
        { colors: ['#2C3E50', '#3498DB', '#95A5A6'], correct: false },
        { colors: ['#E74C3C', '#C0392B', '#D35400'], correct: false }
      ],
      explanation: '주황(Orange), 초록(Green), 마젠타(Magenta)는 색상환에서 균등하게 떨어진 순수 원색 조합이지만, 채도가 모두 최고치여서 시각적 충돌이 심합니다. 조화로운 배색은 명도나 채도에 변화를 주어야 합니다.',
      principle: '고채도 원색의 동시 사용은 시각 피로를 유발합니다.'
    },
    {
      type: 'A',
      id: 'A2',
      difficulty: 'easy',
      question: '다음 중 가장 부조화한 색상 조합은?',
      options: [
        { colors: ['#1ABC9C', '#16A085', '#27AE60'], correct: false },
        { colors: ['#F39C12', '#E67E22', '#D35400'], correct: false },
        { colors: ['#FFFF00', '#FF0000', '#00FFFF'], correct: true },
        { colors: ['#9B59B6', '#8E44AD', '#713B87'], correct: false }
      ],
      explanation: '노랑, 빨강, 시안은 감산 혼합(인쇄)의 원색입니다. 순수한 형태로 함께 사용하면 각 색이 서로를 압도하려 해 극도의 불안정감을 조성합니다.',
      principle: '원색 삼각형 배색은 채도 조절이 필수입니다.'
    },
    {
      type: 'A',
      id: 'A3',
      difficulty: 'medium',
      question: '다음 2색 조합에 가장 어울리는 색은?',
      baseColors: ['#DC143C', '#FFD700'],
      options: [
        { colors: ['#DC143C', '#FFD700', '#FF6347'], correct: false },
        { colors: ['#DC143C', '#FFD700', '#32CD32'], correct: false },
        { colors: ['#DC143C', '#FFD700', '#4169E1'], correct: true },
        { colors: ['#DC143C', '#FFD700', '#FF1493'], correct: false }
      ],
      explanation: '빨강(Crimson)과 노랑(Gold)의 따뜻한 조합에는 파랑(Royal Blue)을 더해 120도 간격의 삼각배색을 완성하는 것이 가장 조화롭습니다. 토마토와 핫핑크는 빨강과 너무 가까워 단조롭고, 라임그린은 노랑과 가까워 대비가 약합니다.',
      principle: '삼각배색(120도 간격)은 색상환에서 균등한 간격으로 안정적인 조화를 만듭니다.'
    },
    {
      type: 'A',
      id: 'A4',
      difficulty: 'medium',
      question: '다음 2색 조합에 가장 어울리는 색은?',
      baseColors: ['#98D8C8', '#E6B0FF'],
      options: [
        { colors: ['#98D8C8', '#E6B0FF', '#4A90A4'], correct: false },
        { colors: ['#98D8C8', '#E6B0FF', '#FFB6A3'], correct: true },
        { colors: ['#98D8C8', '#E6B0FF', '#B19CD9'], correct: false },
        { colors: ['#98D8C8', '#E6B0FF', '#7FD8BE'], correct: false }
      ],
      explanation: '민트(Mint)와 라벤더(Lavender)의 파스텔 조합에는 피치(Peach)를 더해 부드러운 삼색 조화를 완성합니다. 진한 청록은 톤이 맞지 않고, 보라는 라벤더와 너무 유사하며, 진한 민트는 기존 민트와 중복됩니다.',
      principle: '파스텔 톤끼리 조합할 때는 색상환에서 균형있게 배치하되 채도와 명도를 일관되게 유지해야 합니다.'
    },
    {
      type: 'A',
      id: 'A5',
      difficulty: 'hard',
      question: '다음 2색 조합에 가장 어울리는 색은?',
      baseColors: ['#6B8E9F', '#CD8B76'],
      options: [
        { colors: ['#6B8E9F', '#CD8B76', '#A4B8C4'], correct: false },
        { colors: ['#6B8E9F', '#CD8B76', '#D4A68C'], correct: false },
        { colors: ['#6B8E9F', '#CD8B76', '#8BA3B1'], correct: false },
        { colors: ['#6B8E9F', '#CD8B76', '#9CAF88'], correct: true }
      ],
      explanation: '더스티 블루(Dusty Blue)와 테라코타(Terracotta)의 세련된 조합에는 세이지 그린(Sage Green)을 더해 자연스러운 삼색 조화를 완성합니다. 밝은 블루그레이와 어두운 블루는 더스티 블루와 너무 유사하고, 밝은 테라코타는 기존 테라코타와 중복됩니다.',
      principle: '미묘한 톤의 조합에서는 색상, 채도, 명도 모두를 고려해 균형을 맞춰야 합니다.'
    },
    {
      type: 'B',
      id: 'B1',
      difficulty: 'easy',
      question: '다음 중 명도가 가장 높은(밝은) 색상은?',
      options: [
        { bg: '#4682B4', text: '#4682B4', correct: false },
        { bg: '#F5DEB3', text: '#F5DEB3', correct: true },
        { bg: '#BA55D3', text: '#BA55D3', correct: false },
        { bg: '#CD5C5C', text: '#CD5C5C', correct: false }
      ],
      explanation: '밀(Wheat, #F5DEB3)이 가장 밝습니다. RGB 평균값이 약 227입니다. 스틸블루(#4682B4)는 약 117, 미디엄오키드(#BA55D3)는 약 149, 인디언레드(#CD5C5C)는 약 153입니다. 밝은 크림색이 다른 색상들보다 명확히 밝습니다.',
      principle: '서로 다른 색상에서 명도를 판단할 때는 채도와 색상을 배제하고 순수한 밝기만 봐야 합니다.'
    },
    {
      type: 'B',
      id: 'B2',
      difficulty: 'medium',
      question: '다음 중 명도 대비가 가장 큰 조합은?',
      options: [
        { colors: ['#E74C3C', '#2980B9'], correct: false },
        { colors: ['#F39C12', '#8E44AD'], correct: true },
        { colors: ['#1ABC9C', '#E67E22'], correct: false },
        { colors: ['#3498DB', '#C0392B'], correct: false }
      ],
      explanation: '주황(#F39C12)과 보라(#8E44AD)는 색상이 선명해 보이지만, RGB 평균값이 각각 약 169와 99로 명도 차이가 약 70입니다. 빨강-파랑, 청록-주황은 색상 차이는 크지만 명도는 비슷합니다.',
      principle: '색상 대비와 명도 대비는 다릅니다. 선명한 색상도 명도가 비슷하면 구분이 어렵습니다.'
    },
    {
      type: 'B',
      id: 'B3',
      difficulty: 'medium',
      question: '다음 색상들을 명도가 낮은 순서(어두운 → 밝은)대로 배열한 것은?',
      options: [
        { colors: ['#2C3E50', '#9B59B6', '#3498DB', '#F1C40F'], correct: true },
        { colors: ['#9B59B6', '#2C3E50', '#3498DB', '#F1C40F'], correct: false },
        { colors: ['#F1C40F', '#3498DB', '#9B59B6', '#2C3E50'], correct: false },
        { colors: ['#2C3E50', '#3498DB', '#9B59B6', '#F1C40F'], correct: false }
      ],
      explanation: '정답은 다크블루(#2C3E50, RGB 평균 약 62) → 보라(#9B59B6, RGB 평균 약 136) → 파랑(#3498DB, RGB 평균 약 146) → 노랑(#F1C40F, RGB 평균 약 208)입니다. 보라와 파랑이 비슷해 보이지만 보라가 약간 더 어둡습니다.',
      principle: '명도는 색상과 무관하게 순수한 밝기를 나타냅니다. 비슷한 색상 계열이라도 명도 차이가 있습니다.'
    },
    {
      type: 'B',
      id: 'B4',
      difficulty: 'hard',
      question: '다음 2색 사이의 중간 명도를 가진 색은?',
      baseColors: ['#2E4053', '#F9E79F'],
      options: [
        { bg: '#5D6D7E', text: '#5D6D7E', correct: false },
        { bg: '#85929E', text: '#85929E', correct: true },
        { bg: '#D6DBDF', text: '#D6DBDF', correct: false },
        { bg: '#F8C471', text: '#F8C471', correct: false }
      ],
      explanation: '진한 청회색(#2E4053, RGB 평균 약 62)과 연한 노랑(#F9E79F, RGB 평균 약 234)의 중간 명도는 약 148입니다. 중간 회색(#85929E, RGB 평균 약 142)이 가장 중간에 가깝습니다. 어두운 회색(#5D6D7E, 약 110)은 너무 어둡고, 밝은 회색(#D6DBDF, 약 217)과 연한 주황(#F8C471, 약 188)은 너무 밝습니다.',
      principle: '중간 명도는 두 색상의 밝기를 눈으로 비교해 중간쯤 되는 색을 찾아야 합니다.'
    },
    {
      type: 'B',
      id: 'B5',
      difficulty: 'medium',
      question: '다음 중 명도가 가장 높은(밝은) 색상은?',
      options: [
        { bg: '#8B8B8B', text: '#8B8B8B', correct: false },
        { bg: '#919191', text: '#919191', correct: false },
        { bg: '#979797', text: '#979797', correct: true },
        { bg: '#8E8E8E', text: '#8E8E8E', correct: false }
      ],
      explanation: '회색(#979797)은 RGB 값이 151로, 다른 옵션들(회색 #8B8B8B는 139, 회색 #919191은 145, 회색 #8E8E8E는 142)보다 높습니다. 명도는 RGB 값이 클수록 높아지며, 미세한 차이도 시각적 위계에 영향을 줍니다.',
      principle: '명도 감각은 미세한 그레이스케일 차이를 구분하는 능력에서 시작됩니다.'
    },
    {
      type: 'C',
      id: 'C1',
      difficulty: 'easy',
      question: '다음 중 채도 대비가 가장 큰 조합은?',
      options: [
        { colors: ['#FF6B6B', '#FF8989', '#FFA7A7'], correct: false },
        { colors: ['#FF0000', '#FFB3B3', '#FFE6E6'], correct: true },
        { colors: ['#CC8080', '#CC9999', '#CCB3B3'], correct: false },
        { colors: ['#E74C3C', '#EC7063', '#F1948A'], correct: false }
      ],
      explanation: '순수 빨강(#FF0000)과 극저채도 핑크(#FFB3B3, #FFE6E6)의 조합이 채도 대비가 가장 큽니다. 순색과 파스텔을 함께 사용하면 최대 채도 대비를 만들 수 있습니다. 다른 조합들은 모두 비슷한 채도 범위 내에 있어 대비가 작습니다.',
      principle: '채도 대비는 순색과 파스텔을 함께 사용할 때 극대화됩니다. 강조와 배경의 구분이 명확해집니다.'
    },
    {
      type: 'C',
      id: 'C2',
      difficulty: 'easy',
      question: '다음 중 채도가 가장 낮은 색상은?',
      options: [
        { colors: ['#FF6B6B', '#FFB347', '#FFA07A'], correct: false },
        { colors: ['#87CEEB', '#98D8E8', '#B0E0E6'], correct: true },
        { colors: ['#FF1493', '#FF69B4', '#FFB6C1'], correct: false },
        { colors: ['#32CD32', '#90EE90', '#98FB98'], correct: false }
      ],
      explanation: '연한 하늘색 조합(스카이블루, 연청색, 파우더블루)이 가장 채도가 낮습니다. 채도는 색의 선명도를 나타내며, 흰색이 섞일수록 채도가 낮아집니다. 산호색, 핑크, 연두 조합들은 더 선명하여 채도가 높습니다.',
      principle: '파스텔 톤 중에서도 색상에 따라 채도 차이가 있으며, 청색 계열이 상대적으로 차분합니다.'
    },
    {
      type: 'C',
      id: 'C3',
      difficulty: 'medium',
      question: '다음 중 채도가 가장 높은 색상은?',
      options: [
        { colors: ['#FF8A80', '#FFAB91', '#FFCCBC'], correct: false },
        { colors: ['#80CBC4', '#A7FFEB', '#B2DFDB'], correct: false },
        { colors: ['#F48FB1', '#F06292', '#EC407A'], correct: true },
        { colors: ['#9FA8DA', '#7986CB', '#9575CD'], correct: false }
      ],
      explanation: '핑크 계열(#F48FB1, #F06292, #EC407A)이 가장 채도가 높습니다. 같은 밝기 범위지만 순색에 가까워 RGB 값의 차이가 큽니다. 산호색, 터쿼이즈, 라벤더는 비슷한 밝기지만 회색이나 흰색이 더 많이 섞여 채도가 낮습니다.',
      principle: '비슷한 밝기에서도 순색에 가까울수록 채도가 높습니다. RGB 최대-최소값의 차이로 판단합니다.'
    },
    {
      type: 'C',
      id: 'C4',
      difficulty: 'hard',
      question: '다음 중 진정한 무채색(채도 0)은?',
      options: [
        { colors: ['#E8E8E8', '#EBEBEB', '#EEEEEE'], correct: true },
        { colors: ['#E8E6E3', '#EBE9E6', '#EEECEA'], correct: false },
        { colors: ['#E3E8E8', '#E6EBEB', '#EAEEEE'], correct: false },
        { colors: ['#E8E3E8', '#EBE6EB', '#EEEAEE'], correct: false }
      ],
      explanation: '첫 번째 조합(#E8E8E8, #EBEBEB, #EEEEEE)만이 RGB 값이 모두 동일한 진정한 무채색입니다. 나머지는 베이지 기미(R>G,B), 청록 기미(G,B>R), 라벤더 기미(R,B>G)가 있습니다. 무채색은 RGB 값이 완전히 같아야 하며, 1-2 차이도 색감을 만듭니다.',
      principle: '무채색은 R=G=B 조건을 만족해야 합니다. 아무리 미묘해도 RGB 값이 다르면 색상(Hue)이 존재합니다.'
    },
    {
      type: 'C',
      id: 'C5',
      difficulty: 'medium',
      question: '자연스러운 그라데이션 조합은?',
      options: [
        { colors: ['#FF00FF', '#00FFFF', '#FFFF00'], correct: false },
        { colors: ['#667EEA', '#764BA2', '#F093FB'], correct: true },
        { colors: ['#FF0000', '#00FF00', '#0000FF'], correct: false },
        { colors: ['#FFFF00', '#FF00FF', '#00FFFF'], correct: false }
      ],
      explanation: '블루-퍼플-핑크는 색상환에서 인접한 색들로, 채도와 명도가 점진적으로 변화합니다. 이는 자연광의 변화와 유사해 시각적으로 편안합니다.',
      principle: '유사색 그라데이션이 보색 그라데이션보다 자연스럽습니다.'
    }
  ];

  const artists = [
    { name: 'Wassily Kandinsky', traits: { harmony: 0.95, value: 0.85, saturation: 0.92 } },
    { name: 'Mark Rothko', traits: { harmony: 0.88, value: 0.95, saturation: 0.78 } },
    { name: 'Yayoi Kusama', traits: { harmony: 0.82, value: 0.75, saturation: 0.95 } },
    { name: 'Paul Rand', traits: { harmony: 0.92, value: 0.90, saturation: 0.85 } }
  ];

  // 타이머 시작
  useEffect(() => {
    if (!started || showResults) return;
    
    const interval = setInterval(() => {
      setCurrentTimer(prev => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [started, showResults, currentQuestion]);

  // 진행상황 저장
  useEffect(() => {
    if (started && !showResults) {
      localStorage.setItem('aqTestProgress', JSON.stringify({
        currentQuestion,
        answers,
        timings,
        timestamp: Date.now()
      }));
    }
  }, [currentQuestion, answers, timings, started, showResults]);

  // 시간 기반 보너스 계산 (더 세밀하게)
  const getTimeBonus = (seconds) => {
    if (seconds <= 3) return 10;
    if (seconds <= 5) return 9;
    if (seconds <= 7) return 8;
    if (seconds <= 10) return 7;
    if (seconds <= 15) return 6;
    if (seconds <= 20) return 5;
    if (seconds <= 25) return 4;
    if (seconds <= 30) return 3;
    if (seconds <= 40) return 2;
    return 1;
  };

  const handleAnswer = (optionIndex) => {
    const questionId = questions[currentQuestion].id;
    const timeTaken = currentTimer;
    
    const newAnswers = { ...answers, [questionId]: optionIndex };
    const newTimings = { ...timings, [questionId]: timeTaken };
    
    setAnswers(newAnswers);
    setTimings(newTimings);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentTimer(0);
    } else {
      // Start calculation animation
      setIsCalculating(true);
      setCalculationProgress(0);
      
      // Simulate calculation progress - slower
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 5 + 2; // Random increment 2-7% (slower)
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            setIsCalculating(false);
            setShowResults(true);
            localStorage.removeItem('aqTestProgress');
          }, 500);
        }
        setCalculationProgress(Math.min(progress, 100));
      }, 200); // 200ms interval (slower)
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentTimer(timings[questions[currentQuestion - 1].id] || 0);
    }
  };

  const getResults = () => {
    let typeAScore = 0;
    let typeBScore = 0;
    let typeCScore = 0;
    let totalTime = 0;

    questions.forEach(q => {
      const userAnswer = answers[q.id];
      const timeTaken = timings[q.id] || 0;
      totalTime += timeTaken;

      if (userAnswer !== undefined && q.options[userAnswer].correct) {
        // 난이도별 기본 점수
        let basePoints = 10;
        if (q.difficulty === 'easy') basePoints = 6;
        if (q.difficulty === 'medium') basePoints = 10;
        if (q.difficulty === 'hard') basePoints = 14;
        
        const timeBonus = getTimeBonus(timeTaken);
        const totalPoints = basePoints + timeBonus;

        if (q.type === 'A') typeAScore += totalPoints;
        if (q.type === 'B') typeBScore += totalPoints;
        if (q.type === 'C') typeCScore += totalPoints;
      }
    });

    const avgScore = (typeAScore + typeBScore + typeCScore) / 3;
    const aqScore = Math.round((70 + (avgScore / 100) * 75) * 10) / 10;
    
    // Calculate percentile with detailed granularity across all levels
    let percentile;
    if (aqScore >= 143) {
      percentile = 0.2;
    } else if (aqScore >= 140) {
      percentile = 0.5;
    } else if (aqScore >= 138) {
      percentile = 1;
    } else if (aqScore >= 135) {
      percentile = 1.5;
    } else if (aqScore >= 133) {
      percentile = 2;
    } else if (aqScore >= 130) {
      percentile = 2.5;
    } else if (aqScore >= 128) {
      percentile = 3;
    } else if (aqScore >= 125) {
      percentile = 4;
    } else if (aqScore >= 123) {
      percentile = 5;
    } else if (aqScore >= 120) {
      percentile = 7;
    } else if (aqScore >= 118) {
      percentile = 9;
    } else if (aqScore >= 115) {
      percentile = 12;
    } else if (aqScore >= 113) {
      percentile = 15;
    } else if (aqScore >= 110) {
      percentile = 20;
    } else if (aqScore >= 108) {
      percentile = 25;
    } else if (aqScore >= 105) {
      percentile = 30;
    } else if (aqScore >= 103) {
      percentile = 35;
    } else if (aqScore >= 100) {
      percentile = 40;
    } else if (aqScore >= 98) {
      percentile = 45;
    } else if (aqScore >= 95) {
      percentile = 55;
    } else if (aqScore >= 93) {
      percentile = 60;
    } else if (aqScore >= 90) {
      percentile = 65;
    } else if (aqScore >= 88) {
      percentile = 70;
    } else if (aqScore >= 85) {
      percentile = 75;
    } else if (aqScore >= 83) {
      percentile = 80;
    } else if (aqScore >= 80) {
      percentile = 85;
    } else {
      percentile = 90;
    }

    const normalizedScores = {
      harmony: typeAScore / 100,
      value: typeBScore / 100,
      saturation: typeCScore / 100
    };

    let closestArtist = artists[0];
    let smallestDistance = Infinity;

    artists.forEach(artist => {
      // Use Euclidean distance but normalized properly
      const distance = Math.sqrt(
        Math.pow(normalizedScores.harmony - artist.traits.harmony, 2) +
        Math.pow(normalizedScores.value - artist.traits.value, 2) +
        Math.pow(normalizedScores.saturation - artist.traits.saturation, 2)
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestArtist = artist;
      }
    });

    // Convert distance to similarity percentage
    // Max distance in 3D unit cube is sqrt(3) ≈ 1.732
    // Very strict scaling: low scores get <5%, medium ~20-30%, high ~40-55%
    const maxDistance = Math.sqrt(3);
    const rawSimilarity = (1 - (smallestDistance / maxDistance)) * 100;
    // Apply very strict scaling: multiply by 0.35 and add minimal base
    const similarity = Math.max(1, Math.min(60, Math.round(rawSimilarity * 0.35)));
    const avgTime = totalTime / questions.length;

    return {
      aqScore,
      percentile,
      typeAScore: Math.round(typeAScore * 10) / 10,
      typeBScore: Math.round(typeBScore * 10) / 10,
      typeCScore: Math.round(typeCScore * 10) / 10,
      closestArtist: closestArtist.name,
      similarity,
      totalTime: Math.round(totalTime * 10) / 10,
      avgTime: Math.round(avgTime * 10) / 10
    };
  };

  // Calculation screen
  if (isCalculating) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (calculationProgress / 100) * circumference;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 flex items-center justify-center p-4 relative">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">결과 계산 중</h2>
            <p className="text-sm text-gray-500">데이터 처리 중</p>
          </div>
          
          {/* Circular progress */}
          <div className="flex justify-center">
            <div className="relative w-28 h-28">
              <svg className="transform -rotate-90 w-28 h-28">
                {/* Background circle */}
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="#1F2937"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{Math.round(calculationProgress)}%</span>
              </div>
            </div>
          </div>
          
          {/* Calculating steps */}
          <div className="space-y-1.5 text-center text-gray-500 text-xs">
            <div className={`transition-opacity ${calculationProgress > 10 ? 'opacity-100' : 'opacity-30'}`}>
              색상 결합 분석 중
            </div>
            <div className={`transition-opacity ${calculationProgress > 40 ? 'opacity-100' : 'opacity-30'}`}>
              명도 조절 평가 중
            </div>
            <div className={`transition-opacity ${calculationProgress > 70 ? 'opacity-100' : 'opacity-30'}`}>
              채도 배분 계산 중
            </div>
            <div className={`transition-opacity ${calculationProgress > 90 ? 'opacity-100' : 'opacity-30'}`}>
              최종 점수 산출 중
            </div>
          </div>
        </div>
        
        {/* Silver Seal Badge */}
        <div className="fixed bottom-8 right-8 flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-light tracking-wide">CAQ GLOBAL STANDARD</p>
            <p className="text-[10px] text-gray-300 font-light">Version 1.0</p>
          </div>
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              <defs>
                <radialGradient id="silverBase2">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#E8E8E8" />
                  <stop offset="60%" stopColor="#C0C0C0" />
                  <stop offset="100%" stopColor="#909090" />
                </radialGradient>
                
                <radialGradient id="metalShine2" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#F0F0F0" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D0D0D0" stopOpacity="0" />
                </radialGradient>
                
                <linearGradient id="rainbowSheen2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.2" />
                  <stop offset="25%" stopColor="#00FFFF" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FFFF00" stopOpacity="0.2" />
                  <stop offset="75%" stopColor="#FF00FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
                </linearGradient>
                
                <clipPath id="roundedSquare2">
                  <rect x="5" y="5" width="90" height="90" rx="20" ry="20"/>
                </clipPath>
              </defs>
              
              <rect x="5" y="5" width="90" height="90" rx="20" ry="20" fill="url(#silverBase2)" stroke="#888" strokeWidth="1"/>
              <rect x="5" y="5" width="90" height="90" rx="20" ry="20" fill="url(#metalShine2)" clipPath="url(#roundedSquare2)"/>
              <rect x="5" y="5" width="90" height="90" rx="20" ry="20" fill="url(#rainbowSheen2)" clipPath="url(#roundedSquare2)"/>
              
              <path d="M50 20 L54 38 L72 38 L58 48 L62 66 L50 56 L38 66 L42 48 L28 38 L46 38 Z" 
                    fill="#F0F0F0" stroke="#B0B0B0" strokeWidth="0.5"/>
              
              <circle cx="50" cy="50" r="13" fill="url(#silverBase2)" stroke="#A0A0A0" strokeWidth="1"/>
              <circle cx="47" cy="47" r="5" fill="#FFFFFF" opacity="0.6"/>
              
              <text x="50" y="49" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#555">C.A.Q</text>
              <text x="50" y="56" textAnchor="middle" fontSize="4.5" fill="#777">CERTIFIED</text>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    const savedProgress = localStorage.getItem('aqTestProgress');
    const canResume = savedProgress && JSON.parse(savedProgress).timestamp > Date.now() - 3600000;

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 flex items-center justify-center p-4 relative">
        <div className="max-w-2xl w-full p-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">C.A.Q Test</h1>
            <p className="text-xl text-gray-600">Color Aesthetic Quotient</p>
            <p className="text-lg text-gray-700">색채 감각을 측정하는 표준화된 지능 테스트입니다.</p>
            <p className="text-sm text-gray-500">정확한 측정을 위해 디스플레이 밝기를 80% 이상으로 설정하고, 주변 광원을 차단하십시오.</p>
            <div className="space-y-3">
              <Button 
                onClick={() => setStarted(true)}
                className="w-full py-6 text-lg"
              >
                테스트 시작하기
              </Button>
              {canResume && (
                <Button 
                  onClick={() => {
                    const data = JSON.parse(savedProgress);
                    setCurrentQuestion(data.currentQuestion);
                    setAnswers(data.answers);
                    setTimings(data.timings);
                    setStarted(true);
                  }}
                  variant="outline"
                  className="w-full py-4"
                >
                  이어서 하기
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Silver Seal Badge */}
        <div className="fixed bottom-8 right-8 flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-light tracking-wide">CAQ GLOBAL STANDARD</p>
            <p className="text-[10px] text-gray-300 font-light">Version 1.0</p>
          </div>
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              <defs>
                {/* Silver metallic base with strong highlights */}
                <radialGradient id="silverBase">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#E8E8E8" />
                  <stop offset="60%" stopColor="#C0C0C0" />
                  <stop offset="100%" stopColor="#909090" />
                </radialGradient>
                
                {/* Additional metallic shine */}
                <radialGradient id="metalShine" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#F0F0F0" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D0D0D0" stopOpacity="0" />
                </radialGradient>
                
                {/* Rainbow holographic overlay - static */}
                <linearGradient id="rainbowSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF00FF" stopOpacity="0.2" />
                  <stop offset="25%" stopColor="#00FFFF" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FFFF00" stopOpacity="0.2" />
                  <stop offset="75%" stopColor="#FF00FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
                </linearGradient>
                
                {/* Apple-style rounded square clip path */}
                <clipPath id="roundedSquare">
                  <rect x="5" y="5" width="90" height="90" rx="20" ry="20"/>
                </clipPath>
              </defs>
              
              {/* Silver base rounded square */}
              <rect x="5" y="5" width="90" height="90" rx="20" ry="20" fill="url(#silverBase)" stroke="#888" strokeWidth="1"/>
              
              {/* Metallic shine overlay */}
              <rect x="5" y="5" width="90" height="90" rx="20" ry="20" fill="url(#metalShine)" clipPath="url(#roundedSquare)"/>
              
              {/* Rainbow sheen overlay - static */}
              <rect x="5" y="5" width="90" height="90" rx="20" ry="20" fill="url(#rainbowSheen)" clipPath="url(#roundedSquare)"/>
              
              {/* Star points - silver with shine - centered */}
              <path d="M50 20 L54 38 L72 38 L58 48 L62 66 L50 56 L38 66 L42 48 L28 38 L46 38 Z" 
                    fill="#F0F0F0" stroke="#B0B0B0" strokeWidth="0.5"/>
              
              {/* Center circle - silver with gradient */}
              <circle cx="50" cy="50" r="13" fill="url(#silverBase)" stroke="#A0A0A0" strokeWidth="1"/>
              
              {/* Center shine spot */}
              <circle cx="47" cy="47" r="5" fill="#FFFFFF" opacity="0.6"/>
              
              {/* Text */}
              <text x="50" y="49" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#555">C.A.Q</text>
              <text x="50" y="56" textAnchor="middle" fontSize="4.5" fill="#777">CERTIFIED</text>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = getResults();
    const maxScore = Math.max(results.typeAScore, results.typeBScore, results.typeCScore);
    const minScore = Math.min(results.typeAScore, results.typeBScore, results.typeCScore);

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 p-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Your C.A.Q Score</h2>
              <div 
                className="text-7xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #a3e635, #f472b6, #3b82f6, #ef4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {results.aqScore}
              </div>
              
              {/* Level Badge with Stats */}
              <div className="flex flex-col items-center gap-2">
                <span className={`text-sm px-4 py-2 rounded-full font-bold ${
                  results.aqScore >= 128 ? 'bg-purple-100 text-purple-800' :
                  results.aqScore >= 113 ? 'bg-blue-100 text-blue-800' :
                  results.aqScore >= 98 ? 'bg-green-100 text-green-800' :
                  results.aqScore >= 83 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {results.aqScore >= 128 ? 'Level-Ultra' :
                   results.aqScore >= 113 ? 'Level-Advanced' :
                   results.aqScore >= 98 ? 'Level-Normal' :
                   results.aqScore >= 83 ? 'Level-Basic' : 'Level-Entry'}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>상위 {results.percentile}%</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>평균 {results.avgTime}초</span>
                  </div>
                </div>
              </div>
              
              {/* Description without box */}
              <p className="max-w-2xl mx-auto text-sm text-gray-600 leading-relaxed mt-4">
                {results.aqScore >= 128 && 
                  "보이지 않는 차이까지 잡아내는 눈입니다. 남들은 똑같다고 느끼는 아주 미세한 색의 결이나 밝기 차이를 본능적으로 구분해 냅니다. 눈이 받아들이는 정보를 뇌가 거의 완벽하게 재구성하고 있는 상태입니다."}
                {results.aqScore >= 113 && results.aqScore < 128 &&
                  "세상을 남들보다 더 선명하게 보고 있습니다. 복잡한 색채들 사이에서도 질서를 아주 빠르게 찾아냅니다. 표준보다 훨씬 높은 해상도로 세상을 파악하고 있어, 작은 어긋남이나 오차를 쉽게 발견할 수 있는 수준입니다."}
                {results.aqScore >= 98 && results.aqScore < 113 &&
                  "가장 안정적이고 건강한 감각을 가졌습니다. 우리가 일상에서 마주하는 색과 빛을 왜곡 없이 가장 정확하게 받아들입니다. 대부분의 사람들이 공통적으로 느끼는 색의 기준에 가장 부합하는 표준적인 눈을 가졌습니다."}
                {results.aqScore >= 83 && results.aqScore < 98 &&
                  "세세한 부분보다는 전체적인 흐름에 강합니다. 아주 미묘한 차이에는 조금 무딘 편이지만, 전체적인 색감이나 큰 윤곽을 파악하는 데는 무리가 없습니다. 정교한 구분보다는 전반적인 분위기를 읽는 데 익숙한 상태입니다."}
                {results.aqScore < 83 &&
                  "색을 단순하고 명확하게 인지하는 편입니다. 복잡하고 섬세한 농도 차이보다는, 확실하고 뚜렷한 색상 위주로 정보를 받아들입니다. 미세한 구분이 필요한 환경에서는 주변 조명의 도움을 받는 것이 좋습니다."}
              </p>
            </div>
          </Card>

          {/* Shareable Image Card */}
          <Card className="p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">공유용 이미지</h3>
            <div 
              id="share-card"
              className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden"
              style={{
                background: results.aqScore >= 128 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                           results.aqScore >= 113 ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
                           results.aqScore >= 98 ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' :
                           results.aqScore >= 83 ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' :
                           'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
              }}
            >
              {/* Pattern Overlay for texture */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: results.aqScore >= 128 ? 
                    'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.5) 10px, rgba(255,255,255,.5) 20px)' :
                    results.aqScore >= 113 ?
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,.3) 0%, transparent 50%)' :
                    results.aqScore >= 98 ?
                    'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,.3) 15px, rgba(255,255,255,.3) 30px)' :
                    'none'
                }}
              />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                {/* Logo/Title */}
                <div className="text-xs font-light tracking-wider mb-1">C.A.Q TEST</div>
                
                {/* Emoji Icon */}
                <div className="text-3xl mb-1">
                  {results.aqScore >= 128 ? '👑' :
                   results.aqScore >= 113 ? '💎' :
                   results.aqScore >= 98 ? '⭐' :
                   results.aqScore >= 83 ? '🌱' : '🔰'}
                </div>
                
                {/* Main Score */}
                <div className="text-5xl font-bold mb-1">{results.aqScore}</div>
                
                {/* Level Badge with Title */}
                <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full mb-1">
                  <span className="text-sm font-bold">
                    {results.aqScore >= 128 ? 'Level-Ultra' :
                     results.aqScore >= 113 ? 'Level-Advanced' :
                     results.aqScore >= 98 ? 'Level-Normal' :
                     results.aqScore >= 83 ? 'Level-Basic' : 'Level-Entry'}
                  </span>
                </div>
                
                {/* Fun Title */}
                <div className="text-sm font-semibold mb-1">
                  {results.aqScore >= 128 ? '색채의 마에스트로' :
                   results.aqScore >= 113 ? '컬러 천재' :
                   results.aqScore >= 98 ? '색감 보유자' :
                   results.aqScore >= 83 ? '색채 입문자' : '색채 초보'}
                </div>
                
                {/* Percentile */}
                <div className="text-base font-semibold mb-2">
                  상위 {results.percentile}%
                </div>
                
                {/* Bottom Text */}
                <div className="absolute bottom-4 text-center">
                  <div className="text-xs opacity-80">Color Aesthetic Quotient</div>
                  <div className="text-xs opacity-60 mt-0.5">색채 감각 지능 테스트</div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4 mb-4">
              위 이미지를 스크린샷 찍어서 SNS에 공유해보세요! 📸
            </p>
            
            {/* Test Button */}
            <button
              onClick={() => alert('버튼 작동 테스트!')}
              className="w-full mb-3 px-4 py-2 bg-red-500 text-white rounded-lg font-bold"
            >
              🔴 테스트 - 이 버튼 눌러보세요!
            </button>
            
            {/* Share Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  const url = window.location.href;
                  const text = `나는 C.A.Q ${results.aqScore}점! 상위 ${results.percentile}%! 너도 테스트해봐!`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'C.A.Q 테스트', text: text + '\n' + url })
                      .catch(() => alert('링크: ' + url));
                  } else {
                    alert('✅ 링크 복사!\n\n' + text + '\n\n' + url);
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                <Share2 className="w-4 h-4" />
                테스트 링크 공유
              </button>
              
              <button
                onClick={() => {
                  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                  if (isMobile) {
                    alert('📸 스크린샷 찍기:\n\niPhone: 전원+볼륨Up\nAndroid: 전원+볼륨Down\n\n갤러리 저장 후 인스타/카톡 공유!');
                  } else {
                    alert('📸 스크린샷 찍기:\n\nWindows: Win+Shift+S\nMac: Cmd+Shift+4\n\n저장 후 SNS 공유!');
                  }
                }}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                <Download className="w-4 h-4" />
                스크린샷 안내
              </button>
            </div>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">세부 지수</h3>
            <p className="text-xs text-gray-500 mb-6">
              L-U: Ultra · L-A: Advanced · L-N: Normal · L-B: Basic · L-E: Entry
            </p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">색상 결합 지수</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{results.typeAScore}점</span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      results.typeAScore >= 80 ? 'bg-purple-100 text-purple-800' :
                      results.typeAScore >= 65 ? 'bg-blue-100 text-blue-800' :
                      results.typeAScore >= 50 ? 'bg-green-100 text-green-800' :
                      results.typeAScore >= 35 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {results.typeAScore >= 80 ? 'L-U' :
                       results.typeAScore >= 65 ? 'L-A' :
                       results.typeAScore >= 50 ? 'L-N' :
                       results.typeAScore >= 35 ? 'L-B' : 'L-E'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-900 h-3 rounded-full transition-all" style={{ width: results.typeAScore + '%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">명도 조절 지수</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{results.typeBScore}점</span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      results.typeBScore >= 80 ? 'bg-purple-100 text-purple-800' :
                      results.typeBScore >= 65 ? 'bg-blue-100 text-blue-800' :
                      results.typeBScore >= 50 ? 'bg-green-100 text-green-800' :
                      results.typeBScore >= 35 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {results.typeBScore >= 80 ? 'L-U' :
                       results.typeBScore >= 65 ? 'L-A' :
                       results.typeBScore >= 50 ? 'L-N' :
                       results.typeBScore >= 35 ? 'L-B' : 'L-E'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-900 h-3 rounded-full transition-all" style={{ width: results.typeBScore + '%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">채도 배분 지수</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{results.typeCScore}점</span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      results.typeCScore >= 80 ? 'bg-purple-100 text-purple-800' :
                      results.typeCScore >= 65 ? 'bg-blue-100 text-blue-800' :
                      results.typeCScore >= 50 ? 'bg-green-100 text-green-800' :
                      results.typeCScore >= 35 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {results.typeCScore >= 80 ? 'L-U' :
                       results.typeCScore >= 65 ? 'L-A' :
                       results.typeCScore >= 50 ? 'L-N' :
                       results.typeCScore >= 35 ? 'L-B' : 'L-E'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-900 h-3 rounded-full transition-all" style={{ width: results.typeCScore + '%' }}></div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">강점 분석</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-green-800 text-lg mb-3">강점</h4>
                <p className="text-green-700">
                  {maxScore === results.typeAScore && "색상 조화를 직관적으로 파악하는 능력이 뛰어납니다."}
                  {maxScore === results.typeBScore && "명도 대비를 효과적으로 활용할 수 있습니다."}
                  {maxScore === results.typeCScore && "채도 밸런스 감각이 탁월합니다."}
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <h4 className="font-bold text-orange-800 text-lg mb-3">보완점</h4>
                <p className="text-orange-700">
                  {minScore === results.typeAScore && "색상 이론 학습을 통해 보색 관계를 이해하면 도움이 됩니다."}
                  {minScore === results.typeBScore && "명도 대비 연습이 필요합니다."}
                  {minScore === results.typeCScore && "채도 조절 훈련이 필요합니다."}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">세부 해석</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-900 pl-4">
                <h4 className="font-bold text-gray-800 mb-2">색상 결합 지수 ({results.typeAScore}점)</h4>
                <p className="text-gray-600">
                  {results.typeAScore >= 80 && "탁월한 색상 조화 감각을 보유하고 있습니다."}
                  {results.typeAScore >= 60 && results.typeAScore < 80 && "양호한 색상 조합 능력을 갖추고 있습니다."}
                  {results.typeAScore < 60 && "색상 이론 기초 학습이 필요합니다."}
                </p>
              </div>

              <div className="border-l-4 border-gray-800 pl-4">
                <h4 className="font-bold text-gray-800 mb-2">명도 조절 지수 ({results.typeBScore}점)</h4>
                <p className="text-gray-600">
                  {results.typeBScore >= 80 && "명도 대비를 탁월하게 활용합니다."}
                  {results.typeBScore >= 60 && results.typeBScore < 80 && "적절한 명도 대비 감각을 보유하고 있습니다."}
                  {results.typeBScore < 60 && "명도 차이 인식 훈련이 필요합니다."}
                </p>
              </div>

              <div className="border-l-4 border-gray-700 pl-4">
                <h4 className="font-bold text-gray-800 mb-2">채도 배분 지수 ({results.typeCScore}점)</h4>
                <p className="text-gray-600">
                  {results.typeCScore >= 80 && "채도 밸런스 감각이 뛰어납니다."}
                  {results.typeCScore >= 60 && results.typeCScore < 80 && "기본적인 채도 조절 능력을 갖추고 있습니다."}
                  {results.typeCScore < 60 && "채도 개념 학습이 필요합니다."}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">분야별 적성</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">강점 분야</h4>
                <ul className="space-y-1 text-gray-700">
                  {results.typeAScore >= 60 && <li>브랜드 아이덴티티 디자인</li>}
                  {results.typeBScore >= 60 && <li>UI/UX 디자인</li>}
                  {results.typeCScore >= 60 && <li>그래픽 디자인</li>}
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">주의 분야</h4>
                <ul className="space-y-1 text-gray-700">
                  {results.typeAScore < 60 && <li>색상 조합이 중요한 작업</li>}
                  {results.typeBScore < 60 && <li>가독성 중심 디자인</li>}
                  {results.typeCScore < 60 && <li>채도 밸런스 조절 작업</li>}
                </ul>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button 
              onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
              className="px-8 py-4 text-lg mr-4 bg-gray-600 hover:bg-gray-700"
            >
              {showDetailedAnalysis ? '상세 분석 숨기기' : '상세 분석 보기'}
            </Button>
            <Button 
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setTimings({});
                setCurrentTimer(0);
                setShowResults(false);
                setStarted(false);
                setShowDetailedAnalysis(false);
                localStorage.removeItem('aqTestProgress');
              }}
              className="px-8 py-4 text-lg"
            >
              다시 테스트하기
            </Button>
          </div>

          {showDetailedAnalysis && (
            <Card className="p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">문항별 상세 분석</h3>
              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer !== undefined && q.options[userAnswer].correct;
                  const timeTaken = timings[q.id] || 0;
                  const timeBonus = isCorrect ? getTimeBonus(timeTaken) : 0;
                  
                  return (
                    <div key={q.id} className={`p-6 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                      <div className="flex items-start gap-4">
                        <div className={`text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? '✓' : '✗'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">
                            문제 {idx + 1}: {q.question}
                          </h4>
                          <div className="flex items-center gap-4 mb-3">
                            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {isCorrect ? '정답입니다!' : '오답입니다.'}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{timeTaken.toFixed(1)}초</span>
                              {isCorrect && <span className="text-green-600 font-semibold ml-2">(+{timeBonus}점)</span>}
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded mb-3">
                            <p className="text-sm font-semibold text-gray-700 mb-2">해설:</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{q.explanation}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm font-semibold text-gray-900 mb-1">핵심 원리:</p>
                            <p className="text-gray-700 text-sm">{q.principle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gray-900 h-2 rounded-full transition-all" style={{ width: progress + '%' }}></div>
        </div>

        <Card className="p-6 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-500">
                문제 {currentQuestion + 1} / {questions.length}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-900">
                  {currentQ.type === 'A' && '색상 결합'}
                  {currentQ.type === 'B' && '명도 조절'}
                  {currentQ.type === 'C' && '채도 배분'}
                </span>
                <div className="flex items-center gap-1 text-base font-mono font-bold text-gray-700">
                  <Clock className="w-4 h-4" />
                  <span>{currentTimer.toFixed(1)}s</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900">{currentQ.question}</h3>

            {currentQ.type === 'A' && currentQ.baseColors && (
              <div className="flex gap-4 justify-center p-4 bg-gray-50/50 rounded-lg">
                {currentQ.baseColors.map((color, i) => (
                  <div key={i} className="w-24 h-24 rounded-lg shadow-lg" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            )}

            <div className={currentQ.baseColors ? "grid grid-cols-2 gap-3" : "space-y-3"}>
              {currentQ.type === 'A' && currentQ.baseColors && currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="p-4 bg-white/70 backdrop-blur-lg rounded-lg hover:bg-white/90 hover:shadow-xl transition-all shadow-lg"
                >
                  <div className="flex gap-3 justify-center">
                    <div className="w-20 h-20 rounded-lg shadow-md" style={{ backgroundColor: option.colors[2] }}></div>
                  </div>
                </button>
              ))}

              {currentQ.type === 'A' && !currentQ.baseColors && currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full p-4 bg-white/70 backdrop-blur-lg rounded-lg hover:bg-white/90 hover:shadow-xl transition-all shadow-lg"
                >
                  <div className="flex gap-3 justify-center">
                    {option.colors.map((color, i) => (
                      <div key={i} className="w-20 h-20 rounded-lg shadow-md" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {currentQ.type === 'B' && currentQ.baseColors && (
              <div className="flex gap-4 justify-center p-4 bg-gray-50/50 rounded-lg mb-3">
                {currentQ.baseColors.map((color, i) => (
                  <div key={i} className="w-24 h-24 rounded-lg shadow-lg" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            )}

            <div className={currentQ.baseColors ? "grid grid-cols-2 gap-3" : "space-y-3"}>
              {currentQ.type === 'B' && currentQ.baseColors && currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="p-4 bg-white/70 backdrop-blur-lg rounded-lg hover:bg-white/90 hover:shadow-xl transition-all shadow-lg"
                >
                  <div className="flex gap-3 justify-center">
                    <div className="w-20 h-20 rounded-lg shadow-md" style={{ backgroundColor: option.bg }}></div>
                  </div>
                </button>
              ))}

              {currentQ.type === 'B' && !currentQ.baseColors && currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full p-4 bg-white/70 backdrop-blur-lg rounded-lg hover:bg-white/90 hover:shadow-xl transition-all shadow-lg"
                >
                  {option.colors ? (
                    <div className="flex gap-3 justify-center items-center">
                      {option.colors.map((color, i) => (
                        <React.Fragment key={i}>
                          <div
                            className="w-20 h-20 rounded-lg shadow-md flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: color }}
                          >
                            {option.colors.length > 2 ? i + 1 : ''}
                          </div>
                          {i === 0 && option.colors.length === 2 && (
                            <div className="text-2xl text-gray-400">→</div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      <div 
                        className="w-32 h-20 rounded-lg flex items-center justify-center text-sm font-bold shadow-md"
                        style={{ backgroundColor: option.bg, color: option.text }}
                      >
                        Sample Text
                      </div>
                    </div>
                  )}
                </button>
              ))}

              {currentQ.type === 'C' && currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full p-4 bg-white/70 backdrop-blur-lg rounded-lg hover:bg-white/90 hover:shadow-xl transition-all shadow-lg"
                >
                  <div className="flex gap-3 justify-center">
                    {option.colors.map((color, i) => (
                      <div key={i} className="w-20 h-20 rounded-lg shadow-md" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-full mt-4"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                이전 문제로
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AQTest;
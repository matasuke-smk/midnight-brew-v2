import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  plan: string;
  rating: number;
  comment: string;
  period: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'T.K.様',
      plan: 'Enthusiast',
      rating: 5,
      comment: '毎月届くコーヒーが楽しみで仕方ありません。今まで知らなかった世界中の素晴らしいコーヒーに出会えて、朝の時間が特別なひとときになりました。品質も申し分なく、友人にも勧めています。',
      period: 'ご利用歴: 8ヶ月'
    },
    {
      id: 2,
      name: 'M.S.様',
      plan: 'Connoisseur',
      rating: 5,
      comment: 'コーヒー好きとして様々なサービスを試しましたが、Midnight Brewの品質は群を抜いています。生産者の物語も知ることができ、一杯のコーヒーがより深く味わえるようになりました。',
      period: 'ご利用歴: 1年2ヶ月'
    },
    {
      id: 3,
      name: 'Y.H.様',
      plan: 'Discovery',
      rating: 5,
      comment: 'コーヒー初心者でしたが、テイスティングノートのおかげで味の違いがわかるようになりました。焙煎の香りから楽しめて、コーヒーの奥深さを知ることができました。',
      period: 'ご利用歴: 4ヶ月'
    },
    {
      id: 4,
      name: 'R.N.様',
      plan: 'Enthusiast',
      rating: 5,
      comment: '在宅ワークが増えて、美味しいコーヒーの重要性を実感しています。毎月違う豆が届くので飽きることがなく、仕事の合間のコーヒーブレイクが最高のリフレッシュタイムです。',
      period: 'ご利用歴: 10ヶ月'
    },
    {
      id: 5,
      name: 'A.T.様',
      plan: 'Connoisseur',
      rating: 5,
      comment: 'ギフトとしても何度か利用しています。パッケージも美しく、受け取った方にもとても喜んでもらえました。品質、サービス、全てにおいて満足しています。',
      period: 'ご利用歴: 2年3ヶ月'
    },
    {
      id: 6,
      name: 'K.I.様',
      plan: 'Discovery',
      rating: 5,
      comment: 'コーヒーショップ巡りが趣味でしたが、Midnight Brewのコーヒーは店舗では味わえない特別なものばかり。カッピングスコア85点以上という基準に嘘はありませんね。',
      period: 'ご利用歴: 6ヶ月'
    }
  ];

  // simple-right-only.htmlと同様に3セット作成
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const nextTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      const next = prev + 1;
      
      // simple-right-only.htmlと同じ：アニメーション完了後にリセット判定
      setTimeout(() => {
        // 2セット目の最後（testimonials.length * 2）に到達したら、瞬間的に0にリセット
        if (next >= testimonials.length * 2) {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setCurrentIndex(0);
            
            // 次回のアニメーションのためにtransitionを元に戻す
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = 'transform 500ms ease-in-out';
              }
            }, 50);
          }
        }
        setIsTransitioning(false);
      }, 500);
      
      return next;
    });
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      // 現在が0の場合は、2セット目の最後（testimonials.length * 2 - 1）に移動
      if (prev <= 0) {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'none';
          const next = testimonials.length * 2 - 1;
          
          // 次回のアニメーションのためにtransitionを元に戻す
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.style.transition = 'transform 500ms ease-in-out';
            }
            setIsTransitioning(false);
          }, 50);
          
          return next;
        }
        return prev; // fallback
      } else {
        // 通常のケース：前のスライドに戻る
        const next = prev - 1;
        
        // トランジション完了後にisTransitioningを解除
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
        
        return next;
      }
    });
  };

  // 自動スライド機能 (3秒ごと)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  // タッチスライドのためのハンドラー
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    containerRef.current?.setAttribute('data-start-x', touch.clientX.toString());
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat(containerRef.current?.getAttribute('data-start-x') || '0');
    const endX = touch.clientX;
    const diff = startX - endX;

    // 50px以上スワイプした場合は常に右方向に進む（循環）
    if (Math.abs(diff) > 50) {
      nextTestimonial(); // どちらのスワイプでも右に進む
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-gold-500 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-midnight-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-midnight-50 mb-6">
            お客様の<span className="text-gold-500">声</span>
          </h2>
          <p className="text-xl text-midnight-100 max-w-3xl mx-auto">
            Midnight Brewをご利用いただいているお客様から、たくさんの嬉しいお声をいただいています。
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial - スライド対応 */}
          <div 
            ref={containerRef}
            className="overflow-hidden max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              ref={sliderRef}
              className="flex"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 500ms ease-in-out'
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="w-full flex-shrink-0">
                  <div className="bg-midnight-900 rounded-2xl p-8 md:p-12 border border-gray-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300">
                    <div className="text-center mb-8">
                      <Quote className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                      <div className="flex justify-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>

                    <blockquote className="text-lg md:text-xl text-midnight-50 leading-relaxed text-center mb-8">
                      "{testimonial.comment}"
                    </blockquote>

                    <div className="text-center">
                      <div className="text-gold-500 font-semibold text-lg mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-midnight-100 text-sm mb-1">
                        {testimonial.plan} プラン
                      </div>
                      <div className="text-midnight-100 text-sm">
                        {testimonial.period}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - 前後のボタン（PC・スマホ共通） */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-midnight-900 hover:bg-gold-500/10 border border-gray-700 hover:border-gold-500 rounded-full p-4 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-gold-500" />
            </button>
            <button
              onClick={nextTestimonial}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-midnight-900 hover:bg-gold-500/10 border border-gray-700 hover:border-gold-500 rounded-full p-4 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-gold-500" />
            </button>
          </div>

          {/* Indicators - スマホでは大きめに表示 */}
          <div className="flex justify-center space-x-2 sm:space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={nextTestimonial}
                className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  index === (currentIndex % testimonials.length) ? 'bg-gold-500 scale-110' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-midnight-900 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-gold-500 mb-2">4.9</div>
            <div className="text-midnight-100">平均評価</div>
            <div className="flex justify-center mt-2">
              {renderStars(5)}
            </div>
          </div>
          <div className="text-center bg-midnight-900 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-gold-500 mb-2">98%</div>
            <div className="text-midnight-100">お客様満足度</div>
          </div>
          <div className="text-center bg-midnight-900 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-gold-500 mb-2">12</div>
            <div className="text-midnight-100">平均継続月数</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
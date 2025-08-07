import React from 'react';
import { Diamond, Clock, BookOpen } from 'lucide-react';

const Commitment: React.FC = () => {
  const commitments = [
    {
      icon: <Diamond className="w-12 h-12 text-gold-500" />,
      title: '世界の0.1%の希少豆',
      description: 'COE85点以上の厳選された豆のみを使用。世界中のコーヒー農園から最高品質の豆だけをお届けします。',
      details: [
        'カッピングスコア85点以上',
        'シングルオリジン豆',
        'トレーサビリティ完備'
      ]
    },
    {
      icon: <Clock className="w-12 h-12 text-gold-500" />,
      title: '焙煎後24時間以内発送',
      description: 'ご注文いただいてから焙煎を開始。最高の鮮度を保つため、焙煎後24時間以内に発送いたします。',
      details: [
        '注文後焙煎開始',
        '真空パック包装',
        '温度・湿度管理配送'
      ]
    },
    {
      icon: <BookOpen className="w-12 h-12 text-gold-500" />,
      title: '生産者の物語',
      description: 'QRコードから農園の物語、生産者の想い、栽培方法まで詳しく知ることができます。',
      details: [
        'QRコード付き',
        '農園訪問動画',
        'カッピングノート'
      ]
    }
  ];

  return (
    <section id="commitment" className="py-20 bg-midnight-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-midnight-50 mb-6">
            私たちの<span className="text-gold-500">こだわり</span>
          </h2>
          <p className="text-xl text-midnight-100 max-w-3xl mx-auto">
            最高品質のコーヒーをお届けするために、豆の選定から配送まで、すべての工程にこだわっています。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {commitments.map((commitment, index) => (
            <div key={index} className="bg-midnight-900 rounded-2xl p-8 border border-gray-700 hover:border-gold-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {commitment.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-midnight-50 mb-4">
                  {commitment.title}
                </h3>
                <p className="text-midnight-100 mb-6">
                  {commitment.description}
                </p>
              </div>

              <ul className="space-y-3">
                {commitment.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gold-500 rounded-full flex-shrink-0" />
                    <span className="text-midnight-100 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-midnight-900 rounded-2xl p-8 border border-gold-500/20">
            <h3 className="text-2xl font-serif font-bold text-midnight-50 mb-4">
              品質への約束
            </h3>
            <p className="text-midnight-100 mb-6 max-w-4xl mx-auto">
              私たちは単にコーヒーを販売するのではなく、生産者の想いと最高品質の味わいを、
              一杯一杯に込めてお届けします。それが Midnight Brew の使命です。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-500 mb-2">100%</div>
                <div className="text-midnight-100 text-sm">品質保証</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-500 mb-2">50+</div>
                <div className="text-midnight-100 text-sm">提携農園数</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-500 mb-2">24h</div>
                <div className="text-midnight-100 text-sm">焙煎〜発送</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;
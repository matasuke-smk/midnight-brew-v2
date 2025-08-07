import React, { useState } from 'react';
import { MapPin, Thermometer, Coffee, Award, ChevronDown, ChevronUp } from 'lucide-react';

const MonthlyCoffee: React.FC = () => {
  const [showStory, setShowStory] = useState(false);

  const coffeeDetails = {
    origin: 'エチオピア イルガチェフェ',
    farm: 'Konga Cooperative',
    altitude: '1,950-2,100m',
    process: 'Natural',
    score: 89,
    flavors: [
      { name: 'ブルーベリー', intensity: 90 },
      { name: 'ダークチョコレート', intensity: 75 },
      { name: 'ワイン', intensity: 60 }
    ],
    nextMonth: {
      origin: 'コロンビア ウィラ',
      preview: 'チョコレートとナッツの甘みが調和した、バランスの良い味わい'
    }
  };

  return (
    <section id="monthly-coffee" className="py-20 bg-midnight-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 text-sm font-medium">今月の厳選豆</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-midnight-50 mb-6">
            今月の<span className="text-gold-500">コーヒー</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coffee Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-coffee-500 to-midnight-800 rounded-2xl flex items-center justify-center">
              <Coffee className="w-24 h-24 text-gold-500 opacity-50" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold-500 text-midnight-900 rounded-full w-20 h-20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{coffeeDetails.score}</div>
                <div className="text-xs font-medium">点</div>
              </div>
            </div>
          </div>

          {/* Coffee Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-serif font-bold text-midnight-50 mb-2">
                {coffeeDetails.origin}
              </h3>
              <p className="text-gold-500 text-lg font-medium mb-6">
                {coffeeDetails.farm}
              </p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-midnight-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <span className="text-midnight-100 text-sm">標高</span>
                </div>
                <div className="text-midnight-50 font-semibold">
                  {coffeeDetails.altitude}
                </div>
              </div>

              <div className="bg-midnight-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="w-4 h-4 text-gold-500" />
                  <span className="text-midnight-100 text-sm">精製方法</span>
                </div>
                <div className="text-midnight-50 font-semibold">
                  {coffeeDetails.process}
                </div>
              </div>
            </div>

            {/* Flavor Profile */}
            <div className="bg-midnight-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-midnight-50 mb-4">
                フレーバープロファイル
              </h4>
              <div className="space-y-4">
                {coffeeDetails.flavors.map((flavor, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-midnight-50">{flavor.name}</span>
                      <span className="text-gold-500">{flavor.intensity}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${flavor.intensity}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Producer Story */}
            <div className="bg-midnight-800 rounded-xl p-6">
              <button
                onClick={() => setShowStory(!showStory)}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-lg font-semibold text-midnight-50">
                  生産者ストーリー
                </h4>
                {showStory ? (
                  <ChevronUp className="w-5 h-5 text-gold-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gold-500" />
                )}
              </button>
              
              {showStory && (
                <div className="mt-4 text-midnight-100 text-sm leading-relaxed">
                  <p className="mb-4">
                    Konga Cooperativeは、エチオピアのイルガチェフェ地域で1971年に設立された協同組合です。
                    現在約2,000の小規模農家が加盟し、伝統的な栽培方法を守りながら高品質なコーヒーを生産しています。
                  </p>
                  <p className="mb-4">
                    標高1,950-2,100mの理想的な環境で育てられたこのコーヒーは、
                    完熟チェリーのみを手摘みで収穫し、天日乾燥によるナチュラル精製を行っています。
                  </p>
                  <p>
                    協同組合は教育支援や医療サービスの提供を通じて、
                    地域コミュニティの発展にも貢献しています。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Next Month Preview */}
        <div className="mt-16">
          <div className="bg-midnight-800 rounded-2xl p-8 border border-gold-500/20">
            <div className="text-center">
              <h4 className="text-xl font-serif font-bold text-midnight-50 mb-4">
                来月のコーヒー予告
              </h4>
              <div className="text-gold-500 font-semibold text-lg mb-2">
                {coffeeDetails.nextMonth.origin}
              </div>
              <p className="text-midnight-100 max-w-2xl mx-auto">
                {coffeeDetails.nextMonth.preview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyCoffee;
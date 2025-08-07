import React, { useState } from 'react';
import { Check, Star, Coffee, Clock, Gift } from 'lucide-react';
import SignupModal from './SignupModal';

interface Plan {
  id: string;
  name: string;
  description: string;
  weight: string;
  varieties: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  isPopular?: boolean;
  targetUser: string;
}

interface PlansProps {
  onOpenSignup?: (plan: any) => void;
}

const Plans: React.FC<PlansProps> = ({ onOpenSignup }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const plans: Plan[] = [
    {
      id: 'discovery',
      name: 'Discovery',
      description: '2-3杯/週の方に',
      weight: '100g',
      varieties: '2種',
      originalPrice: 4800,
      discountedPrice: 2400,
      targetUser: '週に2-3杯の方におすすめ',
      features: [
        '世界の希少豆2種類',
        '焙煎後24時間以内発送',
        'テイスティングノート付き',
        '生産者ストーリー',
        'いつでも解約可能'
      ]
    },
    {
      id: 'enthusiast',
      name: 'Enthusiast',
      description: '毎日1杯の方に',
      weight: '200g',
      varieties: '2種',
      originalPrice: 8800,
      discountedPrice: 4400,
      isPopular: true,
      targetUser: '毎日1杯の方におすすめ',
      features: [
        '世界の希少豆2種類',
        '焙煎後24時間以内発送',
        'テイスティングノート付き',
        '生産者ストーリー',
        '焙煎度選択可能',
        '挽き方選択可能',
        'いつでも解約可能'
      ]
    },
    {
      id: 'connoisseur',
      name: 'Connoisseur',
      description: '毎日2杯以上の方に',
      weight: '200g',
      varieties: '3種',
      originalPrice: 12800,
      discountedPrice: 6400,
      targetUser: '毎日2杯以上の方におすすめ',
      features: [
        '世界の希少豆3種類',
        '焙煎後24時間以内発送',
        'テイスティングノート付き',
        '生産者ストーリー',
        '焙煎度選択可能',
        '挽き方選択可能',
        '限定豆への優先アクセス',
        'カッピング動画付き',
        'いつでも解約可能'
      ]
    }
  ];

  const handlePlanSelect = (plan: Plan) => {
    if (onOpenSignup) {
      onOpenSignup(plan);
    } else {
      setSelectedPlan(plan);
      setIsSignupModalOpen(true);
    }
  };

  return (
    <section id="plans" className="py-20 bg-midnight-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-midnight-50 mb-6">
            あなたに合う<span className="text-gold-500">プラン</span>を選択
          </h2>
          <p className="text-xl text-midnight-100 max-w-3xl mx-auto mb-4">
            ライフスタイルに合わせて、3つのプランをご用意しました。
            <br />
            すべてのプランで<span className="text-gold-500 font-semibold">初回50%OFF</span>
          </p>
          <div className="flex items-center justify-center space-x-6 text-lg">
            <div className="flex items-center space-x-2 text-green-500">
              <span className="text-2xl">🚚</span>
              <span className="font-semibold">全プラン送料無料</span>
            </div>
            <div className="flex items-center space-x-2 text-midnight-100">
              <span className="text-2xl">🎁</span>
              <span>いつでも解約可能</span>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-midnight-900 rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/30 ${
                plan.isPopular
                  ? 'border-gold-500 shadow-lg shadow-gold-500/20'
                  : 'border-gray-700 hover:border-gold-500/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gold-500 text-midnight-900 px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1 animate-pulse shadow-lg shadow-gold-500/50">
                    <Star className="w-4 h-4" />
                    <span>人気No.1</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif font-bold text-midnight-50 mb-2">
                  {plan.name}
                </h3>
                <p className="text-midnight-100 mb-4">{plan.description}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-4xl font-bold text-midnight-50">
                    ¥{plan.discountedPrice.toLocaleString()}
                  </span>
                  <div className="text-right">
                    <div className="text-lg text-midnight-100 line-through">
                      ¥{plan.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-400 font-semibold">
                      初回50%OFF
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 text-sm text-midnight-100 mb-6">
                  <div className="flex items-center space-x-1">
                    <Coffee className="w-4 h-4" />
                    <span>{plan.weight} × {plan.varieties}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>月1回</span>
                  </div>
                </div>

                <p className="text-sm text-gold-500 font-medium">
                  {plan.targetUser}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-midnight-100 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 ${
                  plan.isPopular
                    ? 'bg-gold-500 text-midnight-900 hover:bg-gold-400 shadow-lg'
                    : 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-midnight-900'
                }`}
              >
                このプランを選択
              </button>
            </div>
          ))}
        </div>

        {/* Common Benefits */}
        <div className="bg-midnight-900 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-serif font-bold text-midnight-50 mb-6 text-center">
            すべてのプランに含まれる特典
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-gold-500" />
              </div>
              <h4 className="text-lg font-semibold text-midnight-50 mb-2">
                85点以上の希少豆
              </h4>
              <p className="text-midnight-100 text-sm">
                COE85点以上の世界でも限られた希少豆のみを厳選
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gold-500" />
              </div>
              <h4 className="text-lg font-semibold text-midnight-50 mb-2">
                最高の鮮度
              </h4>
              <p className="text-midnight-100 text-sm">
                注文後に焙煎し、24時間以内に発送で最高の鮮度をお届け
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-gold-500" />
              </div>
              <h4 className="text-lg font-semibold text-midnight-50 mb-2">
                柔軟な変更・解約
              </h4>
              <p className="text-midnight-100 text-sm">
                いつでもスキップ、一時停止、解約が可能。縛りなし
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
};

export default Plans;
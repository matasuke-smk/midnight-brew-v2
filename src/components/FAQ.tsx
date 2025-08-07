import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '送料はかかりますか？',
      answer: '全国一律送料無料でお届けいたします。離島や一部地域も追加料金は発生しません。'
    },
    {
      id: 2,
      question: '解約はいつでもできますか？',
      answer: 'はい、いつでも解約可能です。マイページから簡単にお手続きいただけます。解約手数料や違約金は一切ございません。'
    },
    {
      id: 3,
      question: '豆の挽き方は選べますか？',
      answer: 'はい、以下の4種類からお選びいただけます：豆のまま、粗挽き、中挽き、細挽き。ご注文時やマイページでいつでも変更可能です。'
    },
    {
      id: 4,
      question: '支払い方法は？',
      answer: 'クレジットカード（Visa、MasterCard、JCB、American Express、Diners）に対応しております。毎月自動決済となります。'
    },
    {
      id: 5,
      question: '配送日の指定はできますか？',
      answer: '月1回の定期配送となりますが、マイページから次回配送日の変更や一時停止が可能です。配送希望日の7日前までにご変更ください。'
    },
    {
      id: 6,
      question: 'ギフト対応はしていますか？',
      answer: '現在準備中です3ヶ月後にギフトオプションを追加予定です。美しいギフトボックスとメッセージカードをご用意いたします。'
    },
    {
      id: 7,
      question: 'コーヒー豆の保存方法は？',
      answer: '直射日光を避け、密閉容器で冷暗所に保管してください。開封後は2週間以内にお飲みいただくことで、最高の風味をお楽しみいただけます。'
    },
    {
      id: 6,
      question: 'ギフトとして利用できますか？',
      answer: 'はい、ギフト配送に対応しております。ギフトメッセージカード（無料）もご利用いただけます。ギフト専用ページからお申し込みください。'
    },
    {
      id: 7,
      question: 'アレルギー対応はありますか？',
      answer: 'コーヒー豆自体にアレルゲンは含まれませんが、農園での栽培・加工過程で他の作物との交差汚染の可能性があります。詳細は各商品のテイスティングノートをご確認ください。'
    },
    {
      id: 8,
      question: '焙煎度は変更できますか？',
      answer: 'EnthusiastプランとConnoisseurプランでは、浅煎り・中煎り・深煎りからお選びいただけます。Discoveryプランは最適な焙煎度でのお届けとなります。'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-midnight-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 text-sm font-medium">よくあるご質問</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-midnight-50 mb-6">
            <span className="text-gold-500">FAQ</span>
          </h2>
          <p className="text-xl text-midnight-100">
            お客様からよくいただくご質問をまとめました。
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="bg-midnight-900 rounded-xl border border-gray-700 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/30 transition-all duration-300">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-midnight-800/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-midnight-50 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-gold-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gold-500" />
                  )}
                </div>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4 border-t border-gray-700">
                  <p className="text-midnight-100 leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-midnight-900 rounded-2xl p-8 border border-gold-500/20">
            <h3 className="text-xl font-serif font-bold text-midnight-50 mb-4">
              他にご質問はございませんか？
            </h3>
            <p className="text-midnight-100 mb-6">
              お気軽にお問い合わせください。専門スタッフが丁寧にお答えいたします。
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="bg-gold-500 text-midnight-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors duration-200"
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
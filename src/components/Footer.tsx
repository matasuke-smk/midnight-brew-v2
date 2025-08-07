import React from 'react';
import { Coffee, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 26; // ヘッダーとセクション名の隙間を1/3に調整
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-midnight-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        
        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-6">
          {/* Brand */}
          <div className="text-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center space-x-2 mb-3 hover:opacity-80 transition-opacity duration-200 w-full"
            >
              <Coffee className="w-6 h-6 text-gold-500" />
              <span className="text-xl font-serif font-bold text-midnight-50">Midnight Brew</span>
            </button>
            <p className="text-midnight-100 text-sm mb-4">
              世界最高品質のスペシャルティコーヒーを、毎月あなたのもとへお届けします。
            </p>
          </div>

          {/* Services and Support - Side by Side */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="text-midnight-50 font-semibold mb-3 text-sm">サービス</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollToSection('plans')} className="text-midnight-100 hover:text-gold-500">プラン一覧</button></li>
                <li><button onClick={() => scrollToSection('monthly-coffee')} className="text-midnight-100 hover:text-gold-500">今月のコーヒー</button></li>
                <li><button onClick={() => scrollToSection('commitment')} className="text-midnight-100 hover:text-gold-500">こだわり</button></li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="text-midnight-50 font-semibold mb-3 text-sm">サポート</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollToSection('faq')} className="text-midnight-100 hover:text-gold-500">よくある質問</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-midnight-100 hover:text-gold-500">お問い合わせ</button></li>
                <li><button onClick={() => alert('配送：全国送料無料、24時間以内発送')} className="text-midnight-100 hover:text-gold-500">配送について</button></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3 text-gold-500" />
                <span className="text-midnight-100 text-xs">support@midnightbrew.jp</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3 text-gold-500" />
                <span className="text-midnight-100 text-xs">0120-123-456</span>
              </div>
            </div>
            <div className="flex justify-center space-x-3">
              <a href="#" className="text-midnight-100 hover:text-gold-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-midnight-100 hover:text-gold-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-midnight-100 hover:text-gold-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity duration-200"
            >
              <Coffee className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-serif font-bold text-midnight-50">Midnight Brew</span>
            </button>
            <p className="text-midnight-100 text-sm mb-6">
              世界最高品質のスペシャルティコーヒーを、毎月あなたのもとへお届けします。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-midnight-100 hover:text-gold-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-midnight-100 hover:text-gold-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-midnight-100 hover:text-gold-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-midnight-50 font-semibold mb-4">サービス</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('plans')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">プラン一覧</button></li>
              <li><button onClick={() => scrollToSection('monthly-coffee')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">今月のコーヒー</button></li>
              <li><button onClick={() => scrollToSection('commitment')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">こだわり</button></li>
              <li><button onClick={() => scrollToSection('testimonials')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">お客様の声</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-midnight-50 font-semibold mb-4">サポート</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('faq')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">よくある質問</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">お問い合わせ</button></li>
              <li><button onClick={() => alert('配送について：全国送料無料。焙煎後24時間以内に発送いたします。配送日の変更はマイページから可能です。')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">配送について</button></li>
              <li><button onClick={() => alert('返品・交換について：商品に問題がある場合、到着から7日以内にお問い合わせください。品質に問題がない場合の返品・交換はお受けできません。')} className="text-midnight-100 hover:text-gold-500 transition-colors text-sm text-left">返品・交換</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-midnight-50 font-semibold mb-4">お問い合わせ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-500" />
                <span className="text-midnight-100 text-sm">support@midnightbrew.jp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold-500" />
                <span className="text-midnight-100 text-sm">0120-123-456</span>
              </div>
              <div className="text-midnight-100 text-sm">
                営業時間: 平日 9:00-18:00
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 sm:mt-8 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-midnight-100">
              <button onClick={() => alert('特定商取引法に基づく表記\n\n販売業者：株式会社Midnight Brew\n代表者：代表取締役 山田太郎\n所在地：〒150-0001 東京都渋谷区神宮前1-1-1\n電話番号：0120-123-456\n支払方法：クレジットカード\n商品代金以外の料金：送料無料\n引渡し時期：注文確定後3-5営業日以内\n返品・交換：商品に問題がある場合のみ7日以内')} className="hover:text-gold-500 transition-colors text-left">
                特定商取引法に基づく表記
              </button>
              <button onClick={() => alert('プライバシーポリシー\n\nMidnight Brewは、お客様の個人情報を適切に管理し、以下の目的でのみ使用いたします。\n\n• 商品・サービスの提供\n• お客様へのご連絡\n• サービス向上のための分析\n\n第三者への提供は、法令に基づく場合を除き行いません。詳細はお問い合わせください。')} className="hover:text-gold-500 transition-colors text-left">
                プライバシーポリシー
              </button>
              <button onClick={() => alert('利用規約\n\n第1条（適用範囲）\n本規約は、お客様と当社との間のサービス利用に関する一切の関係に適用されます。\n\n第2条（サービス利用）\nお客様は本規約に従ってサービスを利用するものとします。\n\n第3条（禁止行為）\nお客様は以下の行為を行ってはならないものとします。\n• 法令に違反する行為\n• 当社の権利を侵害する行為\n\n詳細な利用規約は当社ウェブサイトをご確認ください。')} className="hover:text-gold-500 transition-colors text-left">
                利用規約
              </button>
              <button onClick={() => alert('会社概要\n\n会社名：株式会社Midnight Brew\n設立：2020年4月1日\n代表者：代表取締役 山田太郎\n資本金：1,000万円\n所在地：〒150-0001 東京都渋谷区神宮前1-1-1\n事業内容：スペシャルティコーヒーのサブスクリプションサービス\n従業員数：50名\n取引銀行：三井住友銀行 渋谷支店')} className="hover:text-gold-500 transition-colors text-left">
                会社概要
              </button>
            </div>
            
            <div className="text-midnight-100 text-xs">
              © 2024 Midnight Brew. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
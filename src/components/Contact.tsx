import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, MapPin } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-midnight-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-midnight-50 mb-6">
            お<span className="text-gold-500">問い合わせ</span>
          </h2>
          <p className="text-xl text-midnight-100 max-w-3xl mx-auto">
            ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-midnight-50 mb-6">
                お問い合わせ先
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-midnight-50 mb-2">メール</h4>
                    <p className="text-midnight-100">support@midnightbrew.jp</p>
                    <p className="text-midnight-100 text-sm mt-1">
                      24時間受付・平日24時間以内に返信
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-midnight-50 mb-2">電話</h4>
                    <p className="text-midnight-100">0120-123-456</p>
                    <p className="text-midnight-100 text-sm mt-1">
                      通話料無料・平日のみ対応
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-midnight-50 mb-2">営業時間</h4>
                    <p className="text-midnight-100">平日 9:00 - 18:00</p>
                    <p className="text-midnight-100 text-sm mt-1">
                      土日祝日はお休みをいただいております
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-midnight-50 mb-2">所在地</h4>
                    <p className="text-midnight-100">
                      〒150-0001<br />
                      東京都渋谷区神宮前1-1-1<br />
                      Midnight Brew Building 5F
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-midnight-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-midnight-50 mb-4">
                よくあるお問い合わせ内容
              </h4>
              <ul className="space-y-2 text-midnight-100 text-sm">
                <li>• プランの変更・解約について</li>
                <li>• 配送日程・お届け先変更</li>
                <li>• コーヒー豆の詳細情報</li>
                <li>• ギフトサービスについて</li>
                <li>• お支払い方法の変更</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-midnight-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-serif font-bold text-midnight-50 mb-6">
              メッセージを送る
            </h3>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-midnight-50 mb-2">
                  送信完了
                </h4>
                <p className="text-midnight-100">
                  お問い合わせありがとうございます。<br />
                  24時間以内にご返信いたします。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-midnight-50 text-sm font-medium mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-900 border border-gray-600 focus:border-gold-500 rounded-lg text-midnight-50 placeholder-midnight-100"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label className="block text-midnight-50 text-sm font-medium mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-900 border border-gray-600 focus:border-gold-500 rounded-lg text-midnight-50 placeholder-midnight-100"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-midnight-50 text-sm font-medium mb-2">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-900 border border-gray-600 focus:border-gold-500 rounded-lg text-midnight-50"
                  >
                    <option value="">選択してください</option>
                    <option value="plan">プランについて</option>
                    <option value="delivery">配送について</option>
                    <option value="payment">お支払いについて</option>
                    <option value="product">商品について</option>
                    <option value="gift">ギフトについて</option>
                    <option value="technical">技術的な問題</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-midnight-50 text-sm font-medium mb-2">
                    メッセージ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-900 border border-gray-600 focus:border-gold-500 rounded-lg text-midnight-50 placeholder-midnight-100 resize-none"
                    placeholder="お問い合わせ内容をご記入ください..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gold-500 text-midnight-900 hover:bg-gold-400'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-midnight-900 border-t-transparent" />
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>メッセージを送信</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
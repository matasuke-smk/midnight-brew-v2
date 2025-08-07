import React, { useState } from 'react';
import { X, Mail, Lock, User, MapPin, Phone, CreditCard, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  weight: string;
  varieties: string;
  originalPrice: number;
  discountedPrice: number;
  targetUser: string;
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface FormErrors {
  [key: string]: string;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    zipCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    { title: 'アカウント情報', icon: <User className="w-5 h-5" /> },
    { title: '配送先情報', icon: <MapPin className="w-5 h-5" /> },
    { title: '支払い情報', icon: <CreditCard className="w-5 h-5" /> },
    { title: '確認', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0: // Account Info
        if (!formData.email) newErrors.email = 'メールアドレスを入力してください';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'メールアドレスが正しくありません';
        }
        if (!formData.password) newErrors.password = 'パスワードを入力してください';
        else if (formData.password.length < 8) {
          newErrors.password = 'パスワードは8文字以上で入力してください';
        }
        if (!formData.confirmPassword) newErrors.confirmPassword = 'パスワードを再入力してください';
        else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'パスワードが一致しません';
        }
        break;

      case 1: // Shipping Info
        if (!formData.firstName) newErrors.firstName = '名前を入力してください';
        if (!formData.lastName) newErrors.lastName = '苗字を入力してください';
        if (!formData.zipCode) newErrors.zipCode = '郵便番号を入力してください';
        else if (!/^\d{3}-?\d{4}$/.test(formData.zipCode)) {
          newErrors.zipCode = '郵便番号が正しくありません';
        }
        if (!formData.prefecture) newErrors.prefecture = '都道府県を入力してください';
        if (!formData.city) newErrors.city = '市区町村を入力してください';
        if (!formData.address) newErrors.address = '番地を入力してください';
        if (!formData.phone) newErrors.phone = '電話番号を入力してください';
        break;

      case 2: // Payment Info
        if (!formData.cardNumber) newErrors.cardNumber = 'カード番号を入力してください';
        else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(formData.cardNumber)) {
          newErrors.cardNumber = 'カード番号が正しくありません';
        }
        if (!formData.expiryDate) newErrors.expiryDate = '有効期限を入力してください';
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = '有効期限が正しくありません (MM/YY)';
        }
        if (!formData.cvv) newErrors.cvv = 'CVVを入力してください';
        else if (!/^\d{3,4}$/.test(formData.cvv)) {
          newErrors.cvv = 'CVVが正しくありません';
        }
        if (!formData.cardName) newErrors.cardName = 'カード名義を入力してください';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsCompleted(true);
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      email: '', password: '', confirmPassword: '', firstName: '', lastName: '',
      zipCode: '', prefecture: '', city: '', address: '', building: '', phone: '',
      cardNumber: '', expiryDate: '', cvv: '', cardName: ''
    });
    setErrors({});
    setIsCompleted(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen || !selectedPlan) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-midnight-800 rounded-xl sm:rounded-2xl max-w-4xl w-full h-[100vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-serif font-bold text-midnight-50">
              {selectedPlan.name} プランのお申し込み
            </h2>
            <p className="text-midnight-100 text-sm mt-1">
              {selectedPlan.weight} × {selectedPlan.varieties} - ¥{selectedPlan.discountedPrice.toLocaleString()} (初回50%OFF)
            </p>
          </div>
          <button onClick={handleClose} className="text-midnight-100 hover:text-gold-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar - Steps (Hidden on mobile) */}
          <div className="hidden lg:block w-64 p-6 border-r border-gray-700">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    currentStep === index
                      ? 'bg-gold-500/10 border border-gold-500/20'
                      : currentStep > index
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-gray-700/20'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    currentStep === index
                      ? 'bg-gold-500 text-midnight-900'
                      : currentStep > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className={`font-medium ${
                      currentStep >= index ? 'text-midnight-50' : 'text-midnight-100'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6">
            {!isCompleted ? (
              <>
                {/* Mobile Progress Bar */}
                <div className="lg:hidden mb-6">
                  <div className="flex justify-between text-sm text-midnight-100 mb-2">
                    <span>進行状況</span>
                    <span>{currentStep + 1} / {steps.length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gold-500">{steps[currentStep].title}</h4>
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="mb-8">
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-serif font-bold text-midnight-50">
                        アカウント情報を入力
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            メールアドレス
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-100 w-5 h-5" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 sm:py-4 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 text-base ${
                                errors.email ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                              }`}
                              placeholder="example@email.com"
                            />
                          </div>
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            パスワード
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-100 w-5 h-5" />
                            <input
                              type="password"
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 sm:py-4 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 text-base ${
                                errors.password ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                              }`}
                              placeholder="8文字以上"
                            />
                          </div>
                          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            パスワード（確認）
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-100 w-5 h-5" />
                            <input
                              type="password"
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 sm:py-4 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 text-base ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                              }`}
                              placeholder="パスワードを再入力"
                            />
                          </div>
                          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-serif font-bold text-midnight-50">
                        配送先情報を入力
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            姓
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.lastName ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="山田"
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            名
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.firstName ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="太郎"
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            郵便番号
                          </label>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.zipCode ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="123-4567"
                          />
                          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            都道府県
                          </label>
                          <input
                            type="text"
                            value={formData.prefecture}
                            onChange={(e) => handleInputChange('prefecture', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.prefecture ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="東京都"
                          />
                          {errors.prefecture && <p className="text-red-500 text-sm mt-1">{errors.prefecture}</p>}
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            市区町村
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.city ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="渋谷区"
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            番地
                          </label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.address ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="1-2-3"
                          />
                          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            建物名・部屋番号（任意）
                          </label>
                          <input
                            type="text"
                            value={formData.building}
                            onChange={(e) => handleInputChange('building', e.target.value)}
                            className="w-full px-4 py-3 bg-midnight-900 border border-gray-600 focus:border-gold-500 rounded-lg text-midnight-50 placeholder-midnight-100"
                            placeholder="マンション名 101号室"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            電話番号
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-100 w-5 h-5" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 sm:py-4 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 text-base ${
                                errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                              }`}
                              placeholder="090-1234-5678"
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-serif font-bold text-midnight-50">
                        支払い情報を入力
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            カード番号
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.cardNumber ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-midnight-50 text-sm font-medium mb-2">
                              有効期限
                            </label>
                            <input
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                                errors.expiryDate ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                              }`}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                          </div>

                          <div>
                            <label className="block text-midnight-50 text-sm font-medium mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                                errors.cvv ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                              }`}
                              placeholder="123"
                              maxLength={4}
                            />
                            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-midnight-50 text-sm font-medium mb-2">
                            カード名義
                          </label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            className={`w-full px-4 py-3 bg-midnight-900 border rounded-lg text-midnight-50 placeholder-midnight-100 ${
                              errors.cardName ? 'border-red-500' : 'border-gray-600 focus:border-gold-500'
                            }`}
                            placeholder="TARO YAMADA"
                          />
                          {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-serif font-bold text-midnight-50">
                        ご注文内容の確認
                      </h3>
                      
                      <div className="bg-midnight-900 rounded-xl p-6 border border-gray-700">
                        <h4 className="text-lg font-semibold text-midnight-50 mb-4">
                          選択プラン
                        </h4>
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <div className="text-midnight-50 font-medium">
                              {selectedPlan.name} プラン
                            </div>
                            <div className="text-midnight-100 text-sm">
                              {selectedPlan.weight} × {selectedPlan.varieties} / 月
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-midnight-50 font-bold">
                              ¥{selectedPlan.discountedPrice.toLocaleString()}
                            </div>
                            <div className="text-midnight-100 text-sm line-through">
                              ¥{selectedPlan.originalPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-600 pt-4">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-midnight-50">初回お支払い金額</span>
                            <span className="text-gold-500">¥{selectedPlan.discountedPrice.toLocaleString()}</span>
                          </div>
                          <div className="text-sm text-midnight-100 mt-1">
                            2回目以降は通常価格 ¥{selectedPlan.originalPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="bg-midnight-900 rounded-xl p-6 border border-gray-700">
                        <h4 className="text-lg font-semibold text-midnight-50 mb-4">
                          配送先情報
                        </h4>
                        <div className="text-midnight-100">
                          <div>{formData.lastName} {formData.firstName}</div>
                          <div>〒{formData.zipCode}</div>
                          <div>{formData.prefecture} {formData.city} {formData.address}</div>
                          {formData.building && <div>{formData.building}</div>}
                          <div>電話番号: {formData.phone}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentStep === 0
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-600 text-midnight-50 hover:bg-gray-500'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>戻る</span>
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center space-x-2 bg-gold-500 text-midnight-900 px-6 py-3 rounded-lg font-medium hover:bg-gold-400 transition-colors"
                    >
                      <span>次へ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-colors ${
                        isLoading
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gold-500 text-midnight-900 hover:bg-gold-400'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-midnight-900 border-t-transparent" />
                          <span>処理中...</span>
                        </>
                      ) : (
                        <>
                          <span>申し込みを確定</span>
                          <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            ) : (
              // Completion Screen
              <div className="text-center space-y-6 py-8">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                <div>
                  <h3 className="text-3xl font-serif font-bold text-midnight-50 mb-2">
                    申し込み完了！
                  </h3>
                  <p className="text-midnight-100 mb-6">
                    ご登録ありがとうございます。初回のコーヒーを準備いたします。
                  </p>
                </div>

                <div className="bg-midnight-900 rounded-xl p-6 border border-green-500/20 max-w-md mx-auto">
                  <h4 className="text-lg font-semibold text-midnight-50 mb-4">
                    今後の流れ
                  </h4>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full" />
                      <span className="text-midnight-100 text-sm">
                        注文確認メールをお送りします
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full" />
                      <span className="text-midnight-100 text-sm">
                        3-5日以内に初回コーヒーを発送
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full" />
                      <span className="text-midnight-100 text-sm">
                        マイページでお届け状況を確認
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="bg-gold-500 text-midnight-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors"
                >
                  ホームに戻る
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Commitment from './components/Commitment';
import MonthlyCoffee from './components/MonthlyCoffee';
import Plans from './components/Plans';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenSignup = (plan = null) => {
    setSelectedPlan(plan);
    setShowSignupModal(true);
  };

  return (
    <div className="min-h-screen bg-midnight-900 text-midnight-50">
      <Header />
      <Hero onOpenSignup={handleOpenSignup} />
      <Commitment />
      <MonthlyCoffee />
      <Plans onOpenSignup={handleOpenSignup} />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)} 
        selectedPlan={selectedPlan}
      />
    </div>
  );
}

export default App;
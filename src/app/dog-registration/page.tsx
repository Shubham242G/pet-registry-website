'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../component/context/AuthContext';
import { Loader2, MapPin, FileText, Shield, Clock, PawPrint, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import LoginModal from '../component/LoginModal';

// Font configuration matching your existing styles
const F = {
  fraunces: "'Fraunces', Georgia, serif",
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

// City data with all details - Updated pricing to match CitySelector
interface CityData {
  id: string;
  name: string;
  authority: string;
  slug: string;
  top?: boolean;
  docs: number;
  basePrice: number;
  deliveryCost: number;
  displayPrice: string;
  details: {
    fullName: string;
    policy: string;
    fine: string;
    mandatoryFrom?: string;
    documents: string[];
    faq: Array<{ q: string; a: string }>;
    stats: Array<{ value: string; label: string; sub: string }>;
  };
}

// ✅ Updated pricing to match CitySelector
const CITIES_DATA: CityData[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    authority: 'MCD',
    slug: 'delhi',
    top: true,
    docs: 4,
    basePrice: 799,
    deliveryCost: 258,
    displayPrice: '₹799',
    details: {
      fullName: 'Delhi (MCD)',
      policy: 'As per MCD Bye-laws, registration + microchipping is mandatory for pet dogs across Delhi. The Supreme Court of India\'s August 2025 order directed MCD to enforce mandatory registration for all pet animals across Delhi.',
      fine: 'Fines start at ₹500 and escalate with every enforcement drive. Pet owners can also face pet seizure by municipal authorities.',
      documents: [
        'Anti-Rabies Vaccination Certificate',
        'Applicant ID Proof (Aadhaar, PAN, Passport or Voter ID)',
        'Address Proof for Delhi',
        'Recent photo with your pet'
      ],
      faq: [
        { q: 'Is pet registration really mandatory in Delhi?', a: 'Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed MCD to enforce mandatory pet registration across Delhi. Fines start at ₹500 and escalate with every enforcement drive.' },
        { q: 'Is Tailio\'s registration legally valid in Delhi?', a: 'Yes, Tailio is an authorized platform that files directly with MCD. Your certificate is officially issued by the municipal corporation and is fully valid.' },
        { q: 'What is the fine for not registering in Delhi?', a: 'The fine for non-compliance starts at ₹500 and escalates with every MCD enforcement drive. Pet owners can also face pet seizure by municipal authorities.' },
        { q: 'What documents do I need to register my pet in Delhi?', a: 'You need four documents: Anti-Rabies Vaccination Certificate, Applicant ID Proof (Aadhaar, PAN, Passport or Voter ID), Address Proof for Delhi, and a recent photo with your pet.' },
        { q: 'How much does pet registration cost in Delhi on Tailio?', a: 'Registration costs ₹799 one-time, all-inclusive. This includes the MCD filing fee and your official digital certificate.' },
        { q: 'How long does it take to get the MCD certificate in Delhi?', a: 'Your official digital certificate arrives by email within 24–72 hours after submission through Tailio.' }
      ],
      stats: [
        { value: '~913', label: 'Dogs registered in Delhi today', sub: 'MCD · Delhi' },
        { value: '<10%', label: 'Pet owners who have registered', sub: 'MCD · Delhi' },
        { value: '36%', label: 'Global rabies deaths in India', sub: 'India · WHO data' },
        { value: '60s', label: 'Time to register on Tailio', sub: 'From any phone' }
      ]
    }
  },
  {
    id: 'ghaziabad',
    name: 'Ghaziabad',
    authority: 'Nagar Nigam',
    slug: 'ghaziabad',
    docs: 7,
    basePrice: 1500,
    deliveryCost: 268,
    displayPrice: '₹1,500',
    details: {
      fullName: 'Ghaziabad (Nagar Nigam)',
      policy: 'GMC raised its registration fee from ₹200 to ₹1,000 in April 2024 — the steepest fee hike in NCR, signalling serious enforcement intent. Fines of ₹5,000 are issued for non-compliance.',
      fine: 'The fine for non-compliance is ₹5,000 and escalates with each enforcement drive. Pet owners can also face pet seizure by municipal authorities.',
      documents: [
        'Anti-Rabies Vaccination Certificate',
        'Owner ID Card with Local Address',
        'Residence Proof',
        'Owner with Pet Photo',
        'Owner Photo',
        'Pet Photo',
        'Owner Signature'
      ],
      faq: [
        { q: 'Is pet registration really mandatory in Ghaziabad?', a: 'Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed GMC to enforce mandatory pet registration across Ghaziabad. GMC has actively raised its registration fee and is enforcing compliance. Fines of ₹5,000 are issued for non-compliance.' },
        { q: 'Is Tailio\'s registration legally valid in Ghaziabad?', a: 'Yes, Tailio is an authorized platform that files directly with GMC. Your certificate is officially issued by the municipal corporation and is fully valid.' },
        { q: 'What is the fine for not registering in Ghaziabad?', a: 'The fine for non-compliance is ₹5,000 and escalates with each enforcement drive. Pet owners can also face pet seizure by municipal authorities.' },
        { q: 'What documents do I need to register my pet in Ghaziabad?', a: 'You need seven documents: Anti-Rabies Certificate, Owner ID Card with Local Address, Residence Proof, Owner with Pet Photo, Owner Photo, Pet Photo, and Owner Signature.' },
        { q: 'How much does pet registration cost in Ghaziabad on Tailio?', a: 'Registration costs ₹1,500 one-time, all-inclusive. This includes the GMC filing fee and your official digital certificate.' },
        { q: 'How long does it take to get the GMC certificate in Ghaziabad?', a: 'Your official digital certificate arrives by email within 24–72 hours after submission through Tailio.' }
      ],
      stats: [
        { value: '₹5K', label: 'Fine for non-compliance with GMC', sub: 'GMC · Ghaziabad' },
        { value: '₹1,000', label: 'GMC fee raised from ₹200 in April 2024', sub: 'GMC · Ghaziabad' },
        { value: 'Active', label: 'GMC enforcement status', sub: 'GMC · Ghaziabad' },
        { value: '60s', label: 'Time to register on Tailio', sub: 'From any phone' }
      ]
    }
  },
  {
    id: 'gurugram',
    name: 'Gurugram',
    authority: 'MCG',
    slug: 'gurugram',
    docs: 6,
    basePrice: 1500,
    deliveryCost: 258,
    displayPrice: '₹1,500',
    details: {
      fullName: 'Gurugram (MCG)',
      policy: 'MCG is preparing its enforcement framework. Register now while it\'s still straightforward — before fines are formally set and before your society RWA issues notices.',
      fine: 'Fines are pending announcement, but are expected to be among the highest in NCR once formally set. Register now to avoid penalties.',
      documents: [
        'Pet Photo (alone)',
        'Vaccination Card',
        'Vaccination Certificate',
        'Sterilization Certificate (for 4+ years)',
        'Anti-Rabies Vaccination Certificate',
        'Applicant ID Proof'
      ],
      faq: [
        { q: 'Is pet registration really mandatory in Gurugram?', a: 'Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed MCG to enforce mandatory pet registration across Gurugram. MCG is preparing its enforcement framework. Registration is mandatory now.' },
        { q: 'Is Tailio\'s registration legally valid in Gurugram?', a: 'Yes, Tailio is an authorized platform that files directly with MCG. Your certificate is officially issued by the municipal corporation and is fully valid.' },
        { q: 'What is the fine for not registering in Gurugram?', a: 'Fines are pending announcement, but are expected to be among the highest in NCR once formally set. Register now to avoid penalties.' },
        { q: 'What documents do I need to register my pet in Gurugram?', a: 'You need six documents: Pet Photo, Vaccination Card, Vaccination Certificate, Sterilization Certificate (for 4+ years), Anti-Rabies Certificate, and Applicant ID Proof.' },
        { q: 'How much does pet registration cost in Gurugram on Tailio?', a: 'Registration costs ₹1,500 one-time, all-inclusive. This includes the MCG filing fee and your official digital certificate.' },
        { q: 'How long does it take to get the MCG certificate in Gurugram?', a: 'Your official digital certificate arrives by email within 24–72 hours after submission through Tailio.' }
      ],
      stats: [
        { value: 'Pending', label: 'MCG fine — announcement expected soon', sub: 'MCG · Gurugram' },
        { value: 'Now', label: 'Best time to register before fines drop', sub: 'MCG · Gurugram' },
        { value: 'Live', label: 'Tailio accepting Gurugram registrations', sub: 'Tailio · Gurugram' },
        { value: '60s', label: 'Time to register on Tailio', sub: 'From any phone' }
      ]
    }
  },
  {
    id: 'noida',
    name: 'Noida',
    authority: 'Noida Authority',
    slug: 'noida',
    docs: 7,
    basePrice: 799,
    deliveryCost: 258,
    displayPrice: '₹799',
    details: {
      fullName: 'Noida (Noida Authority)',
      policy: 'Noida Authority has the most aggressive enforcement in NCR. Active fines of ₹10,000 have been issued and pet seizures reported across sectors since the Supreme Court\'s August 2025 order.',
      fine: 'The fine for non-compliance is ₹10,000 — the highest in all of NCR. Pet owners can also face pet seizure by municipal authorities.',
      documents: [
        'Anti-Rabies Vaccination Certificate',
        'Owner ID Card with Local Address',
        'Residence Proof',
        'Owner with Pet Photo',
        'Owner Photo',
        'Pet Photo',
        'Owner Signature'
      ],
      faq: [
        { q: 'Is pet registration really mandatory in Noida?', a: 'Yes. The Supreme Court of India through the Animal Birth Control (ABC) Rules 2023 and its August 2025 order directed Noida Authority to enforce mandatory pet registration across Noida. Noida Authority has the most aggressive enforcement in NCR with fines of ₹10,000.' },
        { q: 'Is Tailio\'s registration legally valid in Noida?', a: 'Yes, Tailio is an authorized platform that files directly with Noida Authority. Your certificate is officially issued by the municipal corporation and is fully valid.' },
        { q: 'What is the fine for not registering in Noida?', a: 'The fine for non-compliance is ₹10,000 — the highest in all of NCR. Pet owners can also face pet seizure by municipal authorities.' },
        { q: 'What documents do I need to register my pet in Noida?', a: 'You need seven documents: Anti-Rabies Certificate, Owner ID Card with Local Address, Residence Proof, Owner with Pet Photo, Owner Photo, Pet Photo, and Owner Signature.' },
        { q: 'How much does pet registration cost in Noida on Tailio?', a: 'Registration costs ₹799 one-time, all-inclusive. This includes the Noida Authority filing fee and your official digital certificate.' },
        { q: 'How long does it take to get the Noida Authority certificate?', a: 'Your official digital certificate arrives by email within 24–72 hours after submission through Tailio.' }
      ],
      stats: [
        { value: '₹10K', label: 'Maximum fine — highest in all NCR', sub: 'Noida Authority · UP' },
        { value: '7 days', label: 'To comply after RWA notice', sub: 'Noida Authority · UP' },
        { value: 'Active', label: 'Noida Authority enforcement status', sub: 'Noida Authority · UP' },
        { value: '60s', label: 'Time to register on Tailio', sub: 'From any phone' }
      ]
    }
  },
  {
    id: 'faridabad',
    name: 'Faridabad',
    authority: 'MCF',
    slug: 'faridabad',
    docs: 6,
    basePrice: 1799,
    deliveryCost: 258,
    displayPrice: '₹1,799',
    details: {
      fullName: 'Faridabad (MCF)',
      policy: 'Under the Haryana Municipal Corporation Act and local bylaws, Municipal Corporation Faridabad (MCF) requires all pet dogs to be registered. Pet owners must comply or face penalties.',
      fine: 'The fine for non-compliance can range from ₹500 to ₹5,000 under MCF regulations. Pet owners can also face legal action from municipal authorities.',
      documents: [
        'Proof of Identity',
        'Proof of Address',
        'Vaccination Record',
        'Pet Photographs',
        'Sterilization Certificate',
        'Microchip Details'
      ],
      faq: [
        { q: 'Is pet registration mandatory in Faridabad?', a: 'Yes. Municipal Corporation Faridabad (MCF) requires all pet dogs to be registered. Pet owners must comply with the Haryana Municipal Corporation Act and local bylaws.' },
        { q: 'Is Tailio\'s registration legally valid in Faridabad?', a: 'Yes, Tailio is an authorized platform that files directly with MCF. Your certificate is officially issued by the municipal corporation and is fully valid.' },
        { q: 'What is the fine for not registering in Faridabad?', a: 'The fine for non-compliance can range from ₹500 to ₹5,000 under MCF regulations. Pet owners can also face legal action from municipal authorities.' },
        { q: 'What documents do I need to register my pet in Faridabad?', a: 'You need six documents: Proof of Identity, Proof of Address, Vaccination Record, Pet Photographs, Sterilization Certificate, and Microchip Details.' },
        { q: 'How much does pet registration cost in Faridabad on Tailio?', a: 'Registration costs ₹1,799 one-time, all-inclusive. This includes the MCF filing fee and your official digital certificate.' },
        { q: 'How long does it take to get the MCF certificate in Faridabad?', a: 'Your official digital certificate arrives by email within 24–72 hours after submission through Tailio.' }
      ],
      stats: [
        { value: '~450', label: 'Pets registered in Faridabad today', sub: 'MCF · Faridabad' },
        { value: '<15%', label: 'Pet owners who have registered', sub: 'MCF · Faridabad' },
        { value: '36%', label: 'Global rabies deaths in India', sub: 'India · WHO data' },
        { value: '60s', label: 'Time to register on Tailio', sub: 'From any phone' }
      ]
    }
  }
];

export default function DogRegistrationPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Auto-select user's city if they have one
  useEffect(() => {
    if (user?.city && !selectedCityId) {
      const city = CITIES_DATA.find(c => c.id === user.city);
      if (city) {
        setSelectedCityId(city.id);
      }
    }
  }, [user, selectedCityId]);

  const selectedCity = selectedCityId ? CITIES_DATA.find(c => c.id === selectedCityId) : null;
  const totalPrice = selectedCity ? selectedCity.basePrice + selectedCity.deliveryCost : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleRegisterClick = () => {
    if (isAuthenticated) {
      router.push(`/add-pet?city=${selectedCity?.id}`);
    } else {
      setShowLoginModal(true);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#E8600A] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl overflow-hidden">
            <Image src="/images/tailio.png" alt="Tailio" width={44} height={44} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-[#2C1A0E]" style={{ fontFamily: F.fraunces }}>
            Tailio <span className="text-[#E8600A]">Pet Registration</span>
          </h1>
          {user && (
            <span className="bg-gray-200 text-[#2C1A0E] text-xs font-semibold px-3 py-1 rounded-full ml-2">
              {user.name}
            </span>
          )}
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#2C1A0E] to-[#4A2C14] text-white rounded-2xl p-6 md:p-10 mb-8 shadow-xl">
          <div className="inline-flex items-center gap-2 bg-[#E8600A]/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold border border-[#E8600A]/30 mb-3">
            <div className="w-1.5 h-1.5 bg-[#E8600A] rounded-full animate-pulse" />
            Legally Mandatory
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: F.fraunces }}>
            Register your dog
          </h2>
          <p className="text-white/90 text-lg max-w-2xl">
            Pet registration is mandatory under municipal law. Choose your city to see its rules, required documents and fee.
          </p>
        </section>

        {/* City Grid - Fines removed, only showing docs count and price */}
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-5 h-5 text-[#E8600A]" />
          <h3 className="text-xl font-semibold text-[#2C1A0E]" style={{ fontFamily: F.fraunces }}>
            Select your city
          </h3>
          {selectedCityId && (
            <span className="text-sm text-[#E8600A] font-medium ml-auto">
              ✓ {selectedCity?.name} selected
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
          {CITIES_DATA.map((city) => (
            <div
              key={city.id}
              onClick={() => setSelectedCityId(city.id)}
              className={`relative bg-white rounded-xl p-4 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedCityId === city.id 
                  ? 'border-[#E8600A] bg-[#FFF0E4] shadow-md' 
                  : 'border-transparent hover:border-[#E8600A]/30'
              }`}
            >
              {city.top && (
                <span className="absolute -top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ⭐ Top
                </span>
              )}
              <div className="font-semibold text-[#2C1A0E] text-sm md:text-base">
                {city.name}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {city.authority}
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-block bg-[#FFF0E4] text-[#E8600A] text-xs font-semibold px-3 py-0.5 rounded-full">
                  <FileText className="w-3 h-3 inline mr-1" />
                  {city.docs} docs
                </span>
                {/* ✅ Show price instead of fine */}
                <span className="inline-block bg-[#E8F5E9] text-[#1A6B3A] text-xs font-semibold px-3 py-0.5 rounded-full">
                  {city.displayPrice}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* City Detail Panel */}
        {selectedCity && (
          <div className="bg-white rounded-2xl shadow-md border-l-4 border-[#E8600A] p-6 md:p-8 mb-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h4 className="text-2xl font-bold text-[#2C1A0E]" style={{ fontFamily: F.fraunces }}>
                  {selectedCity.details.fullName}
                </h4>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E8600A]" />
                  Official Pet Policy
                </p>
              </div>
              <button
                onClick={() => setSelectedCityId(null)}
                className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-full font-semibold text-sm text-gray-700 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">←</span> Change City
              </button>
            </div>

            {/* Why Mandatory */}
            <div className="mb-5">
              <p className="font-semibold text-[#2C1A0E] text-base">Why Mandatory?</p>
              <p className="text-gray-700 leading-relaxed mt-1">{selectedCity.details.policy}</p>
              <p className="text-red-600 font-medium mt-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {selectedCity.details.fine}
              </p>
            </div>

            {/* Documents */}
            <div className="bg-gray-50 rounded-xl p-5 mb-5">
              <h5 className="font-semibold text-[#2C1A0E] text-sm flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[#E8600A]" />
                Documents Needed
              </h5>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {selectedCity.details.documents.map((doc, index) => (
                  <li key={index} className="flex items-center gap-2 py-1 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E8600A]" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Consequences & Validity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-[#FFF0E4] w-9 h-9 rounded-full flex items-center justify-center text-[#E8600A] flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#2C1A0E] text-sm">Legal Consequences</p>
                  <p className="text-gray-600 text-sm">{selectedCity.details.fine}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#FFF0E4] w-9 h-9 rounded-full flex items-center justify-center text-[#E8600A] flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#2C1A0E] text-sm">Validity</p>
                  <p className="text-gray-600 text-sm">Licence valid for 1 year, renewable annually.</p>
                </div>
              </div>
            </div>

            {/* Pricing - Updated to show base price + delivery */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Registration Fee</p>
                  <p className="text-2xl font-bold text-[#E8600A]" style={{ fontFamily: F.fraunces }}>
                    {formatPrice(totalPrice)}
                  </p>
                  <p className="text-xs text-gray-500">Including municipal fee + service fee + GST</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>Base fee: {formatPrice(selectedCity.basePrice)}</p>
                  {selectedCity.deliveryCost > 0 && (
                    <p>Tag delivery: {formatPrice(selectedCity.deliveryCost)}</p>
                  )}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-6">
              <h5 className="font-semibold text-[#2C1A0E] text-sm flex items-center gap-2 mb-3">
                <span className="text-lg">❓</span>
                Frequently Asked Questions
              </h5>
              <div className="space-y-2">
                {selectedCity.details.faq.slice(0, 4).map((item, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-[#E8600A] transition-colors">
                      <span className="text-[#E8600A] group-open:rotate-90 transition-transform inline-block">▶</span>
                      {item.q}
                    </summary>
                    <p className="text-sm text-gray-600 mt-2 pl-6">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* ✅ Register Button with Login Modal */}
            <button
              onClick={handleRegisterClick}
              className="bg-[#E8600A] hover:bg-[#C04E06] text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-[#E8600A]/30 inline-flex items-center gap-3 transition-all hover:transform hover:-translate-y-0.5"
            >
              <PawPrint className="w-5 h-5" />
              {isAuthenticated 
                ? `Register Your Pet — ${formatPrice(totalPrice)}`
                : `Login to Register — ${formatPrice(totalPrice)}`
              }
            </button>

            <p className="text-xs text-gray-400 mt-4">
              By continuing, you agree to the <a href="#" className="text-[#E8600A] font-medium hover:underline">
                {selectedCity.authority} Terms of Service
              </a>.
            </p>
          </div>
        )}

        {/* More Cities */}
        <div className="text-center text-gray-500 text-sm pt-6 border-t border-gray-200 mt-4">
          <span className="text-lg inline-block mr-2">➕</span>
          More cities coming soon.
        </div>
      </div>

      {/* ✅ Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          router.push('/register');
        }}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
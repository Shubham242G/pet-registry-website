"use client";
import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../component/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AddPetModal from "../component/AddPetModal";
import RegistrationForm from "../component/RegistrationForm";
import Sidebar from '../component/Sidebar';

const F = {
  fraunces: "'Fraunces', Georgia, serif",
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

interface Pet {
  _id: string;
  name: string;
  species: string;
  ageYears?: number;
  ageMonths?: number;
  gender: string;
  profilePicture?: string;
  isRegistered: boolean;
  registrationStage: number;
  registrationStatus: string;
  uploadedDocumentsCount?: number;
  hasAllDocuments?: boolean;
  registrationTriggered?: boolean;
  createdAt: string;
  updatedAt: string;
  // Veterinary Doctor Details
  vetName?: string;
  vetMobile?: string;
  vetRegistrationNumber?: string;
  vetCouncilName?: string;
  // Vaccination Details
  vaccinationCertificateNumber?: string;
  vaccinationDate?: string;
}

/* ─── small icon components matching Figma ──────────────────────────────── */
function PawIcon({ size = 28, color = '#A68660' }: { size?: number; color?: string }) {
  const s = size / 28;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 12.32 * s, height: 10.08 * s, left: 7.84 * s, top: 15.12 * s, position: 'absolute', background: color }} />
      <div style={{ width: 6.16 * s, height: 7.28 * s, left: 4.76 * s, top: 10.92 * s, position: 'absolute', background: color }} />
      <div style={{ width: 6.16 * s, height: 7.28 * s, left: 17.08 * s, top: 10.92 * s, position: 'absolute', background: color }} />
      <div style={{ width: 5.04 * s, height: 6.16 * s, left: 8.12 * s, top: 7 * s, position: 'absolute', background: color }} />
      <div style={{ width: 5.04 * s, height: 6.16 * s, left: 15.12 * s, top: 7 * s, position: 'absolute', background: color }} />
    </div>
  );
}

function DocIcon({ size = 13, color = 'white' }: { size?: number; color?: string }) {
  const s = size / 13;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 8.67 * s, height: 10.83 * s, left: 2.17 * s, top: 1.08 * s, position: 'absolute', outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
      <div style={{ width: 3.25 * s, height: 3.25 * s, left: 7.58 * s, top: 1.08 * s, position: 'absolute', outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
    </div>
  );
}

function EditIcon({ size = 13, color = '#2C1A0E' }: { size?: number; color?: string }) {
  const s = size / 13;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 9.75 * s, height: 9.75 * s, left: 1.08 * s, top: 2.17 * s, position: 'absolute', outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
      <div style={{ width: 7.65 * s, height: 7.65 * s, left: 4.33 * s, top: 1.02 * s, position: 'absolute', outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
    </div>
  );
}

function TrashIcon({ size = 13, color = '#A0251E' }: { size?: number; color?: string }) {
  const s = size / 13;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 7.58 * s, height: 8.67 * s, left: 2.71 * s, top: 3.25 * s, position: 'absolute', outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
      <div style={{ width: 3.25 * s, height: 1.63 * s, left: 4.88 * s, top: 1.63 * s, position: 'absolute', outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
    </div>
  );
}

function AddPetPlusIcon({ size = 13, color = '#2C1A0E' }: { size?: number; color?: string }) {
  const s = size / 12;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 9 * s, height: 1.5 * s, left: 1.5 * s, top: 5.25 * s, position: 'absolute', background: color, borderRadius: 1 }} />
      <div style={{ width: 1.5 * s, height: 9 * s, left: 5.25 * s, top: 1.5 * s, position: 'absolute', background: color, borderRadius: 1 }} />
    </div>
  );
}

function CheckmarkIcon({ size = 11, color = 'white' }: { size?: number; color?: string }) {
  const s = size / 11;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 7.33 * s, height: 5.04 * s, left: 1.83 * s, top: 2.75 * s, position: 'absolute', outline: `1.38px ${color} solid`, outlineOffset: -0.69 * s }} />
    </div>
  );
}

function WaIcon({ size = 21, color = 'white' }: { size?: number; color?: string }) {
  const s = size / 21;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 15.75 * s, height: 15.75 * s, left: 2.63 * s, top: 2.62 * s, position: 'absolute', background: color }} />
    </div>
  );
}

function ArrowIcon({ size = 14, color = 'white' }: { size?: number; color?: string }) {
  const s = size / 14;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 4.08 * s, height: 8.17 * s, left: 7 * s, top: 2.92 * s, position: 'absolute', outline: `1.46px ${color} solid`, outlineOffset: -0.73 * s }} />
    </div>
  );
}

function PaymentIcon({ size = 14, color = 'white' }: { size?: number; color?: string }) {
  const s = size / 14;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 6.42 * s, height: 6.42 * s, left: 6.42 * s, top: 1.17 * s, position: 'absolute', outline: `1.17px ${color} solid`, outlineOffset: -0.58 * s }} />
      <div style={{ width: 11.67 * s, height: 11.67 * s, left: 1.17 * s, top: 1.17 * s, position: 'absolute', outline: `1.17px ${color} solid`, outlineOffset: -0.58 * s }} />
    </div>
  );
}

function PreviewIcon({ size = 11, color = '#7A5C40' }: { size?: number; color?: string }) {
  const s = size / 11;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 10.08 * s, height: 7.33 * s, left: 0.46 * s, top: 1.83 * s, position: 'absolute', outline: `0.92px ${color} solid`, outlineOffset: -0.46 * s }} />
      <div style={{ width: 2.75 * s, height: 2.75 * s, left: 4.13 * s, top: 4.13 * s, position: 'absolute', outline: `0.92px ${color} solid`, outlineOffset: -0.46 * s }} />
    </div>
  );
}

function DeleteDocIcon({ size = 11, color = '#7A5C40' }: { size?: number; color?: string }) {
  const s = size / 11;
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 6.42 * s, height: 7.33 * s, left: 2.29 * s, top: 2.75 * s, position: 'absolute', outline: `0.92px ${color} solid`, outlineOffset: -0.46 * s }} />
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────────────────── */
export default function Dashboard() {
  const { token, isAuthenticated, loading: authLoading, logout, user } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPet, setEditingPet] = useState<any>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showRegistrationView, setShowRegistrationView] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ show: boolean; petId: string; petName: string }>({ show: false, petId: '', petName: '' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (token) loadPets();
  }, [token]);

  const loadPets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/pets?t=" + Date.now(), "GET", null, token!);
      const petsData: Pet[] = (Array.isArray(data) ? data : []).map((pet: any) => ({
        ...pet,
        uploadedDocumentsCount: pet.uploadedDocumentsCount ?? 0,
        hasAllDocuments: pet.hasAllDocuments ?? false,
        registrationTriggered: pet.registrationTriggered ?? false,
        registrationStage: pet.registrationStage ?? 0,
        registrationStatus: pet.registrationStatus ?? 'not_started',
      }));
      setPets(petsData);
      if (petsData.length > 0 && !selectedPet) {
        setSelectedPet(petsData[0]);
      } else if (selectedPet && petsData.length > 0) {
        const updated = petsData.find(p => p._id === selectedPet._id);
        if (updated) setSelectedPet(updated);
      }
    } catch (error) {
      console.error("Error loading pets:", error);
      setError("Failed to load pets. Please try again.");
      if (error instanceof Error && error.message === "Session expired") {
        logout(); router.push('/');
      }
    } finally {
      setLoading(false);
    }
  }, [token, selectedPet, logout, router]);

  const handleDeletePet = async (petId: string) => {
    try {
      setLoading(true);
      await apiFetch(`/pets/${petId}`, "DELETE", null, token!);
      const updatedPets = pets.filter(pet => pet._id !== petId);
      setPets(updatedPets);
      if (updatedPets.length === 0) setSelectedPet(null);
      else if (selectedPet?._id === petId) setSelectedPet(updatedPets[0]);
      setShowDeleteConfirm({ show: false, petId: '', petName: '' });
    } catch (error) {
      setError("Failed to delete pet");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRegistration = async (pet: Pet) => {
    try {
      const registration = await apiFetch(`/registration/${pet._id}`, "GET", null, token!);
      if (!registration) { setError(`No registration found for ${pet.name}`); return; }
      setSelectedPet(pet); setExistingRegistration(registration); setShowRegistrationView(true);
    } catch { setError("Failed to load registration"); }
  };

  const handleEditRegistration = async (pet: Pet) => {
    try {
      setLoading(true);
      const registration = await apiFetch<any>(`/registration/${pet._id}`, "GET", null, token!);
      setSelectedPet(pet);
      setExistingRegistration(registration?.applicantDetails ? registration : null);
      setShowRegistrationForm(true);
    } catch {
      setSelectedPet(pet); setExistingRegistration(null); setShowRegistrationForm(true);
    } finally { setLoading(false); }
  };

  const handleRegisterPet = (pet: Pet) => {
    setSelectedPet(pet); setExistingRegistration(null); setShowRegistrationForm(true);
  };

  const getFormattedAge = (pet: Pet) => {
    if (pet.ageYears && pet.ageMonths && pet.ageYears > 0 && pet.ageMonths > 0) return `${pet.ageYears} ${pet.ageYears === 1 ? 'year' : 'years'} ${pet.ageMonths} ${pet.ageMonths === 1 ? 'month' : 'months'}`;
    if (pet.ageYears && pet.ageYears > 0) return `${pet.ageYears} ${pet.ageYears === 1 ? 'year' : 'years'}`;
    if (pet.ageMonths && pet.ageMonths > 0) return `${pet.ageMonths} ${pet.ageMonths === 1 ? 'month' : 'months'}`;
    return "Not specified";
  };

  const stats = {
    total: pets.length,
    registered: pets.filter(p => p.registrationStage === 4).length,
    inProgress: pets.filter(p => p.registrationStage > 0 && p.registrationStage < 4).length,
    notStarted: pets.filter(p => p.registrationStage === 0).length,
    documentsUploaded: pets.reduce((sum, pet) => sum + (pet.uploadedDocumentsCount || 0), 0),
  };

  const currentPet = selectedPet;
  const allDocsUploaded = currentPet && (currentPet.uploadedDocumentsCount || 0) >= 4;
  const needsPayment = allDocsUploaded && currentPet && currentPet.registrationStage < 2;

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAF6EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 style={{ width: 48, height: 48, color: '#E8600A', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#FAF6EF', fontFamily: F.dmSans }}>
      {/* Sidebar - component handles its own responsive behavior */}
      <Sidebar />

      {/* Main content - padding left on desktop, padding bottom on mobile for bottom nav */}
      <div className="md:pl-64 pb-16 md:pb-0">
        <div style={{ paddingTop: 30, paddingLeft: isMobile ? 16 : 40, paddingRight: isMobile ? 16 : 40 }}>

          {/* ── HEADER ── */}
          <div style={{ marginLeft: 28, marginRight: 28, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: '#A68660', fontSize: 11.5, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '17.25px' }}>Tailio</span>
              <div style={{ width: 10, height: 10, position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: 2.5, height: 5, left: 3.75, top: 2.5, position: 'absolute', outline: '0.83px #A68660 solid', outlineOffset: -0.42 }} />
              </div>
              <span style={{ color: '#A68660', fontSize: 11.5, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '17.25px' }}>Overview</span>
            </div>

            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <span style={{ color: '#2C1A0E', fontSize: 26, fontFamily: F.fraunces, fontWeight: 900, lineHeight: '39px' }}>My Dashboard</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Add Pet button */}
                <button
                  onClick={() => { setEditingPet(null); setIsModalOpen(true); }}
                  style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, borderRadius: 9, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <AddPetPlusIcon size={13} color="#2C1A0E" />
                  <span style={{ color: '#2C1A0E', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Add Pet</span>
                </button>
                {/* Complete Registration button */}
                {currentPet && (currentPet.registrationStage === 0 || currentPet.registrationStage === 1) && (
                  <button
                    onClick={() => currentPet && handleRegisterPet(currentPet)}
                    style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#E8600A', boxShadow: '0px 1.5px 0px #C04E06', borderRadius: 9, outline: '1px #C04E06 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7, border: 'none', cursor: 'pointer' }}
                  >
                    <DocIcon size={13} color="white" />
                    <span style={{ color: 'white', fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 600 }}>Complete Registration</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
              <Loader2 style={{ width: 48, height: 48, color: '#E8600A', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : pets.length === 0 ? (
            <div style={{ margin: '40px 28px', background: '#FFFCF8', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, background: '#F3EDE0', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PawIcon size={28} color="#A68660" />
              </div>
              <span style={{ color: '#2C1A0E', fontSize: 20, fontFamily: F.fraunces, fontWeight: 900 }}>No pets yet</span>
              <span style={{ color: '#7A5C40', fontSize: 14, fontFamily: F.dmSans }}>Add your first pet to get started</span>
              <button onClick={() => { setEditingPet(null); setIsModalOpen(true); }} style={{ paddingLeft: 22, paddingRight: 22, paddingTop: 12, paddingBottom: 12, background: '#E8600A', boxShadow: '0px 2px 0px #C04E06', borderRadius: 9, outline: '2px #C04E06 solid', outlineOffset: -2, border: 'none', cursor: 'pointer', color: 'white', fontSize: 15, fontFamily: F.dmSans, fontWeight: 600 }}>
                Add Your First Pet
              </button>
            </div>
          ) : (
            <div style={{ margin: '24px 28px 0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: 'flex-start' }}>

              {/* ── LEFT COLUMN ── */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* All docs uploaded banner */}
                {needsPayment && (
                  <div style={{ padding: '16px 16px', background: '#E6F6ED', borderRadius: 13, outline: '1px #A8DDB8 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 22, height: 22, background: '#1A6B3A', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckmarkIcon size={11} color="white" />
                    </div>
                    <span style={{ color: '#1A6B3A', fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 500 }}>
                      🎉 All documents uploaded! Please complete payment to finish registration.
                    </span>
                  </div>
                )}

                {/* WhatsApp agent banner */}
                <div style={{ padding: '16px 20px', background: 'linear-gradient(174deg, #162C18 0%, #0D1F0F 100%)', borderRadius: 13, outline: '1px rgba(37,211,102,0.12) solid', outlineOffset: -1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: 'rgba(37,211,102,0.18)', borderRadius: 100, alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 6, height: 6, background: '#6EE09A', borderRadius: 3 }} />
                        <span style={{ color: '#6EE09A', fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600, lineHeight: '15.75px' }}>Agent available now</span>
                      </div>
                      <span style={{ color: '#C8F0CC', fontSize: 15, fontFamily: F.fraunces, fontWeight: 700, lineHeight: '22.5px' }}>Register via WhatsApp — with live agent support</span>
                      <span style={{ color: 'rgba(200,240,204,0.50)', fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '16.8px' }}>Prefer help? A Tailio representative guides you through every step on WhatsApp.</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const phoneNumber = '918796440840';
                      const message = 'Hello, I need help with pet registration on Tailio.';
                      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    style={{ 
                      paddingLeft: 24, 
                      paddingRight: 24, 
                      paddingTop: 13, 
                      paddingBottom: 13, 
                      background: '#25D366', 
                      boxShadow: '0px 2px 0px #1A9E4A', 
                      borderRadius: 9, 
                      outline: '2px #1A9E4A solid', 
                      outlineOffset: -2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 9, 
                      border: 'none', 
                      cursor: 'pointer', 
                      flexShrink: 0 
                    }}
                  >
                    <img src="/images/whhtsapp-icon.png" alt="WhatsApp" width="30" height="30" />
                    <span style={{ color: 'white', fontSize: 15, fontFamily: F.dmSans, fontWeight: 700 }}>
                      Chat with us now
                    </span>
                  </button>
                </div>

                {/* Pet selector tabs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingTop: 4 }}>
                  {pets.map(pet => (
                    <button
                      key={pet._id}
                      onClick={() => setSelectedPet(pet)}
                      style={{
                        paddingLeft: 14, paddingRight: 14, paddingTop: 7, paddingBottom: 7,
                        background: selectedPet?._id === pet._id ? '#E8600A' : 'none',
                        boxShadow: selectedPet?._id === pet._id ? '0px 2px 0px #C04E06' : 'none',
                        borderRadius: 100,
                        outline: selectedPet?._id === pet._id ? '1px #C04E06 solid' : '1px rgba(44,26,14,0.18) solid',
                        outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7, border: 'none', cursor: 'pointer',
                      }}
                    >
                      <div style={{ width: 7, height: 7, background: selectedPet?._id === pet._id ? 'rgba(255,255,255,0.50)' : 'rgba(44,26,14,0.25)', borderRadius: 3.5 }} />
                      <span style={{ color: selectedPet?._id === pet._id ? 'white' : '#7A5C40', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>{pet.name}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => { setEditingPet(null); setIsModalOpen(true); }}
                    style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 7, paddingBottom: 7, borderRadius: 100, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <span style={{ color: '#7A5C40', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Add Pet</span>
                  </button>
                </div>

                {/* ── PET CARD ── */}
                {currentPet && (
                  <div style={{ background: '#FFFCF8', borderRadius: 13, borderLeft: '1px #E8600A solid', borderTop: '3px #E8600A solid', borderRight: '1px #E8600A solid', borderBottom: '1px #E8600A solid', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {/* Pet header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 60, height: 60, background: '#F3EDE0', borderRadius: 13, outline: '2px rgba(44,26,14,0.18) solid', outlineOffset: -2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                        {currentPet.profilePicture
                          ? <img src={currentPet.profilePicture} alt={currentPet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <PawIcon size={28} color="#A68660" />
                        }
                      </div>
                      <div>
                        <span style={{ color: '#2C1A0E', fontSize: 21, fontFamily: F.fraunces, fontWeight: 900, lineHeight: '31.5px', display: 'block' }}>{currentPet.name}</span>
                        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 2 }}>
                          {currentPet.registrationStage < 4 && (
                            <div style={{ paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: '#FFF4E4', borderRadius: 100, outline: '1px #FFCCA0 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 5 }}>
                              <div style={{ width: 9, height: 9, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ width: 7.5, height: 7.5, left: 0.75, top: 0.75, position: 'absolute', outline: '0.94px #B85C00 solid', outlineOffset: -0.47 }} />
                              </div>
                              <span style={{ color: '#B85C00', fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, lineHeight: '16.5px' }}>Registration Pending</span>
                            </div>
                          )}
                          {currentPet.registrationStage === 4 && (
                            <div style={{ paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: '#E6F6ED', borderRadius: 100, outline: '1px #A8DDB8 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 5 }}>
                              <span style={{ color: '#1A6B3A', fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, lineHeight: '16.5px' }}>✓ Registered</span>
                            </div>
                          )}
                          <div style={{ paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: '#F3EDE0', borderRadius: 100, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#7A5C40', fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, lineHeight: '16.5px' }}>
                              {currentPet.registrationStage === 0 ? 'Not Started' : currentPet.registrationStage === 1 ? 'Documents Ready' : currentPet.registrationStage === 2 ? 'Submitted' : currentPet.registrationStage === 3 ? 'Awaiting License' : 'Registered'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pet details - UPDATED: Removed Breed and Colour, added Vet details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {[
                        { label: 'Member Since', value: currentPet.createdAt ? new Date(currentPet.createdAt).toLocaleDateString() : 'N/A' },
                        { label: 'Documents', value: `${currentPet.uploadedDocumentsCount || 0}/4 uploaded` },
                        { label: 'Age', value: getFormattedAge(currentPet) },
                        { label: 'Vet Name', value: currentPet.vetName || 'Not specified' },
                        { label: 'Vet Registration No.', value: currentPet.vetRegistrationNumber || 'Not specified' },
                        { label: 'Vet Council', value: currentPet.vetCouncilName || 'Not specified' },
                      ].map(row => (
                        <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <span style={{ color: '#A68660', fontSize: 9.5, fontFamily: F.dmMono, fontWeight: 400, textTransform: 'uppercase', lineHeight: '14.25px', letterSpacing: '1.14px' }}>{row.label}</span>
                          <span style={{ color: '#2C1A0E', fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 500, lineHeight: '20.25px' }}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
                      {/* Edit Pet Info */}
                      <button
                        onClick={() => { setEditingPet(currentPet); setIsModalOpen(true); }}
                        style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 14.5, paddingBottom: 14.5, borderRadius: 9, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <EditIcon size={13} color="#2C1A0E" />
                        <span style={{ color: '#2C1A0E', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Edit Pet Info</span>
                      </button>

                      {/* Complete Registration (stage 0 or 1) */}
                      {(currentPet.registrationStage === 0 || currentPet.registrationStage === 1) && (
                        <button
                          onClick={() => handleRegisterPet(currentPet)}
                          style={{ paddingLeft: 22, paddingRight: 22, paddingTop: 12, paddingBottom: 12, background: '#E8600A', boxShadow: '0px 2px 0px #C04E06', borderRadius: 9, outline: '2px #C04E06 solid', outlineOffset: -2, display: 'flex', alignItems: 'center', gap: 7, border: 'none', cursor: 'pointer' }}
                        >
                          <DocIcon size={13} color="white" />
                          <span style={{ color: 'white', fontSize: 15, fontFamily: F.dmSans, fontWeight: 600 }}>Complete Registration</span>
                        </button>
                      )}

                      {/* Stage 2/3 — status pill */}
                      {(currentPet.registrationStage === 2 || currentPet.registrationStage === 3) && (
                        <div style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 12, paddingBottom: 12, background: currentPet.registrationStage === 3 ? '#F3EAF8' : '#FFF4E4', borderRadius: 9, outline: `1px ${currentPet.registrationStage === 3 ? '#D4A0E8' : '#FFCCA0'} solid`, outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ color: currentPet.registrationStage === 3 ? '#6B21A8' : '#B85C00', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>
                            {currentPet.registrationStage === 2 ? '📋 Under Review' : '🏅 License Being Prepared'}
                          </span>
                        </div>
                      )}

                      {/* Stage 4 — view registration */}
                      {currentPet.registrationStage === 4 && (
                        <button
                          onClick={() => handleViewRegistration(currentPet)}
                          style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 14.5, paddingBottom: 14.5, borderRadius: 9, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <span style={{ color: '#2C1A0E', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>View Registration</span>
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => setShowDeleteConfirm({ show: true, petId: currentPet._id, petName: currentPet.name })}
                        style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 14.5, paddingBottom: 14.5, background: '#FDECEA', borderRadius: 9, outline: '1px #F5B8B5 solid', outlineOffset: -1, display: 'flex', alignItems: 'center', gap: 7, border: 'none', cursor: 'pointer' }}
                      >
                        <TrashIcon size={13} color="#A0251E" />
                        <span style={{ color: '#A0251E', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Delete</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ── REGISTRATION PROGRESS CARD ── */}
                {currentPet && (
                  <div style={{ background: '#FFFCF8', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 12, height: 12, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: 10, height: 9, left: 1, top: 1.5, position: 'absolute', outline: '1px #A68660 solid', outlineOffset: -0.5 }} />
                      </div>
                      <span style={{ color: '#A68660', fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', lineHeight: '15.75px', letterSpacing: '1.05px' }}>Registration Progress</span>
                    </div>

                    {/* Documents progress */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 2 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#2C1A0E', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500, lineHeight: '19.5px' }}>Documents Uploaded</span>
                        <span style={{ color: '#7A5C40', fontSize: 12, fontFamily: F.dmMono, fontWeight: 400, lineHeight: '18px' }}>{currentPet.uploadedDocumentsCount || 0}/4</span>
                      </div>
                      <div style={{ height: 6, background: '#EBE1CE', borderRadius: 100, overflow: 'hidden' }}>
                        <div style={{ height: 6, background: (currentPet.uploadedDocumentsCount || 0) >= 4 ? '#1A6B3A' : '#E8600A', borderRadius: 100, width: `${((currentPet.uploadedDocumentsCount || 0) / 4) * 100}%`, transition: 'width 0.4s' }} />
                      </div>
                    </div>

                    {/* Registration status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#2C1A0E', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500, lineHeight: '19.5px' }}>Registration Status</span>
                        <span style={{ color: '#B85C00', fontSize: 12, fontFamily: F.dmMono, fontWeight: 400, lineHeight: '18px' }}>
                          {currentPet.registrationStage === 0 ? 'Not Started' : currentPet.registrationStage === 1 ? needsPayment ? 'Pending Payment' : 'Docs Uploading' : currentPet.registrationStage === 2 ? 'Under Review' : currentPet.registrationStage === 3 ? 'Awaiting License' : 'Complete'}
                        </span>
                      </div>
                      <div style={{ height: 6, background: '#EBE1CE', borderRadius: 100, overflow: 'hidden', position: 'relative' }}>
                        <div style={{ height: 6, background: '#E8600A', borderRadius: 100, width: `${(currentPet.registrationStage / 4) * 100}%`, transition: 'width 0.4s' }} />
                      </div>
                    </div>

                    {/* Preview docs pills */}
                    <div style={{ paddingTop: 2, display: 'flex', alignItems: 'center', gap: 5.5, flexWrap: 'wrap' }}>
                      <span style={{ color: '#A68660', fontSize: 11, fontFamily: F.dmMono, fontWeight: 400, lineHeight: '16.5px' }}>Preview docs:</span>
                      {[0, 1, 2, 3].map(n => {
                        const uploaded = (currentPet.uploadedDocumentsCount || 0) > n;
                        return (
                          <div
                            key={n}
                            style={{ paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: uploaded ? '#E8600A' : 'none', borderRadius: 100, outline: `1px ${uploaded ? '#C04E06' : 'rgba(44,26,14,0.18)'} solid`, outlineOffset: -1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <span style={{ color: uploaded ? 'white' : '#7A5C40', fontSize: 11, fontFamily: F.dmSans, fontWeight: 400 }}>{uploaded ? `${n + 1} ✓` : `${n}`}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div style={{ width: isMobile ? '100%' : 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Pet Overview card */}
                <div style={{ padding: '18px 20px', background: '#2C1A0E', borderRadius: 13, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(244,228,207,0.38)', fontSize: 9.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', lineHeight: '14.25px', letterSpacing: '0.95px' }}>Pet Overview</span>
                    <PawIcon size={13} color="rgba(255,255,255,0.22)" />
                  </div>
                  <div style={{ paddingTop: 11 }}>
                    <span style={{ color: '#FF8C3A', fontSize: 46, fontFamily: F.fraunces, fontWeight: 900, lineHeight: '46px' }}>{stats.total}</span>
                  </div>
                  <span style={{ color: 'rgba(244,228,207,0.42)', fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '18px' }}>Total Pets Added</span>
                  <div style={{ paddingTop: 11, display: 'flex', flexDirection: 'column' }}>
                    {[
                      { label: 'Registered', value: stats.registered, color: '#6EE09A' },
                      { label: 'In Progress', value: stats.inProgress, color: '#FFB266' },
                      { label: 'Not Started', value: stats.notStarted, color: '#F4E4CF' },
                    ].map((row, i, arr) => (
                      <div key={row.label} style={{ paddingTop: 7, paddingBottom: 7, borderBottom: i < arr.length - 1 ? '1px rgba(255,255,255,0.05) solid' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'rgba(244,228,207,0.52)', fontSize: 13, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '19.5px' }}>{row.label}</span>
                        <span style={{ color: row.color, fontSize: 13, fontFamily: F.dmMono, fontWeight: 500, lineHeight: '19.5px' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Documents */}
                <div style={{ padding: '16px 18px', background: '#FFFCF8', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ paddingBottom: 5, display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 11, height: 11, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ width: 7.33, height: 9.17, left: 1.83, top: 0.92, position: 'absolute', outline: '0.92px #A68660 solid', outlineOffset: -0.46 }} />
                      <div style={{ width: 2.75, height: 2.75, left: 6.42, top: 0.92, position: 'absolute', outline: '0.92px #A68660 solid', outlineOffset: -0.46 }} />
                    </div>
                    <span style={{ color: '#A68660', fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', lineHeight: '15.75px', letterSpacing: '1.05px', flex: 1 }}>Total Documents</span>
                    <span style={{ color: stats.documentsUploaded >= stats.total * 4 && stats.total > 0 ? '#1A6B3A' : '#E8600A', fontSize: 12, fontFamily: F.dmMono, fontWeight: 500, lineHeight: '18px' }}>{stats.documentsUploaded}/{stats.total * 4}</span>
                  </div>
                  <div style={{ height: 6, background: '#EBE1CE', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: 6, background: stats.documentsUploaded >= stats.total * 4 && stats.total > 0 ? '#1A6B3A' : '#E8600A', borderRadius: 100, width: `${stats.total > 0 ? (stats.documentsUploaded / (stats.total * 4)) * 100 : 0}%` }} />
                  </div>
                  {stats.documentsUploaded >= stats.total * 4 && stats.total > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 11, height: 11, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: 7.33, height: 5.04, left: 1.83, top: 2.75, position: 'absolute', outline: '1.15px #1A6B3A solid', outlineOffset: -0.57 }} />
                      </div>
                      <span style={{ color: '#1A6B3A', fontSize: 12, fontFamily: F.dmSans, fontWeight: 600, lineHeight: '18px' }}>All documents uploaded</span>
                    </div>
                  )}
                </div>

                {/* Registration % */}
                <div style={{ padding: '16px 18px', background: '#FFFCF8', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ paddingBottom: 5, display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 11, height: 11, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ width: 9.17, height: 9.17, left: 0.92, top: 0.91, position: 'absolute', outline: '0.92px #A68660 solid', outlineOffset: -0.46 }} />
                      <div style={{ width: 5.96, height: 4.59, left: 4.13, top: 1.83, position: 'absolute', outline: '0.92px #A68660 solid', outlineOffset: -0.46 }} />
                    </div>
                    <span style={{ color: '#A68660', fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', lineHeight: '15.75px', letterSpacing: '1.05px', flex: 1 }}>Registration</span>
                    <span style={{ color: '#E8600A', fontSize: 12, fontFamily: F.dmMono, fontWeight: 500, lineHeight: '18px' }}>{stats.total === 0 ? 0 : Math.round((stats.registered / stats.total) * 100)}%</span>
                  </div>
                  <div style={{ height: 6, background: '#EBE1CE', borderRadius: 100 }}>
                    <div style={{ height: 6, background: '#1A6B3A', borderRadius: 100, width: `${stats.total === 0 ? 0 : (stats.registered / stats.total) * 100}%` }} />
                  </div>
                  <span style={{ color: '#7A5C40', fontSize: 12, fontFamily: F.dmSans, fontWeight: 400, lineHeight: '18px' }}>{stats.registered} of {stats.total} pets registered</span>
                </div>

                {/* Registration Timeline */}
                {currentPet && (
                  <div style={{ padding: '16px 18px', background: '#FFFCF8', borderRadius: 13, outline: '1px rgba(44,26,14,0.10) solid', outlineOffset: -1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: 9.17, height: 9.17, left: 0.92, top: 0.92, position: 'absolute', outline: '0.92px #E8600A solid', outlineOffset: -0.46 }} />
                        <div style={{ width: 1.83, height: 3.67, left: 5.5, top: 2.75, position: 'absolute', outline: '0.92px #E8600A solid', outlineOffset: -0.46 }} />
                      </div>
                      <span style={{ color: '#A68660', fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: 'uppercase', lineHeight: '15.75px', letterSpacing: '1.05px' }}>Registration Timeline</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {[
                        { label: 'Account Created', sub: new Date(currentPet.createdAt).toLocaleDateString(), done: true },
                        { label: 'Documents Uploaded', sub: `${currentPet.uploadedDocumentsCount || 0}/4 complete`, done: (currentPet.uploadedDocumentsCount || 0) >= 4 },
                        { label: 'Current Stage', sub: needsPayment ? 'Pending Payment' : currentPet.registrationStage === 2 ? 'Under Review' : currentPet.registrationStage >= 3 ? 'Processing' : 'Not started', current: true, done: false },
                        { label: 'Municipal Verification', sub: 'Not started', done: currentPet.registrationStage >= 3 },
                        { label: 'Certificate Issued', sub: '24–72 hrs after payment', done: currentPet.registrationStage === 4 },
                      ].map((item, i, arr) => (
                        <div key={item.label} style={{ paddingTop: 9, paddingBottom: 9, borderBottom: i < arr.length - 1 ? '1px rgba(44,26,14,0.10) solid' : 'none', display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                          <div style={{ width: 8, height: 12, paddingTop: 4, flexShrink: 0 }}>
                            {item.done ? (
                              <div style={{ width: 8, height: 8, background: '#1A6B3A', borderRadius: 4 }} />
                            ) : item.current ? (
                              <div style={{ width: 8, height: 8, background: '#E8600A', borderRadius: 4, boxShadow: '0px 0px 0px 3px rgba(232,96,10,0.18)' }} />
                            ) : (
                              <div style={{ width: 8, height: 8, background: '#EBE1CE', borderRadius: 4, border: '1px rgba(44,26,14,0.18) solid' }} />
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <span style={{ color: item.done || item.current ? '#2C1A0E' : '#7A5C40', fontSize: 13, fontFamily: F.dmSans, fontWeight: 500, lineHeight: '19.5px' }}>{item.label}</span>
                            <span style={{ color: item.current ? '#E8600A' : '#A68660', fontSize: 11, fontFamily: F.dmMono, fontWeight: 400, lineHeight: '16.5px' }}>{item.sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ── */}
      <AddPetModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingPet(null); }} onPetAdded={async () => { await loadPets(); setIsModalOpen(false); setEditingPet(null); }} token={token} petToEdit={editingPet} />

      {showRegistrationForm && selectedPet && (
        <RegistrationForm
          key={selectedPet._id + (existingRegistration ? 'edit' : 'new')}
          petId={selectedPet._id} token={token!} petName={selectedPet.name}
          onSuccess={async () => { setShowRegistrationForm(false); setSelectedPet(null); setExistingRegistration(null); await loadPets(); }}
          onCancel={() => { setShowRegistrationForm(false); setSelectedPet(null); setExistingRegistration(null); }}
          existingRegistration={existingRegistration}
        />
      )}

      {showRegistrationView && selectedPet && existingRegistration && (
        <RegistrationForm
          key={`view-${selectedPet._id}`}
          petId={selectedPet._id} token={token!} petName={selectedPet.name}
          onSuccess={() => { setShowRegistrationView(false); setSelectedPet(null); setExistingRegistration(null); loadPets(); }}
          onCancel={() => { setShowRegistrationView(false); setSelectedPet(null); setExistingRegistration(null); }}
          existingRegistration={existingRegistration} viewOnly={true}
        />
      )}

      {showDeleteConfirm.show && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
          <div style={{ background: '#FFFCF8', borderRadius: 18, maxWidth: 400, width: '100%', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, background: '#FDECEA', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrashIcon size={20} color="#A0251E" />
            </div>
            <span style={{ color: '#2C1A0E', fontSize: 18, fontFamily: F.fraunces, fontWeight: 900 }}>Delete Pet?</span>
            <span style={{ color: '#7A5C40', fontSize: 14, fontFamily: F.dmSans }}>Are you sure you want to delete {showDeleteConfirm.petName}? This cannot be undone.</span>
            <div style={{ display: 'flex', gap: 12, width: '100%' }}>
              <button onClick={() => setShowDeleteConfirm({ show: false, petId: '', petName: '' })} style={{ flex: 1, padding: '10px 0', borderRadius: 9, outline: '1px rgba(44,26,14,0.18) solid', outlineOffset: -1, background: 'none', border: 'none', cursor: 'pointer', color: '#2C1A0E', fontSize: 14, fontFamily: F.dmSans, fontWeight: 500 }}>Cancel</button>
              <button onClick={() => handleDeletePet(showDeleteConfirm.petId)} style={{ flex: 1, padding: '10px 0', background: '#A0251E', borderRadius: 9, border: 'none', cursor: 'pointer', color: 'white', fontSize: 14, fontFamily: F.dmSans, fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
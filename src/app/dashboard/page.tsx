"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../component/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AddPetModal from "../component/AddPetModal";
import Sidebar from "../component/Sidebar";

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
}

function getDisplayStage(pet: Pet): { label: string; step: number; color: string } {
  if (pet.registrationStage === 4)
    return { label: "License Received", step: 3, color: "#1A6B3A" };
  if (pet.registrationStage >= 2)
    return { label: "Registration Requested", step: 2, color: "#E8600A" };
  return { label: "Filling Form", step: 1, color: "#E8600A" };
}

function PawIcon({ size = 28, color = "#A68660" }: { size?: number; color?: string }) {
  const s = size / 28;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden" }}>
      <div style={{ width: 12.32 * s, height: 10.08 * s, left: 7.84 * s, top: 15.12 * s, position: "absolute", background: color }} />
      <div style={{ width: 6.16 * s, height: 7.28 * s, left: 4.76 * s, top: 10.92 * s, position: "absolute", background: color }} />
      <div style={{ width: 6.16 * s, height: 7.28 * s, left: 17.08 * s, top: 10.92 * s, position: "absolute", background: color }} />
      <div style={{ width: 5.04 * s, height: 6.16 * s, left: 8.12 * s, top: 7 * s, position: "absolute", background: color }} />
      <div style={{ width: 5.04 * s, height: 6.16 * s, left: 15.12 * s, top: 7 * s, position: "absolute", background: color }} />
    </div>
  );
}

function TrashIcon({ size = 13, color = "#A0251E" }: { size?: number; color?: string }) {
  const s = size / 13;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden" }}>
      <div style={{ width: 7.58 * s, height: 8.67 * s, left: 2.71 * s, top: 3.25 * s, position: "absolute", outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
      <div style={{ width: 3.25 * s, height: 1.63 * s, left: 4.88 * s, top: 1.63 * s, position: "absolute", outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
    </div>
  );
}

function EditIcon({ size = 13, color = "#2C1A0E" }: { size?: number; color?: string }) {
  const s = size / 13;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden" }}>
      <div style={{ width: 9.75 * s, height: 9.75 * s, left: 1.08 * s, top: 2.17 * s, position: "absolute", outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
      <div style={{ width: 7.65 * s, height: 7.65 * s, left: 4.33 * s, top: 1.02 * s, position: "absolute", outline: `1.08px ${color} solid`, outlineOffset: -0.54 * s }} />
    </div>
  );
}

function RegistrationProgressBar({ pet }: { pet: Pet }) {
  const { step } = getDisplayStage(pet);
  const stages = ["Filling Form", "Registration Requested", "License Received"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {stages.map((label, i) => {
          const stageNum = i + 1;
          const done = step > stageNum;
          const active = step === stageNum;
          return (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: i === 0 ? "flex-start" : i === stages.length - 1 ? "flex-end" : "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: done ? "#1A6B3A" : active ? "#E8600A" : "#EBE1CE", boxShadow: active ? "0 0 0 3px rgba(232,96,10,0.18)" : "none", marginBottom: 5 }} />
              <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 600, color: done ? "#1A6B3A" : active ? "#E8600A" : "#A68660", textAlign: i === 0 ? "left" : i === stages.length - 1 ? "right" : "center", lineHeight: "14px" }}>{label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ height: 6, background: "#EBE1CE", borderRadius: 100, overflow: "hidden" }}>
        <div style={{ height: 6, borderRadius: 100, background: step === 3 ? "#1A6B3A" : "#E8600A", width: `${((step - 1) / 2) * 100}%`, transition: "width 0.5s" }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { token, isAuthenticated, loading: authLoading, logout, user } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPet, setEditingPet] = useState<any>(null);
  const [resumePetId, setResumePetId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ show: boolean; petId: string; petName: string }>({ show: false, petId: "", petName: "" });
  const [isMobile, setIsMobile] = useState(false);

  const selectedPetRef = useRef<Pet | null>(null);
  selectedPetRef.current = selectedPet;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/");
  }, [authLoading, isAuthenticated, router]);

  const loadPets = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/pets?t=" + Date.now(), "GET", null, token);
      const petsData: Pet[] = (Array.isArray(data) ? data : []).map((pet: any) => ({
        ...pet,
        uploadedDocumentsCount: pet.uploadedDocumentsCount ?? 0,
        hasAllDocuments: pet.hasAllDocuments ?? false,
        registrationTriggered: pet.registrationTriggered ?? false,
        registrationStage: pet.registrationStage ?? 0,
        registrationStatus: pet.registrationStatus ?? "not_started",
      }));
      setPets(petsData);
      const current = selectedPetRef.current;
      if (petsData.length > 0 && !current) {
        setSelectedPet(petsData[0]);
      } else if (current && petsData.length > 0) {
        const updated = petsData.find((p) => p._id === current._id);
        if (updated) setSelectedPet(updated);
      }
    } catch (err) {
      setError("Failed to load pets. Please try again.");
      if (err instanceof Error && err.message === "Session expired") {
        logout();
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout, router]);

  useEffect(() => {
    if (token) loadPets();
  }, [token, loadPets]);

  const handleDeletePet = async (petId: string) => {
    try {
      setLoading(true);
      await apiFetch(`/pets/${petId}`, "DELETE", null, token!);
      const updated = pets.filter((p) => p._id !== petId);
      setPets(updated);
      if (updated.length === 0) setSelectedPet(null);
      else if (selectedPet?._id === petId) setSelectedPet(updated[0]);
      setShowDeleteConfirm({ show: false, petId: "", petName: "" });
    } catch {
      setError("Failed to delete pet");
    } finally {
      setLoading(false);
    }
  };

  const getFormattedAge = (pet: Pet) => {
    if (pet.ageYears && pet.ageMonths) return `${pet.ageYears}y ${pet.ageMonths}m`;
    if (pet.ageYears) return `${pet.ageYears} ${pet.ageYears === 1 ? "year" : "years"}`;
    if (pet.ageMonths) return `${pet.ageMonths} ${pet.ageMonths === 1 ? "month" : "months"}`;
    return "Not specified";
  };

  const stats = {
    total: pets.length,
    registered: pets.filter((p) => p.registrationStage === 4).length,
    inProgress: pets.filter((p) => p.registrationStage >= 2 && p.registrationStage < 4).length,
    notStarted: pets.filter((p) => p.registrationStage < 2).length,
    documentsUploaded: pets.reduce((sum, p) => sum + (p.uploadedDocumentsCount || 0), 0),
  };

  const currentPet = selectedPet;

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF6EF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 style={{ width: 48, height: 48, color: "#E8600A", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6EF", fontFamily: F.dmSans }}>
      <div className="hidden md:block"><Sidebar /></div>

      <div className="md:pl-64">
        <div style={{ paddingTop: 30, paddingLeft: isMobile ? 16 : 40, paddingRight: isMobile ? 16 : 40 }}>

          {/* Header with Tailio Symbol */}
<div style={{ marginLeft: isMobile ? 0 : 28, marginRight: isMobile ? 0 : 28, display: "flex", flexDirection: "column", gap: 5, marginBottom: 24 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    <span style={{ color: "#A68660", fontSize: 11.5 }}>›</span>
    <span style={{ color: "#A68660", fontSize: 11.5, fontFamily: F.dmSans }}>Overview</span>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ color: "#2C1A0E", fontSize: 26, fontFamily: F.fraunces, fontWeight: 900 }}>My Dashboard</span>
      {/* Tailio Symbol - Floating, no box */}
      <img 
        src="/images/tailio.png" 
        alt="Tailio" 
        style={{ 
          width: 150, 
          height: 150, 
          objectFit: "contain",
          opacity: 0.6,
          filter: "drop-shadow(0 2px 4px rgba(232,96,10,0.1))",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.9";
          e.currentTarget.style.transform = "scale(1.05) rotate(-3deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.6";
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
        }}
      />
    </div>
    <button
      onClick={() => { setEditingPet(null); setResumePetId(null); setIsModalOpen(true); }}
      style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9, background: "#E8600A", boxShadow: "0px 2px 0px #C04E06", borderRadius: 9, outline: "2px solid #C04E06", outlineOffset: -2, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}
    >
      <span style={{ color: "white", fontSize: 13.5, fontFamily: F.dmSans, fontWeight: 600 }}>+ Add Pet</span>
    </button>
  </div>
</div>

          {error && (
            <div style={{ margin: "0 28px 16px", padding: "10px 14px", background: "#FDECEA", borderRadius: 9, color: "#A0251E", fontSize: 13, fontFamily: F.dmSans }}>{error}</div>
          )}

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
              <Loader2 style={{ width: 48, height: 48, color: "#E8600A", animation: "spin 1s linear infinite" }} />
            </div>
          ) : pets.length === 0 ? (
            <div style={{ margin: "40px 28px", background: "#FFFCF8", borderRadius: 13, outline: "1px solid rgba(44,26,14,0.10)", padding: "60px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
              <div style={{ width: 60, height: 60, background: "#F3EDE0", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PawIcon size={28} color="#A68660" />
              </div>
              <span style={{ color: "#2C1A0E", fontSize: 20, fontFamily: F.fraunces, fontWeight: 900 }}>No pets yet</span>
              <span style={{ color: "#7A5C40", fontSize: 14, fontFamily: F.dmSans }}>Add your first pet to start registration</span>
              <button
                onClick={() => { setEditingPet(null); setResumePetId(null); setIsModalOpen(true); }}
                style={{ paddingLeft: 22, paddingRight: 22, paddingTop: 12, paddingBottom: 12, background: "#E8600A", boxShadow: "0px 2px 0px #C04E06", borderRadius: 9, outline: "2px solid #C04E06", outlineOffset: -2, border: "none", cursor: "pointer", color: "white", fontSize: 15, fontFamily: F.dmSans, fontWeight: 600 }}
              >
                Add Your First Pet
              </button>
            </div>
          ) : (
            <div style={{ margin: "0 28px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: 20, alignItems: "flex-start" }}>

              {/* LEFT COLUMN */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>

                {/* WhatsApp banner with Tailio symbol */}
                <div style={{ padding: "16px 20px", background: "linear-gradient(174deg, #162C18 0%, #0D1F0F 100%)", borderRadius: 13, outline: "1px solid rgba(37,211,102,0.12)", outlineOffset: -1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Tailio symbol in WhatsApp banner */}
                    <div style={{
                      width: 44,
                      height: 44,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}>
                      <img 
                        src="/images/tailio.png" 
                        alt="Tailio" 
                        style={{ 
                          width: 30, 
                          height: 30, 
                          objectFit: "contain",
                          filter: "brightness(0) invert(1)",
                          opacity: 0.6,
                        }} 
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ display: "inline-flex", alignSelf: "flex-start", paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: "rgba(37,211,102,0.18)", borderRadius: 100, alignItems: "center", gap: 6 }}>
                        <div style={{ width: 6, height: 6, background: "#6EE09A", borderRadius: 3 }} />
                        <span style={{ color: "#6EE09A", fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600 }}>Agent available now</span>
                      </div>
                      <span style={{ color: "#C8F0CC", fontSize: 15, fontFamily: F.fraunces, fontWeight: 700 }}>Register via WhatsApp — with live agent support</span>
                      <span style={{ color: "rgba(200,240,204,0.50)", fontSize: 12, fontFamily: F.dmSans }}>A Tailio representative guides you through every step.</span>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(`https://wa.me/918796440840?text=${encodeURIComponent("Hello, I need help with pet registration on Tailio.")}`, "_blank")}
                    style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 11, paddingBottom: 11, background: "#25D366", boxShadow: "0px 2px 0px #1A9E4A", borderRadius: 9, outline: "2px solid #1A9E4A", outlineOffset: -2, display: "flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", flexShrink: 0 }}
                  >
                    <img src="/images/whhtsapp-icon.png" alt="WhatsApp" width="22" height="22" />
                    <span style={{ color: "white", fontSize: 14, fontFamily: F.dmSans, fontWeight: 700 }}>Chat with us now</span>
                  </button>
                </div>

                {/* Pet tabs */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {pets.map((pet) => (
                    <button
                      key={pet._id}
                      onClick={() => setSelectedPet(pet)}
                      style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 7, paddingBottom: 7, background: selectedPet?._id === pet._id ? "#E8600A" : "none", boxShadow: selectedPet?._id === pet._id ? "0px 2px 0px #C04E06" : "none", borderRadius: 100, outline: selectedPet?._id === pet._id ? "1px solid #C04E06" : "1px solid rgba(44,26,14,0.18)", outlineOffset: -1, display: "flex", alignItems: "center", gap: 7, border: "none", cursor: "pointer" }}
                    >
                      <div style={{ width: 7, height: 7, background: selectedPet?._id === pet._id ? "rgba(255,255,255,0.50)" : "rgba(44,26,14,0.25)", borderRadius: 3.5 }} />
                      <span style={{ color: selectedPet?._id === pet._id ? "white" : "#7A5C40", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>{pet.name}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => { setEditingPet(null); setResumePetId(null); setIsModalOpen(true); }}
                    style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 7, paddingBottom: 7, borderRadius: 100, outline: "1px solid rgba(44,26,14,0.18)", outlineOffset: -1, display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}
                  >
                    <span style={{ color: "#7A5C40", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>+ Add Pet</span>
                  </button>
                </div>

                {/* PET CARD */}
                {currentPet && (() => {
                  const { label: stageLabel, step: stageStep, color: stageColor } = getDisplayStage(currentPet);
                  const isIncomplete = currentPet.registrationStage < 2 && !currentPet.registrationTriggered;

                  return (
                    <div style={{ background: "#FFFCF8", borderRadius: 13, borderTop: "3px solid #E8600A", border: "1px solid #E8600A", borderTopWidth: 3, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
                      {/* Header */}
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 60, height: 60, background: "#F3EDE0", borderRadius: 13, outline: "2px solid rgba(44,26,14,0.18)", outlineOffset: -2, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                          {currentPet.profilePicture
                            ? <img src={currentPet.profilePicture} alt={currentPet.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <PawIcon size={28} color="#A68660" />
                          }
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={{ color: "#2C1A0E", fontSize: 21, fontFamily: F.fraunces, fontWeight: 900, display: "block" }}>{currentPet.name}</span>
                          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
                            <div style={{ paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: stageStep === 3 ? "#E6F6ED" : "#FFF4E4", borderRadius: 100, outline: `1px solid ${stageStep === 3 ? "#A8DDB8" : "#FFCCA0"}`, outlineOffset: -1 }}>
                              <span style={{ color: stageColor, fontSize: 11, fontFamily: F.dmSans, fontWeight: 600 }}>{stageStep === 3 ? "✓ " : ""}{stageLabel}</span>
                            </div>
                            {currentPet.gender && currentPet.gender !== "unknown" && (
                              <div style={{ paddingLeft: 9, paddingRight: 9, paddingTop: 3, paddingBottom: 3, background: "#F3EDE0", borderRadius: 100, outline: "1px solid rgba(44,26,14,0.18)", outlineOffset: -1 }}>
                                <span style={{ color: "#7A5C40", fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, textTransform: "capitalize" }}>{currentPet.gender}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Details grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
                        {[
                          { label: "Member Since", value: currentPet.createdAt ? new Date(currentPet.createdAt).toLocaleDateString() : "N/A" },
                          { label: "Age", value: getFormattedAge(currentPet) },
                          { label: "Documents", value: `${currentPet.uploadedDocumentsCount || 0}/4 uploaded` },
                          { label: "Stage", value: stageLabel },
                        ].map((row) => (
                          <div key={row.label}>
                            <span style={{ color: "#A68660", fontSize: 9.5, fontFamily: F.dmMono, fontWeight: 400, textTransform: "uppercase", letterSpacing: "1.14px", display: "block" }}>{row.label}</span>
                            <span style={{ color: "#2C1A0E", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>{row.value}</span>
                          </div>
                        ))}
                      </div>

                      <RegistrationProgressBar pet={currentPet} />

                      {/* Actions */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <button
                          onClick={() => { setEditingPet(currentPet); setResumePetId(null); setIsModalOpen(true); }}
                          style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, borderRadius: 9, outline: "1px solid rgba(44,26,14,0.18)", outlineOffset: -1, display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer" }}
                        >
                          <EditIcon size={13} color="#2C1A0E" />
                          <span style={{ color: "#2C1A0E", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Edit Pet Info</span>
                        </button>

                        {isIncomplete && (
                          <button
                            onClick={() => {
                              setEditingPet(null);
                              setResumePetId(currentPet._id);
                              setIsModalOpen(true);
                            }}
                            style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: "#E8600A", boxShadow: "0px 2px 0px #C04E06", borderRadius: 9, outline: "2px solid #C04E06", outlineOffset: -2, display: "flex", alignItems: "center", gap: 7, border: "none", cursor: "pointer" }}
                          >
                            <span style={{ color: "white", fontSize: 13, fontFamily: F.dmSans, fontWeight: 600 }}>
                              {(currentPet.uploadedDocumentsCount || 0) > 0
                                ? `Continue — ${currentPet.uploadedDocumentsCount}/4 docs uploaded`
                                : "Continue Registration →"}
                            </span>
                          </button>
                        )}

                        {(currentPet.registrationStage === 2 || currentPet.registrationStage === 3) && (
                          <div style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: "#F3EAF8", borderRadius: 9, outline: "1px solid #D4A0E8", outlineOffset: -1 }}>
                            <span style={{ color: "#6B21A8", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>
                              {currentPet.registrationStage === 2 ? "📋 Under Review" : "🏅 License Being Prepared"}
                            </span>
                          </div>
                        )}

                        {currentPet.registrationStage === 4 && (
                          <div style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: "#E6F6ED", borderRadius: 9, outline: "1px solid #A8DDB8", outlineOffset: -1 }}>
                            <span style={{ color: "#1A6B3A", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>✓ License Received</span>
                          </div>
                        )}

                        <button
                          onClick={() => setShowDeleteConfirm({ show: true, petId: currentPet._id, petName: currentPet.name })}
                          style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10, background: "#FDECEA", borderRadius: 9, outline: "1px solid #F5B8B5", outlineOffset: -1, display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer" }}
                        >
                          <TrashIcon size={13} color="#A0251E" />
                          <span style={{ color: "#A0251E", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ width: isMobile ? "100%" : 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ padding: "18px 20px", background: "#2C1A0E", borderRadius: 13, display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "rgba(244,228,207,0.38)", fontSize: 9.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.95px" }}>Pet Overview</span>
                    <PawIcon size={13} color="rgba(255,255,255,0.22)" />
                  </div>
                  <div style={{ paddingTop: 11 }}>
                    <span style={{ color: "#FF8C3A", fontSize: 46, fontFamily: F.fraunces, fontWeight: 900, lineHeight: "46px" }}>{stats.total}</span>
                  </div>
                  <span style={{ color: "rgba(244,228,207,0.42)", fontSize: 12, fontFamily: F.dmSans }}>Total Pets Added</span>
                  <div style={{ paddingTop: 11, display: "flex", flexDirection: "column" }}>
                    {[
                      { label: "License Received", value: stats.registered, color: "#6EE09A" },
                      { label: "Reg. Requested", value: stats.inProgress, color: "#FFB266" },
                      { label: "Filling Form", value: stats.notStarted, color: "#F4E4CF" },
                    ].map((row, i, arr) => (
                      <div key={row.label} style={{ paddingTop: 7, paddingBottom: 7, borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "rgba(244,228,207,0.52)", fontSize: 13, fontFamily: F.dmSans }}>{row.label}</span>
                        <span style={{ color: row.color, fontSize: 13, fontFamily: F.dmMono, fontWeight: 500 }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: "16px 18px", background: "#FFFCF8", borderRadius: 13, outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1, display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ color: "#A68660", fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.05px" }}>Total Documents</span>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#2C1A0E", fontSize: 13, fontFamily: F.dmSans }}>{stats.documentsUploaded} uploaded</span>
                    <span style={{ color: "#E8600A", fontSize: 12, fontFamily: F.dmMono, fontWeight: 500 }}>{stats.documentsUploaded}/{stats.total * 4}</span>
                  </div>
                  <div style={{ height: 6, background: "#EBE1CE", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: 6, background: stats.total > 0 && stats.documentsUploaded >= stats.total * 4 ? "#1A6B3A" : "#E8600A", borderRadius: 100, width: `${stats.total > 0 ? (stats.documentsUploaded / (stats.total * 4)) * 100 : 0}%` }} />
                  </div>
                </div>

                <div style={{ padding: "16px 18px", background: "#FFFCF8", borderRadius: 13, outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1, display: "flex", flexDirection: "column", gap: 7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A68660", fontSize: 10.5, fontFamily: F.dmSans, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.05px" }}>Registration</span>
                    <span style={{ color: "#E8600A", fontSize: 12, fontFamily: F.dmMono, fontWeight: 500 }}>{stats.total === 0 ? 0 : Math.round((stats.registered / stats.total) * 100)}%</span>
                  </div>
                  <div style={{ height: 6, background: "#EBE1CE", borderRadius: 100 }}>
                    <div style={{ height: 6, background: "#1A6B3A", borderRadius: 100, width: `${stats.total === 0 ? 0 : (stats.registered / stats.total) * 100}%` }} />
                  </div>
                  <span style={{ color: "#7A5C40", fontSize: 12, fontFamily: F.dmSans }}>{stats.registered} of {stats.total} pets fully registered</span>
                </div>

                {/* Tailio Symbol - Bottom right card */}
                <div style={{
                  padding: "14px 16px",
                  background: "linear-gradient(135deg, #FFFCF8 0%, #FFF8F0 100%)",
                  borderRadius: 13,
                  outline: "1px solid rgba(232,96,10,0.15)",
                  outlineOffset: -1,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <img 
                    src="/images/tailio.png" 
                    alt="Tailio" 
                    style={{ 
                      width: 36, 
                      height: 36, 
                      objectFit: "contain",
                    }} 
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <span style={{ 
                      color: "#2C1A0E", 
                      fontSize: 12, 
                      fontFamily: F.fraunces, 
                      fontWeight: 700,
                    }}>
                      Tailio
                    </span>
                    <span style={{ 
                      color: "#A68660", 
                      fontSize: 10, 
                      fontFamily: F.dmSans,
                    }}>
                      Pet Registration Platform
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPet(null);
          setResumePetId(null);
          loadPets();
        }}
        onPetAdded={() => {
          loadPets();
        }}
        token={token}
        petToEdit={editingPet}
        resumePetId={resumePetId}
      />

      {showDeleteConfirm.show && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.60)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
          <div style={{ background: "#FFFCF8", borderRadius: 18, maxWidth: 400, width: "100%", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
            <div style={{ width: 48, height: 48, background: "#FDECEA", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrashIcon size={20} color="#A0251E" />
            </div>
            <span style={{ color: "#2C1A0E", fontSize: 18, fontFamily: F.fraunces, fontWeight: 900 }}>Delete Pet?</span>
            <span style={{ color: "#7A5C40", fontSize: 14, fontFamily: F.dmSans }}>Are you sure you want to delete {showDeleteConfirm.petName}? This cannot be undone.</span>
            <div style={{ display: "flex", gap: 12, width: "100%" }}>
              <button onClick={() => setShowDeleteConfirm({ show: false, petId: "", petName: "" })} style={{ flex: 1, padding: "10px 0", borderRadius: 9, outline: "1px solid rgba(44,26,14,0.18)", outlineOffset: -1, background: "none", border: "none", cursor: "pointer", color: "#2C1A0E", fontSize: 14, fontFamily: F.dmSans, fontWeight: 500 }}>Cancel</button>
              <button onClick={() => handleDeletePet(showDeleteConfirm.petId)} style={{ flex: 1, padding: "10px 0", background: "#A0251E", borderRadius: 9, border: "none", cursor: "pointer", color: "white", fontSize: 14, fontFamily: F.dmSans, fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState, useRef, useEffect } from "react";
import { apiFetch } from "../services/api";
import {
  X,
  AlertCircle,
  Loader2,
  CheckCircle,
  Camera,
  Upload,
  FileText,
  Image as ImageIcon,
  FileCheck,
  Eye,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import PaymentButton from "./PaymentButton";
import { useAuth } from "./context/AuthContext";
import Image from "next/image";
import CitySelector from "./CitySelector";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetAdded: () => void;
  token: string | null;
  petToEdit?: any;
  resumePetId?: string | null;
}

const REQUIRED_DOCS = [
  { name: "antiRabiesCertificate", label: "Anti-Rabies Certificate", icon: FileText, accept: ".pdf,image/*", description: "Anti-rabies vaccination certificate" },
  { name: "idProof", label: "ID Proof", icon: FileText, accept: ".pdf,image/*", description: "Aadhaar card, Passport, or government ID" },
  { name: "residenceProof", label: "Residence Proof", icon: FileText, accept: ".pdf,image/*", description: "Electricity bill, Rental agreement" },
  { name: "ownerWithPetPhoto", label: "Owner with Pet Photo", icon: ImageIcon, accept: "image/*", description: "Recent photo of you with your pet" },
];

const STEPS = ["Pet Details", "Upload Docs", "Pay & Register"];

function getPrice(city: string) {
  const isGhaziabad = city?.toLowerCase() === "ghaziabad";
  const municipalFee = isGhaziabad ? 1000 : 500;
  const serviceFee = 299;
  const subtotal = municipalFee + serviceFee;
  const cgst = subtotal * 0.08;
  const sgst = subtotal * 0.08;
  const total = subtotal + cgst + sgst;
  return { municipalFee, serviceFee, subtotal: +subtotal.toFixed(2), cgst: +cgst.toFixed(2), sgst: +sgst.toFixed(2), total: +total.toFixed(2), isGhaziabad };
}

// Global style to force black text in all inputs
const inputGlobalStyles = `
  .modal-input, .modal-input:focus, .modal-input:active, .modal-input:focus-visible {
    color: #2C1A0E !important;
    -webkit-text-fill-color: #2C1A0E !important;
    background-color: #FAF6EF !important;
  }
  .modal-input::placeholder {
    color: #A68660 !important;
    -webkit-text-fill-color: #A68660 !important;
  }
  .modal-select, .modal-select:focus, .modal-select:active {
    color: #2C1A0E !important;
    background-color: #FAF6EF !important;
  }
  .modal-select option {
    color: #2C1A0E !important;
    background-color: #FAF6EF !important;
  }
`;

export default function AddPetModal({ isOpen, onClose, onPetAdded, token, petToEdit, resumePetId }: AddPetModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ 
    name: "", 
    ageYears: "", 
    ageMonths: "", 
    gender: "", 
    profilePicture: "",
    city: ""  // ✅ Added city field
  });
  const [profilePreview, setProfilePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createdPetId, setCreatedPetId] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDocs, setFetchingDocs] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [petCityFee, setPetCityFee] = useState(0);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const uploadedCount = Object.keys(uploadedDocs).length;
  const allDocsUploaded = uploadedCount === 4;

  // Inject global styles
  useEffect(() => {
    if (!document.getElementById("modal-input-styles")) {
      const style = document.createElement("style");
      style.id = "modal-input-styles";
      style.textContent = inputGlobalStyles;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById("modal-input-styles");
      if (style) style.remove();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    setSuccess(false);
    setUploadedDocs({});
    setUploading(null);
    setIsSubmitting(false);

    if (resumePetId) {
      setCreatedPetId(resumePetId);
      setStep(1);
      setForm({ name: "", ageYears: "", ageMonths: "", gender: "", profilePicture: "", city: "" });
      setProfilePreview("");
    } else if (petToEdit) {
      setCreatedPetId(null);
      setStep(0);
      setForm({
        name: petToEdit.name || "",
        ageYears: petToEdit.ageYears?.toString() || "",
        ageMonths: petToEdit.ageMonths?.toString() || "",
        gender: petToEdit.gender || "",
        profilePicture: petToEdit.profilePicture || "",
        city: petToEdit.city || "",
      });
      setProfilePreview(petToEdit.profilePicture || "");
    } else {
      setCreatedPetId(null);
      setStep(0);
      setForm({ name: "", ageYears: "", ageMonths: "", gender: "", profilePicture: "", city: "" });
      setProfilePreview("");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [isOpen, petToEdit, resumePetId]);

  useEffect(() => {
    if (!isOpen || !resumePetId || !token) return;

    const fetchExistingDocs = async () => {
      setFetchingDocs(true);
      try {
        const response = await fetch(
          `${API_BASE}/registration/${resumePetId}/status`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) return;
        const data = await response.json();

        if (Array.isArray(data.documents) && data.documents.length > 0) {
          const docsMap: Record<string, any> = {};
          for (const doc of data.documents) {
            docsMap[doc.documentName] = {
              fileName: doc.fileName,
              fileSize: doc.fileSize,
              fileData: doc.fileData,
              mimeType: doc.mimeType,
            };
          }
          setUploadedDocs(docsMap);
        }
      } catch {
        console.error("Failed to load existing documents");
      } finally {
        setFetchingDocs(false);
      }
    };

    fetchExistingDocs();
  }, [isOpen, resumePetId, token, API_BASE]);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please upload an image file"); return; }
    if (file.size > 2 * 1024 * 1024) { setError("Photo must be under 2MB"); return; }
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setProfilePreview(b64);
      setForm((f) => ({ ...f, profilePicture: b64 }));
    };
    reader.readAsDataURL(file);
  };

  // Go back to previous step
  const goToPreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
      setError("");
    }
  };

  const handlePetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate city
    if (!form.city) {
      setError("Please select your pet's registration city");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const petData = {
        name: form.name,
        species: "dog",
        ageYears: form.ageYears ? parseInt(form.ageYears) : 0,
        ageMonths: form.ageMonths ? parseInt(form.ageMonths) : 0,
        gender: form.gender,
        profilePicture: form.profilePicture,
        city: form.city,
      };

      if (petToEdit) {
        await apiFetch(`/pets/${petToEdit._id}`, "PUT", petData, token!);
        setSuccess(true);
        onPetAdded();
        setTimeout(() => onClose(), 1000);
      } else {
        const response = await apiFetch("/pets", "POST", petData, token!);
        setCreatedPetId(response._id);
        onPetAdded();
        setStep(1);
      }
    } catch {
      setError(petToEdit ? "Failed to update pet." : "Failed to create pet.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocUpload = async (file: File, docName: string) => {
    if (!createdPetId) return;
    setUploading(docName);
    setError("");
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const response = await fetch(`${API_BASE}/registration/${createdPetId}/documents`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ documentName: docName, fileData: reader.result as string, fileName: file.name, fileSize: file.size, mimeType: file.type }),
        });
        const data = await response.json();
        if (response.ok) {
          setUploadedDocs((prev) => ({
            ...prev,
            [docName]: { fileName: file.name, fileSize: file.size, fileData: reader.result as string, mimeType: file.type },
          }));
          onPetAdded();
        } else {
          setError(data.message || "Upload failed");
        }
      } catch {
        setError("Failed to upload document");
      } finally {
        setUploading(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteDoc = async (docName: string) => {
    if (!createdPetId) return;
    setError("");
    try {
      await fetch(`${API_BASE}/registration/${createdPetId}/documents/${docName}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploadedDocs((prev) => { const next = { ...prev }; delete next[docName]; return next; });
      onPetAdded();
    } catch {
      setError("Failed to delete document");
    }
  };

  const handleViewDoc = (fileData: string, mimeType: string) => {
    const byteCharacters = atob(fileData.split(",")[1]);
    const byteArray = new Uint8Array(Array.from(byteCharacters).map((c) => c.charCodeAt(0)));
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  };

  const handlePaymentSuccess = async () => {
    if (!createdPetId) return;
    setIsSubmitting(true);
    setError("");
    try {
      const petPrice = getPrice(form.city || "");
      const response = await fetch(`${API_BASE}/registration/${createdPetId}/trigger-registration`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ 
          paymentVerified: true, 
          paidAmount: petPrice.total, 
          city: form.city 
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        onPetAdded();
        setTimeout(() => onClose(), 2000);
      } else {
        setError(data.message || "Registration trigger failed. Please contact support.");
      }
    } catch {
      setError("Failed to complete registration. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Stepper = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 8 }}>
      {STEPS.map((label, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 6 }}>
          <div 
            style={{
              width: 32, height: 32, borderRadius: 16,
              background: i < step ? "#1A6B3A" : i === step ? "#E8600A" : "#EBE1CE",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: i < step ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              if (i < step) {
                setStep(i);
                setError("");
              }
            }}
            onMouseEnter={(e) => {
              if (i < step) {
                e.currentTarget.style.transform = "scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {i < step ? <CheckCircle size={16} color="white" /> : <span style={{ color: i === step ? "white" : "#A68660", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>}
          </div>
          <span style={{
            fontSize: 10, textAlign: "center",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            color: i === step ? "#E8600A" : i < step ? "#1A6B3A" : "#A68660",
            cursor: i < step ? "pointer" : "default",
          }}
          onClick={() => {
            if (i < step) {
              setStep(i);
              setError("");
            }
          }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );

  // Common input style with forced black text
  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    background: "#FAF6EF",
    borderRadius: 9,
    fontSize: 13,
    outline: "1px solid rgba(44,26,14,0.18)",
    border: "none",
    color: "#2C1A0E",
    WebkitTextFillColor: "#2C1A0E",
    WebkitAppearance: "none" as const,
    MozAppearance: "none" as const,
    appearance: "none" as const,
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const petPrice = getPrice(form.city || "");

  return (
    <>
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 12
      }}>
        <div style={{
          background: "#FFFCF8", borderRadius: 20, width: "100%", maxWidth: 500,
          maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column",
          boxShadow: "0 24px 80px rgba(44,26,14,0.18)"
        }}>

          {/* Header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(44,26,14,0.08)", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: 10, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}>
                  <Image
                    src="/images/tailio.png"
                    alt="Tailio"
                    width={150}
                    height={150}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <div style={{ color: "#2C1A0E", fontSize: 16, fontFamily: "'Fraunces', serif", fontWeight: 900 }}>
                    {petToEdit ? "Edit Pet" : resumePetId ? "Continue" : "Register Pet"}
                  </div>
                  <div style={{ color: "#A68660", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
                    {petToEdit ? "Update info" : resumePetId ? "Pick up where you left" : "Add & register in one go"}
                  </div>
                </div>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <X size={18} color="#7A5C40" />
              </button>
            </div>
            {!petToEdit && <Stepper />}
          </div>

          {/* Body */}
          <div style={{ overflowY: "auto", flex: 1, padding: "16px 20px 20px" }}>

            {success && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: 56, height: 56, background: "#E6F6ED", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <CheckCircle size={28} color="#1A6B3A" />
                </div>
                <div style={{ color: "#2C1A0E", fontSize: 18, fontFamily: "'Fraunces', serif", fontWeight: 900, marginBottom: 6 }}>
                  {petToEdit ? "Pet Updated!" : "Registration Submitted!"}
                </div>
                <div style={{ color: "#7A5C40", fontSize: 12, fontFamily: "'DM Sans', sans-serif", lineHeight: "18px" }}>
                  {petToEdit ? "Pet info updated." : "License will be delivered in 7-10 business days."}
                </div>
              </div>
            )}

            {!success && error && (
              <div style={{ background: "#FDECEA", borderRadius: 9, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <AlertCircle size={14} color="#A0251E" />
                <span style={{ color: "#A0251E", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{error}</span>
              </div>
            )}

            {/* Step 0 - Pet Details */}
            {!success && step === 0 && (
              <form onSubmit={handlePetSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div onClick={() => fileInputRef.current?.click()} style={{
                    width: 80, height: 80, borderRadius: 12, background: "#F3EDE0",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden", outline: "2px dashed rgba(44,26,14,0.18)", outlineOffset: -2,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.outline = "2px dashed #E8600A";
                    e.currentTarget.style.background = "#FFF0E4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.outline = "2px dashed rgba(44,26,14,0.18)";
                    e.currentTarget.style.background = "#F3EDE0";
                  }}>
                    {profilePreview
                      ? <img src={profilePreview} alt="pet" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ textAlign: "center" }}><Camera size={24} color="#A68660" /><div style={{ color: "#A68660", fontSize: 9 }}>Add photo</div></div>
                    }
                  </div>
                  <span style={{ color: "#7A5C40", fontSize: 10 }}>Photo with pet · JPEG/PNG, max 2MB</span>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={handlePhotoUpload} style={{ display: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", color: "#2C1A0E", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Pet Name <span style={{ color: "#E8600A" }}>*</span></label>
                  <input 
                    className="modal-input"
                    style={inputStyle} 
                    type="text" 
                    required 
                    placeholder="Enter pet's name" 
                    value={form.name} 
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} 
                  />
                </div>

                <div>
                  <label style={{ display: "block", color: "#2C1A0E", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Age <span style={{ color: "#E8600A" }}>*</span></label>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <input 
                        className="modal-input"
                        style={inputStyle} 
                        type="number" 
                        min={0} 
                        max={50} 
                        required
                        placeholder="Years" 
                        value={form.ageYears} 
                        onChange={(e) => setForm((f) => ({ ...f, ageYears: e.target.value }))} 
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <input 
                        className="modal-input"
                        style={inputStyle} 
                        type="number" 
                        min={0} 
                        max={11} 
                        required
                        placeholder="Months" 
                        value={form.ageMonths} 
                        onChange={(e) => setForm((f) => ({ ...f, ageMonths: e.target.value }))} 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", color: "#2C1A0E", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Gender <span style={{ color: "#E8600A" }}>*</span></label>
                  <select 
                    className="modal-select"
                    style={selectStyle} 
                    required
                    value={form.gender} 
                    onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* ✅ City Selector for Pet */}
                <div>
                  <CitySelector 
                    selectedCity={form.city}
                    onChange={(city, fee) => {
                      setForm((f) => ({ ...f, city }));
                      setPetCityFee(fee);
                    }}
                    error={!form.city && step === 0 ? "Please select your pet's registration city" : ""}
                  />
                  <p style={{ color: '#A68660', fontSize: 10, marginTop: 4 }}>
                    The city where your pet will be registered (determines the municipal fee)
                  </p>
                </div>

                <button type="submit" disabled={loading} style={{
                  width: "100%", padding: "12px 20px", background: loading ? "#EBE1CE" : "#E8600A",
                  boxShadow: loading ? "none" : "0px 2px 0px #C04E06", borderRadius: 9, outline: loading ? "none" : "1px solid #C04E06", outlineOffset: -1,
                  border: "none", cursor: loading ? "not-allowed" : "pointer", color: loading ? "#A68660" : "white",
                  fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#C06A18";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#E8600A";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}>
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Creating...</> : petToEdit ? "Update Pet" : "Continue →"}
                </button>
              </form>
            )}

            {/* Step 1 - Documents */}
            {!success && step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <button 
                  onClick={goToPreviousStep}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#7A5C40",
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    padding: "4px 0",
                    transition: "all 0.3s ease",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#E8600A";
                    e.currentTarget.style.transform = "translateX(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#7A5C40";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <ChevronLeft size={16} />
                  Back to Pet Details
                </button>

                {fetchingDocs && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 0" }}>
                    <Loader2 size={16} color="#E8600A" className="animate-spin" />
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Loading documents...</span>
                  </div>
                )}

                {!fetchingDocs && (
                  <>
                    <div style={{
                      padding: "12px 16px", background: uploadedCount === 4 ? "#E6F6ED" : "#FFF4E4", borderRadius: 9,
                      outline: `1px solid ${uploadedCount === 4 ? "#A8DDB8" : "#FFCCA0"}`, outlineOffset: -1,
                      display: "flex", alignItems: "center", gap: 10
                    }}>
                      <div style={{
                        width: 24, height: 24, background: uploadedCount === 4 ? "#1A6B3A" : "#E8600A", borderRadius: 12,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        {uploadedCount === 4 ? <CheckCircle size={12} color="white" /> : <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{uploadedCount}</span>}
                      </div>
                      <span style={{ color: uploadedCount === 4 ? "#1A6B3A" : "#B85C00", fontSize: 12, fontWeight: 500 }}>
                        {uploadedCount === 4 ? "All documents uploaded!" : `${uploadedCount}/4 documents uploaded`}
                      </span>
                    </div>

                    <div style={{ height: 6, background: "#EBE1CE", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ height: 6, borderRadius: 100, background: uploadedCount === 4 ? "#1A6B3A" : "#E8600A", width: `${(uploadedCount / 4) * 100}%`, transition: "width 0.4s ease" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {REQUIRED_DOCS.map((doc) => {
                        const uploaded = uploadedDocs[doc.name];
                        const isUploading = uploading === doc.name;
                        const DocIcon = doc.icon;
                        return (
                          <div key={doc.name} style={{
                            background: uploaded ? "#F0FBF4" : "#FAF6EF", borderRadius: 11,
                            outline: `1px solid ${uploaded ? "#A8DDB8" : "rgba(44,26,14,0.12)"}`, outlineOffset: -1,
                            padding: 12,
                            transition: "all 0.3s ease",
                          }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: 8, background: uploaded ? "#C6ECDA" : "#F3EDE0",
                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                transition: "all 0.3s ease",
                              }}>
                                <DocIcon size={14} color={uploaded ? "#1A6B3A" : "#A68660"} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ color: "#2C1A0E", fontSize: 13, fontWeight: 600 }}>{doc.label}</div>
                                <div style={{ color: "#A68660", fontSize: 10, marginTop: 2 }}>{doc.description}</div>
                              </div>
                              {uploaded && <CheckCircle size={16} color="#1A6B3A" />}
                            </div>

                            {uploaded ? (
                              <div style={{ background: "white", borderRadius: 8, padding: "8px 10px", transition: "all 0.3s ease" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                                    <FileCheck size={12} color="#1A6B3A" />
                                    <span style={{ fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#2C1A0E" }}>{uploaded.fileName}</span>
                                  </div>
                                  <div style={{ display: "flex", gap: 6 }}>
                                    <button onClick={() => handleViewDoc(uploaded.fileData, uploaded.mimeType)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, transition: "all 0.3s ease" }}><Eye size={14} color="#7A5C40" /></button>
                                    <button onClick={() => handleDeleteDoc(doc.name)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, transition: "all 0.3s ease" }}><Trash2 size={14} color="#A0251E" /></button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <label style={{
                                display: "flex", flexDirection: "column", alignItems: "center",
                                padding: "12px", borderRadius: 8, border: "2px dashed rgba(44,26,14,0.15)",
                                cursor: isUploading ? "not-allowed" : "pointer", background: isUploading ? "#F3EDE0" : "transparent",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                if (!isUploading) {
                                  e.currentTarget.style.borderColor = "#E8600A";
                                  e.currentTarget.style.background = "rgba(232,96,10,0.05)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isUploading) {
                                  e.currentTarget.style.borderColor = "rgba(44,26,14,0.15)";
                                  e.currentTarget.style.background = "transparent";
                                }
                              }}>
                                {isUploading ? <Loader2 size={20} color="#E8600A" className="animate-spin" /> : <Upload size={20} color="#A68660" />}
                                <span style={{ color: "#A68660", fontSize: 11, marginTop: 4 }}>{isUploading ? "Uploading..." : "Tap to upload"}</span>
                                <span style={{ color: "#C0A882", fontSize: 9, marginTop: 2 }}>{doc.accept.includes("pdf") ? "PDF or Image" : "Image"} · Max 5MB</span>
                                <input type="file" accept={doc.accept} style={{ display: "none" }} disabled={!!uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) handleDocUpload(file, doc.name); e.target.value = ""; }} />
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <button onClick={() => setStep(2)} disabled={!allDocsUploaded} style={{
                      width: "100%", padding: "12px 20px", marginTop: 4,
                      background: allDocsUploaded ? "#E8600A" : "#EBE1CE",
                      boxShadow: allDocsUploaded ? "0px 2px 0px #C04E06" : "none",
                      borderRadius: 9, outline: allDocsUploaded ? "1px solid #C04E06" : "none", outlineOffset: -1,
                      border: "none", cursor: allDocsUploaded ? "pointer" : "not-allowed",
                      color: allDocsUploaded ? "white" : "#A68660", fontSize: 14, fontWeight: 600,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (allDocsUploaded) {
                        e.currentTarget.style.background = "#C06A18";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (allDocsUploaded) {
                        e.currentTarget.style.background = "#E8600A";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}>
                      {allDocsUploaded ? "Continue →" : `Upload ${4 - uploadedCount} more`}
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Step 2 - Payment */}
            {!success && step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <button 
                  onClick={goToPreviousStep}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#7A5C40",
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    padding: "4px 0",
                    transition: "all 0.3s ease",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#E8600A";
                    e.currentTarget.style.transform = "translateX(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#7A5C40";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <ChevronLeft size={16} />
                  Back to Documents
                </button>

                <div style={{ background: "#F3EDE0", borderRadius: 11, padding: "14px 16px" }}>
                  <div style={{ color: "#A68660", fontSize: 10, letterSpacing: "1px", marginBottom: 6 }}>SUMMARY</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Registration City</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12, fontWeight: 600 }}>
                      {form.city ? form.city.charAt(0).toUpperCase() + form.city.slice(1) : "Not selected"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Documents</span>
                    <span style={{ color: "#1A6B3A", fontSize: 12, fontWeight: 600 }}>4/4 ✓</span>
                  </div>
                </div>

                <div style={{ background: "#FFFCF8", borderRadius: 11, padding: "14px 16px", outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1 }}>
                  <div style={{ color: "#A68660", fontSize: 10, letterSpacing: "1px", marginBottom: 6 }}>FEE BREAKDOWN</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Municipal Fee</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12 }}>₹{petPrice.municipalFee}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Service Fee</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12 }}>₹{petPrice.serviceFee}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>CGST + SGST (16%)</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12 }}>₹{(petPrice.cgst + petPrice.sgst).toFixed(2)}</span>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(44,26,14,0.10)", paddingTop: 8, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#2C1A0E", fontSize: 14, fontWeight: 700 }}>Total</span>
                    <span style={{ color: "#E8600A", fontSize: 18, fontWeight: 700 }}>₹{petPrice.total.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ padding: "10px 12px", background: "#FFF4E4", borderRadius: 9 }}>
                  <div style={{ color: "#B85C00", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>📋 Important</div>
                  <div style={{ color: "#7A5C40", fontSize: 11, lineHeight: "16px" }}>
                    Municipal Corporation will send an OTP. <strong>Share it only on Tailio's WhatsApp</strong>.
                  </div>
                </div>

                {createdPetId && (
                  <PaymentButton 
                    petId={createdPetId} 
                    petName={form.name || "your pet"} 
                    amount={petPrice.total} 
                    onSuccess={handlePaymentSuccess} 
                    onFailure={(err) => setError(`Payment failed: ${err}`)} 
                  />
                )}

                {isSubmitting && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "8px 0" }}>
                    <Loader2 size={16} color="#E8600A" className="animate-spin" />
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Processing...</span>
                  </div>
                )}

                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A5C40", fontSize: 12, textAlign: "center", padding: "4px 0", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#E8600A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#7A5C40";
                  }}>
                  ← Back to documents
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
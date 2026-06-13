"use client";
import { useState, useRef, useEffect } from "react";
import { apiFetch } from "../services/api";
import {
  X,
  PawPrint,
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
} from "lucide-react";
import PaymentButton from "./PaymentButton";
import { useAuth } from "./context/AuthContext";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetAdded: () => void;
  token: string | null;
  petToEdit?: any;
  resumePetId?: string | null;
}

const REQUIRED_DOCS = [
  { name: "antiRabiesCertificate", label: "Anti-Rabies Certificate", icon: FileText, accept: ".pdf,image/*", description: "Anti-rabies vaccination certificate from your vet" },
  { name: "idProof", label: "ID Proof", icon: FileText, accept: ".pdf,image/*", description: "Aadhaar card, Passport, or any government ID" },
  { name: "residenceProof", label: "Residence Proof", icon: FileText, accept: ".pdf,image/*", description: "Electricity bill, Rental agreement, or address proof" },
  { name: "ownerWithPetPhoto", label: "Owner with Pet Photo", icon: ImageIcon, accept: "image/*", description: "Recent photo of you with your pet — both faces visible" },
];

const STEPS = ["Pet Details", "Upload Documents", "Pay & Register"];

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

export default function AddPetModal({ isOpen, onClose, onPetAdded, token, petToEdit, resumePetId }: AddPetModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", ageYears: "", ageMonths: "", gender: "", profilePicture: "" });
  const [profilePreview, setProfilePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createdPetId, setCreatedPetId] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDocs, setFetchingDocs] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const price = getPrice(user?.city || "");
  const uploadedCount = Object.keys(uploadedDocs).length;
  const allDocsUploaded = uploadedCount === 4;

  // ── Reset state on open ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setError("");
    setSuccess(false);
    setUploadedDocs({});
    setUploading(null);

    if (resumePetId) {
      setCreatedPetId(resumePetId);
      setStep(1);
      setForm({ name: "", ageYears: "", ageMonths: "", gender: "", profilePicture: "" });
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
      });
      setProfilePreview(petToEdit.profilePicture || "");
    } else {
      setCreatedPetId(null);
      setStep(0);
      setForm({ name: "", ageYears: "", ageMonths: "", gender: "", profilePicture: "" });
      setProfilePreview("");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [isOpen, petToEdit, resumePetId]);

  // ── Fetch existing docs from DB when resuming ─────────────────────────────
  // The docs are stored in MongoDB on every upload. When the user closes the
  // modal and reopens in resume mode, uploadedDocs state is empty because it
  // only lives in React memory. This effect calls GET /registration/:petId/status
  // which returns the full documents array including fileData (base64), fileName,
  // fileSize, and mimeType — exactly the shape uploadedDocs expects.
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
              fileData: doc.fileData,  // base64 — needed for view button
              mimeType: doc.mimeType,
            };
          }
          setUploadedDocs(docsMap);
        }
      } catch {
        // Non-fatal — user just sees empty state and can re-upload
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

  const handlePetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      };

      if (petToEdit) {
        await apiFetch(`/pets/${petToEdit._id}`, "PUT", petData, token!);
        setSuccess(true);
        onPetAdded();
        setTimeout(() => onClose(), 1000);
      } else {
        const response = await apiFetch("/pets", "POST", petData, token!);
        setCreatedPetId(response._id);
        onPetAdded(); // refresh list only — does NOT close modal
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
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/registration/${createdPetId}/trigger-registration`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ paymentVerified: true, paidAmount: price.total, city: user?.city }),
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
      setLoading(false);
    }
  };

  const labelStyle: React.CSSProperties = { display: "block", color: "#2C1A0E", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.12px", marginBottom: 5 };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", background: "#FAF6EF", borderRadius: 9, fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", color: "#2C1A0E", outline: "1px solid rgba(44,26,14,0.18)", outlineOffset: -1, border: "none" };

  const Stepper = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24 }}>
      {STEPS.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "unset" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: i < step ? "#1A6B3A" : i === step ? "#E8600A" : "#EBE1CE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {i < step ? <CheckCircle size={14} color="white" /> : <span style={{ color: i === step ? "white" : "#A68660", fontSize: 12, fontWeight: 700 }}>{i + 1}</span>}
            </div>
            <span style={{ fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: i === step ? "#E8600A" : i < step ? "#1A6B3A" : "#A68660", whiteSpace: "nowrap" }}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < step ? "#1A6B3A" : "#EBE1CE", marginBottom: 18, marginLeft: 6, marginRight: 6 }} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.60)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
      <div style={{ background: "#FFFCF8", borderRadius: 18, width: "100%", maxWidth: 620, maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0px 24px 80px rgba(44,26,14,0.18)", outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1 }}>

        {/* HEADER */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(44,26,14,0.08)", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "#E8600A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PawPrint size={18} color="white" />
              </div>
              <div>
                <div style={{ color: "#2C1A0E", fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 900 }}>
                  {petToEdit ? "Edit Pet" : resumePetId ? "Continue Registration" : "Add & Register Pet"}
                </div>
                <div style={{ color: "#A68660", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  {petToEdit ? "Update your pet's information" : resumePetId ? "Pick up where you left off" : "Fill details, upload docs, pay — all in one place"}
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <X size={18} color="#7A5C40" />
            </button>
          </div>
          {!petToEdit && <Stepper />}
        </div>

        {/* BODY */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 24px 24px" }}>

          {/* Success */}
          {success && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ width: 72, height: 72, background: "#E6F6ED", borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle size={36} color="#1A6B3A" />
              </div>
              <div style={{ color: "#2C1A0E", fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 900, marginBottom: 8 }}>
                {petToEdit ? "Pet Updated!" : "Registration Submitted!"}
              </div>
              <div style={{ color: "#7A5C40", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                {petToEdit ? "Your pet's information has been updated." : "Your pet registration has been submitted. You'll receive the license within 7–10 business days."}
              </div>
            </div>
          )}

          {/* Error */}
          {!success && error && (
            <div style={{ background: "#FDECEA", borderRadius: 9, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16, outline: "1px solid #F5B8B5", outlineOffset: -1 }}>
              <AlertCircle size={14} color="#A0251E" />
              <span style={{ color: "#A0251E", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{error}</span>
            </div>
          )}

          {/* STEP 0 */}
          {!success && step === 0 && (
            <form onSubmit={handlePetSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div onClick={() => fileInputRef.current?.click()} style={{ width: 100, height: 100, borderRadius: 13, background: "#F3EDE0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", outline: "2px dashed rgba(44,26,14,0.18)", outlineOffset: -2 }}>
                  {profilePreview
                    ? <img src={profilePreview} alt="pet" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ textAlign: "center" }}><Camera size={28} color="#A68660" /><div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>Add photo</div></div>
                  }
                </div>
                <span style={{ color: "#7A5C40", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>Photo of owner with pet — JPEG/PNG, max 2MB</span>
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </div>

              <div>
                <label style={labelStyle}>Name of Pet Dog <span style={{ color: "#E8600A" }}>*</span></label>
                <input style={inputStyle} type="text" required maxLength={50} placeholder="Enter pet's name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>

              <div>
                <label style={labelStyle}>Age as on Registration Date <span style={{ color: "#E8600A" }}>*</span></label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <input style={inputStyle} type="number" required min={0} max={50} placeholder="Years" value={form.ageYears} onChange={(e) => setForm((f) => ({ ...f, ageYears: e.target.value }))} />
                    <div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Mono', monospace", marginTop: 3 }}>YEARS</div>
                  </div>
                  <div>
                    <input style={inputStyle} type="number" required min={0} max={11} placeholder="Months" value={form.ageMonths} onChange={(e) => setForm((f) => ({ ...f, ageMonths: e.target.value }))} />
                    <div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Mono', monospace", marginTop: 3 }}>MONTHS</div>
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Gender</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div style={{ padding: "12px 14px", background: "#F3EDE0", borderRadius: 9, outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1 }}>
                <div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginBottom: 2 }}>YOUR CITY (FROM ACCOUNT)</div>
                <div style={{ color: "#2C1A0E", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{user?.city ? user.city.charAt(0).toUpperCase() + user.city.slice(1) : "Not set"}</div>
                <div style={{ color: "#A68660", fontSize: 11, fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>Registration fee: <strong style={{ color: "#E8600A" }}>₹{price.total.toFixed(2)}</strong> (incl. GST)</div>
              </div>

              <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px 24px", background: loading ? "#EBE1CE" : "#E8600A", boxShadow: loading ? "none" : "0px 3px 0px #C04E06", borderRadius: 9, outline: loading ? "none" : "2px solid #C04E06", outlineOffset: -2, border: "none", cursor: loading ? "not-allowed" : "pointer", color: loading ? "#A68660" : "white", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Creating pet...</> : petToEdit ? "Update Pet" : "Next — Upload Documents →"}
              </button>
            </form>
          )}

          {/* STEP 1 */}
          {!success && step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Spinner while loading existing docs from DB */}
              {fetchingDocs && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "20px 0" }}>
                  <Loader2 size={18} color="#E8600A" className="animate-spin" />
                  <span style={{ color: "#7A5C40", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Loading your existing documents...</span>
                </div>
              )}

              {!fetchingDocs && (
                <>
                  {resumePetId && (
                    <div style={{ padding: "10px 14px", background: "#F3EDE0", borderRadius: 9, outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1 }}>
                      <span style={{ color: "#7A5C40", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                        📋 Resuming registration — {uploadedCount > 0 ? `${uploadedCount}/4 documents already uploaded.` : "upload your 4 documents and pay to complete."}
                      </span>
                    </div>
                  )}

                  <div style={{ padding: "10px 16px", background: uploadedCount === 4 ? "#E6F6ED" : "#FFF4E4", borderRadius: 9, outline: `1px solid ${uploadedCount === 4 ? "#A8DDB8" : "#FFCCA0"}`, outlineOffset: -1, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 22, height: 22, background: uploadedCount === 4 ? "#1A6B3A" : "#E8600A", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {uploadedCount === 4 ? <CheckCircle size={12} color="white" /> : <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{uploadedCount}</span>}
                    </div>
                    <span style={{ color: uploadedCount === 4 ? "#1A6B3A" : "#B85C00", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                      {uploadedCount === 4 ? "All 4 documents uploaded — ready to pay!" : `${uploadedCount}/4 documents uploaded. Upload all 4 to continue.`}
                    </span>
                  </div>

                  <div style={{ height: 6, background: "#EBE1CE", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: 6, borderRadius: 100, background: uploadedCount === 4 ? "#1A6B3A" : "#E8600A", width: `${(uploadedCount / 4) * 100}%`, transition: "width 0.4s" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {REQUIRED_DOCS.map((doc) => {
                      const uploaded = uploadedDocs[doc.name];
                      const isUploading = uploading === doc.name;
                      const DocIcon = doc.icon;
                      return (
                        <div key={doc.name} style={{ background: uploaded ? "#F0FBF4" : "#FAF6EF", borderRadius: 11, outline: `1px solid ${uploaded ? "#A8DDB8" : "rgba(44,26,14,0.12)"}`, outlineOffset: -1, padding: "14px 14px" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 7, background: uploaded ? "#C6ECDA" : "#F3EDE0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <DocIcon size={13} color={uploaded ? "#1A6B3A" : "#A68660"} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ color: "#2C1A0E", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, lineHeight: "16px" }}>{doc.label}</div>
                              <div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Sans', sans-serif", marginTop: 2, lineHeight: "14px" }}>{doc.description}</div>
                            </div>
                            {uploaded && <CheckCircle size={14} color="#1A6B3A" />}
                          </div>

                          {uploaded ? (
                            <div style={{ background: "white", borderRadius: 7, padding: "8px 10px", outline: "1px solid rgba(44,26,14,0.08)", outlineOffset: -1 }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                                  <FileCheck size={12} color="#1A6B3A" style={{ flexShrink: 0 }} />
                                  <span style={{ color: "#2C1A0E", fontSize: 11, fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{uploaded.fileName}</span>
                                </div>
                                <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 6 }}>
                                  <button onClick={() => handleViewDoc(uploaded.fileData, uploaded.mimeType)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }} title="View"><Eye size={13} color="#7A5C40" /></button>
                                  <button onClick={() => handleDeleteDoc(doc.name)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }} title="Delete"><Trash2 size={13} color="#A0251E" /></button>
                                </div>
                              </div>
                              <div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Mono', monospace", marginTop: 3 }}>{(uploaded.fileSize / 1024).toFixed(1)} KB</div>
                            </div>
                          ) : (
                            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 10px", borderRadius: 8, border: "2px dashed rgba(44,26,14,0.15)", cursor: isUploading ? "not-allowed" : "pointer", background: isUploading ? "#F3EDE0" : "transparent" }}>
                              {isUploading ? <Loader2 size={20} color="#E8600A" className="animate-spin" /> : <Upload size={20} color="#A68660" />}
                              <span style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Sans', sans-serif", marginTop: 5, textAlign: "center" }}>{isUploading ? "Uploading..." : "Click to upload"}</span>
                              <span style={{ color: "#C0A882", fontSize: 9, fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{doc.accept.includes("pdf") ? "PDF or Image" : "Image"} · Max 5MB</span>
                              <input type="file" accept={doc.accept} style={{ display: "none" }} disabled={!!uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) handleDocUpload(file, doc.name); e.target.value = ""; }} />
                            </label>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={() => setStep(2)} disabled={!allDocsUploaded} style={{ width: "100%", padding: "13px 24px", marginTop: 4, background: allDocsUploaded ? "#E8600A" : "#EBE1CE", boxShadow: allDocsUploaded ? "0px 3px 0px #C04E06" : "none", borderRadius: 9, outline: allDocsUploaded ? "2px solid #C04E06" : "none", outlineOffset: -2, border: "none", cursor: allDocsUploaded ? "pointer" : "not-allowed", color: allDocsUploaded ? "white" : "#A68660", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                    {allDocsUploaded ? "Next — Pay & Register →" : `Upload all 4 documents to continue (${uploadedCount}/4)`}
                  </button>
                </>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {!success && step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#F3EDE0", borderRadius: 11, outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1, padding: "16px 18px" }}>
                <div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginBottom: 8 }}>REGISTRATION SUMMARY</div>
                {[
                  { label: "City", value: user?.city ? user.city.charAt(0).toUpperCase() + user.city.slice(1) : "Standard" },
                  { label: "Documents", value: "4/4 ✓", green: true },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{row.label}</span>
                    <span style={{ color: row.green ? "#1A6B3A" : "#2C1A0E", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#FFFCF8", borderRadius: 11, outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ color: "#A68660", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginBottom: 4 }}>FEE BREAKDOWN</div>
                {[
                  { label: "Municipal Fee", value: `₹${price.municipalFee}` },
                  { label: "Tailio Service Fee", value: `₹${price.serviceFee}` },
                  { label: "Subtotal", value: `₹${price.subtotal.toFixed(2)}` },
                  { label: "CGST (8%)", value: `₹${price.cgst.toFixed(2)}` },
                  { label: "SGST (8%)", value: `₹${price.sgst.toFixed(2)}` },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#7A5C40", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{row.label}</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(44,26,14,0.10)", paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#2C1A0E", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>Total (incl. GST)</span>
                  <span style={{ color: "#E8600A", fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>₹{price.total.toFixed(2)}</span>
                </div>
                <div style={{ color: "#A68660", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
                  {price.isGhaziabad ? "Ghaziabad: ₹1,000 GMC fee + ₹299 Tailio + 16% GST" : "Standard: ₹500 municipal fee + ₹299 Tailio + 16% GST"}
                </div>
              </div>

              <div style={{ padding: "12px 14px", background: "#FFF4E4", borderRadius: 9, outline: "1px solid rgba(232,96,10,0.20)", outlineOffset: -1 }}>
                <div style={{ color: "#B85C00", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 4 }}>📋 Important — Municipal OTP</div>
                <div style={{ color: "#7A5C40", fontSize: 12, fontFamily: "'DM Sans', sans-serif", lineHeight: "18px" }}>
                  After submission, your Municipal Corporation will send a verification OTP. <strong>Share this OTP only on Tailio's WhatsApp</strong> — never via SMS or email.
                </div>
              </div>

              {createdPetId && (
                <PaymentButton petId={createdPetId} petName={form.name || "your pet"} amount={price.total} onSuccess={handlePaymentSuccess} onFailure={(err) => setError(`Payment failed: ${err}. Please try again.`)} />
              )}

              {loading && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "8px 0" }}>
                  <Loader2 size={16} color="#E8600A" className="animate-spin" />
                  <span style={{ color: "#7A5C40", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Completing registration...</span>
                </div>
              )}

              <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A5C40", fontSize: 13, fontFamily: "'DM Sans', sans-serif", textAlign: "center", padding: "4px 0" }}>
                ← Back to documents
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
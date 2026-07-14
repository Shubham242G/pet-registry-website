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
  onPetCreated?: (pet: any) => void;
  onPetUpdated?: (pet: any) => void;
  onDocumentUploaded?: (petId: string, uploadedCount: number, hasAllDocs: boolean, registrationTriggered: boolean) => void;
  onDocumentDeleted?: (petId: string, uploadedCount: number, hasAllDocs: boolean, registrationTriggered: boolean) => void;
  onRegistrationTriggered?: (petId: string, status: string, stage: number) => void;
  token: string | null;
  petToEdit?: any;
  resumePetId?: string | null;
}

// ✅ Base required docs - ALWAYS needed for ALL cities
const BASE_REQUIRED_DOCS = [
  { name: "antiRabiesCertificate", label: "Anti-Rabies Certificate", icon: FileText, accept: ".pdf,image/*", description: "Anti-rabies vaccination certificate", required: true },
  { name: "idProof", label: "ID Proof", icon: FileText, accept: ".pdf,image/*", description: "Aadhaar card, Passport, or government ID", required: true },
  { name: "residenceProof", label: "Residence Proof", icon: FileText, accept: ".pdf,image/*", description: "Electricity bill, Rental agreement", required: true },
  { name: "ownerWithPetPhoto", label: "Owner with Pet Photo", icon: ImageIcon, accept: "image/*", description: "Recent photo of you with your pet", required: true },
];

// ✅ Gurgaon-specific required docs (ALL required)
const GURGAON_REQUIRED_DOCS = [
  { name: "petPhoto", label: "Pet Photo (Alone)", icon: ImageIcon, accept: "image/*", description: "Clear photo of your pet only", required: true },
  { name: "vaccinationCard", label: "Vaccination Card", icon: FileText, accept: ".pdf,image/*", description: "Vaccination record card", required: true },
  { name: "vaccinationCertificate", label: "Vaccination Certificate", icon: FileText, accept: ".pdf,image/*", description: "Official vaccination certificate", required: true },
];

// ✅ Ghaziabad & Noida specific docs - vaccinationCard is OPTIONAL
const GHAZIABAD_NOIDA_REQUIRED_DOCS = [
  { name: "antiRabiesCertificate", label: "Anti-Rabies Certificate", icon: FileText, accept: ".pdf,image/*", description: "Anti-rabies vaccination certificate", required: true },
  { name: "idProof", label: "Owner ID Card with Local Address", icon: FileText, accept: ".pdf,image/*", description: "ID proof showing local address (Aadhaar, Voter ID, etc.)", required: true },
  { name: "residenceProof", label: "Residence Proof", icon: FileText, accept: ".pdf,image/*", description: "Electricity bill, Rental agreement, or other residence proof", required: true },
  { name: "ownerWithPetPhoto", label: "Owner with Pet Photo", icon: ImageIcon, accept: "image/*", description: "Recent photo of you with your pet", required: true },
  { name: "ownerPhoto", label: "Owner Photo", icon: ImageIcon, accept: "image/*", description: "Clear photo of the pet owner", required: true },
  { name: "petPhoto", label: "Pet Photo", icon: ImageIcon, accept: "image/*", description: "Clear photo of your pet", required: true },
  { name: "ownerSignature", label: "Owner Signature", icon: FileText, accept: "image/*,.pdf", description: "Digital or scanned signature of the owner", required: true },
  // ✅ vaccinationCard is OPTIONAL for Ghaziabad/Noida
  { name: "vaccinationCard", label: "Vaccination Card (Optional)", icon: FileText, accept: ".pdf,image/*", description: "Vaccination record card - Optional for Ghaziabad/Noida", required: false },
];

// ✅ Faridabad-specific required docs
const FARIDABAD_REQUIRED_DOCS = [
  { name: "proofOfIdentity", label: "Proof of Identity", icon: FileText, accept: ".pdf,image/*", description: "Aadhaar card, Passport, or government ID", required: true },
  { name: "proofOfAddress", label: "Proof of Address", icon: FileText, accept: ".pdf,image/*", description: "Electricity bill, Rental agreement", required: true },
  { name: "vaccinationRecord", label: "Vaccination Record", icon: FileText, accept: ".pdf,image/*", description: "Complete vaccination record", required: true },
  { name: "petPhotographs", label: "Pet Photographs", icon: ImageIcon, accept: "image/*", description: "Clear photos of your pet", required: true },
  { name: "sterilizationCertificate", label: "Sterilization Certificate", icon: FileText, accept: ".pdf,image/*", description: "Sterilization/spaying certificate", required: true },
  { name: "microchipDetails", label: "Microchip Details", icon: FileText, accept: ".pdf,image/*", description: "Microchip number and registration", required: true },
];

// ✅ Sterilization doc - ONLY for Gurgaon pets 4+ years
const STERILIZATION_DOC = { 
  name: "sterilizationCertificate", 
  label: "Sterilization Certificate", 
  icon: FileText, 
  accept: ".pdf,image/*", 
  description: "Mandatory for Gurgaon pets aged 4+ years",
  required: true
};

const STEPS = ["Pet Details", "Upload Docs", "Pay & Register"];

// ✅ UPDATED: Get price with tag delivery
function getPrice(city: string, tagOption: string) {
  const isGhaziabad = city?.toLowerCase() === "ghaziabad";
  const isGurgaon = city?.toLowerCase() === "gurgaon";
  const isDelhi = city?.toLowerCase() === "delhi";
  const isNoida = city?.toLowerCase() === "noida";
  const isFaridabad = city?.toLowerCase() === "faridabad";
  
  let basePrice = 0;
  
  if (isGhaziabad || isGurgaon) {
    basePrice = 1500;
  } else if (isDelhi || isNoida) {
    basePrice = 846.61;
  } else if (isFaridabad) {
    basePrice = 1799;
  } else {
    basePrice = 500;
  }
  
  const gstRate = 0.18;
  const gstAmount = basePrice * gstRate;
  const total = basePrice + gstAmount;
  
  return { 
    basePrice: +basePrice.toFixed(2),
    gstAmount: +gstAmount.toFixed(2),
    gstRate: 18,
    total: +total.toFixed(2),
    tagDeliveryCost: 0,
    isGhaziabad,
    isGurgaon,
    isDelhi,
    isNoida,
    isFaridabad,
  };
}

// ✅ UPDATED: Get city display name
function getCityDisplayName(city: string): string {
  const names: Record<string, string> = {
    ghaziabad: "Ghaziabad",
    noida: "Noida",
    gurgaon: "Gurgaon",
    faridabad: "Faridabad",
    delhi: "Delhi",
  };
  return names[city] || city.charAt(0).toUpperCase() + city.slice(1);
}

// ✅ UPDATED: Get document requirements message for each city
function getCityRequirementsMessage(city: string, ageYears: number, ageMonths: number): string | null {
  const ageInYears = ageYears + (ageMonths / 12);
  
  if (city === 'ghaziabad' || city === 'noida') {
    return `${getCityDisplayName(city)} requires 7 documents: Anti-Rabies Certificate, Owner ID Card with Local Address, Residence Proof, Owner with Pet Photo, Owner Photo, Pet Photo, and Owner Signature. Vaccination Card is optional.`;
  }
  
  if (city === 'gurgaon') {
    let msg = 'Gurgaon requires: Pet Photo, Vaccination Card, Vaccination Certificate';
    if (ageInYears >= 4) {
      msg += ', and Sterilization Certificate (required for 4+ years)';
    }
    return msg;
  }
  
  if (city === 'faridabad') {
    return 'Faridabad requires 6 documents: Proof of Identity, Proof of Address, Vaccination Record, Pet Photographs, Sterilization Certificate, and Microchip Details.';
  }
  
  return null;
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

export default function AddPetModal({ 
  isOpen, 
  onClose, 
  onPetCreated, 
  onPetUpdated,
  onDocumentUploaded,
  onDocumentDeleted,
  onRegistrationTriggered,
  token, 
  petToEdit, 
  resumePetId 
}: AddPetModalProps) {
  const { user } = useAuth();
  
  const [form, setForm] = useState({ 
    name: "", 
    ageYears: "", 
    ageMonths: "", 
    gender: "", 
    profilePicture: "",
    city: ""
  });
  const [profilePreview, setProfilePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [petId, setPetId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDocs, setFetchingDocs] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [petCityFee, setPetCityFee] = useState(0);
  const [photoError, setPhotoError] = useState("");

  const [tagDeliveryOption, setTagDeliveryOption] = useState<'collect_from_municipal' | 'deliver_to_home'>('collect_from_municipal');
  const [tagDeliveryCost, setTagDeliveryCost] = useState(0);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ✅ UPDATED: Get required docs based on city and age
  const getRequiredDocs = (city: string, ageYears: number, ageMonths: number) => {
    const ageInYears = ageYears + (ageMonths / 12);
    const isGurgaon = city === 'gurgaon';
    const isFaridabad = city === 'faridabad';
    const isGhaziabadNoida = ['ghaziabad', 'noida'].includes(city);
    
    // Ghaziabad & Noida
    if (isGhaziabadNoida) {
      return [...GHAZIABAD_NOIDA_REQUIRED_DOCS];
    }
    
    // Faridabad
    if (isFaridabad) {
      return [...FARIDABAD_REQUIRED_DOCS];
    }
    
    // Gurgaon
    if (isGurgaon) {
      const docs = [...BASE_REQUIRED_DOCS, ...GURGAON_REQUIRED_DOCS];
      if (ageInYears >= 4) {
        const hasSterilization = docs.some(d => d.name === 'sterilizationCertificate');
        if (!hasSterilization) {
          docs.push(STERILIZATION_DOC);
        }
      }
      return docs;
    }
    
    // Default (Delhi/Other)
    return [...BASE_REQUIRED_DOCS];
  };

  // Compute required docs based on current form values
  const requiredDocs = getRequiredDocs(
    form.city, 
    parseInt(form.ageYears) || 0, 
    parseInt(form.ageMonths) || 0
  );

  // ✅ Get ONLY required docs (where required !== false)
  const requiredDocsOnly = requiredDocs.filter(doc => doc.required !== false);
  const totalRequired = requiredDocsOnly.length;
  
  // ✅ Count uploaded required docs
  const uploadedRequiredCount = requiredDocsOnly.filter(doc => uploadedDocs[doc.name]).length;
  const allRequiredUploaded = uploadedRequiredCount === totalRequired;
  
  // ✅ Total uploaded count (including optional)
  const uploadedCount = Object.keys(uploadedDocs).length;
  const allDocsUploaded = allRequiredUploaded; // Only required docs matter for completion

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

  // Function to restore documents from pet object
  const restoreDocumentsFromPet = (pet: any) => {
    const docs: Record<string, any> = {};
    
    if (pet.documents && Array.isArray(pet.documents)) {
      for (const doc of pet.documents) {
        docs[doc.documentName] = {
          fileName: doc.fileName,
          fileSize: doc.fileSize,
          fileData: doc.fileData,
          mimeType: doc.mimeType,
        };
      }
    }
    return docs;
  };

  // Initialize modal when it opens
  useEffect(() => {
    if (!isOpen) return;
    
    console.log("🔄 Modal opened, initializing...");
    setError("");
    setPhotoError("");
    setSuccess(false);
    setUploading(null);
    setIsSubmitting(false);
    
    if (resumePetId) {
      console.log("📂 Resuming registration for pet:", resumePetId);
      setPetId(resumePetId);
      setIsEditing(false);
      setStep(1);
      return;
    }
    
    if (petToEdit && petToEdit._id) {
      console.log("✏️ EDITING PET:", petToEdit._id, petToEdit.name);
      setPetId(petToEdit._id);
      setIsEditing(true);
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
      
      if (petToEdit.tagDelivery) {
        setTagDeliveryOption(petToEdit.tagDelivery.option || 'collect_from_municipal');
        setTagDeliveryCost(petToEdit.tagDelivery.cost || 0);
      }
      
      const restoredDocs = restoreDocumentsFromPet(petToEdit);
      setUploadedDocs(restoredDocs);
      console.log("📄 Documents restored:", Object.keys(restoredDocs));
      return;
    }
    
    console.log("✨ CREATING NEW PET");
    setPetId(null);
    setIsEditing(false);
    setStep(0);
    setForm({ name: "", ageYears: "", ageMonths: "", gender: "", profilePicture: "", city: "" });
    setProfilePreview("");
    setUploadedDocs({});
    setTagDeliveryOption('collect_from_municipal');
    setTagDeliveryCost(0);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [isOpen]);

  // When petToEdit changes, update form and restore documents
  useEffect(() => {
    if (!isOpen || !petToEdit || !petToEdit._id) return;
    
    if (petId === petToEdit._id && isEditing) {
      return;
    }
    
    console.log("📝 Updating form for pet from petToEdit:", petToEdit._id);
    setPetId(petToEdit._id);
    setIsEditing(true);
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
    
    if (petToEdit.tagDelivery) {
      setTagDeliveryOption(petToEdit.tagDelivery.option || 'collect_from_municipal');
      setTagDeliveryCost(petToEdit.tagDelivery.cost || 0);
    }
    
    const restoredDocs = restoreDocumentsFromPet(petToEdit);
    setUploadedDocs(restoredDocs);
    console.log("📄 Documents restored from petToEdit:", Object.keys(restoredDocs));
    
  }, [isOpen, petToEdit]);

  // Fetch existing documents when resuming
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
          console.log("📄 Documents fetched from resume:", Object.keys(docsMap));
        }
        
        if (data.pet && data.pet.tagDelivery) {
          setTagDeliveryOption(data.pet.tagDelivery.option || 'collect_from_municipal');
          setTagDeliveryCost(data.pet.tagDelivery.cost || 0);
        }
        
        if (data.pet) {
          setForm({
            name: data.pet.name || "",
            ageYears: data.pet.ageYears?.toString() || "",
            ageMonths: data.pet.ageMonths?.toString() || "",
            gender: data.pet.gender || "",
            profilePicture: data.pet.profilePicture || "",
            city: data.pet.city || "",
          });
          setProfilePreview(data.pet.profilePicture || "");
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
    if (!file) {
      setPhotoError("Please upload a photo");
      return;
    }
    if (!file.type.startsWith("image/")) { 
      setPhotoError("Please upload an image file"); 
      return; 
    }
    if (file.size > 2 * 1024 * 1024) { 
      setPhotoError("Photo must be under 2MB"); 
      return; 
    }
    setPhotoError("");
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setProfilePreview(b64);
      setForm((f) => ({ ...f, profilePicture: b64 }));
    };
    reader.readAsDataURL(file);
  };

  const goToPreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
      setError("");
    }
  };

  const handlePetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate photo is uploaded
    if (!form.profilePicture) {
      setPhotoError("Pet photo is required");
      return;
    }
    
    if (!form.city) {
      setError("Please select your pet's registration city");
      return;
    }
    
    setLoading(true);
    setError("");
    setPhotoError("");
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

      if (petId) {
        console.log("🔄 UPDATING pet with ID:", petId);
        const response = await apiFetch(`/pets/${petId}`, "PUT", petData, token!);
        console.log("✅ Pet updated successfully");
        if (onPetUpdated) {
          onPetUpdated(response);
        }
        setStep(1);
      } else {
        console.log("✨ CREATING new pet");
        const response = await apiFetch("/pets", "POST", petData, token!);
        console.log("✅ Pet created with ID:", response._id);
        setPetId(response._id);
        if (onPetCreated) {
          onPetCreated(response);
        }
        setStep(1);
      }
    } catch (error: any) {
      console.error("❌ Pet submit error:", error);
      setError(error?.message || "Failed to save pet details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Updated handleDocUpload with proper fileData handling
  const handleDocUpload = async (file: File, docName: string) => {
    if (!petId) {
      setError("Pet not created yet. Please complete the pet details first.");
      return;
    }

    console.log('🔍 DEBUG - Uploading:', {
      docName,
      petId,
      city: form.city,
      fileSize: file.size,
      fileType: file.type
    });

    // Validate file
    if (!file) {
      setError("No file selected");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError(`Please upload a ${allowedTypes.join(', ')} file`);
      return;
    }

    setUploading(docName);
    setError("");

    try {
      // Read the file as data URL using Promise
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (!result) {
            reject(new Error("Failed to read file"));
            return;
          }
          resolve(result);
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      // Verify fileData is valid
      if (!fileData || !fileData.startsWith('data:')) {
        throw new Error("Invalid file data format");
      }

      console.log('📤 Uploading document:', {
        docName,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        fileDataLength: fileData.length,
        fileDataPreview: fileData.substring(0, 50)
      });

      const payload = {
        documentName: docName,
        fileData: fileData,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type
      };

      const response = await fetch(`${API_BASE}/registration/${petId}/documents`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('📥 Response:', response.status, data);

      if (response.ok) {
        // Update local state
        setUploadedDocs((prev) => ({
          ...prev,
          [docName]: { 
            fileName: file.name, 
            fileSize: file.size, 
            fileData: fileData, 
            mimeType: file.type 
          },
        }));

        // Callback
        if (onDocumentUploaded) {
          const uploadedCount = data.registration?.uploadedDocumentsCount || Object.keys(uploadedDocs).length + 1;
          const hasAllDocs = data.registration?.hasAllDocuments || (uploadedCount === totalRequired);
          const triggered = data.registration?.registrationTriggered || false;
          
          onDocumentUploaded(petId, uploadedCount, hasAllDocs, triggered);
        }

        // Show success message briefly
        setError("");
      } else {
        setError(data.message || `Upload failed: ${response.status}`);
        console.error('Upload failed:', data);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : "Failed to upload document. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  const handleDeleteDoc = async (docName: string) => {
    if (!petId) return;
    setError("");
    try {
      const response = await fetch(`${API_BASE}/registration/${petId}/documents/${docName}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUploadedDocs((prev) => { const next = { ...prev }; delete next[docName]; return next; });
        if (onDocumentDeleted) {
          onDocumentDeleted(
            petId, 
            data.uploadedDocumentsCount, 
            data.hasAllDocuments,
            data.registrationTriggered || false
          );
        }
      } else {
        setError(data.message || "Failed to delete document");
      }
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
    if (!petId) return;
    setIsSubmitting(true);
    setError("");
    try {
      const petPrice = getPrice(form.city || "", tagDeliveryOption);
      const response = await fetch(`${API_BASE}/registration/${petId}/trigger-registration`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ 
          paymentVerified: true, 
          paidAmount: petPrice.total, 
          city: form.city,
          tagDeliveryOption: tagDeliveryOption,
          tagDeliveryCost: tagDeliveryCost,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        if (onRegistrationTriggered) {
          onRegistrationTriggered(
            petId, 
            data.pet?.registrationStatus || 'form_submitted', 
            data.pet?.registrationStage || 2
          );
        }
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

  const handleClose = () => {
    setSuccess(false);
    onClose();
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

  const petPrice = getPrice(form.city || "", tagDeliveryOption);

  // ✅ Get city-specific requirements message
  const cityRequirementsMessage = getCityRequirementsMessage(
    form.city,
    parseInt(form.ageYears) || 0,
    parseInt(form.ageMonths) || 0
  );

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
                    {isEditing ? "Edit Pet" : resumePetId ? "Continue" : "Register Pet"}
                  </div>
                  <div style={{ color: "#A68660", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
                    {isEditing ? "Update info" : resumePetId ? "Pick up where you left" : "Add & register in one go"}
                  </div>
                </div>
              </div>
              <button onClick={handleClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <X size={18} color="#7A5C40" />
              </button>
            </div>
            {!isEditing && !resumePetId && <Stepper />}
          </div>

          {/* Body */}
          <div style={{ overflowY: "auto", flex: 1, padding: "16px 20px 20px" }}>

            {success && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: 56, height: 56, background: "#E6F6ED", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <CheckCircle size={28} color="#1A6B3A" />
                </div>
                <div style={{ color: "#2C1A0E", fontSize: 18, fontFamily: "'Fraunces', serif", fontWeight: 900, marginBottom: 6 }}>
                  Registration Submitted!
                </div>
                <div style={{ color: "#7A5C40", fontSize: 12, fontFamily: "'DM Sans', sans-serif", lineHeight: "18px" }}>
                  License will be delivered in 7-10 business days.
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
                    overflow: "hidden", outline: profilePreview ? "2px solid #1A6B3A" : "2px dashed rgba(44,26,14,0.18)", 
                    outlineOffset: -2,
                    transition: "all 0.3s ease",
                    border: photoError ? "2px solid #DC2626" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!profilePreview) {
                      e.currentTarget.style.outline = "2px dashed #E8600A";
                      e.currentTarget.style.background = "#FFF0E4";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!profilePreview) {
                      e.currentTarget.style.outline = "2px dashed rgba(44,26,14,0.18)";
                      e.currentTarget.style.background = "#F3EDE0";
                    }
                  }}>
                    {profilePreview
                      ? <img src={profilePreview} alt="pet" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ textAlign: "center" }}>
                          <Camera size={24} color={photoError ? "#DC2626" : "#A68660"} />
                          <div style={{ color: photoError ? "#DC2626" : "#A68660", fontSize: 9 }}>Add photo *</div>
                        </div>
                    }
                  </div>
                  {photoError && (
                    <span style={{ color: "#DC2626", fontSize: 10 }}>{photoError}</span>
                  )}
                  <span style={{ color: "#7A5C40", fontSize: 10 }}>
                    {profilePreview ? "✅ Photo uploaded" : "Photo with pet · JPEG/PNG, max 2MB *"}
                  </span>
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

                <div>
                  <CitySelector 
                    selectedCity={form.city}
                    onChange={(city, fee) => {
                      setForm((f) => ({ ...f, city }));
                      setPetCityFee(fee);
                    }}
                    error={!form.city && step === 0 ? "Please select your pet's registration city" : ""}
                  />
                </div>

                {/* ✅ UPDATED: City-specific requirements message */}
                {cityRequirementsMessage && (
                  <div style={{
                    padding: "10px 14px",
                    background: "#FFF4E4",
                    borderRadius: 9,
                    outline: "1px solid #FFCCA0",
                    outlineOffset: -1,
                  }}>
                    <p style={{ color: "#B85C00", fontSize: 12, fontWeight: 500, margin: 0, lineHeight: "1.5" }}>
                      {form.city === 'ghaziabad' || form.city === 'noida' ? (
                        <>
                          📋 <strong>{getCityDisplayName(form.city)} Requirements:</strong>
                          <br />
                          • Anti-Rabies Certificate
                          <br />
                          • Owner ID Card with Local Address
                          <br />
                          • Residence Proof
                          <br />
                          • Owner with Pet Photo
                          <br />
                          • Owner Photo
                          <br />
                          • Pet Photo
                          <br />
                          • Owner Signature
                          <br />
                          • <span style={{ color: "#A68660" }}>Vaccination Card (Optional)</span>
                        </>
                      ) : form.city === 'gurgaon' ? (
                        <>
                          ⚠️ <strong>Gurgaon Requirements:</strong>
                          <br />
                          • Pet Photo (alone)
                          <br />
                          • Vaccination Card
                          <br />
                          • Vaccination Certificate
                          {(parseInt(form.ageYears) || 0) + (parseInt(form.ageMonths) || 0) / 12 >= 4 && (
                            <>
                              <br />• Sterilization Certificate <strong>(required for 4+ years)</strong>
                            </>
                          )}
                        </>
                      ) : form.city === 'faridabad' ? (
                        <>
                          📋 <strong>Faridabad Requirements:</strong>
                          <br />
                          • Proof of Identity
                          <br />
                          • Proof of Address
                          <br />
                          • Vaccination Record
                          <br />
                          • Pet Photographs
                          <br />
                          • Sterilization Certificate
                          <br />
                          • Microchip Details
                        </>
                      ) : null}
                    </p>
                  </div>
                )}

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
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : petId ? "Update & Continue →" : "Continue →"}
                </button>
              </form>
            )}

            {/* Step 1 - Documents - ✅ UPDATED with Optional vaccinationCard for Ghaziabad/Noida */}
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
                      padding: "12px 16px", 
                      background: allRequiredUploaded ? "#E6F6ED" : "#FFF4E4", 
                      borderRadius: 9,
                      outline: `1px solid ${allRequiredUploaded ? "#A8DDB8" : "#FFCCA0"}`, 
                      outlineOffset: -1,
                      display: "flex", 
                      alignItems: "center", 
                      gap: 10
                    }}>
                      <div style={{
                        width: 24, height: 24, 
                        background: allRequiredUploaded ? "#1A6B3A" : "#E8600A", 
                        borderRadius: 12,
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        flexShrink: 0
                      }}>
                        {allRequiredUploaded ? 
                          <CheckCircle size={12} color="white" /> : 
                          <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{uploadedRequiredCount}</span>
                        }
                      </div>
                      <span style={{ color: allRequiredUploaded ? "#1A6B3A" : "#B85C00", fontSize: 12, fontWeight: 500 }}>
                        {allRequiredUploaded ? 
                          "All required documents uploaded!" : 
                          `${uploadedRequiredCount}/${totalRequired} required documents uploaded`
                        }
                        {requiredDocs.some(doc => doc.required === false) && (
                          <span style={{ fontSize: 10, fontWeight: 400, color: "#A68660", display: "block" }}>
                            💡 Optional documents available (Vaccination Card)
                          </span>
                        )}
                      </span>
                    </div>

                    <div style={{ height: 6, background: "#EBE1CE", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ 
                        height: 6, 
                        borderRadius: 100, 
                        background: allRequiredUploaded ? "#1A6B3A" : "#E8600A", 
                        width: `${(uploadedRequiredCount / totalRequired) * 100}%`, 
                        transition: "width 0.4s ease" 
                      }} />
                    </div>

                    {/* ✅ UPDATED: Show city-specific requirements summary */}
                    {(form.city === 'ghaziabad' || form.city === 'noida') && (
                      <div style={{
                        padding: "10px 14px",
                        background: "#FFF4E4",
                        borderRadius: 9,
                        outline: "1px solid #FFCCA0",
                        outlineOffset: -1,
                      }}>
                        <p style={{ color: "#B85C00", fontSize: 12, fontWeight: 500, margin: 0 }}>
                          📋 <strong>{getCityDisplayName(form.city)} Required Documents:</strong> Anti-Rabies Certificate, Owner ID Card with Local Address, Residence Proof, Owner with Pet Photo, Owner Photo, Pet Photo, Owner Signature
                          <br />
                          <span style={{ color: "#A68660", fontSize: 11 }}>💡 Vaccination Card is optional for {getCityDisplayName(form.city)}</span>
                        </p>
                      </div>
                    )}

                    {form.city === 'gurgaon' && (
                      <div style={{
                        padding: "10px 14px",
                        background: "#FFF4E4",
                        borderRadius: 9,
                        outline: "1px solid #FFCCA0",
                        outlineOffset: -1,
                      }}>
                        <p style={{ color: "#B85C00", fontSize: 12, fontWeight: 500, margin: 0 }}>
                          📋 <strong>Gurgaon Required Documents:</strong> Pet Photo, Vaccination Card, Vaccination Certificate
                          {(parseInt(form.ageYears) || 0) + (parseInt(form.ageMonths) || 0) / 12 >= 4 && (
                            <> + Sterilization Certificate</>
                          )}
                        </p>
                      </div>
                    )}

                    {form.city === 'faridabad' && (
                      <div style={{
                        padding: "10px 14px",
                        background: "#FFF4E4",
                        borderRadius: 9,
                        outline: "1px solid #FFCCA0",
                        outlineOffset: -1,
                      }}>
                        <p style={{ color: "#B85C00", fontSize: 12, fontWeight: 500, margin: 0 }}>
                          📋 <strong>Faridabad Required Documents:</strong> Proof of Identity, Proof of Address, Vaccination Record, Pet Photographs, Sterilization Certificate, Microchip Details
                        </p>
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {requiredDocs.map((doc) => {
                        const uploaded = uploadedDocs[doc.name];
                        const isUploading = uploading === doc.name;
                        const DocIcon = doc.icon;
                        const isOptional = doc.required === false;
                        
                        return (
                          <div key={doc.name} style={{
                            background: uploaded ? "#F0FBF4" : "#FAF6EF", 
                            borderRadius: 11,
                            outline: `1px solid ${uploaded ? "#A8DDB8" : "rgba(44,26,14,0.12)"}`, 
                            outlineOffset: -1,
                            padding: 12,
                            transition: "all 0.3s ease",
                            opacity: isOptional && !uploaded ? 0.85 : 1,
                          }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: 8, 
                                background: uploaded ? "#C6ECDA" : "#F3EDE0",
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                flexShrink: 0,
                                transition: "all 0.3s ease",
                              }}>
                                <DocIcon size={14} color={uploaded ? "#1A6B3A" : "#A68660"} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ color: "#2C1A0E", fontSize: 13, fontWeight: 600 }}>
                                  {doc.label}
                                  {isOptional && (
                                    <span style={{ 
                                      fontSize: 10, 
                                      fontWeight: 400, 
                                      color: "#A68660", 
                                      marginLeft: 6 
                                    }}>
                                      (Optional)
                                    </span>
                                  )}
                                </div>
                                <div style={{ color: "#A68660", fontSize: 10, marginTop: 2 }}>{doc.description}</div>
                                {(form.city === 'ghaziabad' || form.city === 'noida') && (
                                  <div style={{ 
                                    color: isOptional ? "#A68660" : "#E8600A", 
                                    fontSize: 9, 
                                    fontWeight: 600, 
                                    marginTop: 2 
                                  }}>
                                    • {isOptional ? 'Optional' : 'Required'} for {getCityDisplayName(form.city)}
                                  </div>
                                )}
                                {form.city === 'gurgaon' && doc.name !== 'sterilizationCertificate' && (
                                  <div style={{ color: "#E8600A", fontSize: 9, fontWeight: 600, marginTop: 2 }}>
                                    • Required for Gurgaon
                                  </div>
                                )}
                                {doc.name === 'sterilizationCertificate' && form.city === 'gurgaon' && (
                                  <div style={{ color: "#B85C00", fontSize: 9, fontWeight: 600, marginTop: 2 }}>
                                    • Required for Gurgaon pets 4+ years
                                  </div>
                                )}
                                {form.city === 'faridabad' && (
                                  <div style={{ color: "#E8600A", fontSize: 9, fontWeight: 600, marginTop: 2 }}>
                                    • Required for Faridabad
                                  </div>
                                )}
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
                                cursor: isUploading ? "not-allowed" : "pointer", 
                                background: isUploading ? "#F3EDE0" : "transparent",
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
                                <input 
                                  type="file" 
                                  accept={doc.accept} 
                                  style={{ display: "none" }} 
                                  disabled={!!uploading} 
                                  onChange={(e) => { 
                                    const file = e.target.files?.[0]; 
                                    if (file) {
                                      console.log('📎 File selected:', file.name, file.size, file.type);
                                      handleDocUpload(file, doc.name); 
                                    }
                                    e.target.value = ''; 
                                  }} 
                                />
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={() => setStep(2)} 
                      disabled={!allRequiredUploaded} 
                      style={{
                        width: "100%", 
                        padding: "12px 20px", 
                        marginTop: 4,
                        background: allRequiredUploaded ? "#E8600A" : "#EBE1CE",
                        boxShadow: allRequiredUploaded ? "0px 2px 0px #C04E06" : "none",
                        borderRadius: 9, 
                        outline: allRequiredUploaded ? "1px solid #C04E06" : "none", 
                        outlineOffset: -1,
                        border: "none", 
                        cursor: allRequiredUploaded ? "pointer" : "not-allowed",
                        color: allRequiredUploaded ? "white" : "#A68660", 
                        fontSize: 14, 
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (allRequiredUploaded) {
                          e.currentTarget.style.background = "#C06A18";
                          e.currentTarget.style.transform = "scale(1.02)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (allRequiredUploaded) {
                          e.currentTarget.style.background = "#E8600A";
                          e.currentTarget.style.transform = "scale(1)";
                        }
                      }}
                    >
                      {allRequiredUploaded 
                        ? `Continue →` 
                        : `Upload ${totalRequired - uploadedRequiredCount} more required document${totalRequired - uploadedRequiredCount > 1 ? 's' : ''} (${uploadedRequiredCount}/${totalRequired})`
                      }
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

                <div style={{ 
                  background: "#E6F6ED", 
                  borderRadius: 11, 
                  padding: "14px 16px",
                  outline: "1px solid #A8DDB8",
                  outlineOffset: -1,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle size={16} color="#1A6B3A" />
                    <div>
                      <div style={{ color: "#1A6B3A", fontSize: 13, fontWeight: 600 }}>All Required Documents Uploaded ✓</div>
                      <div style={{ color: "#7A5C40", fontSize: 11 }}>
                        {totalRequired} required documents verified and ready
                        {requiredDocs.some(doc => doc.required === false) && (
                          <span style={{ display: "block", fontSize: 10, color: "#A68660" }}>
                            💡 Optional documents can still be uploaded
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#F3EDE0", borderRadius: 11, padding: "14px 16px" }}>
                  <div style={{ color: "#A68660", fontSize: 10, letterSpacing: "1px", marginBottom: 6 }}>SUMMARY</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Registration City</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12, fontWeight: 600 }}>
                      {form.city ? getCityDisplayName(form.city) : "Not selected"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Required Documents</span>
                    <span style={{ color: "#1A6B3A", fontSize: 12, fontWeight: 600 }}>{totalRequired}/{totalRequired} ✓</span>
                  </div>
                </div>

                <div style={{ background: "#FFFCF8", borderRadius: 11, padding: "14px 16px", outline: "1px solid rgba(44,26,14,0.10)", outlineOffset: -1 }}>
                  <div style={{ color: "#A68660", fontSize: 10, letterSpacing: "1px", marginBottom: 6 }}>FEE BREAKDOWN</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Registration Fee</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12 }}>₹{petPrice.basePrice.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>GST ({petPrice.gstRate}%)</span>
                    <span style={{ color: "#2C1A0E", fontSize: 12 }}>₹{petPrice.gstAmount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#7A5C40", fontSize: 12 }}>Tag Delivery</span>
                    <span style={{ color: "#1A6B3A", fontSize: 12, fontWeight: 600 }}>Included ✓</span>
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

                {petId && (
                  <PaymentButton 
                    petId={petId} 
                    petName={form.name || "your pet"} 
                    amount={petPrice.total}
                    tagDeliveryOption={tagDeliveryOption}
                    tagDeliveryCost={0}
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
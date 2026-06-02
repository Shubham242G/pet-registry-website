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
  Syringe,
  Stethoscope,
  Award
} from "lucide-react";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetAdded: () => void;
  token: string | null;
  petToEdit?: any;
}

export default function AddPetModal({ isOpen, onClose, onPetAdded, token, petToEdit }: AddPetModalProps) {
  const [form, setForm] = useState({
    // Basic Info
    name: "",
    ageYears: "",
    ageMonths: "",
    gender: "",
    
    // Photo
    profilePicture: "",
    
    // Vaccination Details
    vaccinationCertificateNumber: "",
    vaccinationDate: "",
    
    // Veterinary Doctor Details
    vetName: "",
    vetMobile: "",
    vetRegistrationNumber: "",
    vetCouncilName: "",
    
    // Additional
    microchip: "",
    notes: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens or petToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (petToEdit) {
        // Editing mode - populate with pet data
        console.log("Editing pet:", petToEdit);
        setForm({
          name: petToEdit.name || "",
          ageYears: petToEdit.ageYears?.toString() || "",
          ageMonths: petToEdit.ageMonths?.toString() || "",
          gender: petToEdit.gender || "",
          profilePicture: petToEdit.profilePicture || "",
          vaccinationCertificateNumber: petToEdit.vaccinationCertificateNumber || "",
          vaccinationDate: petToEdit.vaccinationDate ? petToEdit.vaccinationDate.split('T')[0] : "",
          vetName: petToEdit.vetName || "",
          vetMobile: petToEdit.vetMobile || "",
          vetRegistrationNumber: petToEdit.vetRegistrationNumber || "",
          vetCouncilName: petToEdit.vetCouncilName || "",
          microchip: petToEdit.microchip || "",
          notes: petToEdit.notes || ""
        });
        setProfilePreview(petToEdit.profilePicture || "");
      } else {
        // New pet mode - reset everything
        resetForm();
      }
    }
  }, [isOpen, petToEdit]);

  const resetForm = () => {
    setForm({
      name: "",
      ageYears: "",
      ageMonths: "",
      gender: "",
      profilePicture: "",
      vaccinationCertificateNumber: "",
      vaccinationDate: "",
      vetName: "",
      vetMobile: "",
      vetRegistrationNumber: "",
      vetCouncilName: "",
      microchip: "",
      notes: ""
    });
    setProfilePreview("");
    setError("");
    setSuccess(false);
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file (JPEG, PNG)");
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        setError("File size should not exceed 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("Image converted to Base64, length:", base64String.length);
        setProfilePreview(base64String);
        setForm({ ...form, profilePicture: base64String });
        setError("");
      };
      reader.onerror = () => {
        setError("Failed to read image file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const petData = {
        name: form.name,
        species: "dog",
        ageYears: form.ageYears ? parseInt(form.ageYears) : 0,
        ageMonths: form.ageMonths ? parseInt(form.ageMonths) : 0,
        gender: form.gender,
        profilePicture: form.profilePicture,
        vaccinationCertificateNumber: form.vaccinationCertificateNumber,
        vaccinationDate: form.vaccinationDate || null,
        vetName: form.vetName,
        vetMobile: form.vetMobile,
        vetRegistrationNumber: form.vetRegistrationNumber,
        vetCouncilName: form.vetCouncilName,
        microchip: form.microchip,
        notes: form.notes
      };

      console.log("Submitting pet data:", petData);

      let response;
      if (petToEdit) {
        response = await apiFetch(`/pets/${petToEdit._id}`, "PUT", petData, token!);
        console.log("Update response:", response);
      } else {
        response = await apiFetch("/pets", "POST", petData, token!);
        console.log("Create response:", response);
      }
      
      setSuccess(true);
      onPetAdded();
      setTimeout(() => {
        onClose();
        // Reset form after closing
        if (!petToEdit) {
          resetForm();
        }
      }, 1000);
    } catch (err) {
      console.error("Submit error:", err);
      setError(petToEdit ? "Failed to update pet." : "Failed to add pet.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const genders = ["Male", "Female", "Unknown"];

  // Calculate display age
  const getDisplayAge = () => {
    if (form.ageYears && form.ageMonths) {
      return `${form.ageYears} years ${form.ageMonths} months`;
    } else if (form.ageYears) {
      return `${form.ageYears} years`;
    } else if (form.ageMonths) {
      return `${form.ageMonths} months`;
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {petToEdit ? 'Edit Pet' : 'Add New Pet'}
              </h2>
              <p className="text-sm text-gray-500">
                {petToEdit ? 'Update your pet information' : 'Register your furry friend'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-6 mt-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">
              {petToEdit ? 'Pet updated successfully!' : 'Pet added successfully!'}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* DOG PHOTOGRAPH WITH OWNER */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-orange-500" />
              Upload Dog Photograph with Owner
            </h3>
            <div className="flex justify-center">
              <div className="relative">
                <div 
                  className="w-40 h-40 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden border-2 border-orange-300 hover:border-orange-400 transition-all"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profilePreview ? (
                    <img src={profilePreview} alt="Pet with owner" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <Camera className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                      <p className="text-xs text-gray-600">Click to upload</p>
                      <p className="text-xs text-gray-500">JPEG, PNG, Max 2MB</p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition-colors shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">Format: JPEG, PNG, Max size: 2MB</p>
            {petToEdit && profilePreview && (
              <p className="text-center text-xs text-blue-600 mt-2">Current photo shown. Upload new to replace.</p>
            )}
          </div>

          {/* NAME OF PET DOG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of Pet Dog <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">(Max Length 50 Chars)</span>
            </label>
            <input
              type="text"
              required
              maxLength={50}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
              placeholder="Enter name of pet dog"
              style={{ color: '#111827' }}
            />
          </div>

          {/* AGE AS ON DATE OF REGISTRATION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age as on Date of Registration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  min="0"
                  max="50"
                  required
                  value={form.ageYears}
                  onChange={(e) => setForm({ ...form, ageYears: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter Year"
                  style={{ color: '#111827' }}
                />
                <p className="text-xs text-gray-500 mt-1">Year</p>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="11"
                  required
                  value={form.ageMonths}
                  onChange={(e) => setForm({ ...form, ageMonths: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter Month"
                  style={{ color: '#111827' }}
                />
                <p className="text-xs text-gray-500 mt-1">Month</p>
              </div>
            </div>
            {getDisplayAge() && (
              <p className="text-sm text-green-600 mt-2">Age: {getDisplayAge()}</p>
            )}
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white text-gray-900"
              style={{ color: '#111827' }}
            >
              <option value="">Select gender</option>
              {genders.map(g => (
                <option key={g} value={g.toLowerCase()} className="text-gray-900">{g}</option>
              ))}
            </select>
          </div>

          {/* VACCINATION DETAILS */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Syringe className="w-5 h-5 mr-2 text-orange-500" />
              Vaccination Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vaccination Certificate Number <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Max Length 50 Chars)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={form.vaccinationCertificateNumber}
                  onChange={(e) => setForm({ ...form, vaccinationCertificateNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter certificate number"
                  style={{ color: '#111827' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vaccination Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={form.vaccinationDate}
                  onChange={(e) => setForm({ ...form, vaccinationDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900"
                  style={{ color: '#111827' }}
                />
              </div>
            </div>
          </div>

          {/* VETERINARY DOCTOR DETAILS */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Stethoscope className="w-5 h-5 mr-2 text-orange-500" />
              Veterinary Doctor Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Veterinary Doctor/Hospital <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Max Length 50 Chars)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={form.vetName}
                  onChange={(e) => setForm({ ...form, vetName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter doctor/hospital name"
                  style={{ color: '#111827' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number of Doctor <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Max Length 10 Chars)</span>
                </label>
                <div className="flex">
                  <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl px-3 py-3 text-gray-700">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={form.vetMobile}
                    onChange={(e) => setForm({ ...form, vetMobile: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="9876543210"
                    style={{ color: '#111827' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-1 text-orange-500" />
                  Veterinary Doctor Registration Number <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Max Length 50 Chars)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={form.vetRegistrationNumber}
                  onChange={(e) => setForm({ ...form, vetRegistrationNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter doctor's registration number"
                  style={{ color: '#111827' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Council where Doctor is Registered <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Max Length 100 Chars)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.vetCouncilName}
                  onChange={(e) => setForm({ ...form, vetCouncilName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="e.g., Veterinary Council of India, State Veterinary Council"
                  style={{ color: '#111827' }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-white pt-4 flex space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>{petToEdit ? 'Updating...' : 'Adding...'}</span>
                </>
              ) : (
                <>
                  <PawPrint className="w-5 h-5 text-white" />
                  <span>{petToEdit ? 'Update Pet' : 'Add Pet'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
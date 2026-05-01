"use client";
import { useState } from "react";
import {
  PawPrint,
  Dog,
  User,
  MapPin,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Upload,
  Trash2,
  Edit,
  Save,
  FileCheck,
} from "lucide-react";

interface RegistrationFormProps {
  petId: string;
  token: string;
  petName: string;
  onSuccess: () => void;
  onCancel: () => void;
  existingRegistration?: any;
  viewOnly?: boolean;
}

export default function RegistrationForm({
  petId,
  token,
  petName,
  onSuccess,
  onCancel,
  existingRegistration,
  viewOnly = false
}: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [viewMode, setViewMode] = useState<'view' | 'edit'>(
    viewOnly ? 'view' : 'edit'
  );

  const [formData, setFormData] = useState(() => {
    if (existingRegistration) {
      return {
        applicantDetails: {
          firstName: existingRegistration.applicantDetails?.firstName || "",
          middleName: existingRegistration.applicantDetails?.middleName || "",
          lastName: existingRegistration.applicantDetails?.lastName || "",
          dob: existingRegistration.applicantDetails?.dob?.split('T')[0] || ""
        },
        address: {
          plot: existingRegistration.address?.plot || "",
          street: existingRegistration.address?.street || "",
          pin: existingRegistration.address?.pin || "",
          colony: existingRegistration.address?.colony || "",
          ward: existingRegistration.address?.ward || "",
          zone: existingRegistration.address?.zone || "",
          mobile: existingRegistration.address?.mobile || "",
          email: existingRegistration.address?.email || ""
        },
        dogDetails: {
          gender: existingRegistration.dogDetails?.gender || "",
          breed: existingRegistration.dogDetails?.breed || "",
          ageYears: existingRegistration.dogDetails?.ageYears || "",
          ageMonths: existingRegistration.dogDetails?.ageMonths || ""
        },
        documents: {
          antiRabiesCertificate: existingRegistration.documents?.antiRabiesCertificate || "",
          idProof: existingRegistration.documents?.idProof || "",
          residenceProof: existingRegistration.documents?.residenceProof || "",
          ownerWithPetPhoto: existingRegistration.documents?.ownerWithPetPhoto || ""
        }
      };
    }
    
    return {
      applicantDetails: {
        firstName: "",
        middleName: "",
        lastName: "",
        dob: ""
      },
      address: {
        plot: "",
        street: "",
        pin: "",
        colony: "",
        ward: "",
        zone: "",
        mobile: "",
        email: ""
      },
      dogDetails: {
        gender: "",
        breed: "",
        ageYears: "",
        ageMonths: ""
      },
      documents: {
        antiRabiesCertificate: "",
        idProof: "",
        residenceProof: "",
        ownerWithPetPhoto: ""
      }
    };
  });

  const handleFileUpload = async (file: File, field: string, section: 'documents') => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [field]: base64String
        }
      });
    };
  };

  const removeFile = (field: string) => {
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [field]: ""
      }
    });
  };

  // SIMPLIFIED SUBMIT - Just shows success and closes
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    
    // Simulate a short delay
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      
      // Close modal after success
      setTimeout(() => {
        onSuccess(); // This will close the modal and go back to dashboard
      }, 1500);
    }, 1000);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setTimeout(() => {
      setShowDeleteConfirm(false);
      onSuccess();
      setDeleting(false);
    }, 1000);
  };

  const steps = [
    { number: 1, title: "Applicant Details", icon: User },
    { number: 2, title: "Address", icon: MapPin },
    { number: 3, title: "Dog Details", icon: Dog },
    { number: 4, title: "Documents", icon: FileText }
  ];

  // If in view mode, show the registration details
  if (viewMode === 'view' && existingRegistration) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Registration Details</h2>
                <p className="text-sm text-gray-500">{petName}</p>
              </div>
            </div>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex space-x-3">
              <button onClick={() => setViewMode('edit')} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors">
                <Edit className="w-5 h-5" />
                <span>Edit Registration</span>
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors">
                <Trash2 className="w-5 h-5" />
                <span>Delete Registration</span>
              </button>
            </div>

            {/* Display registration details - simplified view */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2 text-orange-500" />
                Applicant Details
              </h3>
              <p className="text-gray-600">
                {existingRegistration.applicantDetails?.firstName} {existingRegistration.applicantDetails?.lastName}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                Address
              </h3>
              <p className="text-gray-600">{existingRegistration.address?.colony}, {existingRegistration.address?.pin}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Dog className="w-4 h-4 mr-2 text-orange-500" />
                Dog Details
              </h3>
              <p className="text-gray-600 capitalize">{existingRegistration.dogDetails?.gender}</p>
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Registration?</h2>
                <p className="text-gray-500 mb-6">This action cannot be undone.</p>
                <div className="flex space-x-3">
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2">
                    {deleting ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Deleting...</span></> : <><Trash2 className="w-5 h-5" /><span>Delete</span></>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Edit/Create Mode
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {existingRegistration ? 'Edit Registration' : 'New Registration'}
              </h2>
              <p className="text-sm text-gray-500">{existingRegistration ? 'Update registration for' : 'Register'} {petName}</p>
            </div>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div className={`flex-1 h-1 ${step.number <= currentStep ? 'bg-orange-500' : 'bg-gray-200'}`} />
                </div>
                <div className="flex items-center mt-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step.number === currentStep ? 'bg-orange-500 text-white' : step.number < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {step.number < currentStep ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${step.number === currentStep ? 'text-orange-600' : 'text-gray-500'}`}>{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-6 mt-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">Registration submitted successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="p-6">
          {/* Step 1: Applicant Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Applicant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                  <input type="text" required value={formData.applicantDetails.firstName} onChange={(e) => setFormData({ ...formData, applicantDetails: { ...formData.applicantDetails, firstName: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                  <input type="text" value={formData.applicantDetails.middleName} onChange={(e) => setFormData({ ...formData, applicantDetails: { ...formData.applicantDetails, middleName: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="William" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" required value={formData.applicantDetails.lastName} onChange={(e) => setFormData({ ...formData, applicantDetails: { ...formData.applicantDetails, lastName: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                <input type="date" required value={formData.applicantDetails.dob} onChange={(e) => setFormData({ ...formData, applicantDetails: { ...formData.applicantDetails, dob: e.target.value } })} className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" />
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plot/House No. <span className="text-red-500">*</span></label>
                  <input type="text" required value={formData.address.plot} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, plot: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="123" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                  <input type="text" value={formData.address.street} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="Main Street" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Colony/Locality <span className="text-red-500">*</span></label>
                  <input type="text" required value={formData.address.colony} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, colony: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="Green Park" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
                  <input type="text" value={formData.address.ward} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, ward: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="Ward 12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
                  <input type="text" value={formData.address.zone} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zone: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="North Zone" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code <span className="text-red-500">*</span></label>
                  <input type="text" required value={formData.address.pin} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pin: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="110001" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mt-6">
                <Phone className="w-5 h-5 mr-2 text-orange-500" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" required value={formData.address.mobile} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, mobile: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                  <input type="email" required value={formData.address.email} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, email: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="john@example.com" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dog Details - REMOVED PHOTO FIELD */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Dog className="w-5 h-5 mr-2 text-orange-500" />
                Dog Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
                  <select required value={formData.dogDetails.gender} onChange={(e) => setFormData({ ...formData, dogDetails: { ...formData.dogDetails, gender: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white text-gray-900">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                  <input type="text" value={formData.dogDetails.breed} onChange={(e) => setFormData({ ...formData, dogDetails: { ...formData.dogDetails, breed: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="Labrador" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age (Years)</label>
                  <input type="number" min="0" max="30" value={formData.dogDetails.ageYears} onChange={(e) => setFormData({ ...formData, dogDetails: { ...formData.dogDetails, ageYears: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age (Months)</label>
                  <input type="number" min="0" max="11" value={formData.dogDetails.ageMonths} onChange={(e) => setFormData({ ...formData, dogDetails: { ...formData.dogDetails, ageMonths: e.target.value } })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 bg-white" placeholder="6" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-500" />
                Document Upload
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Anti-Rabies Certificate</label>
                  {formData.documents.antiRabiesCertificate ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">Certificate uploaded</span>
                      </div>
                      <button type="button" onClick={() => removeFile('antiRabiesCertificate')} className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">PDF or Image (Max 2MB)</span>
                      <input type="file" accept=".pdf,image/*" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (file) await handleFileUpload(file, 'antiRabiesCertificate', 'documents'); }} />
                    </label>
                  )}
                </div>

                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof</label>
                  {formData.documents.idProof ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">ID Proof uploaded</span>
                      </div>
                      <button type="button" onClick={() => removeFile('idProof')} className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">PDF or Image (Max 2MB)</span>
                      <input type="file" accept=".pdf,image/*" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (file) await handleFileUpload(file, 'idProof', 'documents'); }} />
                    </label>
                  )}
                </div>

                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Residence Proof</label>
                  {formData.documents.residenceProof ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">Residence Proof uploaded</span>
                      </div>
                      <button type="button" onClick={() => removeFile('residenceProof')} className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">PDF or Image (Max 2MB)</span>
                      <input type="file" accept=".pdf,image/*" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (file) await handleFileUpload(file, 'residenceProof', 'documents'); }} />
                    </label>
                  )}
                </div>

                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner with Pet Photo</label>
                  {formData.documents.ownerWithPetPhoto ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">Photo uploaded</span>
                      </div>
                      <button type="button" onClick={() => removeFile('ownerWithPetPhoto')} className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">Image only (Max 2MB)</span>
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const file = e.target.files?.[0]; if (file) await handleFileUpload(file, 'ownerWithPetPhoto', 'documents'); }} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              {existingRegistration && (
                <button type="button" onClick={() => setShowDeleteConfirm(true)} disabled={loading} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2 disabled:opacity-50">
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              )}
              {currentStep < steps.length ? (
                <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors flex items-center space-x-2">
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={loading} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2 disabled:opacity-50">
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>{existingRegistration ? 'Updating...' : 'Submitting...'}</span></> : <><Save className="w-5 h-5" /><span>{existingRegistration ? 'Update Registration' : 'Submit Registration'}</span></>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Registration?</h2>
              <p className="text-gray-500 mb-6">This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2">
                  {deleting ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Deleting...</span></> : <><Trash2 className="w-5 h-5" /><span>Delete</span></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
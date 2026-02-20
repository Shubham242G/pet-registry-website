"use client";
import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";
import {
  PawPrint,
  Dog,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Upload,
  Award,
  Stethoscope,
  Trash2,
  Edit,
  Save,
  FileCheck,
  Camera,
  Home,
  Phone as PhoneIcon,
  Mail as MailIcon,
  MapPinned,
  Hash,
  Briefcase,
  Plus,
  Eye
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

  console.log("RegistrationForm received:", { 
    petId, 
    petName, 
    hasExistingRegistration: !!existingRegistration,
    existingRegistration 
  });
  
  // FIX 1: Correct viewMode initialization
  const [viewMode, setViewMode] = useState<'view' | 'edit'>(
    viewOnly ? 'view' : 'edit'  // Always start in edit mode when not viewOnly
  );

  // Initial empty form state
   const [formData, setFormData] = useState(() => {
    // If we have existing registration data, populate the form
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
          photo: existingRegistration.dogDetails?.photo || "",
          breed: existingRegistration.dogDetails?.breed || "",
          ageYears: existingRegistration.dogDetails?.ageYears || "",
          ageMonths: existingRegistration.dogDetails?.ageMonths || "",
          antiRabiesDate: existingRegistration.dogDetails?.antiRabiesDate?.split('T')[0] || "",
          vaccinationValidTill: existingRegistration.dogDetails?.vaccinationValidTill?.split('T')[0] || "",
          certificateNumber: existingRegistration.dogDetails?.certificateNumber || "",
          certificateDate: existingRegistration.dogDetails?.certificateDate?.split('T')[0] || "",
          vetName: existingRegistration.dogDetails?.vetName || "",
          councilName: existingRegistration.dogDetails?.councilName || "",
          vetRegistrationNumber: existingRegistration.dogDetails?.vetRegistrationNumber || "",
          vetMobile: existingRegistration.dogDetails?.vetMobile || ""
        },
        documents: {
          antiRabiesCertificate: existingRegistration.documents?.antiRabiesCertificate || "",
          idProof: existingRegistration.documents?.idProof || "",
          residenceProof: existingRegistration.documents?.residenceProof || "",
          ownerWithPetPhoto: existingRegistration.documents?.ownerWithPetPhoto || ""
        }
      };
    }
    
    // Empty form state for new registration
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
        photo: "",
        breed: "",
        ageYears: "",
        ageMonths: "",
        antiRabiesDate: "",
        vaccinationValidTill: "",
        certificateNumber: "",
        certificateDate: "",
        vetName: "",
        councilName: "",
        vetRegistrationNumber: "",
        vetMobile: ""
      },
      documents: {
        antiRabiesCertificate: "",
        idProof: "",
        residenceProof: "",
        ownerWithPetPhoto: ""
      }
    };
  });

  // Update form data when existingRegistration changes (for when it's loaded asynchronously)
  useEffect(() => {
    if (existingRegistration) {
      setFormData({
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
          photo: existingRegistration.dogDetails?.photo || "",
          breed: existingRegistration.dogDetails?.breed || "",
          ageYears: existingRegistration.dogDetails?.ageYears || "",
          ageMonths: existingRegistration.dogDetails?.ageMonths || "",
          antiRabiesDate: existingRegistration.dogDetails?.antiRabiesDate?.split('T')[0] || "",
          vaccinationValidTill: existingRegistration.dogDetails?.vaccinationValidTill?.split('T')[0] || "",
          certificateNumber: existingRegistration.dogDetails?.certificateNumber || "",
          certificateDate: existingRegistration.dogDetails?.certificateDate?.split('T')[0] || "",
          vetName: existingRegistration.dogDetails?.vetName || "",
          councilName: existingRegistration.dogDetails?.councilName || "",
          vetRegistrationNumber: existingRegistration.dogDetails?.vetRegistrationNumber || "",
          vetMobile: existingRegistration.dogDetails?.vetMobile || ""
        },
        documents: {
          antiRabiesCertificate: existingRegistration.documents?.antiRabiesCertificate || "",
          idProof: existingRegistration.documents?.idProof || "",
          residenceProof: existingRegistration.documents?.residenceProof || "",
          ownerWithPetPhoto: existingRegistration.documents?.ownerWithPetPhoto || ""
        }
      });
    }
  }, [existingRegistration]);

  // FIX 2: Update form data when existingRegistration changes
  useEffect(() => {
    if (existingRegistration) {
        console.log("Populating form with existing registration:", existingRegistration);

      setFormData({
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
          photo: existingRegistration.dogDetails?.photo || "",
          breed: existingRegistration.dogDetails?.breed || "",
          ageYears: existingRegistration.dogDetails?.ageYears || "",
          ageMonths: existingRegistration.dogDetails?.ageMonths || "",
          antiRabiesDate: existingRegistration.dogDetails?.antiRabiesDate?.split('T')[0] || "",
          vaccinationValidTill: existingRegistration.dogDetails?.vaccinationValidTill?.split('T')[0] || "",
          certificateNumber: existingRegistration.dogDetails?.certificateNumber || "",
          certificateDate: existingRegistration.dogDetails?.certificateDate?.split('T')[0] || "",
          vetName: existingRegistration.dogDetails?.vetName || "",
          councilName: existingRegistration.dogDetails?. councilName || "",
          vetRegistrationNumber: existingRegistration.dogDetails?.vetRegistrationNumber || "",
          vetMobile: existingRegistration.dogDetails?.vetMobile || ""
        },
        documents: {
          antiRabiesCertificate: existingRegistration.documents?.antiRabiesCertificate || "",
          idProof: existingRegistration.documents?.idProof || "",
          residenceProof: existingRegistration.documents?.residenceProof || "",
          ownerWithPetPhoto: existingRegistration.documents?.ownerWithPetPhoto || ""
        }
      });
    }
  }, [existingRegistration]);

  // File upload with compression
  const validateAndCompressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        reject(new Error('File size should be less than 2MB'));
        return;
      }

      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        reject(new Error('Only images and PDF files are allowed'));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        
        if (file.type.startsWith('image/')) {
          compressImage(base64String).then(resolve).catch(reject);
        } else {
          resolve(base64String);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

   useEffect(() => {
    if (existingRegistration) {
      console.log("Component mounted with existing registration");
    }
  }, []);

  const compressImage = (base64String: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedBase64);
      };
      img.onerror = reject;
    });
  };

  const handleFileUpload = async (file: File, field: string, section: 'dogDetails' | 'documents') => {
    try {
      setError("");
      const base64String = await validateAndCompressImage(file);
      
      if (section === 'dogDetails') {
        setFormData({
          ...formData,
          dogDetails: {
            ...formData.dogDetails,
            [field]: base64String
          }
        });
      } else {
        setFormData({
          ...formData,
          documents: {
            ...formData.documents,
            [field]: base64String
          }
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to upload file');
    }
  };

  const removeFile = (field: string, section: 'dogDetails' | 'documents') => {
    if (section === 'dogDetails') {
      setFormData({
        ...formData,
        dogDetails: {
          ...formData.dogDetails,
          [field]: ""
        }
      });
    } else {
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [field]: ""
        }
      });
    }
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);
    setError("");

    // Validate required fields
    if (!formData.applicantDetails.firstName || !formData.applicantDetails.lastName || !formData.applicantDetails.dob) {
      setError("Please fill in all required applicant details");
      setCurrentStep(1);
      return;
    }

    if (!formData.address.plot || !formData.address.colony || !formData.address.pin || !formData.address.mobile || !formData.address.email) {
      setError("Please fill in all required address fields");
      setCurrentStep(2);
      return;
    }

    if (!formData.dogDetails.gender) {
      setError("Please select dog's gender");
      setCurrentStep(3);
      return;
    }

    // Prepare data for backend
    const registrationData = {
      applicantDetails: formData.applicantDetails,
      address: formData.address,
      dogDetails: formData.dogDetails,
      documents: formData.documents
    };

    console.log("Sending registration data:", registrationData);

    let response;
    if (existingRegistration) {
      // UPDATE existing registration
      response = await apiFetch(`/registration/${petId}`, "PUT", registrationData, token!);
    } else {
      // CREATE new registration
      response = await apiFetch(`/registration/${petId}`, "POST", registrationData, token!);
    }
    
    console.log("Registration response:", response);
    
    // Check if response has an _id (MongoDB ID) to confirm successful creation
    if (response && response._id) {
      // Only update pet status if registration was successful
      try {
        await apiFetch(`/pets/${petId}`, "PUT", { isRegistered: true }, token!);
        console.log("Pet status updated to registered");
      } catch (petUpdateError) {
        console.error("Failed to update pet registration status:", petUpdateError);
        // Don't show error to user since registration was successful
      }
      
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      console.error("Registration failed - response missing _id:", response);
      throw new Error("Registration failed - invalid response from server");
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    setError(error.message || "Failed to submit registration. Please try again.");
  } finally {
    setLoading(false);
  }
};
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await apiFetch(`/registration/${petId}`, "DELETE", null, token!);
      await apiFetch(`/pets/${petId}`, "PUT", { isRegistered: false }, token!);
      setShowDeleteConfirm(false);
      onSuccess();
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete registration.");
    } finally {
      setDeleting(false);
    }
  };

  const steps = [
    { number: 1, title: "Applicant Details", icon: User },
    { number: 2, title: "Address", icon: MapPin },
    { number: 3, title: "Dog Details", icon: Dog },
    { number: 4, title: "Vaccination", icon: Award },
    { number: 5, title: "Documents", icon: FileText }
  ];

  // If in view mode, show the registration details
  if (viewMode === 'view' && existingRegistration) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl">
          {/* Header */}
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
            <button 
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* View Mode Content */}
          <div className="p-6 space-y-6">
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setViewMode('edit')}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Registration</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Registration</span>
              </button>
            </div>

            {/* Applicant Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2 text-orange-500" />
                Applicant Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {existingRegistration.applicantDetails?.firstName} {existingRegistration.applicantDetails?.middleName} {existingRegistration.applicantDetails?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date of Birth</p>
                  <p className="font-medium text-gray-900">
                    {new Date(existingRegistration.applicantDetails?.dob).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                Address & Contact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">
                    {existingRegistration.address?.plot}, {existingRegistration.address?.street}, {existingRegistration.address?.colony}
                    {existingRegistration.address?.ward && `, Ward ${existingRegistration.address.ward}`}
                    {existingRegistration.address?.zone && `, ${existingRegistration.address.zone} Zone`}
                    <br />PIN: {existingRegistration.address?.pin}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <p className="font-medium text-gray-900">{existingRegistration.address?.mobile}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{existingRegistration.address?.email}</p>
                </div>
              </div>
            </div>

            {/* Dog Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Dog className="w-4 h-4 mr-2 text-orange-500" />
                Dog Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {existingRegistration.dogDetails?.photo && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Photo</p>
                    <img 
                      src={existingRegistration.dogDetails.photo} 
                      alt="Dog" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-orange-500 mt-1"
                    />
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="font-medium text-gray-900 capitalize">{existingRegistration.dogDetails?.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Breed</p>
                  <p className="font-medium text-gray-900">{existingRegistration.dogDetails?.breed || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="font-medium text-gray-900">
                    {existingRegistration.dogDetails?.ageYears} years {existingRegistration.dogDetails?.ageMonths} months
                  </p>
                </div>
              </div>
            </div>

            {/* Vaccination Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-orange-500" />
                Vaccination Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Anti-Rabies Date</p>
                  <p className="font-medium text-gray-900">
                    {existingRegistration.dogDetails?.antiRabiesDate ? new Date(existingRegistration.dogDetails.antiRabiesDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Valid Till</p>
                  <p className="font-medium text-gray-900">
                    {existingRegistration.dogDetails?.vaccinationValidTill ? new Date(existingRegistration.dogDetails.vaccinationValidTill).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Certificate No.</p>
                  <p className="font-medium text-gray-900">{existingRegistration.dogDetails?.certificateNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vet Name</p>
                  <p className="font-medium text-gray-900">{existingRegistration.dogDetails?.vetName || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-orange-500" />
                Documents
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {existingRegistration.documents?.antiRabiesCertificate && (
                  <div className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                    <FileCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Anti-Rabies Certificate</span>
                  </div>
                )}
                {existingRegistration.documents?.idProof && (
                  <div className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                    <FileCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">ID Proof</span>
                  </div>
                )}
                {existingRegistration.documents?.residenceProof && (
                  <div className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                    <FileCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Residence Proof</span>
                  </div>
                )}
                {existingRegistration.documents?.ownerWithPetPhoto && (
                  <div className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                    <FileCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Owner with Pet Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Registration?</h2>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete this registration? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {deleting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        <span>Delete</span>
                      </>
                    )}
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
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {existingRegistration ? 'Edit Registration' : 'New Registration'}
              </h2>
              <p className="text-sm text-gray-500">
                {existingRegistration ? 'Update registration for' : 'Register'} {petName}
              </p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div className={`flex-1 h-1 ${
                    step.number <= currentStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                </div>
                <div className="flex items-center mt-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.number === currentStep
                      ? 'bg-orange-500 text-white'
                      : step.number < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    step.number === currentStep ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-6 mt-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">
              {existingRegistration ? 'Registration updated successfully!' : 'Registration completed successfully!'}
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

        {/* Form Content */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicantDetails.firstName}
                    onChange={(e) => setFormData({
                      ...formData,
                      applicantDetails: {
                        ...formData.applicantDetails,
                        firstName: e.target.value
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.applicantDetails.middleName}
                    onChange={(e) => setFormData({
                      ...formData,
                      applicantDetails: {
                        ...formData.applicantDetails,
                        middleName: e.target.value
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="William"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicantDetails.lastName}
                    onChange={(e) => setFormData({
                      ...formData,
                      applicantDetails: {
                        ...formData.applicantDetails,
                        lastName: e.target.value
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.applicantDetails.dob}
                  onChange={(e) => setFormData({
                    ...formData,
                    applicantDetails: {
                      ...formData.applicantDetails,
                      dob: e.target.value
                    }
                  })}
                  className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plot/House No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address.plot}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, plot: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colony/Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address.colony}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, colony: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Green Park"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ward
                  </label>
                  <input
                    type="text"
                    value={formData.address.ward}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, ward: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Ward 12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zone
                  </label>
                  <input
                    type="text"
                    value={formData.address.zone}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, zone: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="North Zone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address.pin}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, pin: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="110001"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mt-6">
                <Phone className="w-5 h-5 mr-2 text-orange-500" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.address.mobile}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, mobile: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.address.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, email: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dog Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Dog className="w-5 h-5 mr-2 text-orange-500" />
                Dog Information
              </h3>
              
              {/* Dog Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dog Photo
                </label>
                <div className="flex items-center space-x-4">
                  {formData.dogDetails.photo ? (
                    <div className="relative">
                      <img 
                        src={formData.dogDetails.photo} 
                        alt="Dog" 
                        className="w-24 h-24 object-cover rounded-xl border-2 border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile('photo', 'dogDetails')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) await handleFileUpload(file, 'photo', 'dogDetails');
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.dogDetails.gender}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, gender: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Breed
                  </label>
                  <input
                    type="text"
                    value={formData.dogDetails.breed}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, breed: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Labrador"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={formData.dogDetails.ageYears}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, ageYears: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age (Months)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={formData.dogDetails.ageMonths}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, ageMonths: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="6"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Vaccination Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Award className="w-5 h-5 mr-2 text-orange-500" />
                Vaccination & Certificate Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anti-Rabies Vaccination Date
                  </label>
                  <input
                    type="date"
                    value={formData.dogDetails.antiRabiesDate}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, antiRabiesDate: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaccination Valid Till
                  </label>
                  <input
                    type="date"
                    value={formData.dogDetails.vaccinationValidTill}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, vaccinationValidTill: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    value={formData.dogDetails.certificateNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, certificateNumber: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="VAC-2024-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Date
                  </label>
                  <input
                    type="date"
                    value={formData.dogDetails.certificateDate}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, certificateDate: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 flex items-center mt-6">
                <Stethoscope className="w-5 h-5 mr-2 text-orange-500" />
                Veterinarian Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vet Name
                  </label>
                  <input
                    type="text"
                    value={formData.dogDetails.vetName}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, vetName: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Dr. Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Council Name
                  </label>
                  <input
                    type="text"
                    value={formData.dogDetails.councilName}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, councilName: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Veterinary Council"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vet Registration Number
                  </label>
                  <input
                    type="text"
                    value={formData.dogDetails.vetRegistrationNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, vetRegistrationNumber: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="VET-2024-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vet Mobile
                  </label>
                  <input
                    type="tel"
                    value={formData.dogDetails.vetMobile}
                    onChange={(e) => setFormData({
                      ...formData,
                      dogDetails: { ...formData.dogDetails, vetMobile: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Documents */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-500" />
                Document Upload
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Anti-Rabies Certificate */}
                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anti-Rabies Certificate
                  </label>
                  {formData.documents.antiRabiesCertificate ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">Certificate uploaded</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('antiRabiesCertificate', 'documents')}
                        className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">PDF or Image (Max 2MB)</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) await handleFileUpload(file, 'antiRabiesCertificate', 'documents');
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* ID Proof */}
                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof (Aadhar/PAN/Passport)
                  </label>
                  {formData.documents.idProof ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">ID Proof uploaded</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('idProof', 'documents')}
                        className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">PDF or Image (Max 2MB)</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) await handleFileUpload(file, 'idProof', 'documents');
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* Residence Proof */}
                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Residence Proof
                  </label>
                  {formData.documents.residenceProof ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">Residence Proof uploaded</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('residenceProof', 'documents')}
                        className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">PDF or Image (Max 2MB)</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) await handleFileUpload(file, 'residenceProof', 'documents');
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* Owner with Pet Photo */}
                <div className="border rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner with Pet Photo
                  </label>
                  {formData.documents.ownerWithPetPhoto ? (
                    <div className="relative">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <FileCheck className="w-8 h-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">Photo uploaded</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('ownerWithPetPhoto', 'documents')}
                        className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Click to upload</span>
                      <span className="text-xs text-gray-400">Image only (Max 2MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) await handleFileUpload(file, 'ownerWithPetPhoto', 'documents');
                        }}
                      />
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
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              {existingRegistration && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={loading}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              )}
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{existingRegistration ? 'Updating...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>{existingRegistration ? 'Update Registration' : 'Submit Registration'}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Registration?</h2>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this registration? This action cannot be undone and the pet will become unregistered.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
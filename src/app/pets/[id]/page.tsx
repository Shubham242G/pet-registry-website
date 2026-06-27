"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "../../services/api";
import { useAuth } from "../../component/context/AuthContext";
import AddPetModal from "../../component/AddPetModal";
import {
  PawPrint,
  Dog,
  Cat,
  Bird,
  Rabbit,
  Calendar,
  Tag,
  Heart,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Clipboard,
  MapPin,
  Phone,
  Mail,
  FileText,
  Award,
  Stethoscope,
  User,
  Home,
  CreditCard,
  Download
} from "lucide-react";
import Link from "next/link";

export default function PetDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Registration states
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [loadingRegistration, setLoadingRegistration] = useState(false);

  useEffect(() => {
    if (token && id) {
      loadPet();
      loadRegistration();
    }
  }, [token, id]);

  const loadPet = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/pets/${id}`, "GET", null, token!);
      setPet(data);
      setError("");
    } catch (error) {
      console.error("Error loading pet:", error);
      setError("Failed to load pet details");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Load registration data from pets endpoint
  const loadRegistration = async () => {
    try {
      setLoadingRegistration(true);
      // ✅ Use the pets registration-status endpoint
      const data = await apiFetch(`/pets/${id}/registration-status`, "GET", null, token!);
      setRegistrationData(data);
    } catch (error) {
      console.error("Error loading registration:", error);
    } finally {
      setLoadingRegistration(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await apiFetch(`/pets/${id}`, "DELETE", null, token!);
      router.push("/pages/dashboard");
    } catch (error) {
      console.error("Error deleting pet:", error);
      setError("Failed to delete pet");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleRegistrationSuccess = () => {
    loadPet();
    loadRegistration();
  };

  const getSpeciesIcon = (species: string) => {
    switch(species?.toLowerCase()) {
      case 'dog': return <Dog className="w-8 h-8" />;
      case 'cat': return <Cat className="w-8 h-8" />;
      case 'bird': return <Bird className="w-8 h-8" />;
      case 'rabbit': return <Rabbit className="w-8 h-8" />;
      default: return <PawPrint className="w-8 h-8" />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ✅ Get document count from registration data or pet
  const getDocumentCount = () => {
    if (registrationData) {
      return {
        uploaded: registrationData.uploadedDocumentsCount || 0,
        required: registrationData.requiredDocumentsCount || 4,
        hasAll: registrationData.hasAllDocuments || false,
      };
    }
    // Fallback to pet virtuals
    return {
      uploaded: pet?.uploadedDocumentsCount || 0,
      required: pet?.requiredDocumentsCount || 4,
      hasAll: pet?.hasAllDocuments || false,
    };
  };

  // ✅ Get registration status
  const getRegistrationStatus = () => {
    if (registrationData) {
      return {
        triggered: registrationData.registrationTriggered || false,
        triggeredAt: registrationData.registrationTriggeredAt,
        status: registrationData.registrationStatus || 'not_started',
      };
    }
    return {
      triggered: pet?.registrationTriggered || false,
      triggeredAt: pet?.registrationTriggeredAt,
      status: pet?.registrationStatus || 'not_started',
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || "Pet not found"}</p>
          <Link
            href="/pages/dashboard"
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const docCount = getDocumentCount();
  const regStatus = getRegistrationStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/pages/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg shadow-orange-200">
                {getSpeciesIcon(pet.species)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                <p className="text-gray-500 mt-1 capitalize">{pet.species} • {pet.breed || 'Mixed Breed'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                pet.registrationStage === 4
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {pet.registrationStage === 4 ? 'Registered' : 'Not Registered'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Pet Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pet Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="font-medium text-gray-900">
                    {pet.ageYears !== undefined ? `${pet.ageYears}y ${pet.ageMonths || 0}m` : 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="font-medium text-gray-900 capitalize">{pet.gender || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">City</p>
                  <p className="font-medium text-gray-900 capitalize">{pet.city || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Documents</p>
                  <p className="font-medium text-gray-900">{docCount.uploaded}/{docCount.required} uploaded</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Member since</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(pet.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last updated</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(pet.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {pet.notes && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Notes</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{pet.notes}</p>
              </div>
            )}

            {/* Registration Status & Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Registration Status</h2>
              
              {loadingRegistration ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      regStatus.triggered ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {regStatus.triggered ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {regStatus.triggered ? 'Registration Submitted' : 'Not Registered'}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {regStatus.triggered 
                          ? `Submitted on ${formatDate(regStatus.triggeredAt)}`
                          : 'Complete the registration process for this pet.'}
                      </p>
                      
                      {!regStatus.triggered && (
                        <button
                          onClick={() => setIsEditModalOpen(true)}
                          className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Continue Registration</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Display Documents if available */}
                  {registrationData?.documents && registrationData.documents.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-orange-500" />
                        Uploaded Documents
                      </h4>
                      <div className="space-y-2">
                        {registrationData.documents.map((doc: any) => (
                          <div key={doc.documentName} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600 capitalize">
                              {doc.documentName.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-medium 
                           flex items-center justify-center space-x-2 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Pet Information</span>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 
                           px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Pet</span>
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
              <h2 className="text-xl font-bold text-orange-900 mb-4">Quick Tips</h2>
              <ul className="space-y-3 text-orange-800">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Keep your pet's information up to date</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Upload all required documents</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Complete registration for full benefits</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Keep vaccination records updated</span>
                </li>
              </ul>
            </div>

            {/* Document Summary Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-500" />
                Documents
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Uploaded</span>
                  <span className="font-medium text-gray-900">{docCount.uploaded}/{docCount.required}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`font-medium ${docCount.hasAll ? 'text-green-600' : 'text-orange-600'}`}>
                    {docCount.hasAll ? '✅ All uploaded' : '⏳ Incomplete'}
                  </span>
                </div>
                {pet.isSterilizationRequired && (
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Sterilization</span>
                    <span className={`font-medium ${pet.sterilizationCertificate?.fileData ? 'text-green-600' : 'text-orange-600'}`}>
                      {pet.sterilizationCertificate?.fileData ? '✅ Uploaded' : '⚠️ Required'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Pet Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Pet?</h2>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete {pet.name}? This action cannot be undone and will also delete all registration data.
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
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
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

      {/* Edit Pet Modal */}
      <AddPetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          loadPet();
          loadRegistration();
        }}
        onPetAdded={() => {
          loadPet();
          loadRegistration();
        }}
        token={token}
        petToEdit={pet}
      />
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import AddPetModal from "../../../component/AddPetModal";
import RegistrationForm from "../../../component/RegistrationForm";
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
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState<any>(null);
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

  const loadRegistration = async () => {
    try {
      setLoadingRegistration(true);
      const data = await apiFetch(`/registration/${id}`, "GET", null, token!);
      setExistingRegistration(data);
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

  const handleDeleteRegistration = async () => {
    if (!confirm("Are you sure you want to delete this registration? This action cannot be undone.")) {
      return;
    }
    
    try {
      setLoading(true);
      await apiFetch(`/registration/${id}`, "DELETE", null, token!);
      await apiFetch(`/pets/${id}`, "PUT", { isRegistered: false }, token!);
      await loadPet();
      await loadRegistration();
    } catch (error) {
      console.error("Error deleting registration:", error);
      setError("Failed to delete registration");
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
    loadPet(); // Reload pet to update isRegistered status
    loadRegistration(); // Reload registration data
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
                pet.isRegistered 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {pet.isRegistered ? 'Registered' : 'Not Registered'}
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
                  <p className="font-medium text-gray-900">{pet.age ? `${pet.age} years` : 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="font-medium text-gray-900 capitalize">{pet.gender || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Color</p>
                  <p className="font-medium text-gray-900">{pet.color || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Microchip</p>
                  <p className="font-medium text-gray-900">{pet.microchip || 'Not provided'}</p>
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
                      pet.isRegistered ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {pet.isRegistered ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {pet.isRegistered ? 'Fully Registered' : 'Not Registered'}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {pet.isRegistered 
                          ? 'This pet is fully registered in our system.' 
                          : 'Complete the registration process for this pet.'}
                      </p>
                      
                      {!pet.isRegistered && (
                        <button
                          onClick={() => setShowRegistrationForm(true)}
                          className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Register Now</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Display Registration Details if exists */}
                  {pet.isRegistered && existingRegistration && (
                    <div className="mt-6 space-y-4">
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <User className="w-4 h-4 mr-2 text-orange-500" />
                          Applicant Details
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500">Name</p>
                            <p className="font-medium text-gray-900">
                              {existingRegistration.applicantDetails?.firstName} {existingRegistration.applicantDetails?.middleName} {existingRegistration.applicantDetails?.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">DOB</p>
                            <p className="font-medium text-gray-900">
                              {formatDate(existingRegistration.applicantDetails?.dob)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                          Address & Contact
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="col-span-2">
                            <p className="text-gray-500">Address</p>
                            <p className="font-medium text-gray-900">
                              {existingRegistration.address?.plot}, {existingRegistration.address?.street}, {existingRegistration.address?.colony}
                              {existingRegistration.address?.ward && `, Ward ${existingRegistration.address.ward}`}
                              {existingRegistration.address?.zone && `, ${existingRegistration.address.zone} Zone`}
                              <br />PIN: {existingRegistration.address?.pin}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Mobile</p>
                            <p className="font-medium text-gray-900">{existingRegistration.address?.mobile}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{existingRegistration.address?.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-orange-500" />
                          Vaccination Details
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500">Anti-Rabies Date</p>
                            <p className="font-medium text-gray-900">
                              {formatDate(existingRegistration.dogDetails?.antiRabiesDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Valid Till</p>
                            <p className="font-medium text-gray-900">
                              {formatDate(existingRegistration.dogDetails?.vaccinationValidTill)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Certificate No.</p>
                            <p className="font-medium text-gray-900">{existingRegistration.dogDetails?.certificateNumber || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Vet Name</p>
                            <p className="font-medium text-gray-900">{existingRegistration.dogDetails?.vetName || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setShowRegistrationForm(true)}
                            className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit Registration</span>
                          </button>
                          <button
                            onClick={handleDeleteRegistration}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Registration</span>
                          </button>
                        </div>
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
                  <span className="text-sm">Add microchip number for identification</span>
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

            {/* Documents Summary */}
            {pet.isRegistered && existingRegistration?.documents && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-500" />
                  Documents
                </h2>
                <div className="space-y-2">
                  {existingRegistration.documents.antiRabiesCertificate && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Anti-Rabies Certificate</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                  {existingRegistration.documents.idProof && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">ID Proof</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                  {existingRegistration.documents.residenceProof && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Residence Proof</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                  {existingRegistration.documents.ownerWithPetPhoto && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Owner with Pet Photo</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
            )}
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
        onClose={() => setIsEditModalOpen(false)}
        onPetAdded={() => {
          loadPet();
          setIsEditModalOpen(false);
        }}
        token={token}
        petToEdit={pet}
      />

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm
          petId={pet._id}
          token={token!}
          petName={pet.name}
          onSuccess={handleRegistrationSuccess}
          onCancel={() => setShowRegistrationForm(false)}
          existingRegistration={existingRegistration}
        />
      )}
    </div>
  );
}
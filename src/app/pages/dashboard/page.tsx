"use client";
import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  PawPrint, 
  Plus, 
  Dog, 
  Cat, 
  CheckCircle, 
  AlertCircle,
  Bird,
  Rabbit,
  Loader2,
  Edit,
  Trash2,
  FileText,
  Eye,
  FileCheck,
  Clock
} from "lucide-react";
import AddPetModal from "../../component/AddPetModal";
import RegistrationForm from "../../component/RegistrationForm";
import Sidebar from '../../component/Sidebar'
import RegistrationProgress from "../../component/RegistrationProgress";

interface Pet {
  _id: string;
  name: string;
  species: string;
  breed: string;
  ageYears?: number;
  ageMonths?: number;
  gender: string;
  color: string;
  microchip: string;
  notes: string;
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

export default function Dashboard() {
  const { token, isAuthenticated, loading: authLoading, logout, user } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPet, setEditingPet] = useState<any>(null);
  
  // Registration states
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showRegistrationView, setShowRegistrationView] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{show: boolean, petId: string, petName: string}>({
    show: false,
    petId: '',
    petName: ''
  });

  // Validate session
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (token) {
      loadPets();
    }
  }, [token]);

  const loadPets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/pets", "GET", null, token!);
      
      // Fetch registration status for each pet
      const petsWithStatus = await Promise.all((Array.isArray(data) ? data : []).map(async (pet: any) => {
        try {
          const status = await apiFetch(`/registration/${pet._id}/status`, "GET", null, token!);
          return {
            ...pet,
            uploadedDocumentsCount: status?.uploadedDocumentsCount || 0,
            hasAllDocuments: status?.hasAllDocuments || false,
            registrationTriggered: status?.registrationTriggered || false,
            registrationStage: pet.registrationStage || 0,
            registrationStatus: pet.registrationStatus || 'not_started'
          };
        } catch {
          return {
            ...pet,
            uploadedDocumentsCount: 0,
            hasAllDocuments: false,
            registrationTriggered: false,
            registrationStage: pet.registrationStage || 0,
            registrationStatus: pet.registrationStatus || 'not_started'
          };
        }
      }));
      
      setPets(petsWithStatus);
      if (petsWithStatus.length > 0 && !selectedPet) {
        setSelectedPet(petsWithStatus[0]);
      } else if (selectedPet && petsWithStatus.length > 0) {
        // Update selected pet with latest data
        const updatedSelected = petsWithStatus.find(p => p._id === selectedPet._id);
        if (updatedSelected) {
          setSelectedPet(updatedSelected);
        }
      }
    } catch (error) {
      console.error("Error loading pets:", error);
      setError("Failed to load pets. Please try again.");
      if (error instanceof Error && error.message === "Session expired") {
        logout();
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  }, [token, selectedPet, logout, router]);

  const handleDeletePet = async (petId: string) => {
    try {
      setLoading(true);
      await apiFetch(`/pets/${petId}`, "DELETE", null, token!);
      await loadPets();
      setShowDeleteConfirm({ show: false, petId: '', petName: '' });
    } catch (error) {
      console.error("Error deleting pet:", error);
      setError("Failed to delete pet");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRegistration = async (pet: Pet) => {
    try {
      const registration = await apiFetch(`/registration/${pet._id}`, "GET", null, token!);
      if (!registration) {
        setError(`No registration found for ${pet.name}`);
        return;
      }
      setSelectedPet(pet);
      setExistingRegistration(registration);
      setShowRegistrationView(true);
    } catch (error) {
      console.error("Error loading registration:", error);
      setError("Failed to load registration");
    }
  };

  const handleEditRegistration = async (pet: Pet) => {
    try {
      setLoading(true);
      const registration = await apiFetch<any>(`/registration/${pet._id}`, "GET", null, token!);
      if (registration && registration.applicantDetails) {
        setSelectedPet(pet);
        setExistingRegistration(registration);
        setShowRegistrationForm(true);
      } else {
        setSelectedPet(pet);
        setExistingRegistration(null);
        setShowRegistrationForm(true);
        if (pet.isRegistered) {
          await apiFetch(`/pets/${pet._id}`, "PUT", { isRegistered: false }, token!);
          await loadPets();
        }
      }
    } catch (error) {
      console.error("Error loading registration:", error);
      setSelectedPet(pet);
      setExistingRegistration(null);
      setShowRegistrationForm(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPet = (pet: Pet) => {
    setSelectedPet(pet);
    setExistingRegistration(null);
    setShowRegistrationForm(true);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handlePetModalClose = () => {
    setIsModalOpen(false);
    setEditingPet(null);
  };

  const handlePetAdded = async () => {
    await loadPets(); // This will refresh all pets and update selected pet automatically
    setIsModalOpen(false);
    setEditingPet(null);
  };

  // Helper function to get formatted age
  const getFormattedAge = (pet: Pet) => {
    try {
      if (pet.ageYears && pet.ageMonths && pet.ageYears > 0 && pet.ageMonths > 0) {
        return `${pet.ageYears} years ${pet.ageMonths} months`;
      } else if (pet.ageYears && pet.ageYears > 0) {
        return `${pet.ageYears} years`;
      } else if (pet.ageMonths && pet.ageMonths > 0) {
        return `${pet.ageMonths} months`;
      }
      return "Not specified";
    } catch (err) {
      return "Not specified";
    }
  };

  const stats = {
    total: pets.length,
    registered: pets.filter(p => p.registrationStage === 4).length,
    inProgress: pets.filter(p => p.registrationStage > 0 && p.registrationStage < 4).length,
    notStarted: pets.filter(p => p.registrationStage === 0).length,
    documentsUploaded: pets.reduce((sum, pet) => sum + (pet.uploadedDocumentsCount || 0), 0)
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

  const getStageLabel = (stage: number) => {
    switch(stage) {
      case 0: return 'Not Started';
      case 1: return 'Documents Ready';
      case 2: return 'Form Submitted';
      case 3: return 'Processing';
      case 4: return 'Complete';
      default: return 'Unknown';
    }
  };

  const getStageColor = (stage: number) => {
    switch(stage) {
      case 0: return 'bg-gray-100 text-gray-600';
      case 1: return 'bg-blue-100 text-blue-600';
      case 2: return 'bg-orange-100 text-orange-600';
      case 3: return 'bg-purple-100 text-purple-600';
      case 4: return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const currentPet = selectedPet;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar/>
      <div className="pl-64">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Tailio → Overview</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
          ) : pets.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <PawPrint className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No pets yet</h3>
              <p className="text-gray-500 mb-6">Add your first pet to get started</p>
              <button
                onClick={() => {
                  setEditingPet(null);
                  setIsModalOpen(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Add Your First Pet
              </button>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column - Main Pet Info */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Pet Selector with Profile Pictures */}
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {pets.map((pet) => (
                      <button
                        key={pet._id}
                        onClick={() => setSelectedPet(pet)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          selectedPet?._id === pet._id
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pet.profilePicture ? (
                          <img 
                            src={pet.profilePicture} 
                            alt={pet.name} 
                            className="w-6 h-6 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <PawPrint className="w-4 h-4" />
                        )}
                        <span>{pet.name}</span>
                        {pet.registrationStage === 4 && (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        )}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setEditingPet(null);
                        setIsModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Pet</span>
                    </button>
                  </div>

                  {/* Pet Card */}
                  {currentPet && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      {/* Pet Header with Profile Picture */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center overflow-hidden">
                            {currentPet.profilePicture ? (
                              <img 
                                src={currentPet.profilePicture} 
                                alt={currentPet.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              getSpeciesIcon(currentPet.species)
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h2 className="text-2xl font-bold text-gray-900">{currentPet.name}</h2>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(currentPet.registrationStage || 0)}`}>
                                {getStageLabel(currentPet.registrationStage || 0)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              {currentPet.registrationStage === 0 && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                                  ⚠️ Registration Pending
                                </span>
                              )}
                              {currentPet.registrationStage === 4 && (
                                <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                                  ✅ Fully Registered
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pet Details Grid */}
                      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">BREED</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{currentPet.breed || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">COLOUR</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{currentPet.color || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">AGE</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{getFormattedAge(currentPet)}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">MEMBER SINCE</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {currentPet.createdAt ? new Date(currentPet.createdAt).toLocaleDateString() : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">DOCUMENTS</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{currentPet.uploadedDocumentsCount || 0}/4 uploaded</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleEditPet(currentPet)}
                          className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Pet Info</span>
                        </button>
                        {currentPet.registrationStage === 4 ? (
                          <>
                            <button
                              onClick={() => handleViewRegistration(currentPet)}
                              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Registration</span>
                            </button>
                            <button
                              onClick={() => handleEditRegistration(currentPet)}
                              className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit Registration</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRegisterPet(currentPet)}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Complete Registration</span>
                          </button>
                        )}
                        <button
                          onClick={() => setShowDeleteConfirm({ show: true, petId: currentPet._id, petName: currentPet.name })}
                          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Registration Progress Component */}
                  {currentPet && (
                    <RegistrationProgress
                      currentStage={currentPet.registrationStage || 0}
                      uploadedDocumentsCount={currentPet.uploadedDocumentsCount || 0}
                      totalDocuments={4}
                      registrationTriggered={currentPet.registrationTriggered || false}
                    />
                  )}
                </div>

                {/* Right Column - Stats Cards */}
                <div className="space-y-4">
                  
                  {/* Overview Card */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 text-white">
                    <h3 className="font-semibold mb-2">Pet Overview</h3>
                    <div className="text-3xl font-bold">{stats.total}</div>
                    <p className="text-sm opacity-90">Total Pets Registered</p>
                    <div className="mt-3 pt-3 border-t border-orange-400">
                      <div className="flex justify-between text-sm">
                        <span>Registered:</span>
                        <span className="font-semibold">{stats.registered}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>In Progress:</span>
                        <span className="font-semibold">{stats.inProgress}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>Not Started:</span>
                        <span className="font-semibold">{stats.notStarted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Documents Card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">TOTAL DOCUMENTS</h3>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{stats.documentsUploaded}/{stats.total * 4}</span>
                    </div>
                    <p className="text-sm text-orange-600 mb-3">{(stats.total * 4) - stats.documentsUploaded} pending uploads</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(stats.documentsUploaded / (stats.total * 4)) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Registration Progress Card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">REGISTRATION</h3>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{Math.round((stats.registered / stats.total) * 100)}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{stats.registered} of {stats.total} pets registered</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(stats.registered / stats.total) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Timeline Card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      Registration Timeline
                    </h3>
                    {currentPet ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Account Created:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(currentPet.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Documents Uploaded:</span>
                          <span className="font-medium text-gray-900">
                            {currentPet.uploadedDocumentsCount || 0}/4
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Current Stage:</span>
                          <span className={`font-medium ${getStageColor(currentPet.registrationStage || 0)}`}>
                            {getStageLabel(currentPet.registrationStage || 0)}
                          </span>
                        </div>
                        {currentPet.registrationStage === 4 && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">Registration Complete!</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Select a pet to view timeline</p>
                    )}
                  </div>

                  {/* Quick Tips Card */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <h3 className="font-semibold text-blue-900 mb-3">💡 Quick Tips</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>Upload all 4 documents to start registration</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>Complete the registration form after document upload</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>License will be delivered within 7-10 business days</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddPetModal 
        isOpen={isModalOpen}
        onClose={handlePetModalClose}
        onPetAdded={handlePetAdded}
        token={token}
        petToEdit={editingPet}
      />

      {showRegistrationForm && selectedPet && (
        <RegistrationForm
          key={selectedPet._id + (existingRegistration ? 'edit' : 'new')}
          petId={selectedPet._id}
          token={token!}
          petName={selectedPet.name}
          onSuccess={async () => {
            setShowRegistrationForm(false);
            setSelectedPet(null);
            setExistingRegistration(null);
            await loadPets();
          }}
          onCancel={() => {
            setShowRegistrationForm(false);
            setSelectedPet(null);
            setExistingRegistration(null);
          }}
          existingRegistration={existingRegistration}
        />
      )}

      {showRegistrationView && selectedPet && existingRegistration && (
        <RegistrationForm
          key={`view-${selectedPet._id}`}
          petId={selectedPet._id}
          token={token!}
          petName={selectedPet.name}
          onSuccess={() => {
            setShowRegistrationView(false);
            setSelectedPet(null);
            setExistingRegistration(null);
            loadPets();
          }}
          onCancel={() => {
            setShowRegistrationView(false);
            setSelectedPet(null);
            setExistingRegistration(null);
          }}
          existingRegistration={existingRegistration}
          viewOnly={true}
        />
      )}

      {showDeleteConfirm.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Pet?</h2>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete {showDeleteConfirm.petName}? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm({ show: false, petId: '', petName: '' })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePet(showDeleteConfirm.petId)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  PawPrint, 
  Plus, 
  Dog, 
  Cat, 
  CheckCircle, 
  Calendar,
  AlertCircle,
  Bird,
  Rabbit,
  Loader2,
  Edit,
  Trash2,
  FileText,
  Eye,
  Upload,
  FileCheck,
  Microchip,
  MapPin,
  User,
  Award,
  Clock,
  AlertTriangle,
  FileWarning,
  Syringe
} from "lucide-react";
import AddPetModal from "../../component/AddPetModal";
import RegistrationForm from "../../component/RegistrationForm";
import Sidebar from '../../component/Sidebar'

interface Pet {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  color: string;
  microchip: string;
  notes: string;
  isRegistered: boolean;
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

  const loadPets = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/pets", "GET", null, token!);
      setPets(Array.isArray(data) ? data : []);
      if (data && data.length > 0 && !selectedPet) {
        setSelectedPet(data[0]);
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
  };

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

  const stats = {
    total: pets.length,
    registered: pets.filter(p => p.isRegistered).length,
    notRegistered: pets.filter(p => !p.isRegistered).length
  };

  const registrationProgress = stats.total > 0 ? (stats.registered / stats.total) * 100 : 0;
  const documentsProgress = stats.total > 0 ? (stats.registered / stats.total) * 4 : 0;

  const getSpeciesIcon = (species: string) => {
    switch(species?.toLowerCase()) {
      case 'dog': return <Dog className="w-8 h-8" />;
      case 'cat': return <Cat className="w-8 h-8" />;
      case 'bird': return <Bird className="w-8 h-8" />;
      case 'rabbit': return <Rabbit className="w-8 h-8" />;
      default: return <PawPrint className="w-8 h-8" />;
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
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Add Your First Pet
              </button>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              
              {/* Action Required Banner */}
              {stats.notRegistered > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-orange-800">Action required: Your registration is incomplete.</p>
                      <p className="text-sm text-orange-700">
                        Upload {stats.notRegistered} remaining document{stats.notRegistered !== 1 ? 's' : ''} to receive your official certificate and avoid a penalty of up to ₹10,000.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column - Main Pet Info */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Pet Selector */}
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {pets.map((pet) => (
                      <button
                        key={pet._id}
                        onClick={() => setSelectedPet(pet)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          selectedPet?._id === pet._id
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pet.name}
                      </button>
                    ))}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      + Add Pet
                    </button>
                  </div>

                  {/* Pet Card */}
                  {currentPet && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      {/* Pet Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                            {getSpeciesIcon(currentPet.species)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h2 className="text-2xl font-bold text-gray-900">{currentPet.name}</h2>
                              <span className="text-xs text-gray-400 font-mono">TL-DL-00421</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">
                              {currentPet.breed || "Golden Retriever"} - {currentPet.gender || "Male"} - {currentPet.age || 3} years - Delhi
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                                🐾 Incomplete
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                                ✅ Vaccinated
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pet Details Grid */}
                      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">BREED</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{currentPet.breed || "Golden Retriever"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">COLOUR</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{currentPet.color || "Golden / Cream"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">OWNER</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{user?.username || "Rahul Sharma"}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">DATE OF BIRTH</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {currentPet.createdAt ? new Date(currentPet.createdAt).toLocaleDateString() : "12 March 2022"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">MICROCHIP</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{currentPet.microchip || "Not added"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">MUNICIPALITY</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">MCD South Delhi</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-100">
                        {currentPet.isRegistered ? (
                          <>
                            <button
                              onClick={() => handleViewRegistration(currentPet)}
                              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
                            >
                              View Registration
                            </button>
                            <button
                              onClick={() => handleEditRegistration(currentPet)}
                              className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium"
                            >
                              Edit Registration
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRegisterPet(currentPet)}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            Complete Registration
                          </button>
                        )}
                        <button
                          onClick={() => setShowDeleteConfirm({ show: true, petId: currentPet._id, petName: currentPet.name })}
                          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Documents Updating */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Documents Updating</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{stats.registered} of 4 complete</span>
                      <span className="text-sm font-semibold text-gray-900">{Math.round((stats.registered / 4) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(stats.registered / 4) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats Cards */}
                <div className="space-y-4">
                  
                  {/* Documents Card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">DOCUMENTS</h3>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{stats.registered}/4</span>
                    </div>
                    <p className="text-sm text-orange-600 mb-3">{4 - stats.registered} pending upload</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(stats.registered / 4) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Registration Card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">REGISTRATION</h3>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{Math.round(registrationProgress)}%</span>
                    </div>
                    <p className="text-sm text-orange-600 mb-3">Incomplete</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${registrationProgress}%` }}></div>
                    </div>
                  </div>

                  {/* Vaccinations Card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Syringe className="w-5 h-5 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">VACCINATIONS</h3>
                      </div>
                      <span className="text-xl font-bold text-gray-900">3/4</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Rabies done</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  {/* Registration Joins */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-3">Registration Joins</h3>
                    <p className="text-sm text-gray-500">Where Bruno stands</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Account Created:</span>
                        <span className="font-medium text-gray-900">2 May 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Profile Added:</span>
                        <span className="font-medium text-gray-900">2 May 2025</span>
                      </div>
                    </div>
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
        onClose={() => setIsModalOpen(false)}
        onPetAdded={() => {
          loadPets();
          setIsModalOpen(false);
        }}
        token={token}
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
"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  PawPrint, 
  Plus, 
  Dog, 
  Cat, 
  CheckCircle, 
  XCircle, 
  Activity,
  Calendar,
  Tag,
  Users,
  AlertCircle,
  Bird,
  Rabbit,
  Loader2,
  Edit,
  Trash2,
  FileText,
  Eye
} from "lucide-react";
import AddPetModal from "../../component/AddPetModal";
import RegistrationForm from "../../component/RegistrationForm";

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
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Registration states
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showRegistrationView, setShowRegistrationView] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{show: boolean, petId: string, petName: string}>({
    show: false,
    petId: '',
    petName: ''
  });

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
    } catch (error) {
      console.error("Error loading pets:", error);
      setError("Failed to load pets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fixInconsistentRegistrations = async () => {
  try {
    setLoading(true);
    const allPets = await apiFetch("/pets", "GET", null, token!);
    let fixedCount = 0;
    
    for (const pet of allPets) {
      if (pet.isRegistered) {
        try {
          const registration = await apiFetch(`/registration/${pet._id}`, "GET", null, token!);
          if (!registration) {
            console.log(`Fixing: ${pet.name} - marked as registered but no registration found`);
            await apiFetch(`/pets/${pet._id}`, "PUT", { isRegistered: false }, token!);
            fixedCount++;
          }
        } catch (e) {
          console.log(`Fixing: ${pet.name} - error fetching registration`);
          await apiFetch(`/pets/${pet._id}`, "PUT", { isRegistered: false }, token!);
          fixedCount++;
        }
      }
    }
    
    await loadPets();
    alert(`Fixed ${fixedCount} inconsistent pet(s). They are now correctly marked as unregistered.`);
  } catch (error) {
    console.error("Error fixing registrations:", error);
    setError("Failed to fix inconsistent data");
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
      console.log("Fetched registration for view:", registration);
      
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
      const registration = await apiFetch(`/registration/${pet._id}`, "GET", null, token!);
      console.log("API Response - Full registration object:", registration);
      
      // Check if registration exists AND has data
      if (registration && registration.applicantDetails) {
        // We have real registration data
        console.log("Found existing registration, opening edit mode");
        setSelectedPet(pet);
        setExistingRegistration(registration);
        setShowRegistrationForm(true);
      } else {
        // No registration exists - create new one
        console.log("No existing registration found, creating new one");
        setSelectedPet(pet);
        setExistingRegistration(null);
        setShowRegistrationForm(true);
        
        // Fix the inconsistent data - pet is marked as registered but no registration exists
        if (pet.isRegistered) {
          console.log(`Fixing inconsistent data for ${pet.name}`);
          await apiFetch(`/pets/${pet._id}`, "PUT", { isRegistered: false }, token!);
          await loadPets(); // Refresh the list to show correct status
        }
      }
    } catch (error) {
      console.error("Error loading registration:", error);
      // If error, still allow creating new registration
      setSelectedPet(pet);
      setExistingRegistration(null);
      setShowRegistrationForm(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPet = (pet: Pet) => {
    console.log("Opening new registration form for:", pet.name);
    setSelectedPet(pet);
    setExistingRegistration(null);
    setShowRegistrationForm(true);
  };

  const stats = {
    total: pets.length,
    registered: pets.filter(p => p.isRegistered).length,
    notRegistered: pets.filter(p => !p.isRegistered).length
  };

  const getSpeciesIcon = (species: string) => {
    switch(species?.toLowerCase()) {
      case 'dog': return <Dog className="w-5 h-5" />;
      case 'cat': return <Cat className="w-5 h-5" />;
      case 'bird': return <Bird className="w-5 h-5" />;
      case 'rabbit': return <Rabbit className="w-5 h-5" />;
      default: return <PawPrint className="w-5 h-5" />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg shadow-orange-200">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Pet Registry Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your furry friends</p>
              </div>
            </div>

            <button
    onClick={fixInconsistentRegistrations}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
  >
    Fix Data
  </button>

            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold 
                       flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 
                       shadow-lg shadow-orange-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Pet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pets</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.total}</p>
                <p className="text-sm text-gray-500 mt-2">Registered companions</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Registered</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{stats.registered}</p>
                <p className="text-sm text-green-600 mt-2">✓ Fully registered</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Not Registered</p>
                <p className="text-4xl font-bold text-orange-500 mt-2">{stats.notRegistered}</p>
                <p className="text-sm text-orange-500 mt-2">Pending registration</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl">
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-6 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Pets Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Pets</h2>
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              {pets.length} {pets.length === 1 ? 'pet' : 'pets'} total
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
          ) : pets.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <PawPrint className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets yet</h3>
              <p className="text-gray-500 mb-6">Add your first pet to get started with the registry</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Pet</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <div key={pet._id} className="bg-white rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-200 group h-full flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <Link href={`/pages/pets/${pet._id}`} className="flex items-center space-x-3 flex-1">
                        <div className="bg-gray-100 group-hover:bg-orange-100 p-3 rounded-xl transition-colors">
                          {getSpeciesIcon(pet.species)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-500 transition-colors">
                            {pet.name}
                          </h3>
                          <p className="text-sm text-gray-500">{pet.breed || 'Mixed'}</p>
                        </div>
                      </Link>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pet.isRegistered 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {pet.isRegistered ? 'Registered' : 'Not Registered'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="font-medium text-gray-900">{pet.age ? `${pet.age} years` : 'Unknown'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gender</p>
                        <p className="font-medium text-gray-900 capitalize">{pet.gender || 'Unknown'}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <Link href={`/pages/pets/${pet._id}`} className="flex-1">
                          <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </Link>
                        
                        {pet.isRegistered ? (
                          <>
                            <button
                              onClick={() => handleViewRegistration(pet)}
                              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                            >
                              <FileText className="w-4 h-4" />
                              <span>View Reg</span>
                            </button>
                            <button
                              onClick={() => handleEditRegistration(pet)}
                              className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit Reg</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRegisterPet(pet)}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Register</span>
                          </button>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setShowDeleteConfirm({ 
                          show: true, 
                          petId: pet._id, 
                          petName: pet.name 
                        })}
                        className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Pet</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Pet Modal */}
      <AddPetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPetAdded={() => {
          loadPets();
          setIsModalOpen(false);
        }}
        token={token}
      />

      {/* Registration Form Modal */}
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
      
      // Reload pets to get updated status
      await loadPets();
      
      // Verify the registration was actually created
      try {
        const checkRegistration = await apiFetch(`/registration/${selectedPet._id}`, "GET", null, token!);
        console.log("Verification - Registration after success:", checkRegistration);
        if (!checkRegistration) {
          console.error("Warning: Registration was not created successfully!");
          // Fix the inconsistency
          await apiFetch(`/pets/${selectedPet._id}`, "PUT", { isRegistered: false }, token!);
          await loadPets();
        }
      } catch (verifyError) {
        console.error("Error verifying registration:", verifyError);
      }
    }}
    onCancel={() => {
      setShowRegistrationForm(false);
      setSelectedPet(null);
      setExistingRegistration(null);
    }}
    existingRegistration={existingRegistration}
  />
)}

      {/* View Registration Modal */}
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

      {/* Delete Pet Confirmation Modal */}
      {showDeleteConfirm.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Pet?</h2>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete {showDeleteConfirm.petName}? This action cannot be undone and will also delete all registration data.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm({ show: false, petId: '', petName: '' })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePet(showDeleteConfirm.petId)}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
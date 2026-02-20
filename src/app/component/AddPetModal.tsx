"use client";
import { useState } from "react";
import { apiFetch } from "../services/api";
import { 
  X, 
  PawPrint, 
  Dog, 
  Cat, 
  Bird, 
  Rabbit, 
  AlertCircle,
  Loader2,
  CheckCircle
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
    name: petToEdit?.name || "",
    species: petToEdit?.species || "",
    breed: petToEdit?.breed || "",
    age: petToEdit?.age || "",
    gender: petToEdit?.gender || "",
    color: petToEdit?.color || "",
    microchip: petToEdit?.microchip || "",
    notes: petToEdit?.notes || "",
    isRegistered: petToEdit?.isRegistered || false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const ageNumber = form.age ? parseInt(form.age) : undefined;
      
      const petData = {
        ...form,
        age: ageNumber
      };

      if (petToEdit) {
        await apiFetch(`/pets/${petToEdit._id}`, "PUT", petData, token!);
      } else {
        await apiFetch("/pets", "POST", petData, token!);
      }
      
      setSuccess(true);
      onPetAdded();
      setTimeout(() => {
        onClose();
        // Reset form
        setForm({
          name: "", species: "", breed: "", age: "", 
          gender: "", color: "", microchip: "", notes: "",
          isRegistered: false
        });
      }, 1000);
    } catch (err) {
      setError(petToEdit ? "Failed to update pet." : "Failed to add pet.");
    } finally {
      setLoading(false);
    }
  };

  const species = [
    { value: "dog", label: "Dog", icon: Dog },
    { value: "cat", label: "Cat", icon: Cat },
    { value: "bird", label: "Bird", icon: Bird },
    { value: "rabbit", label: "Rabbit", icon: Rabbit },
    { value: "other", label: "Other", icon: PawPrint },
  ];

  const genders = ["Male", "Female", "Unknown"];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
            onClick={onClose}
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
          {/* Pet Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="Enter pet's name"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Species <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {species.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm({ ...form, species: value })}
                  className={`p-3 border rounded-xl flex flex-col items-center space-y-1 transition-all
                    ${form.species === value 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon className={`w-6 h-6 ${form.species === value ? 'text-orange-500' : 'text-gray-500'}`} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Breed & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Breed
              </label>
              <input
                type="text"
                value={form.breed}
                onChange={(e) => setForm({ ...form, breed: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="e.g., Labrador"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="e.g., 2"
              />
            </div>
          </div>

          {/* Gender & Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
              >
                <option value="">Select gender</option>
                {genders.map(g => (
                  <option key={g} value={g.toLowerCase()}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="e.g., Brown & White"
              />
            </div>
          </div>

          {/* Microchip */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Microchip Number
            </label>
            <input
              type="text"
              value={form.microchip}
              onChange={(e) => setForm({ ...form, microchip: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              placeholder="Enter microchip number"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
              placeholder="Any special notes about your pet..."
            />
          </div>

          {/* Registration Status */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isRegistered}
                onChange={(e) => setForm({ ...form, isRegistered: e.target.checked })}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Pet is already registered</span>
            </label>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-white pt-4 flex space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !form.name || !form.species}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{petToEdit ? 'Updating...' : 'Adding...'}</span>
                </>
              ) : (
                <>
                  <PawPrint className="w-5 h-5" />
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
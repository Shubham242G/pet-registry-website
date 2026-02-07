'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function PetForm() {
  const [formData, setFormData] = useState({
    petName: '',
    breed: '',
    age: '',
    color: '',
    ownerName: '',
    ownerContact: '',
    ownerAddress: '',
    documents: [] as File[]
  });
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setPets(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, documents: files });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    
    // Convert files to base64
    const base64Docs = await Promise.all(
      formData.documents.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    );

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          documents: base64Docs
        }),
      });

      if (response.ok) {
        alert('Pet registered successfully!');
        fetchPets(); // Refresh list
        setFormData({ petName: '', breed: '', age: '', color: '', ownerName: '', ownerContact: '', ownerAddress: '', documents: [] });
      }
    } catch (error) {
      alert('Failed to register pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={() => router.back()}
          className="mb-8 px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition-all"
        >
          ← Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl border border-black/10 shadow-2xl"
          >
            <h2 className="text-4xl font-black text-black mb-12 text-center">Register Pet</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  placeholder="Pet Name"
                  value={formData.petName}
                  onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50"
                  required
                />
                <input
                  placeholder="Breed"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50"
                  required
                />
                <input
                  placeholder="Age (years)"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50"
                />
                <input
                  placeholder="Color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50"
                  required
                />
                <input
                  placeholder="Owner Contact"
                  value={formData.ownerContact}
                  onChange={(e) => setFormData({ ...formData, ownerContact: e.target.value })}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50"
                />
              </div>

              <input
                placeholder="Owner Address"
                value={formData.ownerAddress}
                onChange={(e) => setFormData({ ...formData, ownerAddress: e.target.value })}
                className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50"
              />

              {/* 5 Document Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 5 }, (_, i) => (
                  <input
                    key={i}
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl hover:border-orange-400 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    accept="image/*,.pdf"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl rounded-2xl shadow-2xl hover:from-orange-600 hover:to-orange-700 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register Pet'}
              </button>
            </form>
          </motion.div>

          {/* Pets List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl border border-black/10 shadow-2xl space-y-6"
          >
            <h3 className="text-3xl font-black text-black mb-8 text-center">Your Pets ({pets.length})</h3>
            
            {pets.length === 0 ? (
              <p className="text-center text-gray-500 text-xl py-20">No pets registered yet. Fill the form above!</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pets.map((pet: any) => (
                  <motion.div
                    key={pet._id}
                    className="p-6 border border-gray-200 rounded-2xl hover:shadow-xl transition-all group"
                  >
                    <h4 className="text-2xl font-bold text-black">{pet.petName}</h4>
                    <p className="text-lg text-gray-700">Breed: {pet.breed}</p>
                    <p className="text-lg text-gray-700">Age: {pet.age} years</p>
                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DogLiscenseForm from '../../component/DogLiscenseForm';

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<string | null>(null);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLicense, setEditingLicense] = useState<any | null>(null);

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!token || !username) {
      router.push('/');
      return;
    }

    setUser(username);
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dog-licenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLicenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this license?'
    );
    if (!confirmDelete) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dog-licenses/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLicenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (license: any) => {
    setEditingLicense(license);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingLicense(null);
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-black">
            Welcome back,{' '}
            <span className="text-orange-500">{user}</span>
          </h1>
          <p className="text-gray-600 mt-3">
            Manage your dog licenses here
          </p>
        </motion.div>

        {/* FORM VIEW */}
        {showForm ? (
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
            <DogLiscenseForm
              license={editingLicense || undefined}
              onSuccess={() => {
                setShowForm(false);
                fetchLicenses();
              }}
            />

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* NO LICENSE */}
            {licenses.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">
                  No License Found
                </h2>
                <p className="text-gray-600 mb-6">
                  You haven’t registered your dog yet.
                </p>
                <button
                  onClick={handleNew}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
                >
                  Register Dog
                </button>
              </div>
            ) : (
              <>
                {/* LICENSE LIST */}
                <div className="grid md:grid-cols-2 gap-8">
                  {licenses.map((license) => (
                    <div
                      key={license._id}
                      className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {license.dogName || 'Dog License'}
                      </h3>

                      <p className="text-sm text-gray-600 mb-2">
                        Status:{' '}
                        <span className="font-semibold">
                          {license.status || 'Pending'}
                        </span>
                      </p>

                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={() => handleEdit(license)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(license._id)
                          }
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ADD NEW */}
                <div className="text-center mt-12">
                  <button
                    onClick={handleNew}
                    className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
                  >
                    Add Another License
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* LOGOUT */}
        <div className="text-center mt-16">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

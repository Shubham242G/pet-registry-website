"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../component/context/AuthContext";
import AddPetModal from "../component/AddPetModal";
import { Suspense } from "react";

function AddPetContent() {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && token) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated, token]);

  const handleClose = () => {
    setIsModalOpen(false);
    router.push("/dashboard");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E8600A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <AddPetModal
      isOpen={isModalOpen}
      onClose={handleClose}
      token={token}
      petToEdit={null}
      resumePetId={null}
    />
  );
}

export default function AddPetPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E8600A] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AddPetContent />
    </Suspense>
  );
}
"use client";
import { useState, useEffect } from "react";
import {
  PawPrint,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Upload,
  Trash2,
  FileText,
  Image as ImageIcon,
  FileCheck,
  Send,
  RefreshCw,
  Info,
  Eye
} from "lucide-react";
import PaymentButton from './PaymentButton';
import { useRouter } from 'next/navigation';
import { useAuth } from "./context/AuthContext";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<any>(null);
  const [triggeringRegistration, setTriggeringRegistration] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingRegistration, setPendingRegistration] = useState<{ 
    petId: string; 
    petName: string;
    action: 'auto' | 'manual';
  } | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const router = useRouter();
  const { user } = useAuth();

  // Get registration amount based on user's city
  const getRegistrationAmount = () => {
    if (!user) return 999;
    // Check if user city is ghaziabad (case insensitive)
    const isGhaziabad = user.city?.toLowerCase() === 'ghaziabad';
    return isGhaziabad ? 1499 : 999;
  };

  const [registrationAmount, setRegistrationAmount] = useState(getRegistrationAmount());

  // Update amount when user changes
  useEffect(() => {
    const newAmount = getRegistrationAmount();
    console.log("User city:", user?.city);
    console.log("Registration amount:", newAmount);
    setRegistrationAmount(newAmount);
  }, [user]);

  // Document configuration
  const documents = [
    { 
      name: 'antiRabiesCertificate', 
      label: 'Anti-Rabies Certificate',
      icon: FileText,
      accept: '.pdf,image/*',
      description: 'Upload your pet\'s anti-rabies vaccination certificate'
    },
    { 
      name: 'idProof', 
      label: 'ID Proof',
      icon: FileText,
      accept: '.pdf,image/*',
      description: 'Aadhar card, Passport, or any government ID'
    },
    { 
      name: 'residenceProof', 
      label: 'Residence Proof',
      icon: FileText,
      accept: '.pdf,image/*',
      description: 'Electricity bill, Rental agreement, or any address proof'
    },
    { 
      name: 'ownerWithPetPhoto', 
      label: 'Owner with Pet Photo',
      icon: ImageIcon,
      accept: 'image/*',
      description: 'Recent photo of owner with the pet'
    }
  ];

  // Fetch registration status
  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/registration/${petId}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegistrationStatus(data);
        
        if (data.paymentStatus === 'completed') {
          setPaymentCompleted(true);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch status');
      }
    } catch (err) {
      console.error('Error fetching status:', err);
      setError('Failed to load registration status');
    }
  };

  useEffect(() => {
    if (petId && token) {
      fetchStatus();
    }
  }, [petId, token]);

  // Handle file upload with Base64
  const handleFileUpload = async (file: File, documentName: string) => {
    if (!file) return;
    
    setUploading(true);
    setError("");
    setSuccess("");
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      try {
        const response = await fetch(`${API_BASE}/registration/${petId}/documents`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            documentName: documentName,
            fileData: base64String,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setSuccess(data.message);
          await fetchStatus();
          
          if (data.hasAllDocuments) {
            if (paymentCompleted) {
              setSuccess('All documents uploaded! Completing registration...');
              await actuallyTriggerRegistration();
            } else {
              setSuccess('🎉 All documents uploaded! Please complete payment to finish registration.');
              setPendingRegistration({
                petId: petId,
                petName: petName,
                action: 'auto'
              });
              setShowPaymentModal(true);
            }
          }
        } else {
          setError(data.message || 'Upload failed');
        }
      } catch (err) {
        console.error('Upload error:', err);
        setError('Failed to upload document');
      } finally {
        setUploading(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  // Handle document deletion
  const handleDeleteDocument = async (documentName: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE}/registration/${petId}/documents/${documentName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Document deleted successfully');
        await fetchStatus();
      } else {
        setError(data.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete document');
    } finally {
      setLoading(false);
    }
  };

  // Actually trigger registration after payment success
  const actuallyTriggerRegistration = async () => {
    setTriggeringRegistration(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE}/registration/${petId}/trigger-registration`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          paymentVerified: true,
          paidAmount: registrationAmount,
          city: user?.city
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message || 'Registration completed successfully!');
        setFormSubmitted(true);
        await fetchStatus();
        
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError(data.message || 'Failed to complete registration');
      }
    } catch (err) {
      console.error('Trigger error:', err);
      setError('Failed to complete registration process. Please contact support.');
    } finally {
      setTriggeringRegistration(false);
    }
  };

  // Handle payment success callback
  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    setPaymentCompleted(true);
    
    if (registrationStatus?.hasAllDocuments) {
      setSuccess('Payment successful! Completing registration...');
      await actuallyTriggerRegistration();
    } else {
      setSuccess('Payment successful! Please upload remaining documents to complete registration.');
      await fetchStatus();
    }
  };

  // Show payment modal before triggering registration
  const handleTriggerRegistration = async () => {
    if (paymentCompleted) {
      await actuallyTriggerRegistration();
      return;
    }
    
    setPendingRegistration({
      petId: petId,
      petName: petName,
      action: 'manual'
    });
    setShowPaymentModal(true);
  };

  // Handle view document
  const handleViewDocument = (fileData: string, mimeType: string) => {
    const byteCharacters = atob(fileData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  };

  // Check if document is uploaded
  const isDocumentUploaded = (documentName: string) => {
    return registrationStatus?.documents?.some((doc: any) => doc.documentName === documentName) || false;
  };

  // Get document details
  const getDocument = (documentName: string) => {
    return registrationStatus?.documents?.find((doc: any) => doc.documentName === documentName);
  };

  const uploadedCount = registrationStatus?.uploadedDocumentsCount || 0;
  const totalRequired = 4;
  const hasAllDocuments = registrationStatus?.hasAllDocuments || false;
  const registrationTriggered = registrationStatus?.registrationTriggered || false;

  if (formSubmitted || (registrationTriggered && !viewOnly)) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h2>
          <p className="text-gray-600 mb-6">
            Your pet registration has been successfully submitted. You will receive the license within 7-10 business days.
          </p>
          <button
            onClick={onSuccess}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {viewOnly ? 'Registration Details' : 'Complete Registration'}
              </h2>
              <p className="text-sm text-gray-500">
                {petName} • {uploadedCount}/{totalRequired} Documents Uploaded
                {paymentCompleted && <span className="ml-2 text-green-600">• Payment Done ✓</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!viewOnly && (
              <button 
                onClick={fetchStatus} 
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh status"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={onCancel} 
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="px-6 pt-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Registration Progress</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {hasAllDocuments 
                    ? registrationTriggered 
                      ? "✅ Registration completed successfully!" 
                      : paymentCompleted
                        ? "🎉 All documents uploaded and payment done! Ready to submit."
                        : "🎉 All documents uploaded! Payment required to complete."
                    : `📄 ${uploadedCount} out of ${totalRequired} documents uploaded`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">{uploadedCount}</div>
                <div className="text-sm text-gray-500">of {totalRequired}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(uploadedCount / totalRequired) * 100}%` }}
              />
            </div>

            {/* Status Message */}
            {hasAllDocuments && !registrationTriggered && !viewOnly && (
              <div className="mt-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5" />
                  <span className="font-medium">
                    {paymentCompleted 
                      ? "All ready! Click below to complete registration." 
                      : `All documents uploaded! Payment of ₹${registrationAmount} required to complete registration.`}
                  </span>
                </div>
                <button
                  onClick={handleTriggerRegistration}
                  disabled={triggeringRegistration}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {triggeringRegistration ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Processing...</span></>
                  ) : (
                    <><Send className="w-4 h-4" /><span>{paymentCompleted ? "Complete Registration →" : `Pay ₹${registrationAmount} & Submit`}</span></>
                  )}
                </button>
              </div>
            )}

            {registrationTriggered && (
              <div className="mt-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Registration submitted on {registrationStatus.registrationTriggeredAt ? new Date(registrationStatus.registrationTriggeredAt).toLocaleDateString() : 'recently'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price Display based on User's City */}
        <div className="mx-6 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Registration Fee</h3>
              <p className="text-sm text-gray-600">
                Based on your registered city: <strong>{user?.city === 'ghaziabad' ? 'Ghaziabad' : (user?.city ? user.city.charAt(0).toUpperCase() + user.city.slice(1) : 'Standard')}</strong>
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-600">₹{registrationAmount}</p>
              {registrationAmount === 1499 && (
                <p className="text-xs text-green-600">Special Ghaziabad pricing applied</p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            One-time payment for lifetime registration. This fee applies to each pet you register.
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        )}

        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Document Upload Cards */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-orange-500" />
            Required Documents
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => {
              const uploaded = isDocumentUploaded(doc.name);
              const documentData = getDocument(doc.name);
              const DocIcon = doc.icon;
              
              return (
                <div key={doc.name} className="border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${uploaded ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <DocIcon className={`w-5 h-5 ${uploaded ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{doc.label}</h4>
                        <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                      </div>
                    </div>
                    {uploaded && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>

                  {uploaded && documentData ? (
                    <div className="mt-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            <FileCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700 truncate max-w-[150px]">
                              {documentData.fileName}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewDocument(documentData.fileData, documentData.mimeType)}
                              className="text-blue-600 hover:text-blue-700 p-1 transition-colors"
                              title="View document"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {!viewOnly && !registrationTriggered && (
                              <button
                                onClick={() => handleDeleteDocument(doc.name)}
                                disabled={loading}
                                className="text-red-600 hover:text-red-700 p-1 transition-colors disabled:opacity-50"
                                title="Delete document"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {(documentData.fileSize / 1024).toFixed(2)} KB • Uploaded on {new Date(documentData.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    !viewOnly && !registrationTriggered && (
                      <label className="mt-3 border-2 border-dashed rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all hover:border-orange-500 hover:bg-orange-50">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500 mt-2">Click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">{doc.accept.includes('pdf') ? 'PDF or Image' : 'Image'} (Max 5MB)</span>
                        <input 
                          type="file" 
                          accept={doc.accept}
                          className="hidden" 
                          disabled={uploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              await handleFileUpload(file, doc.name);
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>
                    )
                  )}

                  {viewOnly && !uploaded && (
                    <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500">Document not uploaded</p>
                    </div>
                  )}

                  {!viewOnly && registrationTriggered && !uploaded && (
                    <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-orange-600">Registration already submitted. Document cannot be uploaded.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Municipal OTP Warning Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="3" fill="white" stroke="none"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-orange-800 text-sm">You'll receive an OTP from your Municipal Corporation</h4>
                <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                  After submission, the Municipal Corporation will send a verification OTP to your registered number.{' '}
                  <span className="font-bold text-orange-800">You must share this OTP with Tailio on WhatsApp only</span>{' '}
                  — never share it via email, SMS or any other channel. This is the final step to confirm your pet's registration.
                </p>
                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-[#25D366] rounded-full">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M12.032 2.002c-5.523 0-10 4.477-10 10 0 1.752.453 3.476 1.312 4.987L2 22l5.144-1.281c1.462.781 3.112 1.199 4.803 1.199 5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
                  </svg>
                  <span className="text-white text-xs font-semibold">Share only on Tailio's WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

        
          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {viewOnly ? 'Close' : 'Cancel'}
            </button>
            {!viewOnly && hasAllDocuments && !registrationTriggered && (
              <button
                onClick={handleTriggerRegistration}
                disabled={triggeringRegistration}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {triggeringRegistration ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /><span>Processing...</span></>
                ) : (
                  <><Send className="w-5 h-5" /><span>{paymentCompleted ? "Complete Registration" : `Pay ₹${registrationAmount} & Submit Registration`}</span></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {uploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
            <p className="text-gray-700 font-medium">Uploading document...</p>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && pendingRegistration && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[80] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">💳</div>
              <h3 className="text-xl font-bold text-gray-900">Complete Registration</h3>
              <p className="text-gray-600 mt-2">
                Pay <span className="text-xl font-bold text-orange-600">₹{registrationAmount}</span> to complete registration for <strong>{pendingRegistration.petName}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                One-time payment for lifetime registration
              </p>
              {registrationAmount === 1499 && (
                <p className="text-xs text-green-600 mt-1 bg-green-50 p-1 rounded">
                  ✨ Ghaziabad registration pricing applied
                </p>
              )}
            </div>
            
            <PaymentButton
              petId={pendingRegistration.petId}
              petName={pendingRegistration.petName}
              amount={registrationAmount}
              onSuccess={handlePaymentSuccess}
              onFailure={(error) => {
                setError(`Payment failed: ${error}. Please try again.`);
                setShowPaymentModal(false);
                setTimeout(() => setError(""), 5000);
              }}
            />
            
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setPendingRegistration(null);
              }}
              className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700 text-center"
            >
              Cancel (You can pay later from dashboard)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
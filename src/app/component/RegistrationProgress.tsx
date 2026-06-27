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
  
  // ✅ NEW: State for tag delivery
  const [tagDeliveryOption, setTagDeliveryOption] = useState<'collect_from_municipal' | 'deliver_to_home'>('collect_from_municipal');
  const [tagDeliveryCost, setTagDeliveryCost] = useState(0);
  const [petCity, setPetCity] = useState<string>('');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

  // ✅ NEW: Check if sterilization is required for Gurgaon pets
  const isSterilizationRequired = () => {
    if (!registrationStatus?.pet) return false;
    const pet = registrationStatus.pet;
    if (pet.city !== 'gurgaon') return false;
    const ageInYears = (pet.ageYears || 0) + (pet.ageMonths || 0) / 12;
    return ageInYears >= 4;
  };

  // ✅ NEW: Get required documents including sterilization if needed
  const getRequiredDocs = () => {
    const docs = [...documents];
    if (isSterilizationRequired()) {
      docs.push({
        name: 'sterilizationCertificate',
        label: 'Sterilization Certificate',
        icon: FileText,
        accept: '.pdf,image/*',
        description: 'Mandatory for Gurgaon pets aged 4+ years'
      });
    }
    return docs;
  };

  const requiredDocs = getRequiredDocs();

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
        // ✅ Store pet city for tag delivery
        if (data.pet && data.pet.city) {
          setPetCity(data.pet.city);
          // Restore tag delivery option if exists
          if (data.pet.tagDelivery) {
            setTagDeliveryOption(data.pet.tagDelivery.option || 'collect_from_municipal');
            setTagDeliveryCost(data.pet.tagDelivery.cost || 0);
          }
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

  // ✅ NEW: Calculate total amount including tag delivery
  const getTotalAmount = () => {
    const baseAmount = 999; // Base registration fee
    let total = baseAmount;
    
    // Add tag delivery cost if applicable
    if (tagDeliveryOption === 'deliver_to_home') {
      const isGhaziabad = petCity === 'ghaziabad';
      const tagCost = isGhaziabad ? 1850 : 1200;
      total += tagCost;
    }
    
    return total;
  };

  // Handle file upload with Base64
  const handleFileUpload = async (file: File, documentName: string) => {
    if (!file) return;
    
    setUploading(true);
    setError("");
    setSuccess("");
    
    // Convert file to Base64
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
          
          if (data.registrationTriggered) {
            setSuccess('🎉 Congratulations! All documents uploaded!');
            // Show payment modal instead of auto-submitting
            setPendingRegistration({
              petId: petId,
              petName: petName,
              action: 'auto'
            });
            setShowPaymentModal(true);
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

  // Show payment modal before triggering registration
  const handleTriggerRegistration = async () => {
    // Show payment modal before triggering registration
    setPendingRegistration({
      petId: petId,
      petName: petName,
      action: 'manual'
    });
    setShowPaymentModal(true);
  };

  // Actually trigger registration after payment success
  const actuallyTriggerRegistration = async () => {
    setTriggeringRegistration(true);
    setError("");
    
    try {
      const totalAmount = getTotalAmount();
      const response = await fetch(`${API_BASE}/registration/${petId}/trigger-registration`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentVerified: true,
          paidAmount: totalAmount,
          tagDeliveryOption: tagDeliveryOption,
          tagDeliveryCost: tagDeliveryCost,
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message);
        setFormSubmitted(true);
        await fetchStatus();
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError(data.message || 'Failed to trigger registration');
      }
    } catch (err) {
      console.error('Trigger error:', err);
      setError('Failed to trigger registration process');
    } finally {
      setTriggeringRegistration(false);
    }
  };

  // Handle view document
  const handleViewDocument = (fileData: string, mimeType: string) => {
    // Create a blob from base64 and open in new tab
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
  const totalRequired = requiredDocs.length;
  const hasAllDocuments = uploadedCount === totalRequired;
  const registrationTriggered = registrationStatus?.registrationTriggered || false;

  // If form is submitted successfully, show success message
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
                      : "🎉 All documents uploaded! Ready to submit."
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

            {/* ✅ NEW: Tag Delivery Option */}
            {hasAllDocuments && !registrationTriggered && !viewOnly && petCity && ['gurgaon', 'ghaziabad', 'delhi', 'noida'].includes(petCity) && (
              <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">📦 Tag Delivery Option</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="tagDelivery"
                      value="collect_from_municipal"
                      checked={tagDeliveryOption === 'collect_from_municipal'}
                      onChange={() => {
                        setTagDeliveryOption('collect_from_municipal');
                        setTagDeliveryCost(0);
                      }}
                      className="w-4 h-4 text-orange-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Collect from Municipal Office</p>
                      <p className="text-xs text-gray-500">Free · Pick up at your convenience</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="tagDelivery"
                      value="deliver_to_home"
                      checked={tagDeliveryOption === 'deliver_to_home'}
                      onChange={() => {
                        const isGhaziabad = petCity === 'ghaziabad';
                        const cost = isGhaziabad ? 1850 : 1200;
                        setTagDeliveryOption('deliver_to_home');
                        setTagDeliveryCost(cost);
                      }}
                      className="w-4 h-4 text-orange-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Deliver to Home 
                        <span className="text-orange-600 font-bold ml-2">
                          ₹{petCity === 'ghaziabad' ? '1,850' : '1,200'}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">Get it delivered to your doorstep</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Status Message */}
            {hasAllDocuments && !registrationTriggered && !viewOnly && (
              <div className="mt-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5" />
                  <span className="font-medium">All documents uploaded! Ready to submit.</span>
                </div>
                <button
                  onClick={handleTriggerRegistration}
                  disabled={triggeringRegistration}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {triggeringRegistration ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Processing...</span></>
                  ) : (
                    <><Send className="w-4 h-4" /><span>Pay ₹{getTotalAmount()} & Submit</span></>
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
            {requiredDocs.map((doc) => {
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
                      <label className={`mt-3 border-2 border-dashed rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all hover:border-orange-500 hover:bg-orange-50`}>
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
                            e.target.value = ''; // Reset input
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

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>All {totalRequired} documents are required to complete the registration process</li>
                  {isSterilizationRequired() && (
                    <li className="text-orange-700 font-medium">⚠️ Sterilization certificate is required for Gurgaon pets aged 4+ years</li>
                  )}
                  <li>Documents can be uploaded in any order and can be replaced before submission</li>
                  <li>Once registration is submitted, documents cannot be modified</li>
                  <li>Payment of ₹{getTotalAmount()} is required to complete registration</li>
                  <li>You can also manually submit after uploading all documents</li>
                </ul>
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
                  <><Send className="w-5 h-5" /><span>Pay ₹{getTotalAmount()} & Submit Registration</span></>
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
                Pay ₹{getTotalAmount()} to complete registration for <strong>{pendingRegistration.petName}</strong>
              </p>
              {tagDeliveryOption === 'deliver_to_home' && (
                <p className="text-xs text-orange-600 mt-1">
                  + ₹{tagDeliveryCost} for tag delivery
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                One-time payment for lifetime registration
              </p>
            </div>
            
            <PaymentButton
              petId={pendingRegistration.petId}
              petName={pendingRegistration.petName}
              amount={getTotalAmount()}
              tagDeliveryOption={tagDeliveryOption}
              tagDeliveryCost={tagDeliveryCost}
              onSuccess={() => {
                setShowPaymentModal(false);
                // After payment success, trigger the registration
                actuallyTriggerRegistration();
              }}
              onFailure={(error) => {
                setError(`Payment failed: ${error}. Please try again.`);
                setShowPaymentModal(false);
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
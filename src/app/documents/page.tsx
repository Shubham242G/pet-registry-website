"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../component/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../component/Sidebar";
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Trash2,
  ChevronDown,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  File,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  FileCode,
  FileIcon as FilePdf
} from "lucide-react";

// Import the same bottom navigation component from Sidebar
// Since the Sidebar component exports its own mobile bottom nav,
// we need to either extract it or re-create it here

// Mobile Bottom Navigation Component
function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Documents", icon: FileText, href: "/documents" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ background: '#2C1A0E', borderTop: '1px solid rgba(232,96,10,0.3)' }}>
      <div className="flex justify-around items-center px-4 py-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all"
              style={{
                backgroundColor: isActive ? '#E8600A' : 'transparent',
                color: isActive ? 'white' : '#E8600A',
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all"
          style={{ color: '#E8600A' }}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

// Don't forget to import missing dependencies
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  category: "vaccination" | "medical" | "registration" | "identification" | "other";
  uploadDate: string;
  expiryDate?: string;
  status: "approved" | "pending" | "rejected";
  url: string;
  fileType: string;
  fileSize: number;
  petId: string;
  petName: string;
  rejectionReason?: string;
}

export default function DocumentsPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDocuments();
      fetchPets();
    }
  }, [isAuthenticated]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }
      
      const petsData = await response.json();
      
      if (!petsData || petsData.length === 0) {
        setDocuments([]);
        return;
      }
      
      const documentsList: Document[] = [];
      
      petsData.forEach((pet: any) => {
        documentsList.push({
          id: pet._id,
          name: `${pet.name} - Profile`,
          type: "Pet Profile",
          category: "identification",
          uploadDate: pet.createdAt ? new Date(pet.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          expiryDate: undefined,
          status: pet.registrationStatus === "completed" ? "approved" : "pending",
          url: "#",
          fileType: "profile",
          fileSize: 0,
          petId: pet._id,
          petName: pet.name,
        });
        
        if (pet.registrationNumber) {
          documentsList.push({
            id: `${pet._id}_reg`,
            name: `${pet.name} - Registration Certificate`,
            type: "Registration",
            category: "registration",
            uploadDate: pet.registrationDate || (pet.createdAt ? new Date(pet.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
            expiryDate: pet.registrationExpiry,
            status: "approved",
            url: "#",
            fileType: "pdf",
            fileSize: 0,
            petId: pet._id,
            petName: pet.name,
          });
        }
      });
      
      const storedDocs = localStorage.getItem("user_documents");
      if (storedDocs) {
        const localDocs = JSON.parse(storedDocs);
        documentsList.push(...localDocs);
      }
      
      setDocuments(documentsList);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      const storedDocs = localStorage.getItem("user_documents");
      let allDocs = storedDocs ? JSON.parse(storedDocs) : [];
      
      const selectedPet = pets.find(p => p._id === selectedPetId);
      
      const newDocument = {
        id: Date.now().toString(),
        name: documentName,
        type: documentType,
        category: documentType as "vaccination" | "medical" | "registration" | "identification" | "other",
        uploadDate: new Date().toISOString().split('T')[0],
        status: "pending" as "approved" | "pending" | "rejected",
        petId: selectedPetId,
        petName: selectedPet?.name || "Unknown",
        fileType: file?.type || "unknown",
        fileSize: file?.size || 0,
        url: "#",
      };
      
      allDocs.push(newDocument);
      localStorage.setItem("user_documents", JSON.stringify(allDocs));
      
      setDocuments(prev => [...prev, newDocument]);
      
      setShowUploadModal(false);
      alert("Document uploaded successfully!");
      
      setSelectedPetId("");
      setDocumentType("");
      setDocumentName("");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FilePdf className="w-6 h-6 md:w-8 md:h-8 text-red-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />;
      case "doc":
      case "docx":
        return <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="w-6 h-6 md:w-8 md:h-8 text-green-600" />;
      case "zip":
      case "rar":
        return <FileArchive className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />;
      case "json":
      case "xml":
        return <FileCode className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />;
      default:
        return <File className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />;
      case "pending":
        return <Clock className="w-3 h-3 md:w-4 md:h-4" />;
      case "rejected":
        return <XCircle className="w-3 h-3 md:w-4 md:h-4" />;
      default:
        return <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      vaccination: "Vaccination",
      medical: "Medical",
      registration: "Registration",
      identification: "Identification",
      other: "Other",
    };
    return labels[category] || category;
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.petName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: documents.length,
    approved: documents.filter(d => d.status === "approved").length,
    pending: documents.filter(d => d.status === "pending").length,
    rejected: documents.filter(d => d.status === "rejected").length,
    expiringSoon: documents.filter(d => isExpiringSoon(d.expiryDate)).length,
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FF8C42] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Nunito'] pb-16 md:pb-0">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Documents</h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Manage all your pet's important documents in one place
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#e07a2e] transition text-sm md:text-base w-full sm:w-auto justify-center"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          </div>

          {/* Stats Cards - Responsive grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <FileText className="w-5 h-5 md:w-8 md:h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Approved</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="w-5 h-5 md:w-8 md:h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Pending</p>
                  <p className="text-xl md:text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-5 h-5 md:w-8 md:h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Rejected</p>
                  <p className="text-xl md:text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="w-5 h-5 md:w-8 md:h-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 col-span-2 md:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600">{stats.expiringSoon}</p>
                </div>
                <AlertCircle className="w-5 h-5 md:w-8 md:h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Filters - Stack on mobile */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="flex-1 min-w-[180px] md:min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42]"
                  />
                </div>
              </div>

              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] bg-white cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="medical">Medical</option>
                  <option value="registration">Registration</option>
                  <option value="identification">Identification</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42] bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {(searchTerm || selectedCategory !== "all" || selectedStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition text-sm"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Documents List */}
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
              <FileText className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                {documents.length === 0 
                  ? "You haven't uploaded any documents yet." 
                  : "Try adjusting your search or filters."}
              </p>
              {documents.length === 0 && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#e07a2e] transition text-sm md:text-base"
                >
                  Upload Your First Document
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="flex items-start gap-3 md:gap-4 w-full sm:w-auto">
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.fileType)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                          {doc.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-gray-600 mb-2">
                          <span>🐾 {doc.petName}</span>
                          <span>📄 {getCategoryLabel(doc.category)}</span>
                          <span>📅 {formatDate(doc.uploadDate)}</span>
                          {doc.fileSize > 0 && <span>💾 {formatFileSize(doc.fileSize)}</span>}
                        </div>
                        {doc.expiryDate && (
                          <div className={`text-xs md:text-sm ${isExpired(doc.expiryDate) ? "text-red-600" : isExpiringSoon(doc.expiryDate) ? "text-orange-600" : "text-gray-500"}`}>
                            {isExpired(doc.expiryDate) ? (
                              <>⚠️ Expired on {formatDate(doc.expiryDate)}</>
                            ) : isExpiringSoon(doc.expiryDate) ? (
                              <>⏰ Expires on {formatDate(doc.expiryDate)}</>
                            ) : (
                              <>📅 Expires: {formatDate(doc.expiryDate)}</>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] md:text-xs font-medium rounded-full ${getStatusColor(doc.status)} flex-shrink-0`}>
                        {getStatusIcon(doc.status)}
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedDocument(doc);
                          setShowPreview(true);
                        }}
                        className="p-1.5 md:p-2 text-gray-600 hover:text-[#FF8C42] transition rounded-lg hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 md:p-2 text-gray-600 hover:text-[#FF8C42] transition rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 md:p-2 text-gray-600 hover:text-red-600 transition rounded-lg hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Preview Modal - Responsive */}
      {showPreview && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-[95%] md:max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-3 md:p-4 border-b">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 truncate">{selectedDocument.name}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 md:p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                  {getFileIcon(selectedDocument.fileType)}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-medium text-gray-900 text-sm md:text-base">{selectedDocument.name}</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {selectedDocument.fileSize > 0 && formatFileSize(selectedDocument.fileSize)} • {selectedDocument.fileType.toUpperCase()}
                    </p>
                  </div>
                  <button className="px-3 md:px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#e07a2e] transition text-sm">
                    Download
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Pet Name</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">{selectedDocument.petName}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Category</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">{getCategoryLabel(selectedDocument.category)}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Upload Date</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">{formatDate(selectedDocument.uploadDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedDocument.status)}`}>
                      {getStatusIcon(selectedDocument.status)}
                      {selectedDocument.status.charAt(0).toUpperCase() + selectedDocument.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 md:gap-3 p-3 md:p-4 border-t">
              <button
                onClick={() => setShowPreview(false)}
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm"
              >
                Close
              </button>
              <button className="px-3 md:px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#e07a2e] transition text-sm">
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal - Responsive */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-[95%] md:max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-3 md:p-4 border-b sticky top-0 bg-white">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">Upload Document</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Pet
                  </label>
                  <select
                    value={selectedPetId}
                    onChange={(e) => setSelectedPetId(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42]"
                    required
                  >
                    <option value="">Select a pet...</option>
                    {pets.map((pet: any) => (
                      <option key={pet._id} value={pet._id}>
                        {pet.name} ({pet.breed || "Pet"})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Name
                  </label>
                  <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="e.g., Rabies Vaccination Certificate"
                    className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C42]"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="vaccination">Vaccination Record</option>
                    <option value="medical">Medical Report</option>
                    <option value="registration">Registration Certificate</option>
                    <option value="identification">Identification</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-[#FF8C42] transition cursor-pointer"
                    onClick={() => document.getElementById("fileInput")?.click()}
                  >
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs md:text-sm text-gray-600">
                      {file ? file.name : "Click to select file"}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#e07a2e] transition disabled:opacity-50 text-sm md:text-base"
                >
                  {uploading ? "Uploading..." : "Upload Document"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Pet Types
export interface PetBasicInfo {
  name: string;
  breed: string;
  gender: 'Male' | 'Female';
  ageYears?: number;
  ageMonths?: number;
  color?: string;
  dateOfBirth?: string;
  microchipNumber?: string;
}

export interface ApplicantInfo {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  mobile?: string;
  phoneLandline?: string;
}

export interface AddressInfo {
  plotHouseNo?: string;
  colony?: string;
  ward?: string;
  zone?: string;
  colour?: string;
  word?: string;
}

export interface VaccinationInfo {
  lastVaccinationDate?: string;
  validUpTo?: string;
  certificateNumber?: string;
  certificateDate?: string;
  veterinaryName?: string;
  councilName?: string;
  doctorRegNumber?: string;
  doctorMobile?: string;
}

export interface PetPhotos {
  dogPhoto?: string;
  dogPhotoType?: string;
  dogWithOwnerPhoto?: string;
  dogWithOwnerPhotoType?: string;
}

export interface PetDocuments {
  vaccinationCertificate?: string;
  vaccinationCertificateName?: string;
  idProof?: string;
  idProofName?: string;
  residenceProof?: string;
  residenceProofName?: string;
  applicantWithDogPhoto?: string;
  applicantWithDogPhotoName?: string;
}

export interface LicenseInfo {
  applicationId?: string;
  licenseNumber?: string;
  submittedAt?: string;
  approvedAt?: string;
  validFrom?: string;
  validUntil?: string;
  tokenCardNumber?: string;
}

export interface Pet {
  _id: string;
  userId: string;
  basicInfo: PetBasicInfo;
  applicant?: ApplicantInfo;
  address?: AddressInfo;
  photos?: PetPhotos;
  vaccination?: VaccinationInfo;
  documents?: PetDocuments;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  licenseInfo?: LicenseInfo;
  declarationAccepted?: boolean;
  createdAt: string;
  updatedAt: string;
  // Virtual fields
  displayAge?: string;
}

// Form Types
export interface PetFormData {
  basicInfo: Partial<PetBasicInfo>;
  applicant: Partial<ApplicantInfo>;
  address: Partial<AddressInfo>;
  photos: Partial<PetPhotos>;
  vaccination: Partial<VaccinationInfo>;
  documents: Partial<PetDocuments>;
  declarationAccepted: boolean;
  status: Pet['status'];
}

// API Response Types
export interface ApiResponse<T = any> {
  user(user: any): unknown;
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: Omit<User, 'password'>;
}

export interface PetsResponse {
  success: boolean;
  count: number;
  pets: Pet[];
}

export interface PetResponse {
  message: string;
  success: boolean;
  pet: Pet;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  register: (userData: RegisterData) => Promise<RegisterResult>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  message?: string;
}

export interface RegisterResult {
  success: boolean;
  user?: User;
  message?: string;
}

// File Upload Types
export interface FileUploadResult {
  base64: string;
  type: string;
  name: string;
  size: number;
}
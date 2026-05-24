"use client";
import { CheckCircle, Clock, FileText, Award, Send } from "lucide-react";

interface RegistrationProgressProps {
  currentStage: number; // 0-4
  uploadedDocumentsCount: number;
  totalDocuments: number;
  registrationTriggered?: boolean;
}

export default function RegistrationProgress({ 
  currentStage, 
  uploadedDocumentsCount, 
  totalDocuments,
  registrationTriggered 
}: RegistrationProgressProps) {
  
  const stages = [
    { 
      stage: 0, 
      label: "Not Started", 
      description: "Registration not initiated",
      icon: FileText,
      requirement: "No documents uploaded"
    },
    { 
      stage: 1, 
      label: "Documents Uploaded", 
      description: "All 4 documents uploaded",
      icon: FileText,
      requirement: "Upload all 4 documents"
    },
    { 
      stage: 2, 
      label: "Form Submitted", 
      description: "Registration form completed",
      icon: Send,
      requirement: "Submit registration form"
    },
    { 
      stage: 3, 
      label: "Awaiting License", 
      description: "License being processed",
      icon: Clock,
      requirement: "Verification in progress"
    },
    { 
      stage: 4, 
      label: "License Delivered", 
      description: "Registration complete",
      icon: Award,
      requirement: "License issued"
    }
  ];

  const getStageStatus = (stage: number) => {
    if (currentStage > stage) return 'completed';
    if (currentStage === stage) return 'current';
    return 'pending';
  };

  const getStageColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-orange-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Registration Progress</h3>
      
      {/* Document Upload Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Documents Uploaded</span>
          <span className="font-medium text-gray-900">{uploadedDocumentsCount}/{totalDocuments}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(uploadedDocumentsCount / totalDocuments) * 100}%` }}
          />
        </div>
      </div>

      {/* Stage Progress */}
      <div className="relative">
        {/* Connecting lines */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div 
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${(currentStage / 4) * 100}%` }}
          />
        </div>
        
        {/* Stages */}
        <div className="relative z-10 flex justify-between">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage.stage);
            const StageIcon = stage.icon;
            
            return (
              <div key={stage.stage} className="flex flex-col items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all
                  ${status === 'completed' ? 'bg-green-500 text-white' : ''}
                  ${status === 'current' ? 'bg-orange-500 text-white ring-4 ring-orange-100' : ''}
                  ${status === 'pending' ? 'bg-gray-200 text-gray-400' : ''}
                `}>
                  {status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <StageIcon className="w-5 h-5" />
                  )}
                </div>
                <div className="text-center mt-2">
                  <p className={`text-xs font-medium ${status === 'current' ? 'text-orange-600' : 'text-gray-600'}`}>
                    {stage.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 hidden md:block">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Status Message */}
      <div className="mt-6 p-3 bg-orange-50 rounded-lg">
        <p className="text-sm text-orange-800">
          {currentStage === 0 && (
            <>📄 Start by uploading the 4 required documents to begin registration</>
          )}
          {currentStage === 1 && (
            <>✅ All documents uploaded! Complete the registration form to submit</>
          )}
          {currentStage === 2 && (
            <>📋 Registration form submitted! Your application is being processed</>
          )}
          {currentStage === 3 && (
            <>⏳ License is being processed. You will receive it within 7-10 business days</>
          )}
          {currentStage === 4 && (
            <>🎉 Congratulations! Your pet is officially registered. License has been delivered</>
          )}
        </p>
      </div>
    </div>
  );
}
"use client";

import { EditIcon, PawPrintIcon, TrashIcon } from "lucide-react";

const F = {
  fraunces: "'Fraunces', Georgia, serif",
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
};

interface PetCardProps {
  pet: {
    _id: string;
    name: string;
    species?: string;
    ageYears?: number;
    ageMonths?: number;
    gender: string;
    profilePicture?: string;
    registrationStage: number;
    registrationStatus: string;
    uploadedDocumentsCount?: number;
    requiredDocumentsCount?: number;
    hasAllDocuments?: boolean;
    registrationTriggered?: boolean;
    createdAt: string;
    updatedAt: string;
    city?: string;
    isSterilizationRequired?: boolean;
  };
  onEdit: (pet: any) => void;
  onContinue: (petId: string) => void;
  onDelete: (petId: string, petName: string) => void;
}

function getDisplayStage(pet: PetCardProps['pet']): { label: string; step: number; color: string } {
  if (pet.registrationStage === 4)
    return { label: "License Received", step: 3, color: "#1A6B3A" };
  if (pet.registrationStage >= 2)
    return { label: "Registration Requested", step: 2, color: "#E8600A" };
  return { label: "Filling Form", step: 1, color: "#E8600A" };
}

function RegistrationProgressBar({ pet }: { pet: PetCardProps['pet'] }) {
  const { step } = getDisplayStage(pet);
  const stages = ["Filling Form", "Registration Requested", "License Received"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {stages.map((label, i) => {
          const stageNum = i + 1;
          const done = step > stageNum;
          const active = step === stageNum;
          return (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: i === 0 ? "flex-start" : i === stages.length - 1 ? "flex-end" : "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: done ? "#1A6B3A" : active ? "#E8600A" : "#EBE1CE", boxShadow: active ? "0 0 0 3px rgba(232,96,10,0.18)" : "none", marginBottom: 5 }} />
              <span style={{ fontSize: 10, fontFamily: F.dmSans, fontWeight: 600, color: done ? "#1A6B3A" : active ? "#E8600A" : "#A68660", textAlign: i === 0 ? "left" : i === stages.length - 1 ? "right" : "center", lineHeight: "14px" }}>{label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ height: 6, background: "#EBE1CE", borderRadius: 100, overflow: "hidden" }}>
        <div style={{ height: 6, borderRadius: 100, background: step === 3 ? "#1A6B3A" : "#E8600A", width: `${((step - 1) / 2) * 100}%`, transition: "width 0.5s" }} />
      </div>
    </div>
  );
}

function getFormattedAge(pet: PetCardProps['pet']) {
  if (pet.ageYears && pet.ageMonths) return `${pet.ageYears}y ${pet.ageMonths}m`;
  if (pet.ageYears) return `${pet.ageYears} ${pet.ageYears === 1 ? "year" : "years"}`;
  if (pet.ageMonths) return `${pet.ageMonths} ${pet.ageMonths === 1 ? "month" : "months"}`;
  return "Not specified";
}

export default function PetCard({ pet, onEdit, onContinue, onDelete }: PetCardProps) {
  const { label: stageLabel, step: stageStep, color: stageColor } = getDisplayStage(pet);
  const isIncomplete = pet.registrationStage < 2 && !pet.registrationTriggered;
  const docCount = pet.uploadedDocumentsCount || 0;
  const totalDocs = pet.requiredDocumentsCount || 4;

  return (
    <div style={{ 
      background: "#FFFCF8", 
      borderRadius: 13, 
      borderTop: "3px solid #E8600A", 
      border: "1px solid #E8600A", 
      borderTopWidth: 3, 
      padding: "20px 22px", 
      display: "flex", 
      flexDirection: "column", 
      gap: 18 
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ 
          width: 60, 
          height: 60, 
          background: "#F3EDE0", 
          borderRadius: 13, 
          outline: "2px solid rgba(44,26,14,0.18)", 
          outlineOffset: -2, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          overflow: "hidden", 
          flexShrink: 0 
        }}>
          {pet.profilePicture ? (
            <img src={pet.profilePicture} alt={pet.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <PawPrintIcon size={28} color="#A68660" />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ color: "#2C1A0E", fontSize: 21, fontFamily: F.fraunces, fontWeight: 900, display: "block" }}>{pet.name}</span>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
            <div style={{ 
              paddingLeft: 9, 
              paddingRight: 9, 
              paddingTop: 3, 
              paddingBottom: 3, 
              background: stageStep === 3 ? "#E6F6ED" : "#FFF4E4", 
              borderRadius: 100, 
              outline: `1px solid ${stageStep === 3 ? "#A8DDB8" : "#FFCCA0"}`, 
              outlineOffset: -1 
            }}>
              <span style={{ color: stageColor, fontSize: 11, fontFamily: F.dmSans, fontWeight: 600 }}>
                {stageStep === 3 ? "✓ " : ""}{stageLabel}
              </span>
            </div>
            {pet.gender && pet.gender !== "unknown" && (
              <div style={{ 
                paddingLeft: 9, 
                paddingRight: 9, 
                paddingTop: 3, 
                paddingBottom: 3, 
                background: "#F3EDE0", 
                borderRadius: 100, 
                outline: "1px solid rgba(44,26,14,0.18)", 
                outlineOffset: -1 
              }}>
                <span style={{ color: "#7A5C40", fontSize: 11, fontFamily: F.dmSans, fontWeight: 600, textTransform: "capitalize" }}>
                  {pet.gender}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
        {[
          { label: "Member Since", value: pet.createdAt ? new Date(pet.createdAt).toLocaleDateString() : "N/A" },
          { label: "Age", value: getFormattedAge(pet) },
          { label: "Documents", value: `${docCount}/${totalDocs} uploaded` },
          { label: "Stage", value: stageLabel },
        ].map((row) => (
          <div key={row.label}>
            <span style={{ color: "#A68660", fontSize: 9.5, fontFamily: F.dmMono, fontWeight: 400, textTransform: "uppercase", letterSpacing: "1.14px", display: "block" }}>
              {row.label}
            </span>
            <span style={{ color: "#2C1A0E", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <RegistrationProgressBar pet={pet} />

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <button
          onClick={() => onEdit(pet)}
          style={{ 
            paddingLeft: 14, 
            paddingRight: 14, 
            paddingTop: 10, 
            paddingBottom: 10, 
            borderRadius: 9, 
            outline: "1px solid rgba(44,26,14,0.18)", 
            outlineOffset: -1, 
            display: "flex", 
            alignItems: "center", 
            gap: 7, 
            background: "none", 
            border: "none", 
            cursor: "pointer" 
          }}
        >
          <EditIcon size={13} color="#2C1A0E" />
          <span style={{ color: "#2C1A0E", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Edit Pet Info</span>
        </button>

        {isIncomplete && (
          <button
            onClick={() => onContinue(pet._id)}
            style={{ 
              paddingLeft: 14, 
              paddingRight: 14, 
              paddingTop: 10, 
              paddingBottom: 10, 
              background: "#E8600A", 
              boxShadow: "0px 2px 0px #C04E06", 
              borderRadius: 9, 
              outline: "2px solid #C04E06", 
              outlineOffset: -2, 
              display: "flex", 
              alignItems: "center", 
              gap: 7, 
              border: "none", 
              cursor: "pointer" 
            }}
          >
            <span style={{ color: "white", fontSize: 13, fontFamily: F.dmSans, fontWeight: 600 }}>
              {docCount > 0
                ? `Continue — ${docCount}/${totalDocs} docs uploaded`
                : "Continue Registration →"}
            </span>
          </button>
        )}

        {(pet.registrationStage === 2 || pet.registrationStage === 3) && (
          <div style={{ 
            paddingLeft: 14, 
            paddingRight: 14, 
            paddingTop: 10, 
            paddingBottom: 10, 
            background: "#F3EAF8", 
            borderRadius: 9, 
            outline: "1px solid #D4A0E8", 
            outlineOffset: -1 
          }}>
            <span style={{ color: "#6B21A8", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>
              {pet.registrationStage === 2 ? "📋 Under Review" : "🏅 License Being Prepared"}
            </span>
          </div>
        )}

        {pet.registrationStage === 4 && (
          <div style={{ 
            paddingLeft: 14, 
            paddingRight: 14, 
            paddingTop: 10, 
            paddingBottom: 10, 
            background: "#E6F6ED", 
            borderRadius: 9, 
            outline: "1px solid #A8DDB8", 
            outlineOffset: -1 
          }}>
            <span style={{ color: "#1A6B3A", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>✓ License Received</span>
          </div>
        )}

        <button
          onClick={() => onDelete(pet._id, pet.name)}
          style={{ 
            paddingLeft: 12, 
            paddingRight: 12, 
            paddingTop: 10, 
            paddingBottom: 10, 
            background: "#FDECEA", 
            borderRadius: 9, 
            outline: "1px solid #F5B8B5", 
            outlineOffset: -1, 
            display: "flex", 
            alignItems: "center", 
            gap: 6, 
            border: "none", 
            cursor: "pointer" 
          }}
        >
          <TrashIcon size={13} color="#A0251E" />
          <span style={{ color: "#A0251E", fontSize: 13, fontFamily: F.dmSans, fontWeight: 500 }}>Delete</span>
        </button>
      </div>
    </div>
  );
}
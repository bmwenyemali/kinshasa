"use client";

import React, { useRef, useState } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";

const CLOUDINARY_CLOUD_NAME = "dsgizthan";
const CLOUDINARY_UPLOAD_PRESET = "kinshasa";

interface CloudinaryUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  shape?: "square" | "circle";
  size?: "sm" | "md" | "lg";
}

export function CloudinaryUpload({
  value,
  onChange,
  label = "Photo",
  className = "",
  shape = "square",
  size = "md",
}: CloudinaryUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement");
      }

      const data = await response.json();
      onChange(data.secure_url);
    } catch (err) {
      setError("Erreur lors du téléchargement de l'image");
      console.error("Cloudinary upload error:", err);
    } finally {
      setUploading(false);
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          <Camera className="w-4 h-4 inline mr-1" />
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        {/* Preview */}
        <div
          className={`${sizeClasses[size]} ${shapeClass} bg-gray-100 border-2 border-dashed border-border flex items-center justify-center overflow-hidden relative group cursor-pointer`}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
          ) : value ? (
            <>
              <img
                src={value}
                alt="Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Photo</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border border-border hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Envoi...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                {value ? "Changer" : "Ajouter"}
              </>
            )}
          </button>
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-3 h-3" />
              Supprimer
            </button>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}

"use client";

import React from "react";
import { CertificateCard } from "./CertificateCard";
import { CertificateType } from "../types/certificates.type";
import { CertificateIcon, WarningIcon } from "@phosphor-icons/react";

interface CertificateGridProps {
  certificates?: CertificateType[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

import { CertificateGridLoadingState } from "@/components/loading-state-components";

export function CertificateGrid({
  certificates = [],
  isLoading = false,
  isError = false,
  errorMessage = "Gagal memuat daftar sertifikat.",
}: CertificateGridProps) {
  if (isLoading) {
    return <CertificateGridLoadingState count={6} />;
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 border-2 border-destructive p-8 shadow-retro my-6 text-center flex flex-col items-center gap-3">
        <WarningIcon size={42} className="text-destructive" weight="fill" />
        <h3 className="font-sans font-bold text-lg text-destructive">
          Terjadi Kesalahan
        </h3>
        <p className="font-serif text-sm text-destructive/80 max-w-md">
          {errorMessage}
        </p>
      </div>
    );
  }

  if (!certificates || certificates.length === 0) {
    return (
      <div className="bg-card border-2 border-border p-12 shadow-retro my-6 text-center flex flex-col items-center gap-3">
        <div className="bg-primary/20 border-2 border-border p-3 shadow-retro">
          <CertificateIcon size={44} className="text-primary" weight="bold" />
        </div>
        <h3 className="font-sans font-bold text-xl">
          Sertifikat Tidak Ditemukan
        </h3>
        <p className="font-serif text-sm text-muted-foreground max-w-md">
          Belum ada sertifikat yang tersedia saat ini atau kata kunci pencarian
          Anda tidak mencocokkan sertifikat manapun.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-6">
      {certificates.map((cert) => (
        <CertificateCard key={cert.id} {...cert} />
      ))}
    </div>
  );
}

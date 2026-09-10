"use client";

import React, { use } from "react";
import Link from "next/link";
import { CertificateDetailView } from "@/features/certificates/components/CertificateDetailView";
import { useGetCertificateById } from "@/features/certificates/hooks/useGetCertificateById";
import { ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface CertificateDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CertificateDetailPage({ params }: CertificateDetailPageProps) {
  const { id } = use(params);
  const { data: certificate, isLoading, isError, error } = useGetCertificateById(id);

  return (
    <main className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 max-w-5xl lg:mx-auto">
      {isLoading && (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto my-8 animate-pulse">
          <div className="h-10 w-48 bg-muted border-2 border-border"></div>
          <div className="bg-card border-2 border-border p-8 shadow-retro flex flex-col gap-4">
            <div className="h-6 w-32 bg-muted border-2 border-border"></div>
            <div className="h-10 w-3/4 bg-muted border-2 border-border"></div>
            <div className="h-64 w-full bg-muted border-2 border-border"></div>
          </div>
        </div>
      )}

      {isError && (
        <div className="max-w-2xl mx-auto my-12 bg-card border-2 border-border p-8 shadow-retro text-center flex flex-col items-center gap-4">
          <div className="p-3 bg-destructive/20 border-2 border-border text-destructive shadow-retro">
            <WarningIcon size={40} weight="fill" />
          </div>
          <h2 className="font-sans text-2xl font-bold">Sertifikat Tidak Ditemukan</h2>
          <p className="font-serif text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Maaf, sertifikat yang Anda cari tidak ditemukan atau ID tidak valid."}
          </p>
          <Link href="/certificates">
            <Button className="gap-2 border-2 border-border bg-primary text-primary-foreground shadow-retro font-sans text-xs font-bold uppercase mt-2">
              <ArrowLeftIcon size={16} weight="bold" />
              <span>Kembali ke Daftar Sertifikat</span>
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && !isError && certificate && (
        <CertificateDetailView certificate={certificate} />
      )}
    </main>
  );
}

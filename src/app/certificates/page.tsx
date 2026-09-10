"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { Filter } from "@/components/Filter";
import { CertificateGrid } from "@/features/certificates/components/CertificateGrid";
import { useGetCertificate } from "@/features/certificates/hooks/useGetCertificate";

export default function CertificatesPage() {
  const { data: certificates, isLoading, isError, error } = useGetCertificate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState("");

  // Extract unique issuers list dynamically from fetched certificates
  const issuers = useMemo(() => {
    if (!certificates) return [];
    const set = new Set<string>();
    certificates.forEach((c) => {
      if (c.issuer) set.add(c.issuer);
    });
    return Array.from(set);
  }, [certificates]);

  // Filter certificates based on search query and selected issuer
  const filteredCertificates = useMemo(() => {
    if (!certificates) return [];
    return certificates.filter((cert) => {
      const matchesSearch =
        !searchQuery.trim() ||
        cert.title?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        cert.issuer?.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesIssuer =
        !selectedIssuer ||
        cert.issuer?.toLowerCase() === selectedIssuer.toLowerCase();

      return matchesSearch && matchesIssuer;
    });
  }, [certificates, searchQuery, selectedIssuer]);

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedIssuer("");
  };

  return (
    <main className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-3">
      <Header
        title="Certificates"
        subtitle="Daftar sertifikat, lisensi profesional, dan pencapaian kompetensi teknis yang telah saya peroleh."
        iconName="CertificateIcon"
      />

      {/* Universal Filter Component matching Projects page */}
      <Filter
        search={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedIssuer}
        categories={issuers}
        categoryLabel="Penerbit"
        onCategoryChange={setSelectedIssuer}
        onReset={handleResetFilter}
        placeholder="Cari sertifikat berdasarkan judul atau penerbit (misal: AWS, React, Google)..."
      />

      {/* Certificates Grid List */}
      <CertificateGrid
        certificates={filteredCertificates}
        isLoading={isLoading}
        isError={isError}
        errorMessage={
          error instanceof Error ? error.message : "Gagal memuat sertifikat."
        }
      />
    </main>
  );
}

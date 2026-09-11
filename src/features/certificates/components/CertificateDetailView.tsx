"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EmptyImageCertificate } from "@/components/empty-state-components";
import { CertificateType } from "../types/certificates.type";
import {
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  CalendarBlankIcon,
  CertificateIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadSimpleIcon,
  EyeIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import SubHeader from "@/components/SubHeader";

interface CertificateDetailViewProps {
  certificate: CertificateType;
}

export function CertificateDetailView({
  certificate,
}: CertificateDetailViewProps) {
  const [imageError, setImageError] = useState(false);

  // Format date helper
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const formattedIssueDate = formatDate(certificate.issue_date);
  const formattedExpDate = certificate.expiration_date
    ? formatDate(certificate.expiration_date)
    : "Tidak Ada Kadaluarsa (Berlaku Seumur Hidup)";

  // Determine if valid or expired
  const isExpired = Boolean(
    certificate.expiration_date &&
    new Date(certificate.expiration_date).getTime() < Date.now(),
  );

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Navigation SubHeader */}
      <div className="flex items-center justify-between">
        <Link href="/certificates">
          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-2 border-border shadow-retro hover-retro-lift text-base font-serif font-bold"
          >
            <ArrowLeftIcon size={16} weight="bold" />
            <span>Back to Certificates</span>
          </Button>
        </Link>
      </div>

      {/* Main Certificate Card Header */}
      <div className="bg-card border-2 border-border p-6 sm:p-8 shadow-retro space-y-6">
        {/* Title & Badges */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-primary text-primary-foreground border-2 border-border px-3 py-1 text-xs font-mono font-extrabold uppercase flex items-center gap-1.5">
              <SealCheckIcon size={16} weight="fill" />
              {certificate.issuer}
            </span>
            <span
              className={`border-2 border-border px-3 py-1 text-xs font-mono font-bold uppercase ${
                isExpired
                  ? "bg-destructive/20 text-destructive border-destructive"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {isExpired ? "Expired" : "Active / Valid"}
            </span>
          </div>

          <h1 className="font-chillax font-extrabold text-2xl sm:text-4xl text-foreground leading-tight">
            {certificate.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-2 border-t-2 border-dashed border-border">
            <div className="flex items-center gap-1.5">
              <CalendarBlankIcon
                size={16}
                className="text-primary"
                weight="bold"
              />
              <span>
                Issued:{" "}
                <strong className="text-foreground">
                  {formattedIssueDate}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon size={16} className="text-primary" weight="bold" />
              <span>
                Expires:{" "}
                <strong className="text-foreground">{formattedExpDate}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Large Image Preview Container */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[500px] bg-muted border-2 border-border overflow-hidden flex items-center justify-center shadow-retro">
          {certificate.image_url && !imageError ? (
            <Image
              src={certificate.image_url}
              alt={certificate.title}
              fill
              className="object-contain p-2"
              onError={() => setImageError(true)}
            />
          ) : (
            <EmptyImageCertificate variant="detail" />
          )}
        </div>

        {/* Metadata Details Grid & Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-background border-2 border-border p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-3">
            <h4 className="font-mono text-xs uppercase font-extrabold text-muted-foreground tracking-wider">
              ISSUER & LICENSE DETAILS
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground font-serif">
                  Issuer:
                </span>
                <span className="font-bold text-foreground">
                  {certificate.issuer}
                </span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-muted-foreground font-serif">
                  Issue Date:
                </span>
                <span className="font-bold text-foreground">
                  {formattedIssueDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-serif">
                  Credential Status:
                </span>
                <span className="font-bold text-foreground flex items-center gap-1">
                  <CheckCircleIcon
                    size={16}
                    className="text-emerald-500"
                    weight="fill"
                  />
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="bg-background border-2 border-border p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-4">
            <div>
              <h4 className="font-mono text-xs uppercase font-extrabold text-muted-foreground tracking-wider mb-2">
                Verify Credential
              </h4>
              <p className="font-serif text-xs text-muted-foreground leading-relaxed">
                Open the direct link to authenticate this certificate on the
                issuer's official platform.
              </p>
            </div>

            {certificate.credential_url ? (
              <a
                href={certificate.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full cursor-pointer h-11 rounded-none bg-primary text-primary-foreground font-sans font-extrabold text-sm border-2 border-border shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all gap-2">
                  <span>View Official Credential</span>
                  <ArrowSquareOutIcon size={18} weight="bold" />
                </Button>
              </a>
            ) : (
              <Button
                disabled
                className="w-full h-11 rounded-none bg-muted text-muted-foreground border-2 border-border font-sans font-bold text-sm"
              >
                Credential No Available
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

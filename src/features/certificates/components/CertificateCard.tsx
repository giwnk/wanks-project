"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CertificateType } from "../types/certificates.type";
import {
  ArrowSquareOutIcon,
  CalendarBlankIcon,
  CertificateIcon,
  EyeIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { getStorageUrl } from "@/lib/storage";
import formatDate from "@/lib/formatDate";

import { EmptyImageCertificate } from "@/components/empty-state-components";

export function CertificateCard(data: CertificateType) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = getStorageUrl(data.image_url);

  const formattedIssueDate = formatDate(data.issue_date);
  const formattedExpDate = data.expiration_date
    ? formatDate(data.expiration_date)
    : "Tidak Ada Kadaluarsa";

  return (
    <div className="bg-card flex flex-col gap-4 border-2 hover-retro-lift border-border p-5 shadow-retro h-full justify-between group">
      <div className="flex flex-col gap-3">
        {/* Certificate Image Preview */}
        <div className="relative w-full h-44 bg-muted border-2 border-border overflow-hidden flex items-center justify-center">
          {data.image_url && !imageError ? (
            <Image
              src={imageUrl}
              alt={data.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <EmptyImageCertificate variant="compact" />
          )}

          {/* Issuer Badge overlay */}
          <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground border-2 border-border px-2.5 py-1 text-xs font-mono font-bold uppercase flex items-center gap-1.5">
            <SealCheckIcon size={14} weight="fill" />
            <span>{data.issuer}</span>
          </div>
        </div>

        {/* Certificate Title */}
        <Link href={`/certificates/${data.id}`} className="">
          <h3 className="font-sans font-bold text-lg sm:text-xl line-clamp-2 leading-snug">
            {data.title}
          </h3>
        </Link>

        {/* Certificate Metadata (Dates) */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono text-muted-foreground border-t-2 border-dashed border-border pt-3">
          <div className="flex items-center gap-1.5">
            <CalendarBlankIcon
              size={16}
              className="text-primary"
              weight="bold"
            />
            <span>
              Diterbitkan:{" "}
              <strong className="text-foreground">{formattedIssueDate}</strong>
            </span>
          </div>
          {data.expiration_date && (
            <div className="flex items-center gap-1.5">
              <span>
                Berlaku s/d:{" "}
                <strong className="text-foreground">{formattedExpDate}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t-2 border-border mt-auto">
        <Link href={`/certificates/${data.id}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-9 rounded-none cursor-pointer hover-retro-lift border-2 border-border bg-background hover:bg-accent text-sm font-sans font-semibold shadow-retro gap-1.5"
          >
            <EyeIcon size={16} weight="bold" />
            <span>Detail</span>
          </Button>
        </Link>

        {data.credential_url && (
          <a
            href={data.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="sm"
              className="w-full h-9 rounded-none cursor-pointer bg-primary text-primary-foreground border-2 border-border hover-retro-lift text-sm font-sans font-semibold shadow-retro gap-1.5"
            >
              <span>Kredensial</span>
              <ArrowSquareOutIcon size={16} weight="bold" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

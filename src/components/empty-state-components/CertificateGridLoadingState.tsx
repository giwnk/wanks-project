import CertificateCardLoadingState from "./CertificateCardLoadingState";

export default function CertificateGridLoadingState({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <CertificateCardLoadingState key={idx} />
      ))}
    </div>
  );
}

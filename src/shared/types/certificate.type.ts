export interface CertificateType {
    id: string,
    title: string,
    issuer: string,
    issue_date: string,
    expiration_date?: string | null,
    credential_url?:string | null,
    image_url?: string | null,
    display_order?: number | 0,
}
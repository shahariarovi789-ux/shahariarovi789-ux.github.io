import CertificateGrid from "@/components/certificates/CertificateGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";
import { CERTIFICATES } from "@/data/certificates";

export const metadata = {
  title: `Verified Credentials & Certifications (${CERTIFICATES.length}) | ${SITE.name}`,
  description: `Verified credentials and certifications completed by ${SITE.name}, including NASA Open Science, Hugging Face AI Agents, and Anthropic Academy.`,
};

export const dynamic = "force-static";

export default function CertificatesPage() {
  return (
    <main className="min-h-screen px-6 pt-36 pb-28 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Verified Learning & Credentials"
        title={<>Certifications &amp; <span className="text-gradient">Credentials</span></>}
        description="Verified courses, government credentials, and specialized AI agent certifications. Click any credential card to view the complete certificate."
      />

      <CertificateGrid />
    </main>
  );
}

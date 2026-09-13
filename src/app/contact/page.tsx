import ContactForm from "@/components/contact/ContactForm";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { SITE } from "@/data/site";
import { Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: `Contact & Collaboration | ${SITE.name}`,
  description: `Get in touch with ${SITE.name} for backend AI engineering roles, distributed systems internships, and technical collaborations.`,
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 pt-36 pb-28 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Get In Touch"
        title={<>Let&apos;s Build <span className="text-gradient">Together</span></>}
        description="Open to Backend AI Engineering roles, distributed systems projects, and high-concurrency scraping pipelines."
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form */}
        <div>
          <h3 className="font-heading text-xl font-bold text-white mb-6">
            Send a Direct Message
          </h3>
          <ContactForm />
        </div>

        {/* Sidebar info */}
        <div className="flex flex-col gap-6">
          <h3 className="font-heading text-xl font-bold text-white mb-2">
            Direct Channels &amp; Availability
          </h3>

          <WhatsAppButton />

          <div className="rounded-2xl border border-white/10 bg-surface/70 p-6 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-mono text-muted">Primary Email</p>
                <a href={`mailto:${SITE.email}`} className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-mono text-muted">Location</p>
                <p className="text-sm font-semibold text-white">
                  {SITE.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-mono text-muted">Timezone</p>
                <p className="text-sm font-semibold text-white">
                  UTC+6 (Asia/Dhaka)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/70 p-5 text-sm font-semibold text-white hover:border-blue-500/40 transition-colors"
            >
              <span className="flex items-center gap-3">
                <GithubIcon className="h-5 w-5 text-muted" /> GitHub Profile
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted" />
            </a>

            <a
              href={SITE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/70 p-5 text-sm font-semibold text-white hover:border-blue-500/40 transition-colors"
            >
              <span className="flex items-center gap-3">
                <LinkedinIcon className="h-5 w-5 text-muted" /> LinkedIn Network
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

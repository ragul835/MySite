import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/919080163393?text=Hi%20We%20Raise%20Tech%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with We Raise Tech on WhatsApp"
      onClick={() => trackEvent("contact_click", { contact_method: "whatsapp", placement: "floating_button" })}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 md:bottom-7 md:right-7"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}


import { PopupModal } from "react-calendly";

interface CalendlyPopupProps {
  onClose: () => void;
}

export default function CalendlyPopup({ onClose }: CalendlyPopupProps) {
  return (
    <PopupModal
      url="https://calendly.com/weraisetech/30min"
      onModalClose={onClose}
      open
      rootElement={document.getElementById("root") || document.body}
    />
  );
}

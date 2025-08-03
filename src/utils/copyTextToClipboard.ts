import { toast } from "sonner";

const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    toast.error("Clipboard API not supported in this browser.");
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Copied to clipboard!");
    })
    .catch((err) => {
      toast.error("Failed to copy text: " + err.message);
    });
};

export default copyTextToClipboard;

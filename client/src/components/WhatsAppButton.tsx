/* ============================================================
   WhatsApp FAB — Drudi e Almeida
   Floating action button always visible for quick contact
   ============================================================ */
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta na Drudi e Almeida."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <div className="flex items-center gap-2 px-5 py-3.5">
        <MessageCircle className="w-5 h-5" />
        <span className="font-ui text-sm font-semibold hidden sm:inline">
          Fale Conosco
        </span>
      </div>
    </motion.a>
  );
}

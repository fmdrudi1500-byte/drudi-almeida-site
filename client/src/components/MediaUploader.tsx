import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileAudio, FileVideo, FileImage, File, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MediaUploaderProps {
  postId?: number;
  onUploaded?: (media: { id: number; url: string; mediaType: string; fileName: string | null }) => void;
  accept?: Record<string, string[]>;
  maxSize?: number; // bytes
  className?: string;
}

const MEDIA_TYPES: Record<string, "image" | "video" | "audio" | "document"> = {
  "image/": "image",
  "video/": "video",
  "audio/": "audio",
  "application/pdf": "document",
  "application/msword": "document",
  "application/vnd": "document",
};

function detectMediaType(mimeType: string): "image" | "video" | "audio" | "document" {
  for (const [prefix, type] of Object.entries(MEDIA_TYPES)) {
    if (mimeType.startsWith(prefix)) return type;
  }
  return "document";
}

function MediaIcon({ type, className }: { type: string; className?: string }) {
  const cls = cn("w-8 h-8", className);
  if (type === "image") return <FileImage className={cls} />;
  if (type === "video") return <FileVideo className={cls} />;
  if (type === "audio") return <FileAudio className={cls} />;
  return <File className={cls} />;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaUploader({ postId, onUploaded, accept, maxSize = 50 * 1024 * 1024, className }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [queue, setQueue] = useState<{ name: string; size: number; progress: number }[]>([]);

  const uploadMutation = trpc.blog.adminUploadMedia.useMutation();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setQueue(acceptedFiles.map((f) => ({ name: f.name, size: f.size, progress: 0 })));

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        try {
          const base64Data = await fileToBase64(file);
          const mediaType = detectMediaType(file.type);

          const result = await uploadMutation.mutateAsync({
            postId,
            fileName: file.name,
            mimeType: file.type,
            base64Data,
            mediaType,
          });

          setQueue((q) => q.map((item, idx) => (idx === i ? { ...item, progress: 100 } : item)));

          if (onUploaded) {
            onUploaded(result.media);
          }

          toast.success(`${file.name} enviado com sucesso.`);
        } catch (err) {
          toast.error(`Falha ao enviar ${file.name}.`);
        }
      }

      setUploading(false);
      setTimeout(() => setQueue([]), 2000);
    },
    [postId, uploadMutation, onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ?? {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
      "video/*": [".mp4", ".webm", ".mov", ".avi"],
      "audio/*": [".mp3", ".wav", ".ogg", ".m4a", ".aac"],
      "application/pdf": [".pdf"],
    },
    maxSize,
    disabled: uploading,
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragActive ? "border-gold bg-gold/5" : "border-border hover:border-gold/50 hover:bg-muted/30",
          uploading && "opacity-60 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
        {isDragActive ? (
          <p className="font-ui text-sm text-gold font-semibold">Solte os arquivos aqui...</p>
        ) : (
          <>
            <p className="font-ui text-sm font-semibold text-navy">Arraste arquivos ou clique para selecionar</p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              Imagens, vídeos, áudios, PDFs — máx. {formatBytes(maxSize)}
            </p>
          </>
        )}
      </div>

      {/* Upload queue */}
      {queue.length > 0 && (
        <div className="mt-3 space-y-2">
          {queue.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-muted/30 rounded-lg px-3 py-2">
              {item.progress < 100 ? (
                <Loader2 className="w-4 h-4 text-gold animate-spin shrink-0" />
              ) : (
                <MediaIcon type={detectMediaType("")} className="text-gold" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-ui text-xs font-semibold text-navy truncate">{item.name}</p>
                <p className="font-body text-[10px] text-muted-foreground">{formatBytes(item.size)}</p>
              </div>
              {item.progress === 100 && <span className="font-ui text-[10px] text-emerald-600 font-semibold">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

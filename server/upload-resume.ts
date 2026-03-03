/* ============================================================
   Resume Upload Route — Drudi e Almeida
   POST /api/upload-resume
   Accepts multipart/form-data with a "file" field (PDF or Word).
   Stores the file in S3 and returns { url, key }.
   Max size: 5MB.
   ============================================================ */
import { Router, Request, Response, type Application } from "express";
import multer from "multer";
import { storagePut } from "./storage";

// Extend Express Request to include multer file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos PDF ou Word são aceitos."));
    }
  },
});

export function registerResumeUploadRoute(app: Application) {
  const router = Router();

  router.post(
    "/api/upload-resume",
    upload.single("file"),
    async (req: MulterRequest, res: Response) => {
      try {
        if (!req.file) {
          res.status(400).json({ error: "Nenhum arquivo enviado." });
          return;
        }

        const timestamp = Date.now();
        const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const key = `curriculos/${timestamp}-${safeName}`;

        const { url } = await storagePut(key, req.file.buffer, req.file.mimetype);

        res.json({ url, key });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro no upload.";
        res.status(500).json({ error: message });
      }
    }
  );

  app.use(router);
}

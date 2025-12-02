"use client";

import { useFilePond } from "@/hooks/useFilePond";

export default function FilePondWrapper({ initialFiles = [], onChange }: any) {
  
  const getMimeFromFilename = (file: string) => {
    if (file.endsWith(".png")) return "image/png";
    if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
    if (file.endsWith(".gif")) return "image/gif";
    if (file.endsWith(".webp")) return "image/webp";
    return "image/*";
  };

  const formattedInitialFiles = initialFiles.map((fileName: string) => ({
    source: `/uploads/${fileName}`,
    options: {
      type: "local",
      metadata: {
        mimeType: getMimeFromFilename(fileName), // ⭐ CHỈ ĐƯỢC ĐỂ TRONG metadata
      }
    }
  }));

  const { elementRef } = useFilePond({
    maxFiles: 5,
    acceptedFileTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    onFileChange: onChange,
    initialFiles: formattedInitialFiles,
  });

  return <input type="file" ref={elementRef} accept="image/*" multiple />;
}

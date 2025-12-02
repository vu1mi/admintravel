import { useEffect, useRef, useCallback } from "react";


interface UseFilePondOptions {
  onFileChange?: (files: any[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  allowMultiple?: boolean;
  imagePreviewHeight?: number;
  initialFiles?: (File | string)[];
}

export const useFilePond = (options: UseFilePondOptions = {}) => {
  const pondRef = useRef<any>(null);
  const elementRef = useRef<HTMLInputElement>(null);
  const isInitializedRef = useRef(false);

  // Store options in refs to avoid re-initialization
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const {
    maxFiles = 5,
    acceptedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"],
    allowMultiple = true,
    imagePreviewHeight = 170,
    initialFiles = [],
  } = options;

  useEffect(() => {
    // Prevent re-initialization if already initialized
    if (isInitializedRef.current || pondRef.current) {
      return;
    }

  const initFilePond = async () => {
  if (typeof window !== "undefined" && elementRef.current) {
    // Import linh hoạt
    const FilePondModule = await import("filepond");
    const FilePond = FilePondModule.default || FilePondModule;

    const ImgPreviewModule = await import("filepond-plugin-image-preview");
    const FileValidateModule = await import("filepond-plugin-file-validate-type");

    const FilePondPluginImagePreview =
      ImgPreviewModule.default || ImgPreviewModule;
    const FilePondPluginFileValidateType =
      FileValidateModule.default || FileValidateModule;

    FilePond.registerPlugin(
      FilePondPluginImagePreview,
      FilePondPluginFileValidateType
    );

    if (!elementRef.current || isInitializedRef.current) return;

    isInitializedRef.current = true;

    pondRef.current = FilePond.create(elementRef.current, {
      labelIdle: "+",
      maxFiles,
      acceptedFileTypes,
      allowMultiple,
      allowImagePreview: true,
      imagePreviewHeight,
      stylePanelLayout: "compact",
      credits: false,

      onupdatefiles: (fileItems) => {
        const files = fileItems.map((x) => x.file);
        optionsRef.current.onFileChange?.(files);
      },
      
    }
  );
  }
  if (optionsRef.current.initialFiles?.length) {
  for (const file of optionsRef.current.initialFiles) {
  if (typeof file === "string") {
    // URL case
    pondRef.current.addFile({
      source: file,
      options: { type: "local" }
    });
  } else {
    // File object case
    pondRef.current.addFile(file);
  }
}

}
};


    initFilePond();

    // Cleanup
    return () => {
      if (pondRef.current) {
        pondRef.current.destroy();
        pondRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []); // Empty deps - only initialize once

  const getFiles = () => {
    return pondRef.current?.getFiles() || [];
  };

  const removeFile = (index: number) => {
    pondRef.current?.removeFile(index);
  };

  const addFile = (file: File) => {
    pondRef.current?.addFile(file);
  };

  return {
    pondRef,
    elementRef,
    getFiles,
    removeFile,
    addFile,
  };
};

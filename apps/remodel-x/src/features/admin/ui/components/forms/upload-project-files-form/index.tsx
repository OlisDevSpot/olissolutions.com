import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@olis/ui/components/form";

import type { UploadProjectFilesSchema } from "./schema";

import { UploadMetadataFields } from "./fileds/upload-metadata-fields";
import { Uploader } from "./fileds/uploader";
import { defaultValues, uploadProjectFilesSchema } from "./schema";

interface ClientFile {
  id: string;
  file: File;
  key?: string;
  progress: number;
  isError?: boolean;
  isUploading: boolean;
  isDeleting: boolean;
  objectUrl: string;
}

export function UploadProjectFilesForm() {
  const [files, setFiles] = useState<ClientFile[]>([])
  
  const form = useForm<UploadProjectFilesSchema>({
    defaultValues,
    resolver: zodResolver(uploadProjectFilesSchema),
  })

  function upload(data: UploadProjectFilesSchema) {
    console.log(data);
  }

  const updateFiles = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => ([
      ...prev,
      ...acceptedFiles.map(file => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        isUploading: false,
        isDeleting: false,
        objectUrl: URL.createObjectURL(file),
      }))
    ]))
  }, [])
  
  return (
    <Form {...form}>
      <form
        className=""
        onSubmit={form.handleSubmit((data: UploadProjectFilesSchema) => {
          upload(data)
        })}
      >
        <div className="w-full h-full flex gap-4 p-4">
          <UploadMetadataFields className="flex-1" />
          <Uploader onDrop={(newFiles) => {
            updateFiles(newFiles)
          }}
          />
        </div>
      </form>
      <div className="w-full grid grid-cols-3 gap-4">
        {files.map(file => (
          <div key={file.id} className="w-full h-[300px] bg-red-500">
            <img src={file.objectUrl} alt={file.file.name} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </Form>
  )
}

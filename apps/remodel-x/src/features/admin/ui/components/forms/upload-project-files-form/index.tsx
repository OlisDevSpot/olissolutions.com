import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetPresignedUrl } from "@olis/data-client/fetchers/platform/core/get-presigned-url";
import { Button } from "@olis/ui/components/button";
import { Form } from "@olis/ui/components/form";

import type { UploadProjectFilesSchema } from "./schema";

import { UploadMetadataFields } from "./fields/upload-metadata-fields";
import { Uploader } from "./fields/uploader";
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
  const getPresignedUrl = useGetPresignedUrl()
  
  const form = useForm<UploadProjectFilesSchema>({
    defaultValues,
    resolver: zodResolver(uploadProjectFilesSchema),
  })

  async function uploadFiles(data: UploadProjectFilesSchema) {
    console.log({ data })
    
    for (const file of data.files) {
      const output = await getPresignedUrl.mutateAsync({
        originalName: file.name,
        contentType: file.type,
        size: file.size,
        entityType: data.entity.type,
        entityId: 0,
      })

      if (!output?.url) {
        continue
      }

      const url = output.url

      await fetch(url, {
        method: "PUT",
        body: file,
      })
    }
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
          uploadFiles(data)
        })}
      >
        <div className="w-full h-full flex gap-4 p-4">
          <UploadMetadataFields className="flex-1" />
          <Uploader onDrop={(newFiles) => {
            updateFiles(newFiles)
          }}
          />
        </div>
        <Button>Upload</Button>
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

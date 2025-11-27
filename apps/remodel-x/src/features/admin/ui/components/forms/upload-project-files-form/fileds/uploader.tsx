"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { useGetPresignedUrl } from "@olis/data-client/fetchers/platform/core/get-presigned-url";
import { Button } from "@olis/ui/components/button";
import { FormControl, FormField, FormItem, FormMessage, } from "@olis/ui/components/form"
import { Input } from "@olis/ui/components/input";
import { cn } from "@olis/ui/lib/utils";

import type { UploadProjectFilesSchema } from "../schema";

interface Props {
  className?: string;
  onDrop: (newFiles: File[]) => void;
}

export function Uploader({ className, onDrop }: Props) {
  const form = useFormContext<UploadProjectFilesSchema>()
  const getPresignedUrl = useGetPresignedUrl()
  
  const uploadFiles = useCallback(async (newFiles: File[]) => {
    for (const file of newFiles) {
      const presignedUrl = await getPresignedUrl.mutate({
        fileName: file.name,
        contentType: file.type,
        size: file.size
      })
    }
  }, [])
  
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 100,
    noClick: true,
    onDrop,
    onDropAccepted: () => {},
    onDropRejected: () => {},
    accept: {
      "image/*": [],
    }
  })
  
  return (
    <div className={cn("w-full h-full", className)}>
      <FormField
        control={form.control}
        name="files"
        render={({ field: { value, ...field } }) => (
          <FormItem 
            data-drag-active={isDragActive}
            className="flex flex-col gap-2 border-dashed border-2 h-full items-center justify-center transition-colors hover:border-slate-400 data-[drag-active=true]:border-slate-400" 
            {...getRootProps()}
          >
            <FormControl>
              <Input type="file" {...field} {...getInputProps()} className="max-w-[300px]" />
            </FormControl>
            {isDragActive
              ? (
                  <p>Drop the files here ...</p>
                )
              : (
                  <div className="flex flex-col gap-2 items-center">
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => {
                        console.log("opening...")
                        open()
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

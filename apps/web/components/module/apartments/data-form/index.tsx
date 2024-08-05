"use client";

import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file_upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2 as RemoveIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NumericInput } from "@/components/ui/number-format-input";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { APP_ROUTER } from "@/constants";
import { useState } from "react";
import { createApartment, updateApartmentById } from "@/services/apartment";
import Link from "next/link";
import { Apartment } from "@/services/apartment/type";

type Props = {
  initialData?: Apartment | null;
};

const formSchema = z.object({
  title: z.string().min(1, { message: "String cannot be empty" }),
  previewImage: z.array(
    z.any().refine((file) => file.size < 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
  ),
  description: z.string(),
  areaSize: z.string().refine((val) => Number(val) > 0, {
    message: "Number must be greater than 0",
  }),
  roomNo: z.string().min(1, { message: "String cannot be empty" }),
  price: z.string().refine((val) => Number(val) > 0, {
    message: "Number must be greater than 0",
  }),
  isSetImage: z.boolean(),
});

const dropzone = {
  accept: {
    "image/*": [".jpg", ".jpeg", ".png"],
  },
  maxSize: 5 * 1024 * 1024,
} satisfies DropzoneOptions;

export function ApartmentDataForm({ initialData }: Props) {
  const isEdit = !!initialData;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      previewImage: [],
      areaSize: String(initialData?.areaSize) || "",
      roomNo: initialData?.roomNo || "",
      price: String(initialData?.price) || "",
      description: initialData?.description || "",
      isSetImage: !initialData?.previewImage,
    },
  });

  const isSetImage = form.watch("isSetImage");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      let previewImage;
      if (values.previewImage.length === 0) {
        if (initialData?.previewImage) {
          previewImage = initialData?.previewImage || "";
        } else {
          form.setError("previewImage", {
            type: "required",
            message: "Image is required",
          });
          setLoading(false);
          return;
        }
      } else {
        const { fullPath } = await uploadFile(values.previewImage[0]);
        previewImage = `${process.env
          .NEXT_PUBLIC_SUPABASE_STORAGE_URL!}/${fullPath}`;
      }
      const payload = {
        title: values.title,
        description: values.description,
        areaSize: Number(values.areaSize),
        roomNo: values.roomNo,
        price: Number(values.price),
        previewImage,
      };
      if (isEdit) {
        await updateApartmentById(initialData.id, {
          ...payload,
        });
      } else {
        await createApartment(payload);
      }
      router.push(APP_ROUTER.REALTOR.APARTMENT.LIST);
      form.reset();
      toast.success(`${isEdit ? "Edit" : "Create"} apartment successful`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(`${isEdit ? "Edit" : "Create"} apartment failed`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-col-12 gap-x-12 gap-y-4"
      >
        <div className="flex items-center justify-end space-x-2 col-span-12">
          <Button loading={loading} type="submit">
            Save
          </Button>
          <Button variant="outline" asChild>
            <Link href={APP_ROUTER.REALTOR.APARTMENT.LIST}>Cancel</Link>
          </Button>
        </div>
        <FormField
          control={form.control}
          name="previewImage"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Preview image</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  dropzoneOptions={dropzone}
                  reSelect={true}
                >
                  {!isSetImage ? (
                    <div className="size-20 p-0 relative w-fit rounded-md overflow-hidden">
                      <Image
                        src={initialData?.previewImage || ""}
                        alt={initialData?.title || ""}
                        height={100}
                        width={100}
                        className="size-20 p-0"
                      />
                      <button
                        className="absolute top-1 right-1"
                        onClick={() => form.setValue("isSetImage", true)}
                      >
                        <RemoveIcon className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
                      </button>
                    </div>
                  ) : field.value && field.value.length > 0 ? (
                    <FileUploaderContent className="flex items-center flex-row gap-2">
                      {field.value.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className="size-20 p-0 rounded-md overflow-hidden"
                          aria-roledescription={`file ${i + 1} containing ${
                            file.name
                          }`}
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={100}
                            width={100}
                            className="size-20 p-0"
                          />
                        </FileUploaderItem>
                      ))}
                    </FileUploaderContent>
                  ) : (
                    <FileInput>
                      <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                        <p className="text-gray-400">Drop files here</p>
                      </div>
                    </FileInput>
                  )}
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Deluxe Room"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="areaSize"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Area size</FormLabel>
              <FormControl>
                <div className="flex space-x-2 items-center">
                  <NumericInput
                    disabled={loading}
                    decimalSeparator="."
                    thousandSeparator=","
                    allowNegative={false}
                    placeholder="20"
                    {...field}
                  />
                  <span>m2</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomNo"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Room No.</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="#2030" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className="flex space-x-2 items-center">
                  <NumericInput
                    disabled={loading}
                    decimalSeparator="."
                    thousandSeparator=","
                    allowNegative={false}
                    placeholder="20"
                    {...field}
                  />
                  <span className="whitespace-nowrap">$/per month</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loading}
                  placeholder="Describe your apartment..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

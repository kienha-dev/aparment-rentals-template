"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { NumericInput } from "@/components/ui/number-format-input";
import { GetApartmentsParams } from "@/services/apartment/type";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  areaSize: z.object({
    min: z.string(),
    max: z.string(),
  }),
  price: z.object({
    min: z.string(),
    max: z.string(),
  }),
  keyword: z.string(),
});

type Props = {
  onSearch: (searchState: GetApartmentsParams) => void;
};

export default function FilterContainer({ onSearch }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areaSize: {
        max: "",
        min: "",
      },
      price: {
        max: "",
        min: "",
      },
      keyword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSearch({
      keyword: data.keyword,
      minPrice: data.price.min,
      maxPrice: data.price.max,
      minSize: data.areaSize.min,
      maxSize: data.areaSize.max,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 border gap-4 p-4 rounded-lg"
      >
        <FormField
          control={form.control}
          name="areaSize.min"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <NumericInput placeholder="Min size" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="areaSize.max"
          render={({ field }) => (
            <FormItem className="col-span-3 flex items-end">
              <FormControl>
                <NumericInput placeholder="Max size" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price.min"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <NumericInput placeholder="Min price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price.max"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <NumericInput placeholder="Max price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem className="col-span-9">
              <FormControl>
                <Input placeholder="Search by name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-3 flex items-end">
          <Button className="w-full" type="submit">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}

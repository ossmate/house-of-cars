"use client";

import { useGetBrandsQuery } from "@/app/api/brand/getBrandsQuery";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu } from "../DropdownMenu";
import { useRemoveBrandMutation } from "@/app/api/brand/useRemoveBrandMutation";

export const BrandsTable = () => {
  const {
    getBrandsQuery: { data: brands },
  } = useGetBrandsQuery();

  const { removeBrandMutation } = useRemoveBrandMutation();

  const onRemoveBrand = (carId: string) => {
    removeBrandMutation.mutate(carId, {});
  };

  return (
    <Table className="w-20">
      <TableCaption>A list of brands.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Image URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands?.data?.map(({ id, name, imageUrl }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{imageUrl}</TableCell>
            <TableCell>
              <DropdownMenu
                actions={[
                  {
                    id: "1",
                    label: "Remove",
                    onClick: () => onRemoveBrand(id),
                  },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

import { useMutation } from "@tanstack/react-query";
import { createItem } from "@/actions/createItem";

export function useCreateItem() {
  return useMutation({
    mutationFn: createItem,
  });
}
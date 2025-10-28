import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "@/actions/deleteItem";

export function useDeleteItem() {
  return useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
  });
}
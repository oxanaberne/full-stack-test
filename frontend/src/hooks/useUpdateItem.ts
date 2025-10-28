import { useMutation } from "@tanstack/react-query";
import { updateItem } from "@/actions/updateItem";
import { UpdateItemData } from "@/utils/models";

export function useUpdateItem() {
  return useMutation({
    mutationFn: async (data: UpdateItemData) => {
      return await updateItem(data);
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
}
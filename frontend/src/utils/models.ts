export interface CreateItemData {
    name: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
    created_by: string;
}


export interface Item {
    id: string;
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
    created_by: string;
    timestamp: string;
}

export interface UpdateItemData {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
  }
  


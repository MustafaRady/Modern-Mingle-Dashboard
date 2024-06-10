export interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    subDescription: string;
    category: string;
    sizes: string[];
    colors: string[];
    materials: string[];
    brand: string;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    imageUrl: string;
}

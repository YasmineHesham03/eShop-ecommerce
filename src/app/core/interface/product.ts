export interface Product {
  images: string[];
  title: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  ratingsAverage: number;
  id: string;
  isLoading:boolean;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
}

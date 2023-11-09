export interface Cart {
  status: string;
  numOfCartItems: number;
  data: Data;
}

export interface Data {
  products: Products[];
  totalCartPrice: number;
  _id: string;
}

export interface Products {
  count: number;
  product: InnerProduct;
  price: number;
  isAddLoading: boolean;
  isMinusLoading: boolean;
}

export interface InnerProduct {
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  ratingsAverage: number;
  id: string;
}

export interface Category {
  name: string;
}


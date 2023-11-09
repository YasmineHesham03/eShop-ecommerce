export interface Wishlist {
  status: string;
  count: number;
  data: Data[];
}

export interface Data {
  sold: number;
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  isLoading: boolean;
  id: string;
}

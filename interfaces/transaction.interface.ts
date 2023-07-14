export default interface ITransaction {
  _id: string;
  totalPrice: number;
  createdAt: string;
  items: {
    _id: string;
    id: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  showTime: {
    movieId: string;
    movieName: string;
    startTime: string;
    thumbnail: string;
  };
  staff?: {
    _id: string;
    name: string;
  };
  customer?: {
    _id: string;
    name: string;
  };
  tickets: {
    _id: string;
    price: number;
    seat: {
      _id: string;
      name: string;
    };
  }[];
  review?: {
    _id: string;
    score: number;
    description: string;
  };
}

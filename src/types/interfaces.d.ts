interface IOkResponseProps {
  message?: string;
  data?: any;
}

interface INotOkResponseProps {
  message?: string;
  error?: Error | string | undefined;
}

interface IBaseResponseProps {
  message: string;
  status: EResponseStatus;
  data?: IResponseData;
  error?: Error | string;
}

export interface IProductVariant {
  variant_id?: string;
  variant_name: string;
  variant_price?: number;
  variant_stock?: number;
  variant_img?: {
    link: string;
    alt: string;
  };
}

export interface IProductProps {
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  product_avg_rating: number;
  product_img: string;
  lowest_price?: number;
  product_price: number;
  highest_discount?: number;
  price__discount?: number;
  product_sold_quantity?: number;
  category_name: string;
  variant_name: string[];
  product_variants?: IProductVariant[];
}

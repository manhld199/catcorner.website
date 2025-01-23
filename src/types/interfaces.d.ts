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
  _id: string;
  variant_slug: string;
  variant_id: string;
  variant_name: string;
  variant_price: number;
  variant_stock_quantity: number;
  variant_img: string;
  variant_discount_percent: number;
}

export interface IProductSpecification {
  name: string;
  value: string;
}

export interface IRecentReview {
  user_id: string;
  user_name: string;
  user_avt: string;
  review_date: Date;
  variant_name: string;
  review_content: string;
  review_imgs: string[];
  review_vids: string[];
}

export interface IProductProps {
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  product_avg_rating: number;
  product_imgs: string[];
  product_img?: string;
  product_short_description: string;
  product_description: string;
  product_specifications: IProductSpecification[];
  category_id: string;
  product_variants?: IProductVariant[];
  product_rating: {
    rating_point: number;
    rating_count: number;
  };
  recent_reviews: IRecentReview[];
  lowest_price?: number;
  product_price: number;
  highest_discount?: number;
  product_sold_quantity?: number;
  category_name: string;
  variant_name: string[];
}

export interface ICartProduct {
  product_id?: string;
  product_hashed_id?: string;
  variant_id: string;
  quantity: number;
  product_name?: string;
  product_slug?: string;
  product_variants?: IProductVariant[];
}

export interface IProductDetail {
  _id: string;
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  product_imgs: string[];
  product_avg_rating: {
    rating_point: number;
    rating_count: number;
  };
  product_sold_quantity: number;
  product_short_description: string;
  product_description: string;
  product_specifications: ISpecification[];
  product_variants: IVariant[];
  review_count: number[];
  recent_reviews: IReview[];
  createdAt: string;
  updatedAt: string;
}

export interface IVariant {
  variant_name: string;
  variant_slug: string;
  variant_img: string;
  variant_price: number;
  variant_stock_quantity: number;
  variant_discount_percent: number;
  _id: string;
}

export interface IReview {
  id: number;
  user: string;
  date: string;
  rating: number;
  title: string;
  content: string;
}

export interface ISpecification {
  name: string;
  value: string;
}

interface IBuyFormProps {
  pid: string;
  productName: string;
  shortDescription: string;
  avgRating: {
    rating_point: number;
    rating_count: number;
  };
  price: number;
  discountPrice: number;
  variants: {
    variant_name: string;
    variant_slug: string;
    variant_img: string;
    variant_price: number;
    variant_stock_quantity: number;
    variant_discount_percent: number;
    _id: string;
  }[];
  selectedVariantIndex: number;
  inputQuantity: number;
  productSoldQuantity: number;
  onVariantSelect: (index: number) => void;
  onQuantityChange: (newQuantity: number) => void;
}

export interface IArticle {
  article_id_hashed: string;
  article_slug: string;
  article_name: string;
  article_avt: string;
  article_short_description: string;
  article_author_name: string;
  article_published_date: string;
  article_tags: string[];
  article_content: string;
  related_articles: RelatedArticle[];
}

export interface IRelatedArticle {
  article_slug: string;
  article_id_hashed: string;
  article_name: string;
}

export interface ICoupon {
  coupon_name: string;
  coupon_description: string;
  coupon_type: "Free Ship" | "Order";
  coupon_condition: number;
  coupon_unit: "%" | "đ";
  coupon_value: number;
  coupon_max_value: number;
  coupon_stock_quantity: number;
  start_time: string; // ISO 8601 date string
  end_time: string; // ISO 8601 date string
  coupon_id_hashed: string;
  isOwned?: boolean;
}

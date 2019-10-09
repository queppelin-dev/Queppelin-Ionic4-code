export class BusinessInfo {
    id: number;
    name: string;
    address: string;
    review: number;
    review_count: number;
    business_description:string;
    business_timing:[];
    status:string;
    data:any;
  // user:{};
    user: BusinessInfo[];
  business_id: number;
  latitude: any;
  longitude: any;
  ratingPercent: string;
}
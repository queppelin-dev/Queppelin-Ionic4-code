export class BusinessReview {
    push(arg0: any) {
      throw new Error("Method not implemented.");
    }
    business_id: number;
    appointment_id: number;
    users_id_comment:number; 
    review_date: Date;
    review_time: number;
    review_rating: number
    comment: String;
    reply: String;
    user_id_reply: number;
    reply_date: Date;
    reply_time: number;
    user_comment_name: String;
    user_reply_name: String;
    user_comment_logo: String;
    user_reply_logo: String;
    status:string;
    user:[];
    data: any;
}
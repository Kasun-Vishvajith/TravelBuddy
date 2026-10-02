import { BookingDetails } from "@/components/BookingDetails";
export default function BookingPage({params}:{params:{id:string}}) {return <BookingDetails id={params.id} />;}

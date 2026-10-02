import { BookingDetails } from "@/components/BookingDetails";
export default function ConfirmationPage({params}:{params:{id:string}}) {return <BookingDetails id={params.id} confirmation />;}

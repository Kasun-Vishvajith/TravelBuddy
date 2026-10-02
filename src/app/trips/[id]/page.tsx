import { JourneyPlanner } from "@/components/JourneyPlanner";
export default function TripPage({ params }: { params: { id: string } }) { return <JourneyPlanner planId={params.id} />; }

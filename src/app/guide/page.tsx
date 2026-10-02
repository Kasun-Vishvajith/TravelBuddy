import { LocalGuideDemo } from "@/components/LocalGuideDemo";

export default function GuidePage({ searchParams }: { searchParams: { zone?: string; now?: string } }) {
  return <LocalGuideDemo initialZone={searchParams.zone} now={searchParams.now==="1"} />;
}

import { LocalGuideDemo } from "@/components/LocalGuideDemo";

export default function GuidePage({ searchParams }: { searchParams: { zone?: string } }) {
  return <LocalGuideDemo initialZone={searchParams.zone} />;
}

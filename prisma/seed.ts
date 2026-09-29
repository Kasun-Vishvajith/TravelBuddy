import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const traveler = await prisma.user.upsert({ where: { email: "demo@travelbuddy.local" }, update: {}, create: { email: "demo@travelbuddy.local", name: "Maya Chen", passwordHash: "demo", role: "TRAVELER", travelerProfile: { create: { rewardBalance: 1240 } } } });
  const supplierUser = await prisma.user.upsert({ where: { email: "operator@travelbuddy.local" }, update: {}, create: { email: "operator@travelbuddy.local", name: "Ari Perera", passwordHash: "demo", role: "SUPPLIER" } });
  const supplier = await prisma.supplier.upsert({ where: { ownerId: supplierUser.id }, update: {}, create: { ownerId: supplierUser.id, businessName: "Ceylon Compass", verified: true, description: "Small-group local experts across Sri Lanka." } });
  const category = await prisma.category.upsert({ where: { slug: "tours-sightseeing" }, update: {}, create: { name: "Tours & sightseeing", slug: "tours-sightseeing", icon: "Compass" } });
  const destination = await prisma.destination.upsert({ where: { slug: "colombo" }, update: {}, create: { name: "Colombo", slug: "colombo", country: "Sri Lanka", region: "Western Province", description: "A lively coastal capital where Dutch-era lanes, contemporary culture and the Indian Ocean meet.", imageUrl: "https://images.unsplash.com/photo-1586613838677-7a7c3b0c5b40?auto=format&fit=crop&w=1600&q=85" } });
  await prisma.experience.upsert({ where: { slug: "colombo-street-food-night" }, update: {}, create: { supplierId: supplier.id, destinationId: destination.id, categoryId: category.id, title: "Colombo Street Food Night with a Local Host", slug: "colombo-street-food-night", description: "Follow a local host through Colombo's neon-lit food stalls and family-run kitchens.", overview: "Taste your way through the city after dark with a small group of curious travelers.", imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85", images: [], languages: ["English"], duration: "3 hours", rating: 4.9, reviewCount: 382, priceFrom: 42, originalPrice: 52, freeCancellation: true, payLater: true, featured: true, status: "ACTIVE", options: { create: { name: "Small group evening tasting", price: 42, duration: "3 hours", startTimes: ["17:30", "18:30"], languages: ["English"], inclusions: ["Local guide", "8 tastings", "Welcome drink"], capacity: 12 } } } });
  console.log(`Seeded demo traveler ${traveler.email}`);
}

main().finally(() => prisma.$disconnect());

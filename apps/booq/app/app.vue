<script setup lang="ts">
import { Button } from '@starter/ui/atoms';
import { HeroBanner, type HeroBannerProps } from '@starter/ui/organisms';

const router = useRouter();

const heroBanner: HeroBannerProps = {
  layout: "centered",
  content: {
    sectionHeading: {
      title: "Luxury Cars on Rent",
      size: "4xl",
      align: "center",
      as: "h1",
      density: "none",
    },
    description:
      "Explore our vast collection of luxury cars and find your next ride.",
  },
  media: {
    src: "http://car-rental-gs.vercel.app/assets/main_car-hpkzbezO.png",
    alt: "Luxury Car",
    class: "max-h-74",
  },
  background: "muted",
}

</script>

<template>
  <NuxtLayout>
    <HeroBanner v-bind="heroBanner">
      <template #form>
        <form
          class="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">
          <div class="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
            <div class="flex flex-col items-start gap-2">
              <select required>
                <option value="">Pickup Location</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Houston">Houston</option>
                <option value="Chicago">Chicago</option>
              </select>
              <p class="px-1 text-sm text-gray-500">Please select location</p>
            </div>
            <div class="flex flex-col items-start gap-2"><label for="pickup-date">Pick-up Date</label><input
                id="pickup-date" min="2026-01-07" class="text-sm text-gray-500" required type="date" value="">
            </div>
            <div class="flex flex-col items-start gap-2"><label for="return-date">Return Date</label><input
                id="return-date" class="text-sm text-gray-500" required type="date" value="">
            </div>
          </div>
          <Button as="button" rounded="full" size="xl" variant="primary" class="ml-8">Search</Button>
        </form>
      </template>
    </HeroBanner>
  </NuxtLayout>
</template>

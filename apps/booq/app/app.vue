<script setup lang="ts">
import { Button, type OnNavigate } from '@starter/ui/atoms';
import { FormRenderer, HeroBanner, type HeroBannerProps } from '@starter/ui/organisms';
import { useBooking } from '../composables/use-booking';
import { FunnelPageSections } from '@starter/ui/pages';
import { ContentfulType, type SectionType } from '@starter/content';

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

// const locationInput = {
//   placeholder: "Pickup Location",
//   options: [
//     { value: "new-york", label: "New York" },
//     { value: "los-angeles", label: "Los Angeles" },
//     { value: "houston", label: "Houston" },
//     { value: "chicago", label: "Chicago" },
//   ],
// };

const { funnelPage, submitBooking } = useBooking();
const form = funnelPage.value.template.sectionsCollection.items.find(section => section.__typename === ContentfulType.HERO_BANNER)?.form;

const onNavigate: OnNavigate = async (href, event) => {
  if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(href)) return;

  event?.preventDefault();

  const path = href.startsWith("/") ? href : `/${href}`;
  await router.push(path);
};

</script>

<template>
  <NuxtLayout>
    <HeroBanner v-bind="heroBanner">
      <template #form>
        <FormRenderer v-if="form" :form="form" @submit="submitBooking" />
      </template>
    </HeroBanner>
  </NuxtLayout>

  <!-- <FunnelPageSections :funnel-page="funnelPage" :pending="pending" :error="error" :on-navigate="onNavigate" /> -->
</template>

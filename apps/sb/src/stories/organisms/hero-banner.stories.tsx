import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { HeroBanner } from "@starter/ui/organisms";
import { Button } from "@starter/ui/atoms";

const meta = {
    title: "Organisms/Hero Banner",
    component: HeroBanner,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The Hero Banner component is an organism that serves as a prominent section on a webpage, typically used to showcase key information, promotions, or calls to action.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        class: {
            control: { type: "text" },
        },
        layout: {
            control: { type: "select" },
            options: ["split", "centered", "background", "solid"],
        },
        rounded: {
            control: { type: "select" },
            options: ["none", "xs", "sm", "md", "lg", "xl", "full"],
        },
        density: {
            control: { type: "select" },
            options: ["compact", "normal", "spacious"],
        },
        align: {
            control: { type: "select" },
            options: ["left", "center", "right"],
        },
        background: {
            control: { type: "select" },
            options: ["transparent", "primary", "secondary", "muted"],
        },
        columns: {
            control: { type: "select" },
            options: [0, 1, 2, 3],
        },
    },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
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
    },
    render: (args) => ({
        components: { HeroBanner, Button },
        setup: () => ({ args }),
        template: `
            <HeroBanner v-bind="args">
                <template #form><form class="mt-6 flex flex-col sm:flex-row gap-4">
                    <form
                        class="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
                        style="opacity: 1; transform: none;">
                        <div class="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
                            <div class="flex flex-col items-start gap-2">
                            <select required=""><option value="">Pickup Location</option><option value="New York">New York</option><option value="Los Angeles">Los Angeles</option><option value="Houston">Houston</option><option value="Chicago">Chicago</option></select>
                            <p class="px-1 text-sm text-gray-500">Please select location</p>
                            </div>
                            <div class="flex flex-col items-start gap-2"><label for="pickup-date">Pick-up Date</label><input id="pickup-date" min="2026-01-07" class="text-sm text-gray-500" required="" type="date" value="">
                            </div>
                            <div class="flex flex-col items-start gap-2"><label for="return-date">Return Date</label><input id="return-date" class="text-sm text-gray-500" required="" type="date" value="">
                            </div>
                        </div>
                        <button class="ml-8 flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer" tabindex="0" style="transform: none;">Search</button>
                    </form>
                </template>
            </HeroBanner>
        `,
    }),
};

export const Booking: Story = {
    args: {
        layout: "background",
        content: {
            eyebrow: "The Ultimate Hotel Experience",
            sectionHeading: {
                title: "Discover Your Perfect Gateway Destination",
                size: "4xl",
                align: "left",
                as: "h1",
                density: "none",
            },
            description:
                "Unparalleled luxury and comfort await at the world's most exclusive hotels.",
        },
        media: {
            src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            alt: "Luxury Hotel",
            class: "",
        },
        background: "transparent",
    },
    render: (args) => ({
        components: { HeroBanner, Button },
        setup: () => ({ args }),
        template: `
            <HeroBanner v-bind="args">
                <template #form><form class="mt-6 flex flex-col sm:flex-row gap-4">
                    <form
                        class="bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
                        <div>
                            <div class="flex items-center gap-2">
                            <label for="destinationInput">Destination</label>
                            </div>
                            <input list="destinations" id="destinationInput" class=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required="" type="text" value=""><datalist
                            id="destinations">
                            <option value="Dubai"></option>
                            <option value="Singapore"></option>
                            <option value="New York"></option>
                            <option value="London"></option>
                            </datalist>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                            <label for="checkIn">Check in</label>
                            </div><input id="checkIn" class=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" type="date">
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                            <label for="checkOut">Check out</label>
                            </div><input id="checkOut" class=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" type="date">
                        </div>
                        <Button class="flex mt-7 items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"><span>Search</span></Button>
                    </form>
                </template>
            </HeroBanner>
        `,
    }),
};

export const Appointment: Story = {
    args: {
        layout: "solid",
        content: {
            sectionHeading: {
                title: "Book Appointment With Trusted Doctors",
                size: "4xl",
                align: "left",
                as: "h1",
                density: "none",
            },
            description:
                "Experience the best in class service and care with our expert team. Schedule your appointment today and take the first step towards a healthier you.",
            actions: [
                {
                    label: "Book appointment",
                    as: "a",
                    href: "#book",
                    variant: "white",
                    rounded: "full",
                    size: "lg",
                },
            ],
        },
        media: {
            src: "https://prescripto.vercel.app/assets/header_img-DhAi3lLA.png",
            alt: "Book Appointment",
            class: "",
        },
        rounded: "xl",
        density: "tiny",
        background: "primary",
    },
};

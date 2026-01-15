import { ContentfulType, type FormType } from "@starter/content";
import { ref } from "vue";

export const useBooking = () => {
    const funnelPage = ref(EXAMPLE_BOOKING.data);

    const booking = ref({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: 1,
    });

    const submitBooking = (data: Record<string, any>) => {
        // Here you would typically send the booking data to your backend or an API
        console.log("Booking submitted:", data);
    };

    return {
        funnelPage,
        booking,
        submitBooking,
    };
};

const EXAMPLE_BOOKING = {
    data: {
        __typename: ContentfulType.FUNNEL_PAGE,
        sys: {
            id: "funnel-page-booking-example",
            __typename: "Sys",
        },
        slug: "rent-a-car",
        theme: "theme-twitch",
        showBackButton: true,
        skipWrapper: true,
        footer: {
            sys: {
                id: "booking-footer",
                __typename: "Sys",
            },
            __typename: ContentfulType.FOOTER,
            name: "Main Footer > All pages",
        },
        navBar: {
            sys: {
                id: "booking-navbar",
                __typename: "Sys",
            },
            __typename: ContentfulType.NAVBAR,
            name: "Home Page > Navbar",
            sticky: false,
            showBorder: false,
            linksCollection: {
                items: [
                    { label: "Home", href: "/" },
                    { label: "Cars", href: "/cars" },
                ],
            },
        },
        template: {
            __typename: ContentfulType.TEMPLATE,
            sys: {
                id: "5dGRTTlhH4XvCKwbVQKz2L",
                __typename: "Sys",
            },
            name: "Booking Template",
            sectionsCollection: {
                items: [
                    {
                        __typename: ContentfulType.HERO_BANNER,
                        sys: {
                            id: "rent-a-car-hero-banner",
                            __typename: "Sys",
                        },
                        sectionHeading: {
                            title: "Luxury cars on Rent",
                            subtitle: "Book your car today!",
                        },
                        description:
                            "Choose from our wide range of luxury cars and enjoy your ride.",
                        media: {
                            src: "https://images.ctfassets.net/4cd45et68cgf/5dGRTTlhH4XvCKwbVQKz2L/1c9e7b8c9e1a0b3e5c8e9a1d2f3a4b5/rent-a-car-hero-banner.jpg",
                            alt: "Luxury cars on Rent",
                        },
                        actions: [],
                        form: {
                            __typename: ContentfulType.FORM,
                            sys: {
                                id: "booking-form",
                                __typename: "Sys",
                            },
                            name: "Booking Form",
                            validateOnChange: true,
                            variant: "inline",
                            submitEndpoint: "/api/booking",
                            submitLabel: "Search",
                            fieldsCollection: {
                                items: [
                                    {
                                        __typename: ContentfulType.FORM_FIELD,
                                        sys: {
                                            id: "location-field",
                                            __typename: "Sys",
                                        },
                                        name: "location",
                                        label: "Pickup Location",
                                        defaultValue: "",
                                        description:
                                            "Where do you want to pick up the car?",
                                        type: "text" as FormType,
                                        placeholder: "Enter pickup location",
                                        validation: {
                                            required: true,
                                            errorMessage:
                                                "Pickup location is required",
                                        },
                                    },
                                    {
                                        __typename: ContentfulType.FORM_FIELD,
                                        sys: {
                                            id: "pickup-date-field",
                                            __typename: "Sys",
                                        },
                                        name: "pickupDate",
                                        label: "Pickup Date",
                                        defaultValue: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        description:
                                            "When do you want to pick up the car?",
                                        type: "date" as FormType,
                                        placeholder: "Select pickup date",
                                        validation: {
                                            required: true,
                                            errorMessage:
                                                "Pickup date is required",
                                        },
                                    },
                                    {
                                        __typename: ContentfulType.FORM_FIELD,
                                        sys: {
                                            id: "return-date-field",
                                            __typename: "Sys",
                                        },
                                        name: "returnDate",
                                        label: "Return Date",
                                        description:
                                            "When do you want to drop off the car?",
                                        type: "date" as FormType,
                                        placeholder: "Select return date",
                                        validation: {
                                            required: true,
                                            errorMessage:
                                                "Return date is required",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        },
    },
};

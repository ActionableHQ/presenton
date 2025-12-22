import React from 'react'
import * as z from "zod";

export const layoutId = 'thank-you-slide'
export const layoutName = 'Thank You Slide'
export const layoutDescription = 'A closing slide layout with thank you message and contact information.'

const thankYouSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Thank You').meta({
        description: "Main title of the slide",
    }),
    subtitle: z.string().min(5).max(100).default('Questions and Discussion').meta({
        description: "Subtitle text",
    }),
    contactLabel: z.string().min(5).max(100).default('For additional information, please contact:').meta({
        description: "Contact label text",
    }),
    contactInfo: z.string().min(5).max(100).default('strategy@company.com').meta({
        description: "Contact information (email, phone, etc.)",
    })
})

export const Schema = thankYouSlideSchema

export type ThankYouSlideData = z.infer<typeof thankYouSlideSchema>

interface ThankYouSlideLayoutProps {
    data?: Partial<ThankYouSlideData>
}

const ThankYouSlideLayout: React.FC<ThankYouSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const subtitle = data.subtitle || "";
    const contactLabel = data.contactLabel || "";
    const contactInfo = data.contactInfo || "";

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-center justify-center px-24" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl text-center">
                    <div className="w-16 h-1 mx-auto mb-6 bg-[#0d74f2]"></div>                    <h2 className="font-funnel text-4xl font-semibold mb-6 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-base text-gray-600 mb-8">
                        {subtitle}
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p>{contactLabel}</p>
                        <p className="font-medium text-black mt-2">{contactInfo}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThankYouSlideLayout

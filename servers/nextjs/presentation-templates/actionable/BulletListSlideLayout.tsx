import React from 'react'
import * as z from "zod";

export const layoutId = 'bullet-list-slide'
export const layoutName = 'Bullet List Slide'
export const layoutDescription = 'A slide layout for structured bullet points with headings, descriptions, and metadata.'

const bulletItemSchema = z.object({
    heading: z.string().min(3).max(80).default('1. International Expansion').meta({
        description: "Item heading",
    }),
    description: z.string().min(20).max(400).default('Launch operations in three new markets: Japan, Germany, and Singapore. Establish local teams and partnerships to support go-to-market efforts.').meta({
        description: "Item description",
    }),
    metadata: z.string().min(5).max(100).default('Timeline: Q1-Q2 2025 • Owner: Global Operations Team').meta({
        description: "Additional metadata (timeline, owner, etc.)",
    })
})

const bulletListSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Strategic Initiatives for Q1 2025').meta({
        description: "Main title of the slide",
    }),
    items: z.array(bulletItemSchema).min(1).max(3).default([
        {
            heading: '1. International Expansion',
            description: 'Launch operations in three new markets: Japan, Germany, and Singapore. Establish local teams and partnerships to support go-to-market efforts.',
            metadata: 'Timeline: Q1-Q2 2025 • Owner: Global Operations Team'
        },
        {
            heading: '2. AI Product Enhancement',
            description: 'Integrate advanced AI capabilities including predictive analytics, automated insights, and intelligent recommendations to enhance core product value proposition.',
            metadata: 'Timeline: Q1 2025 • Owner: Product & Engineering'
        },
        {
            heading: '3. Enterprise Sales Acceleration',
            description: 'Double enterprise sales team capacity and implement new sales enablement tools. Focus on Fortune 500 accounts with dedicated support.',
            metadata: 'Timeline: Q1 2025 • Owner: Sales & Marketing'
        }
    ]).meta({
        description: "List of bullet items with details",
    })
})

export const Schema = bulletListSlideSchema

export type BulletListSlideData = z.infer<typeof bulletListSlideSchema>

interface BulletListSlideLayoutProps {
    data?: Partial<BulletListSlideData>
}

const BulletListSlideLayout: React.FC<BulletListSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const items = data.items || [];

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-8 tracking-tight">
                        {title}
                    </h2>
                    <div className="space-y-6">
                        {items.map((item, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-base mb-3 text-[#0d74f2]">{item.heading}</h3>
                                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                    {item.description}
                                </p>
                                <div className="text-xs text-gray-500">{item.metadata}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default BulletListSlideLayout

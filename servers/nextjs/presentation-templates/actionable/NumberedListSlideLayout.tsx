import React from 'react'
import * as z from "zod";

export const layoutId = 'numbered-list-slide'
export const layoutName = 'Numbered List Slide'
export const layoutDescription = 'A slide layout with numbered items, each containing a title and detailed description.'

const numberedItemSchema = z.object({
    title: z.string().min(3).max(80).default('Customer Research & Insights').meta({
        description: "Item title",
    }),
    description: z.string().min(20).max(300).default('Conduct comprehensive market research to understand customer needs, pain points, and preferences. Gather insights through surveys, interviews, and data analysis to inform product development.').meta({
        description: "Item description",
    })
})

const numberedListSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Implementation Roadmap').meta({
        description: "Main title of the slide",
    }),
    items: z.array(numberedItemSchema).min(1).max(3).default([
        {
            title: 'Customer Research & Insights',
            description: 'Conduct comprehensive market research to understand customer needs, pain points, and preferences. Gather insights through surveys, interviews, and data analysis to inform product development.'
        },
        {
            title: 'MVP Development & Testing',
            description: 'Build a minimum viable product focusing on core features that solve key customer problems. Conduct iterative testing with early adopters to validate assumptions and gather feedback.'
        },
        {
            title: 'Go-to-Market Strategy',
            description: 'Develop comprehensive launch strategy including positioning, messaging, and channel selection. Execute pilot programs with target customers to refine approach before full-scale launch.'
        }
    ]).meta({
        description: "List of numbered items with descriptions",
    })
})

export const Schema = numberedListSlideSchema

export type NumberedListSlideData = z.infer<typeof numberedListSlideSchema>

interface NumberedListSlideLayoutProps {
    data?: Partial<NumberedListSlideData>
}

const NumberedListSlideLayout: React.FC<NumberedListSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const items = data.items || [];

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-10 tracking-tight">
                        {title}
                    </h2>
                    <div className="space-y-6">
                        {items.map((item, index) => (
                            <div key={index} className="flex gap-6 p-5 rounded-lg bg-[#fafafa]">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0d74f2] text-white flex items-center justify-center font-semibold text-lg">
                                    {index + 1}
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default NumberedListSlideLayout

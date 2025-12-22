import React from 'react'
import * as z from "zod";

export const layoutId = 'two-column-slide'
export const layoutName = 'Two Column Slide'
export const layoutDescription = 'A two-column slide layout for comparisons, contrasts, or parallel content.'

const columnSchema = z.object({
    heading: z.string().min(2).max(50).default('Strengths').meta({
        description: "Column heading",
    }),
    items: z.array(z.string().min(10).max(200)).min(1).max(8).default([
        'Strong brand recognition in target markets with 78% awareness among enterprise buyers',
        'Best-in-class customer support with industry-leading response times',
        'Robust product ecosystem with 150+ integrations and growing partner network',
        'High customer retention and expansion rates driven by product stickiness'
    ]).meta({
        description: "Bullet point items for the column",
    })
})

const twoColumnSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Market Position Analysis').meta({
        description: "Main title of the slide",
    }),
    leftColumn: columnSchema.default({
        heading: 'Strengths',
        items: [
            'Strong brand recognition in target markets with 78% awareness among enterprise buyers',
            'Best-in-class customer support with industry-leading response times',
            'Robust product ecosystem with 150+ integrations and growing partner network',
            'High customer retention and expansion rates driven by product stickiness'
        ]
    }).meta({
        description: "Left column content",
    }),
    rightColumn: columnSchema.default({
        heading: 'Opportunities',
        items: [
            'International expansion into APAC and EMEA regions with localized offerings',
            'AI/ML features to enhance product capabilities and competitive positioning',
            'Adjacent market segments showing strong demand for our core technology',
            'Strategic partnerships with complementary platforms to extend market reach'
        ]
    }).meta({
        description: "Right column content",
    })
})

export const Schema = twoColumnSlideSchema

export type TwoColumnSlideData = z.infer<typeof twoColumnSlideSchema>

interface TwoColumnSlideLayoutProps {
    data?: Partial<TwoColumnSlideData>
}

const TwoColumnSlideLayout: React.FC<TwoColumnSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const leftColumn = data.leftColumn || { heading: "", items: [] };
    const rightColumn = data.rightColumn || { heading: "", items: [] };

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-10 tracking-tight">
                        {title}
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-6 rounded-lg bg-[#fafafa]">
                            <h3 className="font-semibold text-lg mb-4 text-[#0d74f2]">{leftColumn.heading}</h3>
                            <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                                {leftColumn.items.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 rounded-lg bg-[#fafafa]">
                            <h3 className="font-semibold text-lg mb-4 text-[#0d74f2]">{rightColumn.heading}</h3>
                            <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                                {rightColumn.items.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TwoColumnSlideLayout

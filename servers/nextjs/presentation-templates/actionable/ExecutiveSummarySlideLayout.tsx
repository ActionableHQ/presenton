import React from 'react'
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'executive-summary-slide'
export const layoutName = 'Executive Summary Slide'
export const layoutDescription = 'A slide layout for executive summary with paragraphs and a highlighted key takeaway box.'

const executiveSummarySlideSchema = z.object({
    title: z.string().min(3).max(50).default('Executive Summary').meta({
        description: "Main title of the slide",
    }),
    paragraphs: z.array(z.string().min(50).max(500)).min(1).max(5).default([
        'Q4 2024 marked a period of significant growth and operational excellence. The company achieved record revenue of $45.2M, representing a 28% increase year-over-year. Customer acquisition exceeded targets by 15%, with particularly strong performance in the enterprise segment.',
        'Our product development initiatives delivered three major feature releases that received positive market reception. Customer satisfaction scores improved to 4.7/5.0, with Net Promoter Score increasing from 58 to 65.',
        'Looking ahead to Q1 2025, we are well-positioned to continue this momentum. Key priorities include expanding our international presence, investing in AI capabilities, and strengthening our partner ecosystem.'
    ]).meta({
        description: "Main content paragraphs",
    }),
    keyTakeawayTitle: z.string().min(3).max(30).default('Key Takeaway').meta({
        description: "Title for the key takeaway box",
    }),
    keyTakeawayText: z.string().min(20).max(200).default('Strong fundamentals and strategic execution position us for continued growth in 2025.').meta({
        description: "Key takeaway message",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        __image_prompt__: 'Professional business team celebrating success and achievement'
    }).optional().meta({
        description: "Optional supporting image for the slide",
    })
})

export const Schema = executiveSummarySlideSchema

export type ExecutiveSummarySlideData = z.infer<typeof executiveSummarySlideSchema>

interface ExecutiveSummarySlideLayoutProps {
    data?: Partial<ExecutiveSummarySlideData>
}

const ExecutiveSummarySlideLayout: React.FC<ExecutiveSummarySlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const paragraphs = data.paragraphs || [];
    const keyTakeawayTitle = data.keyTakeawayTitle || "";
    const keyTakeawayText = data.keyTakeawayText || "";

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-8 tracking-tight">
                        {title}
                    </h2>
                    <div className="space-y-6 text-base text-gray-700 leading-relaxed">
                        {paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        <div className="mt-8 p-6 bg-[#fafafa] border-l-4 border-[#0d74f2] rounded">
                            <p className="text-sm font-medium text-[#0d74f2]">{keyTakeawayTitle}</p>
                            <p className="text-sm text-gray-600 mt-1">{keyTakeawayText}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ExecutiveSummarySlideLayout

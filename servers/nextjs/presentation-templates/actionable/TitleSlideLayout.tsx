import React from 'react'
import * as z from "zod";

export const layoutId = 'title-slide'
export const layoutName = 'Title Slide'
export const layoutDescription = 'A clean slide layout with title, subtitle, and optional metadata.'

const titleSlideSchema = z.object({
    title: z.string().min(3).max(100).default('Quarterly Business Review\nQ4 2024').meta({
        description: "Main title of the slide (use \\n for line breaks)",
    }),
    subtitle: z.string().min(5).max(150).default('Company Performance and Strategic Initiatives').meta({
        description: "Subtitle text",
    }),
    preparedBy: z.string().min(2).max(100).default('Strategy Team').optional().meta({
        description: "Who prepared the presentation (optional)",
    }),
    date: z.string().min(3).max(50).default('December 22, 2024').optional().meta({
        description: "Presentation date (optional)",
    })
})

export const Schema = titleSlideSchema

export type TitleSlideData = z.infer<typeof titleSlideSchema>

interface TitleSlideLayoutProps {
    data?: Partial<TitleSlideData>
}

const TitleSlideLayout: React.FC<TitleSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || ""
    const subtitle = data.subtitle || ""
    const preparedBy = data.preparedBy || ""
    const date = data.date || new Date().toLocaleDateString()

    // Split title by \n for line breaks
    const titleLines = title.split('\n')

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-center justify-center px-24" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="w-1/2">
                    <div className="w-16 h-1 bg-[#0d74f2] mb-6"></div>
                    <h1 className="font-funnel text-5xl font-semibold tracking-tight mb-6 leading-tight">
                        {titleLines.map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < titleLines.length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className="font-geist text-lg text-gray-600 mb-8">
                        {subtitle}
                    </p>
                    {(preparedBy || date) && (
                        <div className="text-sm text-gray-500 space-y-1">
                            {preparedBy && <p>Prepared by: {preparedBy}</p>}
                            {date && <p>Date: {date}</p>}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default TitleSlideLayout 
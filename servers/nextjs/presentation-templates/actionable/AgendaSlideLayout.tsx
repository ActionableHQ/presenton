import React from 'react'
import * as z from "zod";

export const layoutId = 'agenda-slide'
export const layoutName = 'Agenda Slide'
export const layoutDescription = 'A clean agenda slide layout with numbered items and descriptions.'

const agendaItemSchema = z.object({
    number: z.string().max(3).default('01').meta({
        description: "Item number",
    }),
    title: z.string().min(3).max(50).default('Executive Summary').meta({
        description: "Item title",
    }),
    description: z.string().min(5).max(100).default('Overview of quarterly performance').meta({
        description: "Item description",
    })
})

const agendaSlideSchema = z.object({
    title: z.string().min(3).max(40).default('Agenda').meta({
        description: "Main title of the slide",
    }),
    items: z.array(agendaItemSchema).min(1).max(8).default([
        { number: '01', title: 'Executive Summary', description: 'Overview of quarterly performance' },
        { number: '02', title: 'Key Metrics', description: 'Revenue, growth, and operational statistics' },
        { number: '03', title: 'Market Analysis', description: 'Competitive landscape and opportunities' },
        { number: '04', title: 'Strategic Initiatives', description: 'Key projects and roadmap for next quarter' },
        { number: '05', title: 'Recommendations', description: 'Action items and next steps' }
    ]).meta({
        description: "List of agenda items",
    })
})

export const Schema = agendaSlideSchema

export type AgendaSlideData = z.infer<typeof agendaSlideSchema>

interface AgendaSlideLayoutProps {
    data?: Partial<AgendaSlideData>
}

const AgendaSlideLayout: React.FC<AgendaSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {};
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
                    <div className="space-y-5 text-base text-gray-700 leading-relaxed">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-start">
                                <span className="mr-6 font-medium text-[#0d74f2]">{item.number}</span>
                                <div>
                                    <p className="font-medium text-black mb-1">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AgendaSlideLayout

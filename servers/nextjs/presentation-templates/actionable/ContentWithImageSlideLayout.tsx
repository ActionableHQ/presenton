import React from 'react'
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'content-with-image-slide'
export const layoutName = 'Content with Image Slide'
export const layoutDescription = 'A two-column slide layout with an image on one side and content sections on the other.'

const contentSectionSchema = z.object({
    heading: z.string().min(3).max(60).default('Advanced Analytics Dashboard').meta({
        description: "Section heading",
    }),
    text: z.string().min(20).max(300).default('New real-time analytics provide deeper insights into customer behavior and product usage patterns. Features include customizable reports, automated alerts, and predictive modeling.').meta({
        description: "Section content text",
    })
})

const contentWithImageSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Product Updates').meta({
        description: "Main title of the slide",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        __image_prompt__: 'Modern dashboard interface with analytics and data visualization'
    }).meta({
        description: "Main image for the slide",
    }),
    imageCaption: z.string().min(5).max(100).default('New dashboard interface released in November').meta({
        description: "Caption for the image",
    }),
    contentSections: z.array(contentSectionSchema).min(1).max(5).default([
        {
            heading: 'Advanced Analytics Dashboard',
            text: 'New real-time analytics provide deeper insights into customer behavior and product usage patterns. Features include customizable reports, automated alerts, and predictive modeling.'
        },
        {
            heading: 'API v3.0 Launch',
            text: 'Complete API overhaul with improved performance, better documentation, and enhanced security features. Migration support provided for all existing customers.'
        },
        {
            heading: 'Mobile App Redesign',
            text: 'Rebuilt from the ground up with focus on speed and usability. Early user feedback shows 40% improvement in task completion time.'
        }
    ]).meta({
        description: "Content sections with headings and text",
    })
})

export const Schema = contentWithImageSlideSchema

export type ContentWithImageSlideData = z.infer<typeof contentWithImageSlideSchema>

interface ContentWithImageSlideLayoutProps {
    data?: Partial<ContentWithImageSlideData>
}

const ContentWithImageSlideLayout: React.FC<ContentWithImageSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const image = data.image;
    const imageCaption = data.imageCaption || "";
    const contentSections = data.contentSections || [];

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-8 tracking-tight">
                        {title}
                    </h2>
                    <div className="grid grid-cols-2 gap-12 items-start">
                        <div>
                            {image && (
                                <div className="bg-gray-100 rounded-lg aspect-video mb-4 flex items-center justify-center overflow-hidden">
                                    <img src={image.__image_url__} alt={image.__image_prompt__} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            )}
                            <p className="text-xs text-gray-500">{imageCaption}</p>
                        </div>
                        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                            {contentSections.map((section, index) => (
                                <div key={index} className="p-5 rounded-lg bg-[#fafafa]">
                                    <h3 className="font-semibold mb-2 text-[#0d74f2]">{section.heading}</h3>
                                    <p>{section.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContentWithImageSlideLayout

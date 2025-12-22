import React from 'react'
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'feature-grid-slide'
export const layoutName = 'Feature Grid Slide'
export const layoutDescription = 'A grid-based layout displaying features or capabilities with icons, titles, and descriptions.'

const featureItemSchema = z.object({
    icon: IconSchema.default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg',
        __icon_query__: 'rocket launch innovation'
    }).meta({
        description: "Feature icon",
    }),
    title: z.string().min(2).max(50).default('Advanced Analytics').meta({
        description: "Feature title",
    }),
    description: z.string().min(10).max(150).default('Real-time data visualization and insights to make informed business decisions quickly and effectively.').meta({
        description: "Feature description",
    })
})

const featureGridSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Platform Capabilities').meta({
        description: "Main title of the slide",
    }),
    subtitle: z.string().min(0).max(100).default('Comprehensive features designed to streamline your workflow').meta({
        description: "Optional subtitle",
    }),
    features: z.array(featureItemSchema).min(2).max(6).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'chart analytics data'
            },
            title: 'Advanced Analytics',
            description: 'Real-time data visualization and insights to make informed business decisions quickly and effectively.'
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg',
                __icon_query__: 'rocket speed performance'
            },
            title: 'Lightning Fast',
            description: 'Optimized performance with sub-second response times ensuring smooth user experience at scale.'
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'shield security protection'
            },
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance with industry standards to keep your data protected.'
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-four-bold.svg',
                __icon_query__: 'users team collaboration'
            },
            title: 'Team Collaboration',
            description: 'Seamless collaboration tools for teams to work together efficiently across departments.'
        }
    ]).meta({
        description: "List of features with icons",
    })
})

export const Schema = featureGridSlideSchema

export type FeatureGridSlideData = z.infer<typeof featureGridSlideSchema>

interface FeatureGridSlideLayoutProps {
    data?: Partial<FeatureGridSlideData>
}

const FeatureGridSlideLayout: React.FC<FeatureGridSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const subtitle = data.subtitle || "";
    const features = data.features || [];

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-2 tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-gray-600 mb-10">
                            {subtitle}
                        </p>
                    )}
                    <div className={`grid gap-8 ${features.length <= 2 ? 'grid-cols-2' : features.length === 3 ? 'grid-cols-3' : features.length === 4 ? 'grid-cols-2' : features.length === 5 ? 'grid-cols-3' : 'grid-cols-3'}`}>
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col p-6 rounded-lg bg-[#fafafa]">
                                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#0d74f2]/10">
                                    <RemoteSvgIcon 
                                        url={feature.icon?.__icon_url__ || ''} 
                                        className="w-6 h-6 text-[#0d74f2]"
                                    />
                                </div>
                                <h3 className="font-semibold text-base mb-2 text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeatureGridSlideLayout

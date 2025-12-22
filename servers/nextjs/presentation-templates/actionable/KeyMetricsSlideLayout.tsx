import React from 'react'
import * as z from "zod";

export const layoutId = 'key-metrics-slide'
export const layoutName = 'Key Metrics Slide'
export const layoutDescription = 'A slide layout displaying key performance metrics in a grid with additional detail rows.'

const metricBoxSchema = z.object({
    label: z.string().min(2).max(30).default('Revenue').meta({
        description: "Metric label",
    }),
    value: z.string().min(1).max(20).default('$45.2M').meta({
        description: "Metric value",
    }),
    change: z.string().min(1).max(20).default('+28% YoY').meta({
        description: "Change indicator",
    })
})

const metricRowSchema = z.object({
    label: z.string().min(2).max(50).default('Gross Margin').meta({
        description: "Row label",
    }),
    value: z.string().min(1).max(20).default('73%').meta({
        description: "Row value",
    })
})

const keyMetricsSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Key Performance Metrics').meta({
        description: "Main title of the slide",
    }),
    metrics: z.array(metricBoxSchema).min(1).max(4).default([
        { label: 'Revenue', value: '$45.2M', change: '+28% YoY' },
        { label: 'Active Customers', value: '12,450', change: '+35% YoY' },
        { label: 'Net Retention', value: '118%', change: '+5pts YoY' }
    ]).meta({
        description: "Top metric boxes",
    }),
    detailRows: z.array(metricRowSchema).min(0).max(8).default([
        { label: 'Gross Margin', value: '73%' },
        { label: 'Customer Acquisition Cost', value: '$1,240' },
        { label: 'Average Contract Value', value: '$8,500' },
        { label: 'Churn Rate', value: '2.3%' }
    ]).meta({
        description: "Additional metric rows",
    })
})

export const Schema = keyMetricsSlideSchema

export type KeyMetricsSlideData = z.infer<typeof keyMetricsSlideSchema>

interface KeyMetricsSlideLayoutProps {
    data?: Partial<KeyMetricsSlideData>
}

const KeyMetricsSlideLayout: React.FC<KeyMetricsSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const metrics = data.metrics || [];
    const detailRows = data.detailRows || [];

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-10 tracking-tight">
                        {title}
                    </h2>
                    <div className="grid grid-cols-3 gap-8 mb-10">
                        {metrics.map((metric, index) => (
                            <div key={index} className="border-2 border-[#0d74f2] p-6 bg-[#fafafa]">
                                <div className="text-sm text-gray-500 mb-2">{metric.label}</div>
                                <div className="font-funnel text-4xl font-semibold mb-1 text-[#0d74f2]">{metric.value}</div>
                                <div className="text-sm text-gray-600">{metric.change}</div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4 text-sm text-gray-700">
                        {detailRows.map((row, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span>{row.label}</span>
                                <span className="font-medium">{row.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default KeyMetricsSlideLayout

import React from 'react'
import * as z from "zod";

export const layoutId = 'quote-slide'
export const layoutName = 'Quote Slide'
export const layoutDescription = 'A slide layout for displaying quotes or testimonials with attribution.'

const quoteSchema = z.object({
    text: z.string().min(30).max(400).default('This platform has transformed how our team collaborates. The efficiency gains have been remarkable, and the support team is incredibly responsive. We\'ve seen a 40% reduction in project delivery times.').meta({
        description: "Quote text",
    }),
    author: z.string().min(3).max(100).default('Sarah Chen, Director of Operations, TechCorp Inc.').meta({
        description: "Quote attribution (name and title)",
    })
})

const quoteSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Customer Feedback').meta({
        description: "Main title of the slide",
    }),
    quotes: z.array(quoteSchema).min(1).max(4).default([
        {
            text: 'This platform has transformed how our team collaborates. The efficiency gains have been remarkable, and the support team is incredibly responsive. We\'ve seen a 40% reduction in project delivery times.',
            author: 'Sarah Chen, Director of Operations, TechCorp Inc.'
        },
        {
            text: 'The analytics capabilities are best-in-class. We now have visibility into metrics that were previously impossible to track. The ROI has been immediate and substantial.',
            author: 'Michael Rodriguez, VP of Marketing, Global Ventures'
        },
        {
            text: 'Implementation was seamless, and the training resources are excellent. Our entire organization was up and running within two weeks. Highly recommend for any growing business.',
            author: 'Jennifer Park, CTO, Innovation Labs'
        }
    ]).meta({
        description: "List of quotes/testimonials",
    }),
    backgroundColor: z.string().default('black').meta({
        description: "Background color (black or white)",
    })
})

export const Schema = quoteSlideSchema

export type QuoteSlideData = z.infer<typeof quoteSlideSchema>

interface QuoteSlideLayoutProps {
    data?: Partial<QuoteSlideData>
}

const QuoteSlideLayout: React.FC<QuoteSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const quotes = data.quotes || [];
    const backgroundColor = data.backgroundColor || "black";
    
    const isDark = backgroundColor === 'black'
    const bgColor = isDark ? 'bg-black' : 'bg-white'
    const textColor = isDark ? 'text-white' : 'text-black'
    const borderColor = '#0d74f2'
    const quoteTextColor = isDark ? 'text-gray-200' : 'text-gray-700'
    const authorTextColor = isDark ? 'text-gray-400' : 'text-gray-500'
    const pageNumberColor = isDark ? 'text-gray-300' : 'text-gray-400'

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className={`w-full h-full flex relative ${bgColor} ${textColor} items-start justify-start px-24 py-20`} style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: isDark ? "#000000" : "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className={`font-funnel text-3xl font-semibold mb-10 tracking-tight ${textColor}`}>
                        {title}
                    </h2>
                    <div className="space-y-8">
                        {quotes.map((quote, index) => (
                            <div key={index} className="border-l-2 border-[#0d74f2] pl-6">
                                <p className={`text-base italic mb-4 leading-relaxed ${quoteTextColor}`}>
                                    "{quote.text}"
                                </p>
                                <p className={`text-sm ${authorTextColor}`}>— {quote.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default QuoteSlideLayout

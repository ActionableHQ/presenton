import React from 'react'
import * as z from "zod";

export const layoutId = 'data-table-slide'
export const layoutName = 'Data Table Slide'
export const layoutDescription = 'A slide layout with a data table and optional notes below.'

const columnHeaderSchema = z.object({
    key: z.string().min(1).max(30).default('col1').meta({
        description: "Unique key for this column",
    }),
    label: z.string().min(1).max(50).default('Column').meta({
        description: "Display label for the column header",
    }),
    align: z.enum(['left', 'center', 'right']).default('left').meta({
        description: "Text alignment for this column",
    })
})

const dataTableSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Revenue Breakdown by Segment').meta({
        description: "Main title of the slide",
    }),
    columnHeaders: z.array(columnHeaderSchema).min(1).max(5).default([
        { key: 'segment', label: 'Segment', align: 'left' },
        { key: 'current', label: 'Q4 2024', align: 'right' },
        { key: 'previous', label: 'Q4 2023', align: 'right' },
        { key: 'growth', label: 'Growth', align: 'right' },
        { key: 'percent', label: '% of Total', align: 'right' }
    ]).meta({
        description: "Table column headers with keys and labels",
    }),
    rows: z.array(z.record(z.string(), z.string())).min(1).max(10).default([
        { segment: 'Enterprise', current: '$28.4M', previous: '$21.2M', growth: '+34%', percent: '63%' },
        { segment: 'Mid-Market', current: '$12.1M', previous: '$9.8M', growth: '+23%', percent: '27%' },
        { segment: 'Small Business', current: '$4.7M', previous: '$4.3M', growth: '+9%', percent: '10%' }
    ]).meta({
        description: "Table data rows (keys must match columnHeaders keys)",
    }),
    totalRow: z.record(z.string(), z.string()).optional().default({
        segment: 'Total',
        current: '$45.2M',
        previous: '$35.3M',
        growth: '+28%',
        percent: '100%'
    }).meta({
        description: "Total row (will be styled differently, optional)",
    }),
    notes: z.array(z.string().min(20).max(500)).min(0).max(3).default([
        'Key Observations: Enterprise segment continues to drive majority of revenue growth, with average deal size increasing from $45K to $62K. Mid-market segment shows healthy growth with improved conversion rates from free trials.',
        'Small business segment remains stable, with focus shifting to higher-value customers. The company is strategically moving upmarket while maintaining strong support for existing SMB customers.'
    ]).meta({
        description: "Notes below the table",
    })
})

export const Schema = dataTableSlideSchema

export type DataTableSlideData = z.infer<typeof dataTableSlideSchema>

interface DataTableSlideLayoutProps {
    data?: Partial<DataTableSlideData>
}

const DataTableSlideLayout: React.FC<DataTableSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const columnHeaders = data.columnHeaders || [];
    const rows = data.rows || [];
    const totalRow = data.totalRow
    const notes = data.notes || [];

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-4xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-8 tracking-tight">
                        {title}
                    </h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-[#0d74f2]">
                                {columnHeaders.map((header, index) => (
                                    <th 
                                        key={index} 
                                        className={`text-${header.align} py-3 font-semibold`}
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-gray-200">
                                    {columnHeaders.map((header, colIndex) => (
                                        <td 
                                            key={colIndex} 
                                            className={`py-3 text-${header.align} ${header.key === 'growth' ? 'text-black font-medium' : ''}`}
                                        >
                                            {row[header.key] || ''}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {totalRow && (
                                <tr className="border-b-2 border-black font-semibold text-black">
                                    {columnHeaders.map((header, colIndex) => (
                                        <td 
                                            key={colIndex} 
                                            className={`py-3 text-${header.align}`}
                                        >
                                            {totalRow[header.key] || ''}
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {notes.length > 0 && (
                        <div className="mt-8 space-y-3 text-sm text-gray-700 leading-relaxed">
                            {notes.map((note, index) => (
                                <p key={index}>
                                    {index === 0 && note.startsWith('Key Observations:') ? (
                                        <>
                                            <strong>Key Observations:</strong> {note.replace('Key Observations:', '').trim()}
                                        </>
                                    ) : (
                                        note
                                    )}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default DataTableSlideLayout

import React from 'react'
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'team-members-slide'
export const layoutName = 'Team Members Slide'
export const layoutDescription = 'A slide layout showcasing key team members with photos, names, roles, and brief descriptions.'

const teamMemberSchema = z.object({
    name: z.string().min(2).max(50).default('Sarah Chen').meta({
        description: "Team member's full name",
    }),
    role: z.string().min(2).max(50).default('Chief Executive Officer').meta({
        description: "Job title or role",
    }),
    description: z.string().min(10).max(200).default('15+ years experience in scaling B2B SaaS companies. Previously led product at Fortune 500 tech companies.').meta({
        description: "Brief professional description",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        __image_prompt__: 'Professional businesswoman CEO headshot portrait'
    }).meta({
        description: "Team member photo",
    })
})

const teamMembersSlideSchema = z.object({
    title: z.string().min(3).max(50).default('Leadership Team').meta({
        description: "Main title of the slide",
    }),
    subtitle: z.string().min(0).max(150).default('Experienced leaders with proven track records in building and scaling successful technology companies.').meta({
        description: "Optional subtitle or team description",
    }),
    members: z.array(teamMemberSchema).min(2).max(4).default([
        {
            name: 'Sarah Chen',
            role: 'Chief Executive Officer',
            description: '15+ years experience in scaling B2B SaaS companies. Previously led product at Fortune 500 tech companies.',
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                __image_prompt__: 'Professional businesswoman CEO headshot portrait'
            }
        },
        {
            name: 'Michael Rodriguez',
            role: 'Chief Technology Officer',
            description: 'Expert in distributed systems and AI/ML. Former tech lead at leading cloud infrastructure companies.',
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                __image_prompt__: 'Professional businessman CTO headshot portrait'
            }
        },
        {
            name: 'Emily Thompson',
            role: 'Chief Operating Officer',
            description: 'Specializes in operational excellence and go-to-market strategies. MBA from Stanford GSB.',
            image: {
                __image_url__: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                __image_prompt__: 'Professional businesswoman COO headshot portrait'
            }
        }
    ]).meta({
        description: "List of team members",
    })
})

export const Schema = teamMembersSlideSchema

export type TeamMembersSlideData = z.infer<typeof teamMembersSlideSchema>

interface TeamMembersSlideLayoutProps {
    data?: Partial<TeamMembersSlideData>
}

const TeamMembersSlideLayout: React.FC<TeamMembersSlideLayoutProps> = ({ data: slideData }) => {
    const data = slideData || {}
    const title = data.title || "";
    const subtitle = data.subtitle || "";
    const members = data.members || [];

    return (
        <>
            {/* Import Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <section className="w-full h-full flex relative bg-white text-black items-start justify-start px-24 py-20" style={{ fontFamily: 'var(--font-funnel, Funnel Display)', background: "var(--card-background-color,#ffffff)" }}>
                <div className="max-w-5xl w-full">
                    <h2 className="font-funnel text-3xl font-semibold mb-3 tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-gray-600 mb-10 max-w-3xl">
                            {subtitle}
                        </p>
                    )}
                    <div className={`grid gap-8 ${members.length === 2 ? 'grid-cols-2' : members.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {members.map((member, index) => (
                            <div key={index} className="flex flex-col p-5 rounded-lg bg-[#fafafa]">
                                <div className="aspect-square w-full mb-4 overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                        src={member.image?.__image_url__ || ''}
                                        alt={member.image?.__image_prompt__ || member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-base mb-1 text-gray-900">{member.name}</h3>
                                <div className="text-sm text-[#0d74f2] mb-2 font-medium">{member.role}</div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TeamMembersSlideLayout

import { LucideIcon, Users, Check, Clock, Calendar, Share2, FileText, Briefcase, Target, BookOpen, Zap, Laptop, MessageSquare, Mail, Calendar as CalendarIcon, Headphones, File, Search, Plane, Database, Layout, BarChart, Workflow } from 'lucide-react';

export interface Skill {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Software {
  name: string;
  icon: LucideIcon;
}

export interface Bonus {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  {
    title: "Workplace Applications",
    description: "Develop expertise in workplace applications to support businesses effectively",
    icon: Laptop
  },
  {
    title: "Proposal Writing",
    description: "Craft compelling proposals and tailor pitches to client needs",
    icon: FileText
  },
  {
    title: "Exclusive Network",
    description: "Get unlimited access to an exclusive network of virtual assistants",
    icon: Users
  },
  {
    title: "Client Acquisition",
    description: "Discover proven strategies to attract high-paying clients",
    icon: Target
  },
  {
    title: "Client Retention",
    description: "Master client retention strategies",
    icon: MessageSquare
  },
  {
    title: "Portfolio Building",
    description: "Learn how to build professional portfolios",
    icon: Briefcase
  },
  {
    title: "Niche Exploration",
    description: "Explore high-demand niches",
    icon: Search
  },
  {
    title: "Practical Learning",
    description: "Engage in practical, real-world learning",
    icon: BookOpen
  },
  {
    title: "Flexible Schedule",
    description: "Enjoy flexible learning to suit your schedule",
    icon: Clock
  }
];

export const softwareTools: Software[] = [
  { name: "Project Management Tools", icon: Briefcase },
  { name: "CRM Tools", icon: Users },
  { name: "Communication Tools", icon: MessageSquare },
  { name: "Cloud Storage Tools", icon: Database },
  { name: "Time Tracking Tools", icon: Clock },
  { name: "AI Tools", icon: Zap },
  { name: "File Sharing Tools", icon: File },
  { name: "Social Media Tools", icon: Share2 },
  { name: "Email Marketing Tools", icon: Mail },
  { name: "Scheduling Tools", icon: CalendarIcon },
  { name: "Document Conversion Tools", icon: FileText },
  { name: "Video/Audio Tools", icon: Headphones },
  { name: "Graphic Design Tools", icon: Layout },
   { name: "Automation Using PM Tools", icon: Workflow }
];

export const handsOnSkills = [
  "Email Management",
  "Calendar Management",
  "Appointment Setting/Scheduling",
  "Customer Support",
  "Social Media Management",
  "File Management",
  "Lead Generation",
  "Travel Planning and Booking",
  "Google Workspace",
  "Microsoft Office",
  "Data Entry",
  "Project Management",
  "Internet Research"
];

export const bonusResources: Bonus[] = [
  {
    title: "Upwork Profile Optimization",
    description: "Learn how to create a winning Upwork profile that attracts high-paying clients",
    icon: Briefcase
  },
  {
    title: "Community Support",
    description: "Get ongoing support from our community of successful VAs",
    icon: Users
  },
  {
    title: "Job Application Strategies",
    description: "Master powerful strategies to land your dream VA positions",
    icon: Target
  },
  {
    title: "Facebook Ads Introduction",
    description: "Learn the basics of Facebook advertising for client acquisition",
    icon: BarChart
  }
];

export const modules = [
  {
    title: "Foundation & Setup",
    description: "Establish your professional online presence and technical foundation",
    points: [
      "Optimize your Upwork and LinkedIn profiles for maximum visibility",
      "Set up dollar account and TIN for international payments",
      "Master essential tools: MS Office and Google Workspace"
    ]
  },
  {
    title: "VA Core Skills",
    description: "Develop fundamental virtual assistant capabilities",
    points: [
      "Email and calendar management techniques for efficiency",
      "Document formatting, handling, and organization systems",
      "Meeting scheduling and project management approaches"
    ]
  },
  {
    title: "Advanced Support Skills",
    description: "Elevate your service offerings with specialized knowledge",
    points: [
      "CRM management and data entry best practices",
      "Travel arrangement and expense tracking systems",
      "Time management and productivity optimization"
    ]
  },
  {
    title: "Client Acquisition",
    description: "Build your portfolio and land high-quality clients",
    points: [
      "Create compelling portfolio samples and professional CV",
      "Master job platform strategies and proposal writing",
      "Develop interview skills and pricing strategies"
    ]
  }
];

export const faqs = [
  {
    question: "How much does the program cost?",
    answer: "The Virtual Assistant Masterclass costs ₦32,000 or $35. We offer flexible payment options and early-bird discounts for select cohorts."
  },
  {
    question: "Do I need prior experience to enroll?",
    answer: "No prior experience is required. Our curriculum is designed to take you from beginner to job-ready, regardless of your starting point."
  },
  {
    question: "Will I receive certification after completion?",
    answer: "Yes, upon successful completion of all modules and the final project, you will receive an official RemoteTrybe certification."
  },
  {
    question: "Do I require a laptop to participate?",
    answer: "For a start, a smartphone is sufficient to join the live classes and access course materials. However, a laptop is recommended for completing assignments and projects effectively."
  },
  {
    question: "Is there ongoing support after the program ends?",
    answer: "Absolutely! You'll have lifetime access to our 800+ VA community with ongoing mentorship and resources."
  },
  {
    question: "Will there be class recordings available?",
    answer: "Yes, all live sessions are recorded and made available after the classes."
  },
];

export const testimonialVideos = [
  {
    id: 1,
    title: "My Remote Trybe Experience",
    src: "https://youtu.be/iCBzkVCedr4"
  },
  {
    id: 2,
    title: "How I Landed My First International Client",
    src: "https://drive.google.com/file/d/1DJXGWOD5cx_l0AAwXiIfW_tPOvNdRMEP/view?usp=drivesdk"
  },
  {
    id: 3,
    title: "My Journey to Financial Freedom with Remote Work",
    src: "https://youtu.be/7OJ0pFXgcRc"
  },
  {
    id: 4,
    title: "Building a Sustainable VA Career",
    src: "https://youtu.be/Y3Xyi1-S0l4"
  },
  {
    id: 5,
    title: "From Newbie to Guru with Remote Trybe",
    src: "https://youtu.be/0UosFFrkRPk?si=E47dGUpqDOVNEEnt"
  },
  {
    id: 6,
    title: "How I became a highly skilled Virtual Assistant",
    src: "https://drive.google.com/file/d/10cG6i8NEB8WpGx-zIoev_h8hybWQEkTO/view?usp=drivesdk"
  }
]; 
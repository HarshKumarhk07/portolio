export interface ProjectCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string; // RGBA for electric effects
  tags: string[];
  features?: string[];
  isFeatured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
}

export const PROJECTS: ProjectCard[] = [
  {
    id: 1,
    title: "Cost Predictor Pro",
    subtitle: "MERN + Python Intelligence",
    description: "A precision-engineered predictive engine that quantifies project timelines and costs using scikit-learn models, delivered through a high-performance MERN architecture.",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a883a2?auto=format&fit=crop&q=80&w=1000",
    color: "rgba(59, 130, 246, 0.8)",
    tags: ["React", "Node.js", "Python", "Scikit", "MongoDB"],
    features: [
      "AI-driven cost estimation logic",
      "Interactive data visualizations with D3",
      "Enterprise-grade MERN architecture"
    ],
    isFeatured: true,
    badge: "AI Prediction",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Nexus Collab",
    subtitle: "Real-time Spatial Workspace",
    description: "Redefining digital collaboration with ultra-low latency WebSocket synchronization and Redis-backed state management for high-concurrency environments.",
    image: "https://images.unsplash.com/photo-1522071823991-b1ae5e6a30c8?auto=format&fit=crop&q=80&w=1000",
    color: "rgba(168, 85, 247, 0.8)",
    tags: ["Socket.io", "Redis", "Next.js", "TypeScript"],
    features: [
      "Ultra-low latency syncing",
      "Redis-powered session handling",
      "Collaborative whiteboard canvas"
    ],
    badge: "Real-time",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Insight Engine",
    subtitle: "Data Visualization Platform",
    description: "Deep-dive analytics dashboard utilizing D3.js for complex spatial data mapping, powered by machine learning pipelines for predictive trend analysis.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1426&auto=format&fit=crop",
    color: "rgba(34, 197, 94, 0.8)",
    tags: ["D3.js", "React", "PostgreSQL", "FastAPI"],
    features: [
      "Complex spatial data mapping",
      "Predictive trend forecasting",
      "Real-time analytics stream"
    ],
    badge: "Big Data",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 4,
    title: "Aura Design System",
    subtitle: "Component Infrastructure",
    description: "A state-of-the-art design tokens and component library focused on high-polish micro-interactions and performance-first CSS architecture.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1364&auto=format&fit=crop",
    color: "rgba(249, 115, 22, 0.8)",
    tags: ["Storybook", "Framer", "Tailwind", "CSS"],
    features: [
      "Atomic design principles",
      "Dynamic theming engine",
      "Accessibility-first components"
    ],
    badge: "Design Ops",
    githubUrl: "#",
    liveUrl: "#"
  }
];

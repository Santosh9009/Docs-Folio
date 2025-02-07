import express, { Request, Response } from 'express';
import cors from 'cors';
import { resumeData } from './resumedata';

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());



// API Endpoints
app.get("/about", (req:Request, res:Response) => {
    res.json({
        name: "Santosh Pati",
        role: "Full Stack Developer",
        bio: resumeData.summary,
        location: resumeData.contact.location,
        email: resumeData.contact.email,
        github: resumeData.socialProfiles.github,
        linkedin: resumeData.socialProfiles.linkedin
    });
});

app.get("/projects", (req:Request, res:Response) => {
    const formattedProjects = resumeData.projects.map((project, index) => ({
        id: index + 1,
        name: project.name,
        description: project.achievements[0], // Using first achievement as description
        technologies: project.techStack,
        github: `https://${project.link}`,
        demo: project.link.includes('vercel.app') ? `https://${project.link}` : null
    }));

    res.json(formattedProjects);
});

app.get("/experience", (req:Request, res:Response) => {
    const formattedExperience = resumeData.workExperience.map(exp => ({
        title: exp.role,
        company: exp.company,
        duration: exp.duration,
        description: exp.responsibilities.join('. '),
        technologies: exp.techStack
    }));

    res.json(formattedExperience);
});

app.get("/skills", (req:Request, res:Response) => {
    res.json({
        frontend: resumeData.skills.frontend,
        backend: resumeData.skills.backend,
        databases: resumeData.skills.databases,
        devops: resumeData.skills.devops,
        languages: resumeData.skills.languages
    });
});

app.get("/contact", (req:Request, res:Response) => {
    res.json({
        email: resumeData.contact.email,
        github: `https://${resumeData.socialProfiles.github}`,
        linkedin: `https://${resumeData.socialProfiles.linkedin}`,
        location: resumeData.contact.location,
        mobile: resumeData.contact.mobile
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

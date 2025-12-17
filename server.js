const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Portfolio data
const portfolioData = {
  name: "Frank Gomez",
  title: "BS Information Technology Student & Multimedia Creator",
  university: "University of Cebu - Main Campus",
  email: "frankgomez030901@gmail.com",
  location: "Cebu, Philippines",
  about: "BS Information Technology student at University of Cebu with 136+ GitHub contributions. Passionate about backend development, API design, and database management. Also skilled in multimedia creation including video editing, graphic design, and digital arts. Experienced with Node.js, Express, TypeScript, Adobe Creative Suite, and various multimedia tools.",
  
  // Updated skills array
  skills: [
    // Development Skills
    { name: "HTML/CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 85 },
    { name: "Git/GitHub", level: 90 },
    { name: "API Development", level: 80 },
    { name: "Database Design", level: 75 },
    
    // Multimedia Skills
    { name: "Video Editing", level: 85 },
    { name: "Adobe Premiere Pro", level: 80 },
    { name: "Adobe After Effects", level: 75 },
    { name: "Adobe Photoshop", level: 85 },
    { name: "Adobe Illustrator", level: 75 },
    { name: "Graphic Design", level: 85 },
    { name: "Motion Graphics", level: 70 },
    { name: "UI/UX Design", level: 75 }
  ],
  
  // Updated projects array with multimedia projects
  projects: [
    // Development Projects
    {
      id: 1,
      title: "Node.js Express API",
      description: "Building RESTful APIs with Node.js and Express framework",
      technologies: ["Node.js", "Express.js", "JavaScript", "API"],
      image: "project1.jpg",
      github: "https://github.com/Frankshamida/Intro_nodejs_express",
      live: null,
      category: "development"
    },
    {
      id: 2,
      title: "TypeORM Application",
      description: "Database integration using TypeORM with TypeScript",
      technologies: ["TypeScript", "TypeORM", "Node.js", "Database"],
      image: "project2.jpg",
      github: "https://github.com/Frankshamida/api_typeorm1",
      live: null,
      category: "development"
    },
    {
      id: 3,
      title: "API Testing Framework",
      description: "Comprehensive API testing with build and test automation",
      technologies: ["TypeScript", "Testing", "API", "Automation"],
      image: "project3.jpg",
      github: "https://github.com/Frankshamida/act4_build_test.api",
      live: null,
      category: "development"
    },
    
    // Multimedia Projects
    {
      id: 4,
      title: "University Promotional Video",
      description: "Promotional video for University of Cebu events with motion graphics",
      technologies: ["Adobe Premiere Pro", "After Effects", "Photoshop"],
      image: "multimedia1.jpg",
      github: null,
      live: "https://www.youtube.com/embed/sample-video-1",
      category: "multimedia",
      video: true
    },
    {
      id: 5,
      title: "Digital Art Portfolio",
      description: "Collection of digital illustrations and graphic designs",
      technologies: ["Adobe Photoshop", "Illustrator", "Graphic Design"],
      image: "multimedia2.jpg",
      github: null,
      live: null,
      category: "multimedia"
    },
    {
      id: 6,
      title: "Motion Graphics Intro",
      description: "Animated intro sequence for video content creators",
      technologies: ["After Effects", "Motion Graphics", "Visual Effects"],
      image: "multimedia3.jpg",
      github: null,
      live: "https://www.youtube.com/embed/sample-video-2",
      category: "multimedia",
      video: true
    }
  ],

  services: [
    {
      id: 1,
      title: "Web Development",
      icon: "fas fa-code",
      description: "Full-stack web applications using modern technologies like Node.js, Express, React, and MongoDB.",
      features: [
        "Custom Web Applications",
        "RESTful API Development",
        "Database Design & Integration",
        "Responsive Web Design",
        "Performance Optimization"
      ],
      technologies: ["Node.js", "Express", "React", "MongoDB", "REST API"]
    },
    {
      id: 2,
      title: "Video Editing",
      icon: "fas fa-film",
      description: "Professional video editing, color grading, and post-production for various content types.",
      features: [
        "4K Video Editing",
        "Color Correction & Grading",
        "Motion Graphics",
        "Audio Mixing & Sound Design",
        "Social Media Content"
      ],
      technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics"]
    },
    {
      id: 3,
      title: "Graphic Design",
      icon: "fas fa-paint-brush",
      description: "Creative visual designs including branding, illustrations, and digital artwork.",
      features: [
        "Logo & Brand Identity",
        "Digital Illustrations",
        "UI/UX Design",
        "Print & Digital Media",
        "Social Media Graphics"
      ],
      technologies: ["Photoshop", "Illustrator", "Figma", "Canva"]
    },
    {
      id: 4,
      title: "Motion Graphics",
      icon: "fas fa-play-circle",
      description: "Animated graphics, visual effects, and engaging motion design for videos.",
      features: [
        "Animated Intros/Outros",
        "Explainer Videos",
        "Visual Effects",
        "Kinetic Typography",
        "3D Animation Basics"
      ],
      technologies: ["After Effects", "Premiere Pro", "Blender", "Motion Graphics"]
    },
    {
      id: 5,
      title: "UI/UX Design",
      icon: "fas fa-laptop-code",
      description: "User-centered interface design and user experience optimization for web and mobile.",
      features: [
        "Wireframing & Prototyping",
        "User Research & Testing",
        "Interactive Design",
        "Design Systems",
        "Mobile-First Design"
      ],
      technologies: ["Figma", "Adobe XD", "User Testing", "Prototyping"]
    },
    {
      id: 6,
      title: "Consultation & Training",
      icon: "fas fa-chalkboard-teacher",
      description: "Technical consultation and training sessions for web development and multimedia tools.",
      features: [
        "Code Review & Optimization",
        "Technical Consultation",
        "Software Training",
        "Project Planning",
        "Best Practices"
      ],
      technologies: ["Mentoring", "Workshops", "Code Review", "Planning"]
    }
  ],

  pricingPlans: [
    {
      id: 1,
      title: "Basic",
      price: "₱2,500",
      period: "project",
      features: [
        "Basic Website (5 pages)",
        "Responsive Design",
        "Contact Form",
        "1 Revision Round",
        "5-day Delivery"
      ],
      popular: false,
      buttonText: "Get Started",
      color: "blue"
    },
    {
      id: 2,
      title: "Pro",
      price: "₱5,000",
      period: "project",
      features: [
        "Advanced Website (10 pages)",
        "Custom Features",
        "SEO Optimization",
        "3 Revision Rounds",
        "Video Editing (up to 5 mins)",
        "3-day Delivery"
      ],
      popular: true,
      buttonText: "Most Popular",
      color: "purple"
    },
    {
      id: 3,
      title: "Enterprise",
      price: "₱10,000+",
      period: "project",
      features: [
        "Full Web Application",
        "Database Integration",
        "Video Production",
        "Unlimited Revisions",
        "Priority Support",
        "Brand Package",
        "Custom Timeline"
      ],
      popular: false,
      buttonText: "Contact for Quote",
      color: "gradient"
    }
  ],

  
  // Add multimedia tools section
  multimediaTools: [
    { name: "Adobe Photoshop", icon: "fas fa-palette" },
    { name: "Adobe Illustrator", icon: "fas fa-draw-polygon" },
    { name: "Adobe Premiere Pro", icon: "fas fa-film" },
    { name: "Adobe After Effects", icon: "fas fa-video" },
    { name: "DaVinci Resolve", icon: "fas fa-sliders-h" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Canva", icon: "fas fa-paint-brush" },
    { name: "Blender", icon: "fas fa-cube" }
  ],
  
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "University of Cebu - Main Campus",
      year: "2021 - Present",
      details: ["Dean's Lister", "Student Council Member", "Programming Club President", "Multimedia Club Member"]
    },
    {
      degree: "Senior High School - STEM",
      institution: "University of Cebu - Senior High",
      year: "2019 - 2021",
      details: ["With Honors", "Research Awardee", "Video Editing Workshop Participant"]
    }
  ],
  
  socialLinks: {
    github: "https://github.com/Frankshamida",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    facebook: "https://facebook.com/yourusername",
    youtube: "https://youtube.com/@yourchannel",
    behance: "https://behance.net/yourusername",
    instagram: "https://instagram.com/yourusername"
  },

  // FAQ data for chatbot fallback
  faq: [
    {
      question: "What services do you offer?",
      answer: "I offer web development, video editing, graphic design, motion graphics, UI/UX design, and technical consultation services."
    },
    {
      question: "How much do you charge for your services?",
      answer: "I offer Basic (₱2,500), Pro (₱5,000), and Enterprise (₱10,000+) packages. Contact me for custom quotes."
    },
    {
      question: "What programming languages do you know?",
      answer: "I specialize in JavaScript, TypeScript, HTML/CSS, and have experience with Python and database management."
    },
    {
      question: "What multimedia tools do you use?",
      answer: "I work with Adobe Creative Suite (Photoshop, Illustrator, Premiere Pro, After Effects), Figma, and DaVinci Resolve."
    },
    {
      question: "Can I see your source code?",
      answer: "Yes, most of my development projects are available on GitHub. You can find the links on each project card."
    },
    {
      question: "Do you offer revisions on projects?",
      answer: "Yes, I include revision rounds in my service packages to ensure client satisfaction."
    },
    {
      question: "What is your turnaround time?",
      answer: "Typical delivery times range from 3-5 days for basic projects to 2-4 weeks for complex applications."
    },
    {
      question: "Can you work with international clients?",
      answer: "Yes, I can work with clients from anywhere. Communication is typically in English or Tagalog/Cebuano."
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    ...portfolioData,
    activePage: 'home'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    ...portfolioData,
    activePage: 'about'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    ...portfolioData,
    activePage: 'projects'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    ...portfolioData,
    activePage: 'contact',
    messageSent: false,
    error: null,
    formData: null
  });
});

app.get('/services', (req, res) => {
  res.render('services', {
    ...portfolioData,
    activePage: 'services'
  });
});

// API endpoint for chatbot fallback (optional)
app.get('/api/chatbot/faq', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.json({ 
      answer: "Hello! I'm your portfolio assistant. Ask me anything about services, projects, or skills!",
      source: "greeting" 
    });
  }

  // Simple keyword matching for FAQ
  const faqMap = {
    'service': portfolioData.faq[0],
    'price': portfolioData.faq[1],
    'cost': portfolioData.faq[1],
    'charge': portfolioData.faq[1],
    'programming': portfolioData.faq[2],
    'language': portfolioData.faq[2],
    'code': portfolioData.faq[2],
    'multimedia': portfolioData.faq[3],
    'tool': portfolioData.faq[3],
    'adobe': portfolioData.faq[3],
    'source': portfolioData.faq[4],
    'github': portfolioData.faq[4],
    'revision': portfolioData.faq[5],
    'time': portfolioData.faq[6],
    'delivery': portfolioData.faq[6],
    'turnaround': portfolioData.faq[6],
    'international': portfolioData.faq[7],
    'client': portfolioData.faq[7]
  };

  let foundAnswer = null;
  for (const [keyword, faqItem] of Object.entries(faqMap)) {
    if (query.includes(keyword)) {
      foundAnswer = faqItem;
      break;
    }
  }

  if (foundAnswer) {
    res.json({ 
      answer: foundAnswer.answer,
      question: foundAnswer.question,
      source: "faq" 
    });
  } else {
    res.json({ 
      answer: "I'm not sure about that. Please contact me directly through the contact form for specific questions.",
      source: "fallback" 
    });
  }
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.render('contact', {
        ...portfolioData,
        activePage: 'contact',
        messageSent: false,
        error: 'Please fill in all fields.',
        formData: req.body
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render('contact', {
        ...portfolioData,
        activePage: 'contact',
        messageSent: false,
        error: 'Please enter a valid email address.',
        formData: req.body
      });
    }
    
    // Configure nodemailer transporter (if you want to enable email later)
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Email options
    const mailOptions = {
      from: email,
      to: portfolioData.email,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    */
    
    console.log('Contact form submission:', { name, email, message });
    
    res.render('contact', {
      ...portfolioData,
      activePage: 'contact',
      messageSent: true,
      error: null,
      formData: null
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.render('contact', {
      ...portfolioData,
      activePage: 'contact',
      messageSent: false,
      error: 'An unexpected error occurred. Please try again later.',
      formData: req.body
    });
  }
});

// 404 Error handler
app.use((req, res) => {
  res.status(404).render('404', {
    ...portfolioData,
    activePage: 'none'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    ...portfolioData,
    activePage: 'none',
    error: 'Something went wrong! Please try again later.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Portfolio for: ${portfolioData.name}`);
  console.log(`GitHub: ${portfolioData.socialLinks.github}`);
  console.log(`=========================================`);
});
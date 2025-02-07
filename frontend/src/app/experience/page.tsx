const experiences = [
  {
      company: "Company A",
      role: "Full Stack Developer",
      duration: "Jan 2020 - Present",
      description: "Worked on various web applications using React and Node.js.",
  },
  {
      company: "Company B",
      role: "Intern",
      duration: "Jun 2019 - Dec 2019",
      description: "Assisted in developing a web application for internal use.",
  },
];

export default function Experience() {
  return (
      <div>
          <h1 className="text-2xl font-bold mb-4">Experience</h1>
          <ul>
              {experiences.map((exp, index) => (
                  <li key={index}>
                      <strong>{exp.role}</strong> at {exp.company} ({exp.duration}): {exp.description}
                  </li>
              ))}
          </ul>
      </div>
  );
} 
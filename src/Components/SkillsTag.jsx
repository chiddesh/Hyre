import React from 'react'

function SkillsTag({ skills, setSkills }) {

    const Skills = [
        "Programming", "Web Developement", "Data Analysis", "Java", "Javascript", "React", "Node.js", "Python", "Django", "Machine Learning",
        "Communication", "Teamwork", "Problem-Solving", "Leadership", "Time Management", "Critical Thinking", "Adaptability", "Creativity",
        "Project Management", "SQL", "NoSQL", "AWS", "Docker", "Kubernetes", "Agile Methodologies", "UI/UX Design"
    ]

    function handleSkills(e) {
        const selectedSkill = e.target.innerText
        if (!skills.includes(selectedSkill)) {
            setSkills([...skills, selectedSkill])
        }

    }

    return (
        <div>
            {Skills.map((skill, ind) => (
                <button key={ind} onClick={handleSkills} className='bg-white rounded-4xl font-skills p-2 m-1 hover:bg-sky-700 hover:text-white transition-colors duration-400'>{skill}</button>
            ))}
        </div>
    )
}

export default SkillsTag
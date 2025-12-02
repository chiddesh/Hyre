import React, { useState } from 'react'
import SkillsTag from './SkillsTag'

function DataInput({ generateResume }) {
    const Fields = [
        { label: "Tell us a little about yourself 🌱", placeholder: "A short bio...", key: "about" },
        { label: "Your Socials 🌐", placeholder: "Linkedin, Github", key: "social" },
        { label: "Education Details 🎓", placeholder: "Education", key: "education" },
        { label: "Work Experience 🏢", placeholder: "Your Experience", key: "work" },
        { label: "Skills 🎯", placeholder: "Tell us about skills", hasTag: true, key: "skills" },
        { label: "Projects 💻", placeholder: "Tell us about your innovations", key: "projects" },
        { label: "Certifications 🏅", placeholder: "Your Certifications", key: "certifications" }
    ]

    const [skills, setSkills] = useState([])
    const [finalformData, setfinalformData] = useState({
        about: "",
        education: "",
        work: "",
        projects: "",
        certifications: ""
    })


    function handleTypedSkills(e) {
        const typed = e.target.value
        const skillsList = typed.split(" ").map(s => s.trim())
        setSkills(skillsList)
    }

    function handleSubmit() {
        const finalData = {
            ...finalformData,
            skills: skills
        }

        if (finalData.about.length === 0) {
            alert("Please fill in the details")
            return;
        }

        generateResume(finalData)
    }

    return (
        <div className="w-full md:w-[42%] bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-700 space-y-6 overflow-hidden mb-5">
            {Fields.map((field, ind) => (
                <div key={ind} className="flex flex-col space-y-2">

                    <label className="text-zinc-300 font-medium text-3xl">{field.label}</label>

                    {field.label != "Skills 🎯" ? (
                        <textarea
                            className="bg-zinc-800 text-white rounded-xl p-3 h-28 resize-none border border-zinc-700 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                            placeholder={field.placeholder}
                            onChange={(e) => setfinalformData({ ...finalformData, [field.key]: e.target.value })}
                        />
                    ) : (
                        <textarea
                            className="bg-zinc-800 text-white rounded-xl p-3 border border-zinc-700
                            focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto resize-none text-xl"
                            placeholder={field.placeholder}
                            value={field.label === "Skills 🎯" ? skills.join(" ") : ""}
                            onChange={field.label === "Skills 🎯" ? handleTypedSkills : undefined}
                            rows={Math.max(1, Math.ceil((skills.join(" ").length) / 45))}
                        />
                    )}

                    {field.hasTag && <SkillsTag setSkills={setSkills} skills={skills} />}

                </div>
            ))}

            <button onClick={handleSubmit} className='bg-white p-2 rounded-4xl w-50 text-xl font-skills hover:bg-sky-700 hover:text-white transition-colors duration-400'>Generate Resume</button>

        </div>
    )
}

export default DataInput

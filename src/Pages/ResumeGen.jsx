import React, { useRef, useState } from 'react'
import Navbar from '../Components/Navbar';
import DataInput from '../Components/DataInput';
import Resume from '../Components/Resume';
import html2pdf from 'html2pdf.js';
import Footer from '../Components/Footer';

function ResumeGen() {
    const [generatedResume, setGeneratedResume] = useState('');
    const resumeRef = useRef();
    const [loading, setLoading] = useState(false);

    async function query(message) {
        setLoading(true);
        const response = await fetch(
            'https://router.huggingface.co/v1/chat/completions',
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    model: 'Qwen/Qwen2.5-7B-Instruct',
                    messages: [{ role: 'user', content: message }],
                }),
            }
        );
        return response.json();
    }

    async function generateResume(formData) {
        if (resumeRef.current) {
            resumeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const prompt = `
  You are a professional resume writer. Using only the information below, generate a resume in the following **plain text structure** (no markdown, no bullet symbols like * or -, no HTML tags):

  1. [Full Name]
  2. Contact: [Email | Phone | LinkedIn | GitHub | Portfolio]
  ---
  Summary:
  [Professional summary paragraph]
  ---
  Education:
  [Degree] | [Institution] | [Start Year – End Year]
  - [Description if any]
  ---
  Work Experience:
  [Job Title] | [Company] | [Start Year – End Year]
  - [Responsibility 1]
  - [Responsibility 2]
  [Repeat for all experiences]
  ---
  Skills:
  Technical Skills: [list them]
  Non-Technical Skills: [list them]
  ---
  Projects:
  [Project Name] – [Short description]
  [Repeat for all projects]
  ---
  Certifications:
  [Certification Name] – [Issuing Authority | Year]
  [Repeat for all certifications]

  **Instructions:**
  - Do not change this structure.
  - Do not add markdown or HTML.
  - Keep headings exactly as shown (Summary, Education, Work Experience, Skills, Projects, Certifications).
  - Use plain text only.
  - Make it ATS-friendly with keywords where appropriate.
  - Turn small points into detailed sentences where necessary.
  - Split the technical and non-technical skills into two categories.
  - Bold the section headings by surrounding them with double asterisks (**).
  - Use triple hashes (###) for main subheadings and quadruple hashes (####) for secondary subheadings.
  - Use horizontal lines (---) to separate major sections.
  - Use (-) for skills.
    Here is the information:
    About: ${formData.about}
    Socials: ${formData.social}
    Education: ${formData.education}
    Work Experience: ${formData.work}
    Skills: ${formData.skills}
    Projects: ${formData.projects}
    Certifications: ${formData.certifications}
    `;

        const response = await query(prompt);
        const text = response.choices[0].message.content;
        setGeneratedResume(text);
        setLoading(false);
    }

    function handlePrint() {
        const element = resumeRef.current;

        const opt = {
            margin: [0, 0, 0, 0],
            filename: 'Resume.pdf',
            image: { type: 'jpeg', quality: 5 },
            html2canvas: {
                scale: 12,
                useCORS: true,
                backgroundColor: '#000000',
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        html2pdf().set(opt).from(element).save();
    }

    return (
        <div className="bg-black min-h-screen w-full flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex flex-col md:flex-row items-start justify-evenly gap-10 mt-10 px-6 w-full" data-html2canvas-ignore>
                <DataInput generateResume={generateResume} />

                <div
                    ref={resumeRef}
                    className="rounded-xl shadow-xl border border-[#d1d5dc]"
                    style={{
                        width: '210mm',
                        minHeight: '27mm',
                        backgroundColor: '#000000',
                        color: '#000000',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '12pt',
                        lineHeight: 1.4,
                        padding: '10mm',
                        boxSizing: 'border-box',
                    }}
                >
                    <Resume loading={loading} generatedResume={generatedResume} />

                    {generatedResume && (
                        <button
                            data-html2canvas-ignore
                            onClick={handlePrint}
                            className="mt-6 bg-[#155dfc] text-[#ffffff] px-6 py-3 rounded-lg hover:bg-[#1447e6] transition"
                        >
                            Download PDF
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ResumeGen
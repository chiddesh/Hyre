import React from "react";

function Resume({ generatedResume, loading }) {
    if (loading) {
        return (
            <p className="text-[#ffffff] text-xl animate-pulse">
                Generating Resume...
            </p>
        );
    }

    if (!generatedResume || generatedResume.trim().length === 0) {
        return (
            <>
                <h2 className="text-[white] text-[5rem] font-heading">
                    AI-Generated Resume
                </h2>
                <p className="text-[#9f9fa9] text-2xl font-mono">
                    Your resume will appear here....
                </p>
            </>
        );
    }

    const lines = generatedResume.split("\n");

    const formatBoldText = (text) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="space-y-2">
            {lines.map((line, index) => {
                const trimmed = line.trim();

                if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                    const heading = trimmed.replace(/\*\*/g, "");
                    return (
                        <h3 key={index} className="text-[white] font-bold text-3xl mt-4">
                            {heading}
                        </h3>
                    );
                }

                if (trimmed.startsWith("### ")) {
                    const subheading = trimmed.replace("### ", "");
                    return (
                        <h1
                            key={index}
                            className="text-[white] text-3xl font-extrabold p-1 mb-2 underline"
                        >
                            {subheading}
                        </h1>
                    );
                }

                if (trimmed.startsWith("#### ")) {
                    const subheading = trimmed.replace("#### ", "");
                    return (
                        <h1
                            key={index}
                            className="text-[white] text-xl font-extrabold p-1 mb-2 underline"
                        >
                            {subheading}
                        </h1>
                    );
                }

                if (trimmed === "---") {
                    return <hr key={index} className="border-[#52525c] my-2" />;
                }

                if (trimmed.startsWith("- ")) {
                    return (
                        <ul key={index} className="list-disc list-inside text-[white]">
                            <li>{formatBoldText(trimmed.slice(2))}</li>
                        </ul>
                    );
                }

                return (
                    <p key={index} className="text-[white] text-xl">
                        {formatBoldText(trimmed)}
                    </p>
                );
            })}
        </div>
    );
}

export default Resume;

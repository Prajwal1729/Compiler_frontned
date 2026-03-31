import React from 'react'
import { runCode } from '../../apis/runCode';
export default function Dashboard(){
    const [code,setCode] = React.useState("");
    const [input,setInput] = React.useState("");
    const [output,setOutput] = React.useState("");
    const [language, setLanguage] = React.useState("python");

    const handleRun = async () => {
        try {
            const result = await runCode(code, input, language);
            console.log("Code execution result:", result);
            setOutput(result);
        } catch (error) {
            console.error("Error running code:", error);
        }
    };

    return (
        <div className="dashboard">
            {/* HEADER */}
            <div className="navbar">
                <h2>Online Code Runner</h2>

                <div className="controls">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                </select>

                <button onClick={handleRun}>▶ Run</button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="main">

                <textarea
                className="editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                />

                <div className="right-panel">

                <textarea
                    className="input-box"
                    placeholder="// enter input here"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <textarea
                    className="output-box"
                    placeholder="// output"
                    value={output}
                    readOnly
                />
                </div>

            </div>
        </div>
    )
}
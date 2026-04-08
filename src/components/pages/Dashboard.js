import React from 'react'
import { runCode } from '../../apis/runCode';
import { Languages } from '../../apis/languages';
import Select from "react-select";

export default function Dashboard(){
    const [code,setCode] = React.useState("");
    // const [input,setInput] = React.useState("");
    const [output,setOutput] = React.useState("");
    const [languages, setLanguages] = React.useState([]); // list
    const [language, setLanguage] = React.useState("");   // selected
    const options = languages.map(lang=>({
        value:lang,
        label:lang
    }))
    
    React.useEffect(()=>{
        const fetchLanguages = async ()=>{
           const data = await Languages();
           console.log("Supported languages:",data);
           setLanguages(data.languages);
           setLanguage(data.languages[0]);
           return data;
        }
        fetchLanguages();
    },[]);

    const handleRun = async () => {
        try {
            const result = await runCode(code, language);
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
                  {/* <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
                     {languages.map((lang,idx)=>(
                        <option key={idx} value={lang}>
                            {lang}
                        </option>
                     ))}
                  </select> */}
                  <Select
                    options={options}
                    onChange={(opt) => setLanguage(opt.value)}
                    styles={{
                        control: (base) => ({
                        ...base,
                        backgroundColor: "#1a1c23",
                        color: "white",
                        }),
                        menu: (base) => ({
                        ...base,
                        backgroundColor: "#1a1c23",
                        }),
                        option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#333" : "#1a1c23",
                        color: "white",
                        }),
                    }}
                    />

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

                {/* <textarea
                    className="input-box"
                    placeholder="// enter input here"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                /> */}

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
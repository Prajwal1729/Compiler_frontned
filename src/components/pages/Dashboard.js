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
        value:lang.name,
        label:lang.name,
        template:lang.template
    }));
    const [selectedOption, setSelectedOption] = React.useState(null);
    
    React.useEffect(()=>{
        const fetchLanguages = async ()=>{
           const data = await Languages();
           // console.log("Supported languages:",data);
           setLanguages(data.languages);
           const defaultLanguages = data.languages[0];

           const defaultOption = {
                value: defaultLanguages.name,
                label: defaultLanguages.name,
                template: defaultLanguages.template,
            };

            setSelectedOption(defaultOption);
            setLanguage(defaultLanguages.name);
            setCode(defaultLanguages.template);
        };
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
                value={selectedOption}
                onChange={(opt) => {
                    setSelectedOption(opt);
                    setLanguage(opt.value);
                    setCode(opt.template); 
                }}
                styles={{
                    control: (base) => ({
                    ...base,
                    backgroundColor: "#1a1c23",
                    color: "white",
                    border: "1px solid #333",
                    }),
                    singleValue: (base) => ({
                    ...base,
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
                    cursor: "pointer",
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
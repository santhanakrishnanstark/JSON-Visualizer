'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Tree from "../Tree/tree";
import './editor.css';

const Editor = () => {

    const [jsonData, setJsonData] = useState('');
    const [parsedJson, setParsedJson] = useState({});

    const [list, setList] = useState(['']);
    const [treeList, setTreeList] = useState([]);
    const [isInvalidJson, setIsInvalidJson] = useState(false);

    const copyBtn = useRef<HTMLButtonElement>(null);
    const pasteBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        console.log('****** Tree List: ', treeList)
    }, [treeList])

    const handleVisualize = () => {
        buildVisualizeHTML();
    }

    const buildVisualizeHTML = () => {
        const keys = Object.keys(parsedJson);
        setList(keys);
        setTreeList(generateTreeObj(parsedJson));

    }

    const generateTreeObj: any = (json: any, isInner=false) => {
        const treeList = [];
        const list = [];
        const jsonKeys = Object.keys(json);
        for (let i = 0; i < jsonKeys.length; i++) {
            const currentKey = jsonKeys[i];
            const value = json[currentKey];
            const isNotObject = (typeof value !== 'object');
            if(isNotObject) {
                const obj = {
                    label: currentKey,
                    value: value,
                    children: []
                }
                if(isInner) {
                    list.push(obj);
                }else {
                    treeList.push(obj);
                }
            }else {
                const obj = {
                    label: currentKey,
                    value: calculateItems(value),
                    children: generateTreeObj(value, true)
                }
                if(isInner) {
                    list.push(obj);
                }else {
                    treeList.push(obj);
                }
            }
        }
        return !isInner ? treeList : list;
    }

    const calculateItems = (value: any) => {
        const jsonKeys = Object.keys(value);
        const keyLength = jsonKeys.length;
        let message = `${jsonKeys.length} ${keyLength === 1 ? 'item' : 'items'}`
        if(Array.isArray(value)) {
            message += ' []';
        }else {
            message += ' {}';
        }
        return message;
    }

    const handleChange = (e: any) => {
        const { value } = e.target;
        try {
            setJsonData(value);
            const parsed = JSON.parse(value);
            setParsedJson(parsed);
            setIsInvalidJson(false);

        } catch (error) {
            // alert('Invalid JSON')
            setIsInvalidJson(true);
            setParsedJson([]);
        }
    }

    const handleToolBar = async(tool: any) => {
        switch(tool) {
            case 'copy':
                const copyButton = copyBtn.current;
                copyButton && (copyButton.innerText = "coping")
                try {
                    await navigator.clipboard.writeText(jsonData);
                    copyButton && (copyButton.innerText = "copied")

                    setTimeout(() => {
                        copyButton && (copyButton.innerText = "copy")
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            break;
            case 'paste':
                try {
                    const data = await navigator.clipboard.readText();
                    handleChange({target: {value: data}});
                }catch (err) {
                    console.error('Failed to paste: ', err);
                }
            break;
        }
    }

    return (
        <>
            <section id='tools' className='w-full max-w-7xl'>
                <div className='w-1/3 md:w-1/6 flex flex-col ml-auto'>
                    <Link
                        href="#"
                        onClick={handleVisualize}
                        className="rounded-md bg-indigo-600 text-center px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Visualize
                    </Link>
                </div>
            </section>
                <div className="z-10 w-full max-w-7xl items-start justify-between font-mono text-sm sm:flex gap-8">
                    <section id='jsonEditor' className='flex-1'>
                        <div className="flex align-center justify-between">
                            <h2 className="text-xl mb-3 flex items-center gap-3">
                                Editor
                                <button
                                ref={copyBtn}
                                onClick={() => handleToolBar('copy')} 
                                className="bg-rose-400 hover:bg-rose-500 text-white px-2 py-1 text-xs rounded-md">Copy</button>
                                <button
                                ref={pasteBtn}
                                onClick={() => handleToolBar('paste')} 
                                className="bg-rose-400 hover:bg-rose-500 text-white px-2 py-1 text-xs rounded-md">Paste</button>
                            </h2>
                            {
                                isInvalidJson && jsonData && <p className="text-red-500 self-center">Invalid JSON</p>
                            }
                        </div>
                        <textarea 
                        name="editor" 
                        id="editor"
                        placeholder='type/paste your JSON code here'
                        value={jsonData}
                        onChange={handleChange}
                        className='border-b border-gray-300 mb-5 sm:mb-0 bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl lg:rounded-xl lg:border  bg-slate-50 lg:p-4  shadow-inner	p-5 h-full w-full' ></textarea>
                    </section>
                    <section className="flex-1 overflow-scroll">
                        <h2 className="text-xl mb-3">Viewer</h2>
                        <section 
                            id='visualizer' 
                            className='border-b border-gray-300 lg:rounded-xl lg:border bg-slate-50 lg:p-4 shadow-inner p-5 h-full w-full  overflow-auto'>
                                { 
                                    list.length
                                    ?
                                    <Tree data={treeList} />
                                    : <div className="text-red-500 mt-2">Invalid JSON</div> 
                                }
                        </section>
                    </section>
                </div>
        </>
    )
}

export default Editor;
// 'use client'

// export default function List({listObject, items}: any) {
//   return (
//     <ul>
//         {
//             items.map(function(item: any) {
//                 console.log(typeof listObject[item])
//             return <li key={item}>{item}</li>;
//             })
//         }
//     </ul>
//   )
// }



/**
 * 
 * 1. get json value and check for the keys, put into array list
 * 2. loop through key one by one and check value if its an object and then do recursive or else print value
 * 
 */


// function generate(jsonValue: []) {
//     let resultHTML = '';
//     const jsonKeys = Object.keys(jsonValue);
//     jsonKeys.forEach((key: string) => {
//         if((typeof jsonValue[key]) === 'object') {
//             resultHTML += `<ul><li> ${jsonValue[key]} </li></ul>`;
//             generate(jsonValue[key]);
//         }else {
//             resultHTML += `<li> ${jsonValue[key]} </li>`;
//             // return resultHTML;
//         }
//     });

//     return resultHTML;
// }




/** 

{
    "company": {
        "department": {
            "departmentID": "101", 
            "departmentName": "IT",
            "listOfEmplyees": ["101", "102", "103"]
        }
    }
}

{
    "title": "example glossary",
    "GlossDiv": {
        "title": "S",
        "GlossList": {
            "GlossEntry": {
                "ID": "SGML",
                "SortAs": "SGML",
                "GlossTerm": "Standard Generalized Markup Language",
                "Acronym": "SGML",
                "Abbrev": "ISO 8879:1986",
                "GlossDef": {
                    "para": "A meta-markup language, used to create markup languages such as DocBook.",
                    "GlossSeeAlso": ["GML", "XML"]
                },
                "GlossSee": "markup"
            }
        }
    }
}


*/

// share doc link with mentor


/**
 * 
 * {
 *   label: 'tree 1',
 *   isExpand: true,
 *   children: [
 *    {}, {}, {}
 *   ]
 * }
 * 
 */


/**
 * 

const obj = {
    title: "",
    hasChildren: false,
    children: []
}


let resultHTML = '';
    const generate = (jsonValue: any) => {
        const jsonKeys = Object.keys(jsonValue);
        jsonKeys.forEach((key: string) => {
            if((typeof jsonValue[key]) === 'object') {
                resultHTML += `<ul><li> ${key} ${jsonValue[key]} </li></ul>`;
                generate(jsonValue[key]);
            }else {
                resultHTML += `<li> ${key} :${jsonValue[key]} </li>`;
            }
        });

        return resultHTML;
    }


 */

/** 

let res = [];

for (let index = 0; index < temp1.length; index++) {
    if(temp1[index].parent === undefined) {
        res.push(temp1[index]);
    }else {
        const parent = temp1[index].parent;
        console.log(parent, res, res[parent])
        let resObj = res.find(obj => obj.label === parent);
        console.log("*** res 1st: ", resObj)
        resObj = { ...resObj, children: [{...resObj?.children}, {...temp1[index]}] }
        console.log('**** res Obj ', resObj);
        res = res.map(obj => {
            if(obj.label === resObj.label) {
                return resObj
            }
            return obj;
        });
        // if(res[parent]) {
        //     console.log(res[parent])
        //     res[parent] = {
        //         ...res[parent],
        //         children: [res[parent]['children'], temp1[index]]
        //     }
        // }
        // console.log(res[parent])
    }
}
console.log('**** Result: ', res);


*/










/**
 * 
 * 
 * 
 * 'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Tree from "../Tree/tree";

const Editor = () => {

    const [jsonData, setJsonData] = useState('');
    const [parsedJson, setParsedJson] = useState({});

    const [list, setList] = useState(['']);
    const [treeList, setTreeList] = useState([]);

    // useEffect(() => {
    //     console.log('****** Tree List: ', treeList)
    // }, [treeList])

    const handleVisualize = () => {
        buildVisualizeHTML();
    }

    const buildVisualizeHTML = () => {
        const keys = Object.keys(parsedJson);
        setList(keys);
        setTreeList(generateTreeObj(parsedJson));

    }

    const generateTreeObj = (json) => {
        const treeList = [];
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
                treeList.push(obj);
            }else {
                let obj = {
                    label: currentKey,
                    value: calculateItems(value),
                    children: generateInnerTreeObj(value)
                }
                console.log(obj)
                treeList.push(obj);
            }
        }
        return treeList;
    }

    const generateInnerTreeObj = (json: any) => {
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
                list.push(obj);
            }else {
                const obj: any = {
                    label: currentKey,
                    value: calculateItems(value),
                    children: generateInnerTreeObj(value)
                }
                list.push(obj);
            }
        }
        return list;
    }

    const calculateItems = (value) => {
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
        } catch (error) {
            setParsedJson([]);
        }
    }

    return (
        <>
            <section id='tools' className='w-full max-w-7xl'>
                <div className='w-1/6 flex flex-col ml-auto'>
                <Link
                    href="#"
                    onClick={handleVisualize}
                    className="rounded-md bg-indigo-600 text-center px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Visualize</Link>
                </div>
                </section>
                <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex gap-8">
                <section id='jsonEditor' className='flex-1'>
                    <textarea 
                    name="editor" 
                    id="editor"
                    placeholder='type/paste your JSON code here'
                    value={jsonData}
                    onChange={handleChange}
                    className='border-b border-gray-300 bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl lg:rounded-xl lg:border  bg-slate-50 lg:p-4  shadow-inner	p-5 h-full w-full' ></textarea>
                </section>
                <section 
                    id='visualizer' 
                    className='border-b border-gray-300  pb-6 pt-8  lg:rounded-xl lg:border bg-slate-50 lg:p-4 shadow-inner	p-5 h-full w-full flex-1 overflow-auto'>
                        { 
                            list.length
                            ?
                            <Tree data={treeList} />
                            : <div className="text-red-500 mt-2">Invalid JSON</div> 
                        }
                    </section>
                </div>
        </>
    )
}

export default Editor;
 * 
 * 
 * 
 */
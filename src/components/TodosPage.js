'use client';

import { data } from "autoprefixer";
import { useEffect, useState } from "react";

export default function TodosPage() {

    const apiUrl = "http://localhost:5000/todolist";
    const [isCreate, setIsCreate] = useState(false);
    const [datas, setDatas] = useState([]);

    useEffect( () => {

        const fetchData = async () => {
            const res = await fetch(apiUrl);
            const data = await res.json();
            setDatas(data);
        };
        
        fetchData();
    }, [datas])

    // handlers function
    const handleCreateTodo = () => {
        console.log(datas);
        setIsCreate(!isCreate);
    }

    return(
        <>
            <TodosHeader title={"Your Todolists"} desc={"Watchu doing? Do it!!"} />
            <InsertDataModal isCreate={isCreate} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                datas.map(e => <TodosCard key={e.id} title={e.title} desc={e.description} priority={e.priority} /> )
            }
            </div>
            <CreateTodoButton onCreateTodo={handleCreateTodo} />
        </>
    )
}


function CreateTodoButton({onCreateTodo}) {
    return(
        <div className="fixed bottom-8 right-10 bg-gray-900 rounded-full w-12 h-12 cursor-pointer flex items-center justify-center shadow-lg hover:bg-gray-700  active:text-white active:bg-gray-900" onClick={onCreateTodo}>
            <div className="font-mono text-2xl text-white">
                <button>+</button>
            </div>
        </div>
    )
}

function TodosHeader({title, desc}) {
    return(
        <div className="container mx-auto p-5">
            <div className="flex justify-center p-2">
                <h1 className="text-3xl font-bold font-mono text-gray-900">{title}</h1>
            </div>
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold font-mono text-gray-600">{desc}</h1>
            </div>
        </div>
    )
}

function TodosCard({title, desc, priority }) {
    return(
        <div className="bg-gray-600 rounded-lg overflow-hidden shadow-lg h-60 m-5">
            <p className="text-white font-mono text-xl p-4 bg-gray-900 font-bold">{title}</p>
            <p className="text-black font-mono text-lg p-4 text-justify h-1/2 overflow-hidden font-bold">{desc}</p>
            <div className="flex justify-between p-2 z-50">
                <p className="p-2 w-12 text-center rounded-md bg-gray-900 text-white font-bold">{priority}</p>
                <input className="cursor-pointer p-2 bg-gray-900 text-white font-mono rounded-md shadow-md hover:bg-gray-700  active:text-white active:bg-gray-900 font-bold" type="button" value="See Details" />
            </div>
        </div>
    )
}

function InsertDataModal({onClickPriorityBtn, showPriority, onClickSubmitBtn, isCreate }) {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    return(
        <>
        <div className={"flex items-center justify-center h-screen inset-0 absolute " + (isCreate ? "" : "hidden")}>
            <div className="card bg-gray-600 rounded-lg flex overflow-hidden shadow-lg h-60 w-96 max-w-2xl max-h-2xl">
                <div className=" w-full">
                    <div className="m-4">
                        <input type="text" value={title} placeholder="Title" className={"w-full h-12 rounded-md p-4 font-mono "} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="m-4 rounded-md">
                        <textarea placeholder="Descriptions" value={desc} onChange={e => setDesc(e.target.value)} className="w-full h-14 p-4 rounded-lg focus:outline-none font-mono"></textarea>
                    </div>
                    <div className="flex justify-between">
                        <div className="m-5 mt-1  bg-gray-800 w-fit p-2 rounded-md flex  hover:bg-gray-500 hover:text-black active:bg-gray-800 active:text-white transition-all duration-100 cursor-pointer text-white float-right" onClick={() => onClickPriorityBtn(title, desc)}>
                            <input type="button" value="Set Priority" className="cursor-pointer font-mono group" />
                        </div>
                        <div className={"m-5 mt-1 bg-gray-800 w-fit p-2 rounded-md flex  hover:bg-gray-500 hover:text-black active:bg-gray-800 active:text-white transition-all duration-100 cursor-pointer text-white float-right" + (isCreate ? " hidden" : "")} onClick={() => onClickSubmitBtn(title, desc)} >
                            <input type="button" value="Submit" className="cursor-pointer font-mono group" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
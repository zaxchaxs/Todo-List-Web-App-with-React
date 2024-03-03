'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
    
    const apiUrl = "http://localhost:5000/todolist/";
    const [todo, setTodo] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [isPriorityClicked, setPriorityClicked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getTodo = async () => {
            try {
                const res = await fetch(apiUrl + params);
                const data = await res.json();
                setTodo(data);
            } catch(e) {
                throw new Error(e);
            }
        }

        getTodo();
    }, [])

    // handlers function
    const handlerClickUpdate = () => {
        setIsUpdate(!isUpdate);
    };

    const handlerClickPriority = (title, description) => {
        setPriorityClicked(!isPriorityClicked)
        setTodo({...todo, title, description})
    };

    const handlerClickPriorityVal = (priority) => {
        setPriorityClicked(!isPriorityClicked)
        setTodo({...todo, priority})
    }

    const handlerClickSubmit = async () => {
        const data = {
            title: todo.title,
            description: todo.description,
            priority: todo.priority
        };

        try {
            await fetch(apiUrl + params, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } catch (e) {
            throw new Error(e);
        }
        setIsUpdate(!isUpdate);
        router.push("/todolist");
    }

    return(
        <>
            <DetailModal todo={todo} onUpdateClick={handlerClickUpdate} isUpdate={isUpdate} />
            <UpdateTodoModal isUpdate={isUpdate} isPriorityClicked={isPriorityClicked} onClickPriorityBtn={handlerClickPriority} onClickSubmitBtn={handlerClickSubmit} />
            <PriorityModal isPriorityClicked={isPriorityClicked} onClickPriorityVal={handlerClickPriorityVal} />
        </>
    )
}

  function DetailModal({todo, onUpdateClick, isUpdate}) {

    return(
        <div className={"shadow-lg m-20 rounded-lg w-4/5 mx-auto bg-gray-600" + (isUpdate ? " blur-md" : "")}>
            <div className="p-7 bg-gray-800 text-justify rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold font-mono text-white">{todo.title}</h1>
            </div>
            <div className="bg-gray-600 p-10 text-justify rounded-lg">
                <div>
                    <p className="text-2xl font-bold font-mono text-gray-900">{todo.description}</p>
                </div>
            </div>
            <div className="p-5 border-2 border-black flex justify-between">
                <button className={"bg-gray-800 p-3 font-mono rounded-lg text-white text-lg font-bold hover:bg-gray-500 hover:text-gray-800 active:bg-gray-800 active:text-white transition-all duration-100" + (isUpdate ? " hidden" : "")} onClick={onUpdateClick}>Update</button> 
                <button className={"bg-red-800 p-3 font-mono rounded-lg text-white text-lg font-bold hover:bg-red-500  active:bg-red-800 active:text-white transition-all duration-100" + (isUpdate ? " hidden" : "")} >Mark as Done</button> 
            </div>
        </div>
    )
  }

function UpdateTodoModal({isUpdate, isPriorityClicked, onClickPriorityBtn, onClickSubmitBtn}) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    return(
        <div className={"flex items-center justify-center h-screen inset-0 " + (isUpdate ? "fixed" : "hidden")}>
            <div className={"card bg-gray-600 rounded-lg flex overflow-hidden shadow-lg h-60 w-96 max-w-2xl max-h-2xl " + (isPriorityClicked ? "blur-sm" : "")}>
                <div className=" w-full">
                    <div className="m-4">
                        <input type="text" value={title} placeholder="Title" className={"w-full h-12 rounded-md p-4 font-mono "} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="m-4 rounded-md">
                        <textarea placeholder="Descriptions" value={desc} onChange={e => setDesc(e.target.value)} className="w-full h-14 p-4 rounded-lg focus:outline-none font-mono"></textarea>
                    </div>
                    <div className="flex justify-between">
                        <div className={"m-5 mt-1 bg-gray-800 w-fit p-2 rounded-md flex  hover:bg-gray-500 hover:text-black active:bg-gray-800 active:text-white transition-all duration-100 cursor-pointer text-white float-right " + (isPriorityClicked ? "hidden" : "")} onClick={() => onClickPriorityBtn(title, desc)}>
                            <input type="button" value="Set Priority" className="cursor-pointer font-mono group" />
                        </div>
                        <div className={"m-5 mt-1 bg-gray-800 w-fit p-2 rounded-md flex  hover:bg-gray-500 hover:text-black active:bg-gray-800 active:text-white transition-all duration-100 cursor-pointer text-white float-right " + (!isPriorityClicked ? "" : " hidden")} onClick={() => {onClickSubmitBtn(title, desc); setTitle(""); setDesc("")}} >
                            <input type="button" value="Submit" className="cursor-pointer font-mono group" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PriorityModal({isPriorityClicked, onClickPriorityVal}) {
    return(
        <div className={"top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " + (isPriorityClicked ? "fixed z-30" : "hidden")}>
            <div className="">
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md p-2 bg-red-500 cursor-pointer text-white font-mono hover:bg-red-800 active:bg-red-600 w-14" val={1} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-orange-500 cursor-pointer text-white font-mono hover:bg-orange-800 active:bg-orange-500 w-14" id="priorityVal" val={2} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-yellow-500 cursor-pointer text-white font-mono hover:bg-yellow-800 active:bg-yellow-500 w-14" val={3} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-green-300 cursor-pointer text-white font-mono hover:bg-green-800 active:bg-green-300 w-14" val={4} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-green-500 cursor-pointer text-white font-mono hover:bg-green-800 active:bg-green-500 w-14" val={5} />
            </div>
        </div>
    )
}
  
function PriorityButton({classBtn, onClickPriorityVal, val}) {
    return(
        <>
            <input type="button" value={val} className={classBtn} onClick={e => onClickPriorityVal(Number(e.target.value))} />
        </>
    )    
}
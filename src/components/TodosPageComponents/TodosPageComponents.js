import { useRouter } from "next/navigation";
import { useState } from "react";

const apiUrl = "http://localhost:5000/todolist/";

function CreateTodoButton({onCreateTodo, isCreateTodo}) {
    return(
        <div className={"fixed bottom-8 right-10 bg-gray-900 rounded-full w-12 h-12 cursor-pointer flex items-center justify-center shadow-lg hover:bg-gray-700  active:text-white active:bg-gray-900 " + (isCreateTodo ? "hidden" : "") } onClick={onCreateTodo}>
            <div className="font-mono text-2xl text-white">
                <button>+</button>
            </div>
        </div>
    )
}

function TodosHeader({title, desc}) {
    return(
        <div className="fixed top-0 z-30 p-4 backdrop-blur-md w-full">
            <div className="flex justify-center p-2">
                <h1 className="text-3xl font-bold font-mono text-gray-900">{title}</h1>
            </div>
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold font-mono text-gray-900">{desc}</h1>
            </div>
        </div>
    )
}


function TodosCard({title, desc, priority, idTodo }) {
    const route = useRouter();
    const handleClickDetail = (id) => {
        route.push("/todolist/" + id);
    }

    return(
        <div className="bg-gray-600 rounded-lg overflow-hidden shadow-lg h-60 m-5 text-ellipsis whitespace-break-spaces">
            <p className="text-white font-mono text-xl p-4 bg-gray-900 font-bold h-14 leading-relaxed overflow-hidden">{title}</p>
            <p className="text-black font-mono text-lg p-4 text-justify h-1/2 overflow-hidden font-bold">{desc}</p>
            <div className="flex justify-between p-2 z-50">
                <p className="p-2 w-12 text-center rounded-md bg-gray-900 text-white font-bold">{priority}</p>
                <input className="cursor-pointer p-2 bg-gray-900 text-white font-mono rounded-md shadow-md hover:bg-gray-700  active:text-white active:bg-gray-900 font-bold" type="button" value="See Details" onClick={() => handleClickDetail(idTodo)} />
            </div>
        </div>
    )
}

function InsertDataModal({onClickPriorityBtn, onClickSubmitBtn, isCreateTodo, isPriorityClicked, newData }) {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    return(
        <>
        <div className={"flex items-center justify-center h-screen inset-0  " + (isCreateTodo ? "fixed" : "hidden")}>
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
                        <div className={"m-5 mt-1 bg-gray-800 w-fit p-2 rounded-md flex  hover:bg-gray-500 hover:text-black active:bg-gray-800 active:text-white transition-all duration-100 cursor-pointer text-white float-right " + (newData.title && !isPriorityClicked? "" : " hidden")} onClick={() => {onClickSubmitBtn(title, desc); setTitle(""); setDesc("")}} >
                            <input type="button" value="Submit" className="cursor-pointer font-mono group" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

function PriorityModal({isPriorityClicked, onClickPriorityVal}) {
    return(
        <>
        <div className={"top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " + (isPriorityClicked ? "fixed z-30" : "hidden")}>
            <div className="">
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md p-2 bg-red-500 cursor-pointer text-white font-mono hover:bg-red-800 active:bg-red-600 w-14" val={1} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-orange-500 cursor-pointer text-white font-mono hover:bg-orange-800 active:bg-orange-500 w-14" id="priorityVal" val={2} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-yellow-500 cursor-pointer text-white font-mono hover:bg-yellow-800 active:bg-yellow-500 w-14" val={3} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-green-300 cursor-pointer text-white font-mono hover:bg-green-800 active:bg-green-300 w-14" val={4} />
                <PriorityButton onClickPriorityVal={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-green-500 cursor-pointer text-white font-mono hover:bg-green-800 active:bg-green-500 w-14" val={5} />
            </div>
        </div>
        </>
    )
}

function PriorityButton({classBtn, onClickPriorityVal, val}) {
    return(
        <>
            <input type="button" value={val} className={classBtn} onClick={e => onClickPriorityVal(e.target.value)} />
        </>
    )    
}

export {
    CreateTodoButton,
    TodosHeader,
    TodosCard,
    InsertDataModal,
    PriorityModal,
}
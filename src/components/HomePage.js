'use client';

import { useState, useEffect } from "react";

export default function HomePage() {
    const apiUrl = "http://localhost:5000/todolist";
    const [showModal, setShowModal] = useState(false);
    const [showPriority, setShowPriority] = useState(false);
    
    const [priorityVal, setPriorityVal] = useState(5);
    const [insertData, setInsertData] = useState({});
    
    useEffect(() => {
        setInsertData(prevData => ({...prevData, priority: priorityVal}));
    }, [priorityVal]);

    useEffect( () => {
        const fetchData = async () => {
            try{
                const res = await fetch(apiUrl);
                const data = await res.json();
                setInsertData(data);
                console.log(data)
            } catch(e) {
                console.log(e);
            }
        }
        fetchData();
    },[])


    // Functions handle
    function handleShowModalClick() {
        setShowModal(!showModal);
    };

    function handleClickPriority(title, description) {
        setShowPriority(!showPriority);
        setInsertData({title, description});
    };
    
    
    function handleSetValPriority(val) {
        setShowPriority(!showPriority);
        setPriorityVal(Number(val));
    }
    
    async function handleClickSubmitData() {
        console.log(insertData);
        // try {
        //     await fetch(apiUrl, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(insertData)
        //     })
        // } catch(e) {
        //     console.log(e)
        // }
    };
    

    if(!showModal) {
        return(
            <>
            <div className="container  mx-auto p-14 pt-32" id="createTodo">
                <div className="flex justify-center p-2">
                    <h1 className="text-3xl font-bold font-mono text-gray-900">Every to-do list is a small step towards big dreams</h1>
                </div>
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold font-mono text-gray-600">Start planning today!</h1>
                </div>
                <div className=" justify-center flex">
                    <button className="bg-gray-800 p-2 font-mono rounded-lg m-4 text-white hover:bg-gray-500 hover:text-gray-800 active:bg-gray-800 active:text-white transition-all duration-100" id="createBtn" onClick={handleShowModalClick}>Create Todo!</button> 
                </div>
            </div>            
            </>
        )
    };

    return(
        <>
        <InsertDataModal onClickPriorityBtn={handleClickPriority} showPriority={showPriority} onClickSubmitBtn={handleClickSubmitData} />
        <PriorityModal isPriorityClicked={showPriority} onClickPriorityVal={handleSetValPriority} />
        </>
    )
}

function InsertDataModal({onClickPriorityBtn, showPriority, onClickSubmitBtn}) {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    return(
        <>
        <div className={"flex items-center justify-center h-screen inset-0 absolute" + (showPriority ? " blur-lg" : " ")}>
            <div className="card bg-gray-600 rounded-lg flex overflow-hidden shadow-lg h-60 w-96 max-w-2xl max-h-2xl">
                <div className=" w-full">
                    <div className="m-4">
                        <input type="text" value={title} placeholder="Title" className="w-full h-12 rounded-md p-4 font-mono" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="m-4 rounded-md">
                        <textarea placeholder="Descriptions" value={desc} onChange={e => setDesc(e.target.value)} className="w-full h-14 p-4 rounded-lg focus:outline-none font-mono"></textarea>
                    </div>
                    <div className="flex justify-between">
                        <div className="m-5 mt-1  bg-gray-800 w-fit p-2 rounded-md flex  hover:bg-gray-500 hover:text-black active:bg-gray-800 active:text-white transition-all duration-100 cursor-pointer text-white float-right">
                            <input type="button" value="Set Priority" className="cursor-pointer font-mono group" onClick={() => onClickPriorityBtn(title, desc)} />
                        </div>
                        <div className="m-5 mt-1 bg-gray-800 w-fit p-2 rounded-md flex  hover:bg-gray-500 hover:text-black active:bg-gray-800 active:text-white transition-all duration-100 cursor-pointer text-white float-right">
                            <input type="button" value="Submit" className="cursor-pointer font-mono group" onClick={() => onClickSubmitBtn(title, desc)} />
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
        <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" + (isPriorityClicked ? " " : " hidden")} id="priorityPopup">
            <div className="">
                <PriorityButton valData={onClickPriorityVal} classBtn="m-1 rounded-md p-2 bg-red-500 cursor-pointer text-white font-mono hover:bg-red-800 active:bg-red-600 w-14" val={1} />
                <PriorityButton valData={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-orange-500 cursor-pointer text-white font-mono hover:bg-orange-800 active:bg-orange-500 w-14" id="priorityVal" val={2} />
                <PriorityButton valData={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-yellow-500 cursor-pointer text-white font-mono hover:bg-yellow-800 active:bg-yellow-500 w-14" val={3} />
                <PriorityButton valData={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-green-300 cursor-pointer text-white font-mono hover:bg-green-800 active:bg-green-300 w-14" val={4} />
                <PriorityButton valData={onClickPriorityVal} classBtn="m-1 rounded-md  p-2 bg-green-500 cursor-pointer text-white font-mono hover:bg-green-800 active:bg-green-500 w-14" val={5} />
            </div>
        </div>

        </>
    )
}

function PriorityButton({classBtn, valData, val}) {
    return(
        <>
            <input type="button" value={val} className={classBtn} onClick={e => valData(e.target.value)} />
        </>
    )    
}
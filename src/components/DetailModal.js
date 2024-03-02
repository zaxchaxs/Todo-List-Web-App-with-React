'use client';

import TodosPage from "@/components/TodosPage";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    
    const apiUrl = "http://localhost:5000/todolist/";
    const [todo, setTodo] = useState({});

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

    return(
        <>
            <div className="m-20 h-4/5 w-4/5 mx-auto rounded-lg z-50">
                <div className="flex p-5 bg-gray-800 justify-center border-2 border-red-500">
                    <h1 className="text-3xl font-bold font-mono text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam eos cum molestias odit. Officiis accusamus, nesciunt ducimus, aliquam dolorum est nam natus atque animi velit facere ea, optio blanditiis modi?</h1>
                </div>
                <div className="bg-gray-600 p-10 text-justify w-full h-screen">
                    <div>
                        <p className="text-2xl font-bold font-mono text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quis quaerat quo quod, dolores vel facilis nihil praesentium assumenda nisi laboriosam in aut id est. Sint doloribus hic quae nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptate molestias quae corrupti nesciunt dolor reiciendis possimus assumenda. Velit neque, quis maxime cumque facere facilis libero corporis quasi perferendis laboriosam.</p>
                    </div>
                    <div className="absolute bottom-4 left-4 justify-center">
                        <button className="bg-gray-800 p-2 font-mono rounded-lg m-4 text-white hover:bg-gray-500 hover:text-gray-800 active:bg-gray-800 active:text-white transition-all duration-100">Create Todo!</button> 
                    </div>
                </div>
            </div>            
        </>
    )
  }
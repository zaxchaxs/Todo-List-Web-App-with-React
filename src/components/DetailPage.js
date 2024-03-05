'use client';
import { DetailModal, UpdateTodoModal, PriorityModal } from "./DetailModalComponents/DetailModalComponents.js";
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
    };

    const handlerClickBack = () => router.push("/todolist");

    const handleClickDeleteTodo = async () => {
        try {
            await fetch(apiUrl + params, {
                method: "DELETE"
            })
        } catch(e) {
            throw new Error(e)
        };
        router.push("/todolist")
    };

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
        // router.push("/todolist");
    }

    return(
        <>
            <DetailModal todo={todo} onUpdateClick={handlerClickUpdate} isUpdate={isUpdate} onBackClick={handlerClickBack} onClickDelete={handleClickDeleteTodo} />
            <UpdateTodoModal isUpdate={isUpdate} isPriorityClicked={isPriorityClicked} onClickPriorityBtn={handlerClickPriority} onClickSubmitBtn={handlerClickSubmit} />
            <PriorityModal isPriorityClicked={isPriorityClicked} onClickPriorityVal={handlerClickPriorityVal} />
        </>
    )
}
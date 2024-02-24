'use client'
import HomePage from "@/components/HomePage";
import TodosPage from "@/components/TodosPage";

import { useState } from "react";

export default function Home() {
  
  const [datas, setData] = useState(null);
  
  const getData = async () => {
    const apiUrl = 'http://localhost:5000/todolist';
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setData(data);
      console.log(datas);
    } catch(e) {
      console.log(e);
    }
  }

  if(datas) {
    return(
      <>
          <TodosPage />
      </>
    )
  };

  return (
    <>
      <HomePage />
    </>
  );
}

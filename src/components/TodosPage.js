export default function TodosPage() {
    return(
        <>
        <div className="container  mx-auto p-5" id="createTodo">
            <div className="flex justify-center p-2">
                <h1 className="text-3xl font-bold font-mono text-gray-900">Your Todolists</h1>
            </div>
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold font-mono text-gray-600">Watchu Doing? Do it!</h1>
            </div>
        </div>
        <div className="w-full border-black border-2 flex items-center justify-between p-4" id="todoPlaces">
            <div className="bg-gray-600 rounded-lg overflow-hidden shadow-lg h-60 w-96 max-w-2xl max-h-2xl">
                <p className="text-white font-mono text-xl p-4 bg-gray-900 font-bold">Your Todolist</p>
                <p className="text-black font-mono text-lg p-4 text-justify h-1/2 overflow-hidden font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nam! Consectetur, itaque? Possimus fugit labore quod, dolorum qui odit, illo, nihil vero accusantium ut recusandae praesentium modi nesciunt ipsum dolorem.</p>
                <div className="flex justify-between p-2 z-50">
                    <p className="p-2 w-12 text-center rounded-md bg-gray-900 text-white font-bold">5</p>
                    <input className="cursor-pointer p-2 bg-gray-900 text-white font-mono rounded-md shadow-md hover:bg-gray-700  active:text-white active:bg-gray-900 font-bold" type="button" value="See Details" />
                </div>
            </div>
            <div className="bg-gray-600 rounded-lg flex overflow-hidden shadow-lg h-60 w-96 max-w-2xl max-h-2xl">
    
            </div>
            <div className="bg-gray-600 rounded-lg flex overflow-hidden shadow-lg h-60 w-96 max-w-2xl max-h-2xl">
    
            </div>
        </div>
        </>
    )
}
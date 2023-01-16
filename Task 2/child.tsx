//TO BE SHARED WITH CANDIDATES FOR TROUBLESHOOTING

import {useState} from 'react'
export { Child }

// const ChIld = ({ callback }) => {
const Child = ({ callback }: {callback: any}) => {
    const [input, setInput] = useState('👋')

    const handleCallback = () => callback(input)

    return (
        // <div >
        <div>
            <div className="flex items-center max-w-md m-20 bg-white rounded-lg ">
                <div className="w-full">
                    <input
                        // type="???"
                        type="text"
                        className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
                        placeholder="Input"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
                        type="submit"
                        // onClick={() =>handleCallback}
                        onClick={handleCallback}
                    >
                        Sent
                    </button>
                </div>
            </div>
        </div>
    )
}
//TO BE SHARED WITH CANDIDATES FOR TROUBLESHOOTING

import { useState } from 'react'
// import Child from '../components/child'
import { Child } from '../components/child'

export default function Home() {
    // const [output, setState] = useState<string>(null)
    const [output, setState] = useState<string>('👋')

    // const callback = payload => {
    const callback = (payload: string) => {
        setState(payload)
    }

    //    return (
    //     <div className='h-screen flex flex-col flex-center items-center justify-center bg-gray-300'>
    //         <h1>Got: {output ? output : callback} from child component</h1>
    //         <Child callback={callblack} />
    //     </div>
    // )
    
    return (
        <div className='h-screen flex flex-col flex-center items-center justify-center bg-gray-300'>
            <h1><>Got: {output ? output : callback} from child component</></h1>
            <Child callback={callback} />
        </div>
    )
}
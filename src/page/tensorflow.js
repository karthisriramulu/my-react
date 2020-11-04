import React, { useRef } from 'react'
import useTFClassify from '../utils/hooks/useTFClassify';


export default function Tensorflow() {

    const imageRef = useRef();

    const {predict, predictions, isLoading} = useTFClassify();
    
    
    return (
        <div className="flex justify-center">
            <div className="w-1/3">
                <h1 className="text-center m-5">Tensorflow Js</h1>
                <img 
                    src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE3ODUwOX0" width="450" 
                    ref={imageRef}
                    crossOrigin="anonymous"
                 />
                <div className="text-center my-5">
                    {
                        predictions.length > 0 &&   predictions.map( prediction => (
                                    <div className="flex justify-between mx-10">
                                        <p>{ prediction.className }</p>
                                        <p>{ Math.floor(prediction.probability * 100) }%</p>
                                    </div>
                        ))
                    }
                    <button 
                        className="p-2 rounded bg-gray-900 text-white w-64"
                        onClick={()=> predict(imageRef.current) }
                    >
                    { isLoading && "⏳" }
                    { !isLoading && "Predict Result"}
                    </button>
                </div>    
            </div>
        </div>
    )
}

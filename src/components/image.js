import React, { useRef } from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import useTFClassify from '../utils/hooks/useTFClassify';

function Image({index, image, handleRemove, show}) {

    const [isHovering, setIsHovering] = useState(false);

    const imgRef = useRef();
    const {predict, predictions, setPredictions, isLoading} = useTFClassify();


    return(
        
            <div className="relative"
                onMouseEnter={() => {setIsHovering(true)}} 
                onMouseLeave={() => {setIsHovering(false)}}>
                {
                   ( predictions.length > 0 || isLoading ) && (
                        <span className="absolute left-0 bg-gray-800 text-white rounded-lg shadow px-2 ml-5"
                        onClick={ () => setPredictions([]) }>
                            { isLoading && <p>Fetching results...</p> }                         
                            { predictions.length > 0 &&   predictions.map( prediction => (
                                <div className="flex justify-between">
                                    <p>{ prediction.className }</p>
                                    <p>{ Math.floor(prediction.probability * 100) }%</p>
                                </div>
                            )) }
                        </span>
                    )
                }

                <i className={`fas fa-times absolute p-1 right-0 cursor-pointer opacity-25 hover:opacity-100 ${ isHovering ? "" : "hidden" }`}
                onClick={ () => handleRemove(index) } ></i>

                <i className={`fas fa-search absolute p-1 left-0 cursor-pointer opacity-25 hover:opacity-100 ${ isHovering ? "" : "hidden" }`}
                onClick={ () => predict(imgRef.current) } ></i>

                <img ref={imgRef} crossOrigin="anonymous" onClick={ show } src={image} width="100%" height="auto" key={index}  />

            </div>
    );
}

const types = {
    function : function(props, propName){

        if( typeof props[propName] != "function"){
            return new Error(`'${propName}' must be a function but you have provided ${typeof props[propName]}`);
        }
        
    },
    number: function (props, propName){

        if( typeof props[propName] != "number"){
            return new Error(`'${propName}' must be a number but you have provided ${typeof props[propName]}`);
        }
        
    },

}
// It checks prop type and trigger error
Image.propTypes = {
    show: PropTypes.func,
    index: PropTypes.number,
    image: PropTypes.string,
    handleRemove: PropTypes.func,
}

export default Image;
import React, { useState } from 'react'
import "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

export default function useTFClassify() {

    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function predict(img) {
        
        // const img = imageRef.current;

        setIsLoading(true);

        mobilenet.load().then(model => {

            model.classify(img).then((predictions) => {

                setPredictions(predictions);

              console.log('Predictions: ');
              console.log(predictions);

              setIsLoading(false);
            });
          });
    }

    return {predict, predictions, setPredictions, isLoading};
}

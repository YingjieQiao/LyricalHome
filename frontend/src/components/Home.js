import React, { useState } from 'react';
import axios from "axios";
import { Graph } from "react-d3-graph";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from "./Home.module.css";


function Home() {

    const [word, setWord] = useState('');

    // graph payload (with minimalist structure)
    let data = {
        nodes: [
            // { id: "Harry", size: 1000 }, { id: "Sally" }, { id: "Alice" }
        ],
        links: [
        // { source: "Harry", target: "Sally" },
        // { source: "Harry", target: "Alice" },
            ],
    };
  
    // the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
        height: 1500,
        width: 1500
    };

    const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
    };
  
    const graphButtonHandler = () => {
        console.log(word);

        axios({
            url: "http://localhost:8000/similarity/" + word,
            method: 'GET',
        }).then((res) => {
            console.log(res);
            console.log(Object.keys(res.data).length);
            const keys = Object.keys(res.data);
            keys.forEach(key => {
                data.nodes.push({id: key, size: res.data[key]});
                data.links.push({source: word, target: key})
            })

            console.log(data.nodes);
            console.log(data.links);
        });
    }

    return (
        <div className={styles.overall}>
            <h1>Poem word relationship graph</h1>
            <TextField id="standard-basic" label="Poem word" variant="standard" 
                onChange={(event) => {setWord(event.target.value)}}
            />

            <div className={styles.spaced_div}>
                <Button variant="outlined" color="primary" onClick={graphButtonHandler} >
                Generate the information graph!</Button>
            </div>

            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
            />  

            <div className={styles.spaced_div}>
                <h1>Poem word relationship graph</h1>
            </div>

            <div className={styles.spaced_div}>
                <Button variant="outlined" color="primary" onClick={graphButtonHandler} >
                Generate the information graph!</Button>
            </div>
        </div>
        
        
    )

}

export default function home() {
    return <Home />;
}

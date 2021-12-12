import React, { Component } from 'react';
import axios from "axios";
import { Graph } from "react-d3-graph";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from "./Similarity.module.css";


class Similarity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            word: "",

            // the graph configuration, just override the ones you need
            myConfig: {
                nodeHighlightBehavior: true,
                node: {
                    color: "lightgreen",
                    size: 120,
                    highlightStrokeColor: "blue",
                },
                link: {
                    highlightColor: "lightblue",
                },
                height: 1000,
                width: 1500
            },

            // graph payload (with minimalist structure)
            data: {
                nodes: [
                    // { id: "Harry", size: 1000 }, { id: "Sally" }, { id: "Alice" }
                ],
                links: [
                // { source: "Harry", target: "Sally" },
                // { source: "Harry", target: "Alice" },
                    ],
            }
        }
        
      
    }


    graphButtonHandler = () => {
        console.log(this.state.word);

        let data = {
            nodes: [
                // { id: "Harry", size: 1000 }, { id: "Sally" }, { id: "Alice" }
            ],
            links: [
            // { source: "Harry", target: "Sally" },
            // { source: "Harry", target: "Alice" },
                ],
        };

        axios({
            url: "http://localhost:8000/similarity/" + this.state.word,
            method: 'GET',
        }).then((res) => {
            console.log(res);
            console.log(Object.keys(res.data).length);
            const keys = Object.keys(res.data);
            keys.forEach(key => {
                let val = res.data[key];
                data.nodes.push({id: key + ": " + val/1000, size: val});
                data.links.push({source: this.state.word, target: key + ": " + val/1000})
            })
            data.nodes.push({id: this.state.word, size: 10000});
            console.log(data.nodes);
            console.log(data.links);

            this.setState({data});
        });
    }

    render() {
        return (
            <div className={styles.overall}>
                <h1>Poem Word Relationship Graph</h1>
                <TextField id="standard-basic" label="Poem word" variant="standard" 
                    onChange={(event) => {this.setState({word: event.target.value})}}
                />
    
                <div className={styles.spaced_div}>
                    <Button variant="outlined" color="primary" onClick={this.graphButtonHandler} >
                    Generate the information graph!</Button>
                </div>
    
                <Graph
                    id="graph-id" // id is mandatory
                    data={this.state.data}
                    config={this.state.myConfig}
                />  
    
            </div>
            
        );
    }

}

export default Similarity;

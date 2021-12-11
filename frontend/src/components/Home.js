import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "./Home.module.css";

import MyImg from './img.png';



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
        
      
    }

    f1 = (event) => {
        this.props.history.push('/similarity');
    }

    f2 = (event) => {
        this.props.history.push('/ranking');
    }


    render() {
        return (
            <div className={styles.overall}>
                <div >
                    <Card sx={{ maxWidth: 1000 }} >
                        <CardActionArea>
                            <CardMedia 
                            component="img"
                            height="500"
                            src={MyImg}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lyrical Home
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Welcome to the home page of my Lyrical Home! You can click the buttons below to explore
                                the insights of traditional Chinese Poems!
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>

                <div className={styles.spaced_div}>
                    <Button variant="contained" onClick={this.f1}> Go to 《Poem Word Relationship Graph》Page!</Button>
                </div>

                <div className={styles.spaced_div}>
                    <Button variant="contained" onClick={this.f2}> Go to 《Top Words》Page!</Button>
                </div>
    
            </div>
            
        );
    }

}

export default Home;

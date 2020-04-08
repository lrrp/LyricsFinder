import React, { Component } from 'react';

import axios from "axios";

export const Context = React.createContext();

export class Provider extends Component{
    
    state = {
        track_list : [],
        heading: 'Top 10 tracks'
    }

    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=eg&f_has_lyrics=1&apikey=${
            process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                this.setState({
                    track_list: res.data.message.body.track_list
                });
            })
            .catch(err => console.log(err));
    }

    changeState = (data) => {
        this.setState({ track_list: data });
    };

    render(){
        return(
            <Context.Provider value={{state: this.state, changeState: this.changeState}}>
                {this.props.children}
            </Context.Provider>
        );
    }
};

export const Consumer = Context.Consumer;
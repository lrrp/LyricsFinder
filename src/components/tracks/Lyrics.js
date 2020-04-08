import React, { Component } from 'react';

import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Lyrics extends Component{
    
    state = {
        lyrics: {},
        track: {}
    }

    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${
            process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            this.setState({
                lyrics: res.data.message.body.lyrics
            });

            return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${
                    process.env.REACT_APP_MM_KEY}`)
                    .then(res => {
                    this.setState({
                        track: res.data.message.body.track
                    });
        })
        .catch(err => console.log(err));
    })

}

    render(){
        const { lyrics, track } = this.state;
        console.log(lyrics.lyrics_body);
        if(lyrics === undefined || track === undefined || Object.keys(lyrics).length === 0 || Object.keys(track).length === 0){
            return <Spinner />
        } else {
            return(
                <>
                    <Link to='/' className='btn btn-dark btn-sm mb-4'>
                        Go Back
                    </Link>
                    <div className='card'>
                        <h5 className='card-header'>
                            {track.track_name} by {' '} <span className='text-secondary'>{track.artist_name}</span>      
                        </h5>
                        <div className='card-body'>
                            {lyrics.lyrics_body.split("\n").map(lyric => {
                                return <p className="card-text" key={Math.random()}>{lyric}</p>
                            })}
                        </div>
                    </div>
                    <ul className='list-group mt-3'>
                        <li className='list-group-item'>
                            <strong>Album ID</strong>: {track.album_id}
                        </li>
                        <li className='list-group-item'>
                            <strong>song Genre</strong>:{' '} { track.primary_genres.music_genre_list.length === 0 ? 'NO GENRE AVAILABLE' : track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                        </li>
                        <li className='list-group-item'>
                            <strong>Explicit Words</strong>:{' '}{track.explicit === 0 ? 'No' : 'Yes'}
                        </li>
                        <li className='list-group-item'>
                            <strong>Release Date </strong>:{' '}<Moment format='DD/MM/YYYY'>{track.first_release_date}</Moment>
                        </li>
                    </ul>
                </>
            );
        }

    }
}
export default Lyrics; 
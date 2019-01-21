import React, { Component } from 'react';
import { Form, Input, Button, Container, Label } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  state = {
    artist: null,
    song: null,
    lyrics: null,
    size: 'normal'
  }

  setArtist = (e) => {
    this.setState({
      artist: e.target.value
    })
  }
  setSong = (e) => {
    this.setState({
      song: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.artist) {
      alert('Please provide artist')
    } else if (!this.state.song) {
      alert('Please provide song')
    } else {
      fetch(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.song}`)
        .then(data => data.json())
        .then(data => (data.lyrics === undefined) ? this.setState({
          lyrics: ['Lyrics', 'unavailable.']
        }) : this.setState({
          lyrics: data.lyrics.replace(/\n/ig, '<br/>').split('<br/>')
      }))
      this.input_one.value = ""
    }
  }
  increaseSize = () => {
    this.setState({
      size: (this.state.size === 'normal') ? 'big' : 'normal'
    })
  }
  render() {
    return (
      <div className="App">
      <h1>Lyric Search</h1>
      <Form onSubmit={this.onSubmit} className="form">
        <Form.Field>
        <Input label="Artist" placeholder="search for an artist..." onChange={this.setArtist}
        id="input_one"
        ref={(ref) => this.input_one = ref}/>
        </Form.Field>
        <Form.Field>
        <Input label="Song" placeholder="search for a song..." onChange={this.setSong}
        id="input_two"
        ref={(ref) => this.input_two = ref}/>
        </Form.Field>
        <Button>Submit</Button>
        {this.state.lyrics && <Button onClick={this.increaseSize}>{(this.state.size==='normal') ? '+' : '-'}</Button>}
      </Form>


      <Container className="mode">
      <h2>{this.state.lyrics && 'Song: ' +  this.state.song.slice(0,1).toUpperCase() + this.state.song.slice(1)}</h2>

       <h2>{this.state.lyrics && 'Artist: ' +  this.state.artist.slice(0,1).toUpperCase() + this.state.artist.slice(1)}</h2>

      </Container>


       <Container className={(this.state.size==='normal') ? 'lyrics-small' : 'lyrics-big'}>
         {this.state.lyrics && this.state.lyrics.filter(x => x.includes('chanson') !== true).map((x, idx) => <li key={idx}>{x}</li>)}
       </Container>

      </div>
    );
  }
}

export default App;

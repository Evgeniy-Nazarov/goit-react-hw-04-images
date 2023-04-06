import { Component } from "react"

export class App extends Component {

  state = {
    image: null,
    loading: false,
  }
  
  componentDidMount() { 
    fetch('https://pixabay.com/api/?q=cat&page=1&key=33830559-b80d1d0487f9caaadda577109&image_type=photo&orientation=horizontal&per_page=12')
      .then(res => res.json())
      .then(image => this.setState({image}))
  }
  render() {
    return (
      <div>
        { this.state.image && (<div> My image after fetch</div>)}
      </div>
    );
  };
}

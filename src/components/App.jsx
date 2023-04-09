import { Component } from "react"
  import { ToastContainer} from 'react-toastify';

import Searchbar from "./Searchbar/Searchbar";

export class App extends Component {

  state = {
    tags: '',
  }

  handleSubmit = tags => {
    this.setState({ tags });
  };
  
  // componentDidMount() { 
  //   fetch('https://pixabay.com/api/?q=cat&page=1&key=33830559-b80d1d0487f9caaadda577109&image_type=photo&orientation=horizontal&per_page=12')
  //     .then(res => res.json())
  //     .then(image => this.setState({image}))
  // }
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

      </div>
    );
  };
}

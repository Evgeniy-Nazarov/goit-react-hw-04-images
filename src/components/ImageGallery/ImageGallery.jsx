import { Component } from "react";


export default class ImageGallery extends Component {

    state = {
        pictureName: null,
        error: null,
        status: 'idle'
    };

    componentDidUpdate(prevProps, prevState) { 

        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;
        
        if (prevName !== nextName) {
            
            this.setState({ status: 'pending'});
            fetch(`https://pixabay.com/api/?q=${nextName}&page=1&key=33830559-b80d1d0487f9caaadda577109&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(
                        new Error(`Картинка с именем ${nextName} не найдена`),
                        );
                })
                .then(pictureName => this.setState({ pictureName, status: 'resolved' }))
                .catch(error => this.setState({error, status: 'rejected'}))
  }
    
    }

    render() { 
        const { pictureName, error, status } = this.state;

if (status === 'idle') {
  return <div>Введите название картинки</div>;
    }

    if (status === 'pending') {
        return <div>Loading</div>
    }
          

          if (status === 'rejected') {
            return <h1>{error.message}</h1>
        }
              
        if (status === 'resolved') {
            return <ul>
            <li className="gallery-item">
                <img src={pictureName.hits[1].webformatURL} alt={ pictureName.hits[1].tags} />
            </li>
        </ul>
        }
    }

}

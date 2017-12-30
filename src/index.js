import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

const API_KEY = 'AIzaSyBxhnpyzVc2ZK_3ZCxxW3dofU_QAzHF6oA';



// Create a new component that produces some html

class App extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			videos: [],
			selectedVideo : null

		};
		this.videoSearch('surfboards');

		
	}

	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render(){

		const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 500);

		return(
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
			</div>
		);
	}
}


// Take this component and put it on the page (on the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));


















import React, { Component } from 'react';
import ImageApi from './service/ImageApi';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    searchTerm: '',
    images: [],
    isLoading: false,
    page: 1,
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchTerm } = this.state;
    if (
      (page !== prevState.page || searchTerm !== prevState.searchTerm) &&
      searchTerm !== ''
    ) {
      this.setState({
        isLoading: true,
      });
      this.fetchQuery(page, searchTerm);
    }
  }
  onSubmit = term => {
    const query = typeof term === 'string' ? term : term.query;
    if (query.trim && query.trim() !== '') {
      this.setState({ images: [], searchTerm: query, page: 1 });
    }
  };
  async fetchQuery(page, query) {
    try {
      let result = await ImageApi.retrieveImages(query, page);
      let data = result.data;
      let totalHits = data.totalHits;
      let images = data.hits;
      let imagesToLoad = isNaN(totalHits) ? 0 : totalHits - 12 * page;

      if (images.length === 0) {
        this.setState({ loadMore: false, isLoading: false });

        return;
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          loadMore: this.state.page < Math.ceil(totalHits / 12),
          isLoading: false,
        }));
      }
      if (images.length > 0 && this.state.page === 1) {
        return <span>Hooray! We found ${totalHits} images</span>;
      }

      imagesToLoad > 0
        ? this.setState({ loadMore: true })
        : this.setState({ loadMore: false });
    } catch (error) {
      console.error('Error retrieving images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };
  render() {
    const { images, isLoading, loadMore } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div className="App">
        <SearchBar onSubmit={this.onSubmit} />
        {images.length === 0}
        <div className="gallery_container">
          <ImageGallery images={images} />
        </div>
        <div className="loadmore_section">
          {loadMore && (
            <Button className="loadMore_button" action={this.handleLoadMore}>
              Load more
            </Button>
          )}
        </div>

        {isLoading && <Loader />}
      </div>
    );
  }
}

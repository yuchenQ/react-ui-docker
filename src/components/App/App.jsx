import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import qantasLogo from '../../assets/images/qantas-logo.png';

const Wrapper = styled.div`
  width: 50rem;
  margin-right: auto;
  margin-left: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div``;

const QantasLogo = styled.img.attrs({
  alt: 'Qantas',
  src: qantasLogo,
})`
`;

const Button = styled.button`
  display: block;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  border: 3px solid black;
  border-radius: 8px;
`;

const Loader = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const Image = styled.img.attrs({
  src: ({ url }) => url,
})`
  display: block;
  width: 100%;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCatUrl: null,
      loading: true,
    };

    this.handleGetCat = this.handleGetCat.bind(this);
  }

  componentDidMount() {
    this.handleGetCat();
  }

  handleGetCat() {
    this.setState({ loading: true });

    Axios
      .get('https://api.thecatapi.com/v1/images/search?limit=1&order=random&size=full')
      .then(res => this.setState({ currentCatUrl: res.data[0].url, loading: false }))
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const { currentCatUrl, loading } = this.state;

    return (
      <Wrapper>
        <Header>
          <div>
            <QantasLogo data-testid="qantas-logo" />
          </div>
          <Title data-testid="title">
            <span role="img" aria-label="dolphin">🐳🔥🐳</span>
            Docker UI Demo
            <span role="img" aria-labelledby="dolphin">🔥🐳🔥</span>
          </Title>
        </Header>
        <Button disabled={loading} onClick={this.handleGetCat}>
          Get another cat
        </Button>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <Image url={currentCatUrl} />
        )}
      </Wrapper>
    );
  }
}

export default App;

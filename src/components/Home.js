import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { withAuth0 } from '@auth0/auth0-react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flowers: []
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_SERVER}/flowers`
    axios.get(url)
      .then(response => {
        console.log(response.data);
        this.setState({
          flowers: response.data
        })
      }).catch(err => console.log(err));
  }

  addFavFlower = (index) => {
    const addFlower = {
      name: this.state.flowers[index].name,
      photo: this.state.flowers[index].photo,
      instructions: this.state.flowers[index].instructions,
      email: this.props.auth0.user.email
    }
    console.log(addFlower);
    const url = `${process.env.REACT_APP_SERVER}/add`;
    axios.post(url, addFlower).then(res => {
    }).catch();
  }


  render() {
    return (
      <Row xs={2} md={3} className="g-3">{
        this.state.flowers.map((flower, idx) => {
          return (
            <>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={flower.photo} />
                <Card.Body>
                  <Card.Title>{flower.name}</Card.Title>
                  <Card.Text>
                    {flower.instructions}
                  </Card.Text>
                  <Button onClick={() => this.addFavFlower(idx)} variant="primary">Add to favorite</Button>
                </Card.Body>
              </Card>
            </>
          )
        })
      }
      </Row>
    )
  }
}

export default withAuth0(Home);

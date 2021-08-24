import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { withAuth0 } from '@auth0/auth0-react';
class FavFlowers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favFlowers: [],
      showUpdateModal: false,
      UpdateFlowerObj: {},
    }
  }

  showingModal = (element) => {
    this.setState = {
      UpdateFlowerObj: element,
      showUpdateModal: !this.state.showUpdateModal
    }
  }

  componentDidMount() {
    const url = `http://localhost:8001/fav?email=${this.props.auth0.user.email}`
    axios.get(url)
      .then(response => {
        console.log(response.data);
        this.setState({
          favFlowers: response.data
        })
      }).catch();
  }

  deleteFavFlower = (id) => {
    const url = `http://localhost:8001/delete/${id}`
    axios.delete(url).then((result) => {
      console.log(result.data)
      this.setState = {
        favFlowers: result.data
      }
    }).catch()
  }

  // updateFavFlower=((e)=>{
  //   const flowerId = this.state.UpdateFlowerObj.id
  // })
  // const body =({
  //   name:e.target.name.
  // })

  render() {
    return (
      this.state.favFlowers.map((flower, idx) => {
        return (
          <>
            <Row key={idx} xs={4} md={3} className="g-3">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={flower.photo} />
                <Card.Body>
                  <Card.Title>{flower.name}</Card.Title>
                  <Card.Text>
                    {flower.instructions}
                  </Card.Text>
                  <Button onClick={() => this.deleteFavFlower(flower._id)} variant="primary">Delete</Button>
                  <Button onClick={() => this.updateFavFlower(idx)} variant="primary">Update</Button>
                </Card.Body>
              </Card>
            </Row>
          </>
        )
      })
    )
  }
}

export default withAuth0(FavFlowers);

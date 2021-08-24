import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { withAuth0 } from '@auth0/auth0-react';
import UpdateModal from './UpdateModal'
class FavFlowers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favFlowers: [],
      showUpdateModal: false,
      updateFlowerObj: {},
    }
  }


  componentDidMount() {
    const url = `${process.env.REACT_APP_SERVER}/fav?email=${this.props.auth0.user.email}`
    axios.get(url)
      .then(response => {
        console.log(response.data);
        this.setState({
          favFlowers: response.data
        })
      }).catch();
  }

  showingModal = (element) => {
    this.setState({
      updateFlowerObj: element,
      showUpdateModal: true
    })
  }

  deleteFavFlower = (id) => {
    const url = `${process.env.REACT_APP_SERVER}/delete/${id}`
    axios.delete(url).then(result => {
      this.setState({
        favFlowers: result.data
      })
    }).catch()
  }

  updateFavFlower = ((e) => {
    // e.preventDefault();
    const flowerId = this.state.updateFlowerObj._id;
    const body = {
      name: e.target.name.value,
      photo: e.target.photo.value,
      instructions: e.target.instructions.value,
    }
    const url = `${process.env.REACT_APP_SERVER}/update/${flowerId}`
    axios.put(url, body)
      .then(response => {
        const updateArray = this.state.favFlowers.map(flower => {
          if (flower._id === flowerId) {
            flower.name = response.data.name
            flower.photo = response.data.photo
            flower.instructions = response.data.instructions
            return flower
          }
          return flower;
        });
        this.setState({
          favFlowers: updateArray
        })
        this.showingModal({})
        this.setState({ showUpdateModal: false });

      }).catch(err => alert(err));
  });

  render() {
    return (
      <div>
        {this.showingModal &&
          <UpdateModal
            show={this.state.showUpdateModal}
            showingModal={this.showingModal}
            updateFavFlower={this.updateFavFlower}
            updateFlowerObj={this.state.updateFlowerObj}
          />
        }
        <Row xs={4} md={3} className="g-3">
          {
            this.state.favFlowers.length > 0 &&
            this.state.favFlowers.map((flower, idx) => {
              return (
                <>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={flower.photo} />
                    <Card.Body>
                      <Card.Title>{flower.name}</Card.Title>
                      <Card.Text>
                        {flower.instructions}
                      </Card.Text>
                      <Button style={{ marginRight: '10px', marginLeft: '30px', backgroundColor: 'green' }} onClick={() => this.deleteFavFlower(flower._id)} variant="primary">Delete</Button>
                      <Button style={{ backgroundColor: 'green' }} variant="primary" onClick={() => this.showingModal(flower)}>update</Button>
                    </Card.Body>
                  </Card>
                </>
              )
            })
          }
        </Row>
      </div >
    )

  }
}

export default withAuth0(FavFlowers);

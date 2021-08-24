import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { withAuth0 } from "@auth0/auth0-react";

class UpdateModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.showingModal}>
                <Modal.Header>
                    <Modal.Title>update</Modal.Title>
                </Modal.Header>

                <Form style={{ padding: '20px' }} onSubmit={(e) => this.props.updateFavFlower(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Flower Name </Form.Label>
                        <Form.Control type="text" placeholder="Flower Name " defaultValue={this.props.updateFlowerObj.name} name='name' />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Flower Photo</Form.Label>
                        <Form.Control type="text" placeholder="Flower Photo" defaultValue={this.props.updateFlowerObj.photo} name='photo' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Flower Instructions</Form.Label>
                        <Form.Control type="text" placeholder="Flower Instructions" defaultValue={this.props.updateFlowerObj.instructions} name='instructions' />
                    </Form.Group>


                    <Button style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} variant="primary" type="submit">
                        Update
                    </Button>
                    <Button style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} variant="secondary" onClick={this.props.showingModal}>
                        Close
                    </Button>

                </Form>
            </Modal>
        )
    }
}
export default withAuth0(UpdateModal)
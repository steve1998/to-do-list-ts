import React, {Fragment} from 'react';

import { Row, Col } from 'antd'
import { Button, Input } from 'antd'
import { Typography } from 'antd'

import firebase from './firebase'

import ListItem from './components/listItem/ListItem'

import './App.css';

const { Title, Text } = Typography
const db = firebase.firestore()
var itemsRef = db.collection('items') // Accesses Firestore's items collection

interface myState {
  items: any[] | null
}

class App extends React.Component<{}, myState> {
  constructor(props: any) {
    super(props)
    this.onUpdateList = this.onUpdateList.bind(this)
    this.state = {
      items: [],
    }
  }

  onUpdateList = () => {
    const currentState = this
    var adminDoc = itemsRef.doc('admin')
    var retrievedItems:any[] = []

    adminDoc.get().then(function(doc) {
      if (doc.exists) {
        retrievedItems = doc.data()?.items
      } else {
        console.log("Data does not exists")
      }

      currentState.setState({
        items: retrievedItems
      })
    }).catch(function(error) {
      console.log("Error getting document: ", error)
    })
  }

  componentDidMount() {
    this.onUpdateList()
  }

  render() {
    return (
      <div className="App">
        <Fragment>
          <Row type="flex" justify="center" align="middle" gutter={[8, 56]}>
            <Col span = {12}>
              <Typography>
                <Title className="Title">to do list</Title>
              </Typography>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" gutter={[8, 56]}>
            <Col span = {9}>
              <Input 
              placeholder="Enter things to do..." 
              size="large" 
              />
            </Col>
            <Col span = {3}>
              <Button 
              type="primary" 
              size="large"
              >Add</Button>
            </Col>
          </Row>
          {this.state.items?.map((item:any) =>
            <Row type="flex" justify="center" align="middle" gutter={[8, 56]}>
              <Col span = {12}>
                <ListItem
                 item={item} />
              </Col>
            </Row>
          )}
        </Fragment>
      </div>
    );
  }
}

export default App;

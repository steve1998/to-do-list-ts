import React, {Fragment} from 'react';

import { Row, Col } from 'antd'
import { Button, Input } from 'antd'
import { Typography } from 'antd'

import firebase from './firebase'

import './App.css';

import ListItem from './components/listItem/ListItem'


const { Title } = Typography
const db = firebase.firestore()
var itemsRef = db.collection('items') // Accesses Firestore's items collection

interface myState {
  items: any[] | null,
  toDoListItem: string | null,
}

class App extends React.Component<{}, myState> {
  constructor(props: any) {
    super(props)
    this.performBindings()
    this.state = {
      items: [],
      toDoListItem: null,
    }
  }

  /* Bind event handler functions so they can be called. */
  performBindings = () =>  {
    this.onUpdateList = this.onUpdateList.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.handleToDoListFieldChanged = this.handleToDoListFieldChanged.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  /* Fetches data from Firestore */
  onUpdateList = () => {
    const currentState = this
    var userDoc = itemsRef.doc('admin') // Replace admin with fetch user later.
    var retrievedItems:any[] = []

    userDoc.get().then(function(doc) {
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

  /* Handles input changed on add input. */
  handleToDoListFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      toDoListItem: e.target.value
    })
  }

  /* Adds data to Firestore and current view. Only adds to current view if successfully added to Firestore. */
  onAdd = () => {
    const currentState = this
    var userDoc = itemsRef.doc('admin') // Replace admin with fetch user later.
    var itemsUpdated:any[] = []

    /* Error checking if item exists */
    if(this.state.items) {
      itemsUpdated = this.state.items

      if(this.state.toDoListItem){
        itemsUpdated.push(this.state.toDoListItem)

        /* Sets new data to Firestore */
        userDoc.set({
          items: itemsUpdated
        }).then(function() {
          currentState.setState({
            items: itemsUpdated,
          })

          console.log("Document successfully written")
        }).catch(function(error) {
          console.log("Error writing document: ", error)
        })
      }
    }    
  }

  onRemove = (index: any) => {
    const currentState = this
    var userDoc = itemsRef.doc('admin') // Replace admin with fetch user later.
    var itemsUpdated:any[] = []

    /* Error checking if item exists */
    if(this.state.items) {
      itemsUpdated = this.state.items

      /* Sets new data to Firestore */
      userDoc.update({
        items: firebase.firestore.FieldValue.arrayRemove(itemsUpdated[index])
      }).then(function() {
        delete itemsUpdated[index]
        
        currentState.setState({
          items: itemsUpdated,
        })

        console.log("Document successfully written")
      }).catch(function(error) {
        console.log("Error writing document: ", error)
      })
    }   
  }

  componentDidMount() {
    this.onUpdateList();
  }

  render() {
    return (
      <div className="App">
        <Fragment>
          <Row type="flex" justify="center" align="middle" gutter={[24, 56]}>
            <Col span = {12}>
              <Typography>
                <Title className="Title">to do list.</Title>
              </Typography>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" gutter={[24, 56]}>
            <Col span = {9}>
              <Input 
              placeholder="Enter things to do..." 
              size="large" 
              onChange={this.handleToDoListFieldChanged}
              />
            </Col>
            <Col span = {3}>
              <Button 
              type="primary" 
              size="large"
              onClick={this.onAdd}
              >Add</Button>
            </Col>
          </Row>
          {this.state.items?.map((item:any, index) =>
            <Row type="flex" justify="center" align="middle" gutter={[24, 56]}>
              <Col span={9}>
                <ListItem
                 item={item} />
              </Col>
              <Col span={3}>
                <Button
                onClick={() => this.onRemove(index)}>Remove</Button>
              </Col>
            </Row>
          )}
        </Fragment>
      </div>
    );
  }
}

export default App;

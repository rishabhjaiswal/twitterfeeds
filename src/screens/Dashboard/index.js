import React from 'react';
import axios from 'axios';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
  } from "reactstrap";
import { StoreContext } from '../../appContextStore';
import { getAuthHeader } from '../../metadata/utils/getAuthHeader';

import './styles.css';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
        }
    }

    componentDidMount = async () => {
        const apiUrl = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
        const requestData = {
            url: apiUrl,
            method: 'GET',
        }

        const token = this.context.authData.token;
        
        const res = await axios.get(
            `https://cors-anywhere.herokuapp.com/${apiUrl}`,
            {
                headers: getAuthHeader(requestData, token)
            }
        );

        this.setState({
            data: res
        })

    }
    renderItem = props => {
        console.log("in render item", props.data);
        return (
          <div>
            {props.data.map((item) => (
              <Card className="FeedCard" style={{borderStyle: "groove", margin: "2px", padding: "2px", borderRadius: "5px"}} key={item.id}>
                <CardImg
                  top
                  width="10%"
                  src="https://facebook.github.io/react-native/img/tiny_logo.png"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </CardText>
                  <p>{item.created_at}</p>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            ))}
          </div>
        );
      };

    render() {
        return(
            <div>
                <h1>
                    Welcome!
                </h1>
                {
                    this.state.data && 
                    // <>
                    //     <h4>https://api.twitter.com/1.1/statuses/home_timeline.json</h4>
                        <div>
                            {
                                // JSON.stringify(this.state.data)
                                this.renderItem(this.state.data)
                            }
                        </div>
                    // </>
                }
            </div>
        )
    }
}

Dashboard.contextType = StoreContext;

export default Dashboard;
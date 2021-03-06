import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../resources/styles/standardLayoutStyles";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderMessage(message) {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <Card.Body>
            <Card.Title>{message}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }

  removeFromStore = (id, message) => {
    localStorage.removeItem(id);
    return this.renderMessage(message);
  };

  render() {
    return <div></div>;
  }
}

export default Home;

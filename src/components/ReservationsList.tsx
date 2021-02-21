import React from 'react';
import { Card, Header, Icon, Item, Segment } from 'semantic-ui-react';
import { AppContext } from '../App';

export default function ReservationsList() {

    const rezervacije = React.useContext(AppContext).rezervacije;

    React.useEffect(() => {
        console.log(rezervacije);
    },[rezervacije])

    return (
      <Segment className="reservations-segment">

        <Header as="h2" icon>
          <Icon name="calendar alternate" />
          Spisak svih rezervacija
          <Header.Subheader>Sve vase rezervacije na jednom mestu</Header.Subheader>
        </Header>

        <Card.Group itemsPerRow={2} centered>
            {rezervacije.map((element,index) => {
                return (
                  <Card key={index} style={{padding: "1%"}} raised>
                      <Card.Header><h4>Predstava: {element.dogadjaj.name}</h4></Card.Header>
                      <Card.Meta>{element.dogadjaj.mesto}</Card.Meta>
                      <br></br>
                      <Card.Description>Broj rezervisanih karti: <h3><b>{element.brojKarti}</b></h3></Card.Description>
                  </Card>
                );
            })}
        </Card.Group>

      </Segment>
    );

}
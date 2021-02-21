import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { AppContext } from '../App';

export default withRouter(function Events(props: RouteComponentProps) {

    const dogadjaji = React.useContext(AppContext).dogadjaji;

    return (
      <Segment style={{textAlign: "center"}}>
        <Header as="h2" icon>
          <Icon name="calendar alternate" />
          Spisak svih predstava i dogadjaja
          <Header.Subheader>
            Mozete dodati novu predstavu na dugme DODAJ
          </Header.Subheader>
        </Header>

        <hr></hr>

        <Item.Group divided style={{textAlign: "left", marginLeft: "20%", marginRight: "20%"}}>
            {dogadjaji.map((element,index) => {
                return (
                  <Item>
                    <Item.Content>
                      <Item.Header as="a">{element.name}</Item.Header>
                      <Item.Meta>
                        <span className="cinema">{element.mesto}</span>
                      </Item.Meta>
                      <Item.Description style={{textAlign: "justify"}}>
                          {element.opis}
                      </Item.Description>
                      <Item.Extra>
                        <Button primary floated="right" onClick={() => {
                            props.history.push('/');
                        }}>
                          Buy tickets
                          <Icon name="arrow right" />
                        </Button>
                        <Label>Limited: {element.slobodnihKarti}</Label>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                );
            })}
        </Item.Group>

        <hr></hr>
        <h3>Dodavanje nove predstave ili dogadjaja</h3>
        <Button primary>
            DODAJ PREDSTAVU
        </Button>

      </Segment>
    );

})
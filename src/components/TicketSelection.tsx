import React from 'react';
import { Button, Dropdown, Input, Message, Segment } from 'semantic-ui-react';
import { AppContext } from '../App';
import { IDogadjaj } from './Reservations';

interface IProps {
    nextStep():void,
    dogadjaj: IDogadjaj,
    setTicketsValue(value:number):void,
}

export default function TicketSelection(props: IProps) {

    const [error,setError] = React.useState<boolean>(false);

    const [value,setValue] = React.useState(0);

    return (
        <Segment>
            <h3>Unesite zeljeni broj karti (tickets)</h3>
            <h4>{`Predstava: ${props.dogadjaj.name}`}</h4>
            <h4>{`Broj slobodnih karti: ${props.dogadjaj.slobodnihKarti}`}</h4>
            <Input type='number' value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(parseInt(e.currentTarget.value));
            }}/>
            {error === true && <Message negative>
                Broj karti za rezervaciju ne moze biti veci od broja slobodnih karti
                </Message>}
            <br></br><br></br>
            <Button primary onClick={(e) => {
                if (value > props.dogadjaj.slobodnihKarti) {
                    setError(true);
                }else {
                    props.setTicketsValue(value);
                    props.nextStep();
                }
            }}>
                Dalje
            </Button>
        </Segment>
    )

}
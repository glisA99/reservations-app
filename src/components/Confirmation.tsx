import React from 'react';
import { Button, Message, Segment } from 'semantic-ui-react';
import { IDogadjaj } from './Reservations';
import ReservationsList from './ReservationsList';

interface IProps {
    dogadjaj: IDogadjaj,
    brojKarti: number,
    addRezervaciju():void,
    reset():void,
    nextStep():void
}

export default function Confirmation(props: IProps) {

    return (
        <Segment>
            <Message floating>
                <h3>Uneti podaci:</h3>
                <h4>{`Predstava: ${props.dogadjaj.name}`}</h4>
                <h4>{`Broj karti: ${props.brojKarti}`}</h4>   
                <Button color='green' onClick={() => {
                    props.addRezervaciju();
                    props.nextStep();
                }}>
                    Rezervisi
                </Button>
                <Button secondary onClick={() => {
                    props.reset();
                }}>
                    Otkazi rezervaciju
                </Button>
            </Message>
        </Segment>
    )

}
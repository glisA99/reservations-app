import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IRezervacija } from '../App';
import Reservations, { IDogadjaj } from './Reservations';
import ReservationsList from './ReservationsList';

interface IProps {
    addDogadjaj(dogadjaj:IDogadjaj):void,
    addRezervaciju(rezervacija: IRezervacija):void
}

export default function MainContent(props: IProps) {

    return (
        <Grid padded className='main-grid' columns='16'>
            <Grid.Column width='8' stretched textAlign='center'>
                <Reservations addRezervaciju={props.addRezervaciju}/>
            </Grid.Column>
            <Grid.Column width='8' stretched textAlign='center'>
                <ReservationsList />
            </Grid.Column>
        </Grid>
    )

}
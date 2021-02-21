import React from 'react';
import { Segment, Header, Icon, Step } from 'semantic-ui-react';
import { AppContext, IRezervacija } from '../App';
import Confirmation from './Confirmation';
import EventSelection from './EventSelection';
import TicketSelection from './TicketSelection';

export interface IDogadjaj {
    name: string,
    opis: string,
    slobodnihKarti: number,
    mesto: string
}

interface IProps {
    addRezervaciju(rezervacija: IRezervacija):void
}

export default function Reservations(props: IProps) {

    const [step,setStep] = React.useState<number>(1);
    const [selectedEvent,setSelectedEvent] = React.useState<IDogadjaj | undefined>(undefined);
    const [ticketsNumber,setTicketsNumber] = React.useState<number>(0);

    const selectEvent = (dogadjaj: IDogadjaj) => {
        setSelectedEvent(dogadjaj);
    }

    const setTicketsValue = (value: number) => {
        setTicketsNumber(value);
    }

    const addRezervaciju = () => {
        const rezervacija: IRezervacija = {
            dogadjaj: selectedEvent as IDogadjaj,
            brojKarti: ticketsNumber
        };
        props.addRezervaciju(rezervacija);
    }

    const reset = () => {
        setStep(1);
        setSelectedEvent(undefined);
        setTicketsNumber(0);
    }

    const nextStep = () => {
        if (step === 3) {
            alert("Uspesno ste rezervisali karte!");
            // dodaj rezervaciju
            reset();
        }else setStep(step => step + 1);
    }

    return (
      <Segment className="reservations-segment">
        <Header as="h2" icon>
          <Icon name="calendar alternate outline" />
          Rezervacije
          <Header.Subheader>Rezervisite vase karte na vreme</Header.Subheader>
        </Header>

        <Step.Group widths={3}>
          <Step active={step === 1} completed={step > 1}>
            <Icon name="clipboard list" />
            <Step.Content>
              <Step.Title>Izaberite predstavu</Step.Title>
            </Step.Content>
          </Step>
          <Step active={step === 2}  completed={step > 2}>
            <Icon name="ticket" />
            <Step.Content>
              <Step.Title>Broj karti</Step.Title>
            </Step.Content>
          </Step>
          <Step active={step === 3}>
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Potvrda rezervacije</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>

        {/* Ako je prvi korak, renderuj formu za izbor dogadjaja */}
        {step === 1 && <EventSelection nextStep={nextStep} setSelected={selectEvent}/>}

        {/* Ako je drugi korak, renderuj formu za unos broja karti */}
        {step === 2 && <TicketSelection dogadjaj={selectedEvent as IDogadjaj} nextStep={nextStep} setTicketsValue={setTicketsValue}/>}

        {step === 3 && <Confirmation nextStep={nextStep} reset={reset} brojKarti={ticketsNumber} dogadjaj={selectedEvent as IDogadjaj} addRezervaciju={addRezervaciju}/>}

      </Segment>
    );

}
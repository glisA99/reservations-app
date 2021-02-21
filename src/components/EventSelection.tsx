import React from 'react';
import { Button, Dropdown, Message, Segment } from 'semantic-ui-react';
import { AppContext } from '../App';
import { IDogadjaj } from './Reservations';

interface IProps {
    nextStep():void,
    setSelected(dogadjaj: IDogadjaj):void
}

export default function EventSelection(props: IProps) {

    const [selected,setSelected] = React.useState<number | undefined>(undefined);
    const [error,setError] = React.useState(false);

    const dogadjaji = React.useContext(AppContext).dogadjaji;

    const options = dogadjaji.map((element,index) => {
        return {
            key: index,
            text: element.name,
            value: index
        } 
    })

    return (
        <Segment>
            <h3>Izaberite predstavu iz padajuceg menija</h3>
            <Dropdown clearable options={options} selection onChange={(event,data) => {
                console.log(data.value);
                setSelected(data.value as number);
            }}/>
            <br></br><br></br>
            {error === true && <Message negative>
                    Niste izabrali nijedan dogadjaj
                </Message>}
            <Button primary onClick={() => {
                if (selected === undefined) {
                    setError(true);
                }else {
                    props.setSelected(dogadjaji[selected]);
                    props.nextStep();
                }
            }}>
                Dalje
            </Button>
        </Segment>
    )

}
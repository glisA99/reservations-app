
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import NavigationBar from './components/NavigationBar';
import React from 'react';
import MainContent from './components/MainContent';
import { IDogadjaj } from './components/Reservations';
import { Route, Switch } from 'react-router-dom';
import Events from './components/Events';

export interface IRezervacija {
  dogadjaj: IDogadjaj,
  brojKarti: number
}

interface IAppContext {
  dogadjaji: Array<IDogadjaj>,
  rezervacije: Array<IRezervacija>
}

export const AppContext = React.createContext<IAppContext>({
  dogadjaji: [],
  rezervacije: []
})

const dogadjaji:Array<IDogadjaj>  = [{
  name: "ČITAČ",
  opis: "Roman nemačkog književnika i pravnika, iz 1995. godine, analiza je konflikta posleratne generacije s Holokaustom i koncentracionim logorima, te postavlja moralna pitanja o ispravnosti suđenja nacistima u posleratnoj Nemačkoj. Knjiga je prevedena na trideset devet jezika, a po njoj je 2007/08. godine snimljen istoimeni američki film u režiji Stivena Daldrija, s Kejt Vinslet, koja je nagrađena Oskarom za najbolju glavnu žensku ulogu 2009. godine. Knjiga je prodata u tiražu od milion primeraka u džepnom izdanju u SAD, a u nekim nemačkim pokrajinama je obavezna školska lektira u gimnazijama. Ovo je povratak Liješevićevim temama: odnosu odgovornosti i krivice u kolektivnoj i pojedinačnoj svesti, prepoznavanju suštinskog zla u vremenu, ideologiji, društvu, čoveku.",
  slobodnihKarti: 30,
  mesto: "Beogradsko dramsko pozorište"
},{
  name: "VIOLINA, DAIRE I PEGLA",
  opis: "“Violina, daire i pegla” je jednočina komedija srpskoj publici dobro poznatog ruskog dramatičara Nikolaja Koljade. Radnja komada dešava se na jednoj ruskoj svadbi na kojoj je izbila svađa između dve porodice. Razlog je svadbarski, povezan sa pijanstvom, nebitan….ali sami sukob skida maske sa lica svih aktera u ovom činu. Humor Nikolaja Koljada je neodoljiv, ukorenjen je u mentalitetu, u stavovima malograđana koji kad se izlože bilo kakvom sudu zdravog razuma postaju skoro nadrealni u svojoj bizarnosti….s druge strane on svojim humorom postavlja duboka egzistencijalna pitanja, problematizuje smisao i besmisao ljudskih odluka koje oni donose uz put, “kako padne”, čime tragično određuju dalje tokove svojih života….kao i kod mnogih drugih ruskih dramatičara život se dešava negde drudge, on je samo predstava o sreći i “u širokom luku” zaobilazi glavne aktere koji o njemu sanjaju….tako su naši Lenja i Nataša, mladoženja i mlada, u svojoj mladosti i naivnosti verovali da je brak sasvim nešto drugo od onoga kako im se pokazao….eto baš prvog dana svabe….a i prve bračne noći. Svi učesnici ove svadbe, svi likovi ovog komada velika su deca i u tome je njihova komičnost i njihova tragičnost, ne razumeju da učestvuju u projektu koji je “za večnost” i koji će imati dalekosežne posledice po njihove živote. Dok se koprcaju u svojim banalnim svađama, narastajuće svesni da nemaju nikakve veze jedni s drugima i da su nesrećno požurili da se vežu u rodbinske odnose, senka turobne budućnosti nadvija se nad njima…i u tome je poenta Koljadine komedije jer ona kao da otelotvoruje staru izreku:”Nemoj toliko da se smeješ, plakaćeš posle.”",
  slobodnihKarti: 25,
  mesto: "TEATAR NA BRDU, Velika scena"
},{
  name: "KAZANOVA PROTIV DON ŽUANA",
  opis: "Tri sezone, počevši od 26. januara 2016. kada je premijerno izvedena, predstava Kazanova protiv Don Žuana, nastala kao jedinstveno i jedino rediteljsko delo glumačkog velikana Predraga Ejdusa, punila je salu Madlenianuma i radovala srca pozorišnih sladokusaca. Velikom umetniku u čast gospođa Madlena Zepter poželela je da njegovo rediteljsko delo nastavi da živi na daskama, sada kad je svojim odlaskom Predrag Ejdus izašao iz svojih uloga, pa i iz uloge Kazanove u kojoj je bio briljantan. Bogatstvo i sočnost tog njegovog glumačkog ostvarenja ostaće u sećanjima svih koji su imali sreću da gledaju predstavu u njegovom izvođenju. A zahvaljujući piscu drame, Miodragu Iliću, koji je rukovodio obnovom režije, novi glumački tim: Tihomir Stanić, kao Kazanova, Stevan Piale, kao Don Žuan, i Ivona Kustudić, kao Gizela (koja je u poslednjoj sezoni već igrala uz svog profesora Ejdusa ovu ulogu), vratiće ovu predstavu – mezimicu publike –  na scenu Madlenianuma. Ova „setna komedija“ u kojoj se bajkovito susreću dva najveća zavodnika u istoriji udvaranja našla se i u Antologiji savremene srpske drame, urednika Radomira Putnika koja se nedavno pojavila u izdanju Zepter Book World-a. Premijera obnove je 21. maja, a reprize 23. maja i 3. juna.",
  slobodnihKarti: 7,
  mesto: "Beogradsko dramsko pozorište"
}]

function App() {

  const [state,setState] = React.useState<IAppContext>({
    dogadjaji: dogadjaji,
    rezervacije: []
  });

  const addDogadjaj = (dogadjaj: IDogadjaj) => {
    const newArray = state.dogadjaji;
    newArray.push(dogadjaj);
    setState({...state,
      dogadjaji: newArray,
    })
  }

  const addRezervaciju = (rezervacija: IRezervacija) => {
    let newArray = state.rezervacije;
    if (newArray.some(element => element.dogadjaj.name === rezervacija.dogadjaj.name) === true) {
      console.log("Setting same rezervation")
      newArray = newArray.map(element => {
        if (element.dogadjaj.name !== rezervacija.dogadjaj.name) return element;
        else return {
          dogadjaj: element.dogadjaj,
          brojKarti: element.brojKarti + rezervacija.brojKarti
        }
      })

    }else {
      newArray.push(rezervacija);
    }

    let dogadjaji:Array<IDogadjaj> = state.dogadjaji.map(element => {
      if (element !== rezervacija.dogadjaj) return element;
      else return {...element,
        slobodnihKarti: element.slobodnihKarti - rezervacija.brojKarti
      }
    })
    

    setState({...state,
      rezervacije: newArray,
      dogadjaji: dogadjaji
    })
  }

  return (
    <AppContext.Provider value={state}>
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route path='/dogadjaji'>
            <Events />
          </Route>
          <Route path="/">
            <MainContent addDogadjaj={addDogadjaj} addRezervaciju={addRezervaciju}/>
          </Route>
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;

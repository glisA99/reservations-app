import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Menu, Segment, Divider } from 'semantic-ui-react';

export default withRouter(function NavigationBar(props: RouteComponentProps) {

    return (
        <Segment className='navbar-segment' basic stacked>
            <Menu fluid secondary>
                <Menu.Item className='navbar-header'>
                    <h1>Counter App</h1>
                </Menu.Item>
                <Menu.Menu>

                    <Menu.Item className='navbar-item' onClick={() => {
                        props.history.push('/');
                    }}>
                        Rezervacija karti
                    </Menu.Item>
                    
                    <Menu.Item className='navbar-item' onClick={() => {
                        props.history.push('/dogadjaji');
                    }}>
                        Dogadjaji
                    </Menu.Item>
                    
                    
                </Menu.Menu>
            </Menu>
        </Segment>
    );

})
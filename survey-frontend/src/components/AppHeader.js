import React from 'react'
import { Header, Grid } from 'semantic-ui-react'

import Menu from './Menu'
import Notification from './Notification'

const AppHeader = () => (
  <div>
    <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
      <Grid.Column width={14} >
        <Header as='h1' >Survey App</Header>
      </Grid.Column>
      <Grid.Column style={{marginTop: '5px'}}>
        <Menu link='My Surveys' />
      </Grid.Column>
    </Grid>
    <Notification />
  </div>
)

export default AppHeader
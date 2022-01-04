import React from 'react';
import { Switch, Route} from 'react-router-dom';
import BanPage from './components/Ban/BanPage';
import Chat from './components/Chat/Chat';
import Form from './components/Form/Form';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route 
          exact 
          path="/" 
          component={Form}
        />
        <Route 
          exact 
          path="/chat" 
          component={Chat} 
        />
         <Route 
          exact 
          path="/banned" 
          component={BanPage}
        />
      </Switch>
    </div>
  );
}

export default App;

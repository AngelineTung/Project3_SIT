import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import MyTheme from './themes/MyTheme';
import Tutorials from './pages/Tutorials';


function App() {
  return (
    <Router>
      <ThemeProvider theme={MyTheme}>
        <AppBar position="static" className="AppBar">
         
          <Container>
            <Toolbar disableGutters={true} >

            <div className="toolbar">
              
                <img src="logo.jpg" alt="Logo" className="logo" />
                <span className="text">SavingLives Hospital</span>
           
            </div>
                                     
            </Toolbar>
          </Container>
        </AppBar>

        <Container>
          <Routes>
            <Route path={"/"} element={<Tutorials />} />
            <Route path={"/tutorials"} element={<Tutorials />} />

          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;

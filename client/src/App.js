
import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch }  from 'react-router-dom'
import { withRouter } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage';
// Scroll To Top Component
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}
const Scroll = withRouter(ScrollToTop);

class App extends Component{
  render() {
    return (
      <Router>
        <div className="App">
          <Scroll>
            <Switch>
              <Route exact path='/' component={LoginPage} />
              {/* <Route exact path='/product' component={Product} />
              <Route exact path='/product/:product_id' component={ProductInfo} />
              <Route exact path='/cart-info' component={CartInfo}/> */}
            </Switch>
          </Scroll>
        </div>
      </Router>
    );
  }
}

export default App;

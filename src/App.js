import React, { Component } from 'react';
import Sidebar from './Common/Sidebar';
import Navbar from './Common/Navbar';
import AppRoutes from './AppRoutes';
import Layout from './Containers/Layout/Layout';
import WithRouter from "./Utils/WithRouter"
class App extends Component {

  constructor(props) {
    super(props)
    const script = document.createElement('script');
    const script1 = document.createElement('script');
    script.src = "https://unpkg.com/react/umd/react.production.min.js";
    script.async = true;
    document.body.appendChild(script);
    script1.src = "https://unpkg.com/react-collapse/build/react-collapse.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const isFullPageLayout = false
    const iconstate = false
    this.state = { iconstate, isFullPageLayout }
  }

  setIconmode = () => {
    this.setState({ iconstate: !this.state.iconstate })
  }

  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }


  onRouteChanged = () => {
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/Login'];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
      }
    }
  }


  componentWillUnmount() {
    document.body.removeChild(this.state.script);
    document.body.removeChild(this.state.script1);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isFullPageLayout ?
          <div className='w-full' >
            <AppRoutes />
          </div>
          :
          <Layout {...this.props} iconOnly={this.state.iconstate} seticonOnly={this.setIconmode} />
        }
      </React.Fragment>
    );
  }


}

export default WithRouter(App);

import 'babel-polyfill'
import React, { Component } 
  from 'react';
import $ from 'jquery';
import 'jquery-ui';

class Channel extends Component {
  state = {
    game:'',
    online:'offline',
    displayName:'',
    logo: '',
    status: '',
  }
  componentWillMount = async () => {
    const { channelData } = this.props;
    if (channelData.res.stream === null) {
        await this.setState((prevState, props) => ({
          game: 'Offline',
          online: 'offline',
          logo: channelData.data.logo,
          displayName: channelData.data.display_name,
          status: channelData.data.status
        }));
      } else if (channelData.res.stream === undefined) {
        await this.setState((prevState, props) => ({
          game: 'Account Closed',
          online: 'offline',
          logo: channelData.data.logo,
          displayName: channelData.data.display_name,
          status: channelData.data.status
        }));
      } else {
        await this.setState((prevState, props) => {
                return {
                    game: channelData.res.stream.game,
                    online: 'online',
                    logo: channelData.data.logo,
                    displayName: channelData.data.display_name,
                    status: channelData.data.status
              }
            });
      };
  }
  render() {
    return (
      <div style={Boolean(this.props.show === this.state.online || this.props.show === 'all' ) ? { borderRadius: '3px', padding: '5px', marginTop: '15px' } : {display: 'none'} } className="channel"> 
        <div style={{ fontSize: '18px',textAlign:'center' }} className={Boolean(this.state.online==='online') ? "online" : ""}>
          <table style={{width: '100%'}}>
            <tr>
              <td style={{padding:'5px',verticalAlign: 'middle', textAlign: 'center', marginLeft: '20px', marginRight: '20px'}}><img style={{width: '50px', height: '50px', borderRadius: '50%',textAlign: 'left', position: 'relative'}} src={this.state.logo} /></td>
              <td style={{padding:'5px',verticalAlign: 'middle', textAlign: 'center', marginLeft: '20px', marginRight: '20px'}}><span style={{marginLeft:'15px', width: '100px', marginRight: '15px'}}> {this.state.displayName} </span></td>
              <td style={{padding:'5px',verticalAlign: 'middle', textAlign: 'center', width: '250px', height:'100px',marginLeft: '20px', marginRight: '20px'}}><span style={{fontSize: '12px'}}>{Boolean(this.state.online === 'online') ? `${this.state.game} : ${this.state.status}`: 'Offline'}</span></td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}
class App extends Component {

  state = {
    channelsData: [],
    show: 'all'
  }

  componentWillMount() {
    let channels = ["freecodecamp","ns_vp","ESL_SC2"];
      let setState = async (result) => {
        await this.setState((prevState, props) => ({
                  channelsData:[...prevState.channelsData,result]
                }));
      }
    channels.forEach(function(channel) {
      function genUrl(type, name) {
        return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
      }
        $.ajax({ // 2 ajax requests
          url: genUrl("channels", channel),
          async: false,
          dataType: 'jsonp',
          success: async function(data) {
            debugger;
            $.ajax({
              url: genUrl("streams", channel),
              async: false,
              dataType: 'jsonp',
              success: async function(res) { // res = result
                debugger;
                console.log("data+res = ",{data, res})
                await setState({data, res});
              },
            });
          },
        });
    });
  }

  _renderChannels() {
     return this.state.channelsData.map((channelData, i) => {
          return <Channel show={this.state.show} channelData={channelData} />
      })
    };

  render() {
    return (
        <div> 
          <span className="title"> Reactjs Twitchtv JSON API </span>
            <div className="container">
            <span> Twitch Streamers </span>
            <button style={{margin:'5px', padding: '3px'}} onClick={() => this.setState({ show: 'all'})} >All</button>
            <button style={{margin:'5px', padding: '3px'}} onClick={() => this.setState({ show: 'online'})} className={Boolean(this.state.show==='online')?'online' : ''} >Online</button>
            <button style={{margin:'5px', padding: '3px'}} onClick={() => this.setState({ show: 'offline'})} className={Boolean(this.state.show==='offline')? 'offline' : ''}>Offline</button>
              {this._renderChannels()}
              <div style={{marginTop: '40px'}}>
                <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-wikipedia-viewer.herokuapp.com/"> link </a> </span>
                <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-wikipedia-viewer"> link </a> </span>
            </div>
            </div>
          <span className="footer"> Developed by Glendon Philipp Baculio </span>
        </div>
    )
  }
}

export default App

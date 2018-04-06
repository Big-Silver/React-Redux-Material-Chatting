import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Message from "./Message"
import classNames from 'classnames';
// import * as MessageActions from '../actions/message';
import * as UserActions from '../actions/user';
import io from "socket.io-client";

class MessagesList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: []
        };
        this.socket = io('http://localhost:3000');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            var user_id = sessionStorage.getItem('rChat_user')
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                user: user_id,
                message: this.state.message
            })
            this.setState({message: ''});
        }
    }

    componentWillMount() {
        this.props.init_message();
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            messages: this.props.user.messages
        });
        var msgs = this.props.user.messages;
        var total_group = [];
        var msg_group = [];
        var group_date = 0;
        setTimeout(() => {
            if (typeof msgs != 'undefined') {
                for(var i = 0; i < msgs.length; i++) {
                    var d = new Date(msgs[i].date);
                    if (msg_group.length == 0) {
                        msg_group.push(msgs[i]);
                        group_date = (d.getTime() / (1000 * 24 * 3600)).toFixed(0);
                    } else {
                        if (group_date == (d.getTime() / (1000 * 24 * 3600)).toFixed(0)) {
                            msg_group.push(msgs[i])
                        } else {
                            total_group.push(
                                {
                                    'date' : (d.getTime() / (1000 * 24 * 3600)).toFixed(0),
                                    'value' : msg_group
                                }
                            );
                            msg_group = [];
                            msg_group.push(msgs[i]);
                            group_date = (d.getTime() / (1000 * 24 * 3600)).toFixed(0);
                        }
                    }
                    if (i == msgs.length - 1) {
                        total_group.push(
                            {
                                'date' : group_date,
                                'value' : msg_group
                            }
                        );
                    }
                }
            }            
            console.log('message: ', total_group);        
        }, 100);
    };

    render() {
		return (
            <div className="row">
                <div className="col-12">
                    <div className="messages">
                        {this.state.messages != [] && this.state.messages.map(message => {
                            return (
                                <div>{message.user}: {message.message} : {message.date}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-12">
                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                    <br/>
                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                </div>
            </div>
		);
	}
}

function mapStateToProps(state) {
    return {
        user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(UserActions,dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);

// MessagesList.propTypes = {
//   messages: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       message: PropTypes.string.isRequired,
//       author: PropTypes.string.isRequired
//     }).isRequired
//   ).isRequired
// }
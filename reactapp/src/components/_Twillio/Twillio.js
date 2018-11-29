import React, { Component } from 'react';
import styled from 'styled-components';

const TwillioContainer = styled.div`
	display: flex;
	justify-content: center;
`;

class Twillio extends Component {
	state = {
		text: {
			recipient: '',
			textmessage: ''
		}
	};

	sendText = _ => {
		const { text } = this.state;
		//pass text message GET variables via query string
		fetch(
			(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
		).catch(err => console.error(err));
	};

	render() {
		const { text } = this.state;
		const spacer = {
			margin: 8
		};
		const textArea = {
			borderRadius: 4
		};

		return (
			<TwillioContainer>
				<header className="App-header" />
				<div style={{ marginTop: 10 }}>
					<h2> Send Text Message </h2>
					<label> Your Phone Number </label>
					<br />
					<input
						value={text.recipient}
						type="password"
						onChange={e =>
							this.setState({ text: { ...text, recipient: e.target.value } })
						}
					/>
					<div style={spacer} />
					<label> Message </label>
					<br />
					<textarea
						rows={3}
						value={text.textmessage}
						style={textArea}
						onChange={e =>
							this.setState({ text: { ...text, textmessage: e.target.value } })
						}
					/>
					<div style={spacer} />
					<button onClick={this.sendText}> Send Text </button>
				</div>
			</TwillioContainer>
		);
	}
}

export default Twillio;

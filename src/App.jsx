import React, { Component } from 'react';

import './styles.css';
import { polls, answers } from './mockedData';
import { Header } from './Header';

import { PollsList } from './polls/PollsList';
import { Form } from './polls/Form';

class App extends Component {
    state = {
        polls,
        answers,
    };

    addPoll = ({ poll, pollAnswers }) => {
        this.setState(state => ({
            polls: [...state.polls, poll],
            answers: [...state.answers, ...pollAnswers],
        }));
    };

    removePoll = id =>
        this.setState(state => ({
            polls: state.polls.filter(poll => poll.id !== id),
            answers: state.answers.filter(answer => answer.pollId !== id),
        }));

    voteOnAnswer = ({ pollId, answerId }) => {
        const answers = this.state.answers.map(
            answer =>
                answer.id === answerId && answer.pollId === pollId
                    ? { ...answer, votes: answer.votes + 1 }
                    : answer
        );

        this.setState({
            answers,
        });
    };

    render() {
        return (
            <div className="App">
                <Header />
                <PollsList
                    polls={this.state.polls}
                    answers={this.state.answers}
                    removePoll={this.removePoll}
                    voteOnAnswer={this.voteOnAnswer}
                />
                <Form addPoll={this.addPoll} />
            </div>
        );
    }
}

export default App;

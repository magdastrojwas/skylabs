import React, { Component } from 'react';
import nano from 'nanoid';

import './styles.css';
import { mockedPolls } from './mockedPolls';
import { Header } from './Header';

import { PollsList } from './polls/PollsList';
import { AddPollForm } from './polls/AddPollForm';

class App extends Component {
    state = {
        polls: mockedPolls,
    };

    addPoll = ({ question, answers }) => {
        const id = nano();

        const newPoll = {
            id,
            question,
            answers,
        };

        this.setState(previousState => ({
            polls: [...previousState.polls, newPoll],
        }));
    };

    removePoll = id =>
        this.setState(state => ({
            polls: state.polls.filter(poll => poll.id !== id),
        }));

    voteOnAnswer = ({ pollId, answerId }) => {
        const prevPoll = this.state.polls.find(poll => poll.id === pollId);
        const answer = prevPoll.answers.find(answer => answer.id === answerId);
        const newAnswer = { ...answer, votes: answer.votes + 1 };

        const answers = prevPoll.answers.map(
            answer => (answer.id === answerId ? newAnswer : answer)
        );

        const polls = this.state.polls.map(
            poll => (poll.id === pollId ? { ...prevPoll, answers } : poll)
        );

        this.setState({ polls });
    };

    render() {
        return (
            <div className="App">
                <Header />
                <PollsList
                    polls={this.state.polls}
                    removePoll={this.removePoll}
                    voteOnAnswer={this.voteOnAnswer}
                />
                <AddPollForm addPoll={this.addPoll} />
            </div>
        );
    }
}

export default App;

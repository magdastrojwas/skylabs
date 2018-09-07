import React, { Component } from 'react';

export class Poll extends Component {
    render() {
        const { question, answers, removePoll, voteOnAnswer } = this.props;
        return (
            <div className="poll">
                <h2>{question}</h2>
                {answers.map(answer => (
                    <div className="answer" key={answer.id}>
                        {answer.name} ({answer.votes})
                        <button
                            className="icon-btn answer-vote-btn"
                            onClick={e => {
                                e.preventDefault();
                                voteOnAnswer({ pollId: this.props.id, answerId: answer.id });
                            }}
                        >
                            <i className="fa fa-thumbs-up" />
                        </button>
                    </div>
                ))}
                <button
                    className="icon-btn poll-remove-btn"
                    onClick={e => {
                        e.preventDefault();
                        removePoll(this.props.id);
                    }}
                >
                    <i className="fa fa-trash" />
                </button>
            </div>
        );
    }
}

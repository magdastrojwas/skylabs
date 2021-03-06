import React from 'react';

import { Poll } from './Poll';

export const PollsList = ({ polls, answers, removePoll, voteOnAnswer }) => (
    <div className="list-container">
        <div className="list">
            {polls.length > 0 &&
                polls.map(({ id, question }) => {
                    const pollAnswers = answers.filter(answer => answer.pollId === id);
                    return (
                        <Poll
                            key={id}
                            id={id}
                            question={question}
                            answers={pollAnswers}
                            voteOnAnswer={voteOnAnswer}
                            removePoll={removePoll}
                        />
                    );
                })}
        </div>
    </div>
);

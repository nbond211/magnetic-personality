import React, { useState, useEffect } from 'react';
import { Box, Paragraph } from 'grommet';
import { animations, AnimateOnChange } from 'react-animation';
import useSound from 'use-sound';
import { Next } from 'grommet-icons';

import Button from '../Components/Button.jsx';

const TalkingCharacter = ({ dialogue, send, isReady, currentTurn }) => {
    const playWelcome = new Audio('/sounds/narration/welcome.wav');

    const [index, setIndex] = useState(0);

    useEffect(() => {
      setIndex(0);
    }, [currentTurn]);

    useEffect(() => {
      if (index === 0) {
        playWelcome.play();
      }
    }, []);

    const renderButton = () => {
      if (!isReady) {
        if (dialogue[index + 1]) {
          return (
            <Button
                primary
                reverse
                label="Continue"
                onClick={() => setIndex(prev => prev + 1)}
                icon={<Next />}
            />
          );
        } else {
          return(
            <Button
              primary
              reverse
              label="Ready!"
              onClick={send ? () => send('ready') : () => setIndex(prev => prev + 1)}
              icon={<Next />}
            />
          );
        }
      } else {
        return(
          <Button
              primary
              reverse
              label="Skip"
              onClick={() => send('skip')}
              icon={<Next />}
          />);
      }
    };

    return (
        <Box
            width="100%"
            height="100%"
            direction="column"
            align="center"
            justify="center"
            style={{ marginTop: '100px' }}
        >
            <img
                className="character"
                height="auto"
                width="auto"
                style={{
                    animation: animations.slideIn,
                    maxWidth: '500px'
                }}
                src="/images/magnet.png"
            />
            <Paragraph
                size="xxlarge"
                style={{ marginBottom: '24px', minHeight: '80px' }}
            >
                <AnimateOnChange
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                >
                    {dialogue[index]}
                </AnimateOnChange>
            </Paragraph>
            {renderButton()}
        </Box>
    );
};

export default TalkingCharacter;

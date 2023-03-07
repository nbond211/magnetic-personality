import React, { useState, useEffect } from 'react';
import { Box, Paragraph } from 'grommet';
import { animations, AnimateOnChange } from 'react-animation';
import { Next } from 'grommet-icons';

import Button from '../Components/Button.jsx';

const TalkingCharacter = ({ dialogue, send, isReady, currentTurn }) => {
    const playWelcome = new Audio('https://dl.sndup.net/ybdx/welcome.wav');
    let timer;

    const [index, setIndex] = useState(0);

    useEffect(() => {
      setIndex(0);
    }, [currentTurn]);

    useEffect(() => {
      if (index === 0) {
        playWelcome.play();
      }
    }, []);

    const updateIndex = () => {
      timer = !timer && setInterval(() => {
        if (dialogue[index + 1]) {
          console.log("Next thing because index: " + index);
          setIndex(prevIndex => prevIndex + 1)
          if (!dialogue[index + 2]) {
            console.log("Sending ready");
            send('ready');
            clearInterval(timer);
          }
        }
      }, 5000)
    };

    useEffect(() => {
      updateIndex();
      return () => clearInterval(timer)
    }, [index]);

    const renderDialogue = () => {
      if (dialogue[index]) {
        return dialogue[index][0];
      }
    };

    return (
        <Box
            width="100%"
            height="50%"
            direction="column"
            align="center"
            justify="center"
            style={{ marginTop: '50px' }}
        >
            <img
                className="character"
                height="200px"
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
                    {renderDialogue()}
                </AnimateOnChange>
            </Paragraph>
        </Box>
    );
};

export default TalkingCharacter;

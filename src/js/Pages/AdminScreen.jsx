import React, { useEffect } from 'react';
import { Box, Layer, Carousel } from 'grommet';
import { AnimateGroup } from 'react-animation';
import TalkingCharacter from '../Components/TalkingCharacter.jsx';
import DatingProfilePreview from '../Components/DatingProfilePreview.jsx';
import Button from '../Components/Button.jsx'

const AdminScreen = ({ data, send }) => {
    const playBackground = new Audio('https://dl.sndup.net/pgf7/background1.mp3');

    useEffect(() => {
      playBackground.volume = .15;
      playBackground.play();
    }, []);

    const switchDialogue = (currentTurn) => {
      switch (currentTurn) {
        case 1:
          return [
            "Welcome to Magnetic Personality - the game where you and your friends collaboratively create chaotic fictional dating profiles...and maybe even find the loves of your life.",
            'To start, everyone use your device to submit a username for a dating profile.',
            'Try creating an eye catching username like dom_top_daddy_69 or xoxoRAWR~dragon-Slayer!',
            '*patiently waiting*'
          ]
        case 2:
          return [
            'Everyone submitted some very creative usernames!',
            'The next thing we need are profile pictures!',
            'Everyone is going to select a profile picture for a different dating profile.',
            '*patiently waiting*'
        ]
        case 3:
          return [
            'Okay, those people are cute! Well... some of them are.',
            'Now guess how old everyone is!'
          ]
        case 4:
          return [
            'You all made guesses. 🙄',
            'Ooh! This next one will be fun!',
            'Choose an occupation for this person!'
          ]
        case 5:
          return [
            'Looks like everyone has a job now! Wow, capitalism sucks!',
            'Now decide where everyone works!'
          ]
        case 6:
          return [
            `Ooh! Let's look at the dating profiles you all just created!`,
            `These are some really interesting eligible daters 😏`,
            `Okay so the next thing we are gonna do is answer questions as these dating profiles.`,
            `But here's the catch - you'll only be able to contribute part of the answer before you must pass the dating profile along to the next player for them to finish the response.`,
            `You guys can follow instructions... just do what it says to do on your phone and we'll reconvene as a group after 😉`
          ]
        case 15:
          return  [
            `Wow, these are twisted... and kind of hot 😏`,
            `I feel like I'm already in love with everyone! 😍`,
            `But alas... 😭 I don't get to match with these profiles.`,
            'YOU DO!',
            'Each player will match with one of these dating profiles. You will all vote to decide who!',
            'On your device, read through each dating profile and cast your vote for which player they should go on a date with.'
          ]
        case 16:
          return [
            `The results are in! Everyone look at your device to see who your match is!`,
            `Thanks for playing!`
          ]
        default:
          return [
            `Ooh! Let's look at the dating profiles you all just created!`,
            `These are some really interesting eligible daters 😏`,
            `Okay so the next thing we are gonna do is answer questions as these dating profiles.`,
            `But here's the catch - you'll only be able to contribute part of the answer before you must pass the dating profile along to the next player for them to finish the response.`,
            `You guys can follow instructions... just do what it says to do on your phone and we'll reconvene as a group after 😉`
          ]
        }
    };

    const renderTalkingCharacter = (currentTurn) => {
      return (
        <TalkingCharacter
            send={send}
            dialogue={switchDialogue(currentTurn)}
            isReady={data.game.isReady}
            currentTurn={currentTurn}
        />
      );
    };

    const renderCompletedPlayers = (completedPlayers) => {
      if (completedPlayers.length > 0) {
        return (
          <Layer modal={false} plain={true} position="left">
            <div className="completed-players">
              <AnimateGroup animation="slide">
                {completedPlayers.map(playerName => (
                  <p key={playerName} class="player-name">
                    {playerName}
                  </p>
                ))}
              </AnimateGroup>
            </div>
          </Layer>
        )
      }
    };

    const renderDatingProfiles = (currentTurn, players) => {
      const profileTime = currentTurn < 15 ? 20000 : 10000;
      if (currentTurn > 5) {
        return (
          <Box
              width="100%"
              height="50%"
              direction="column"
              align="center"
              justify="center">
            <Carousel fill controls={false} play={profileTime}>
              {players
                .filter(player => !player.isAdmin)
                .map(player => player?.datingProfile)
                .map(datingProfile => (
                  <DatingProfilePreview
                      datingProfile={datingProfile}
                  />
              ))}
            </Carousel>
          </Box>
        );
      }
    };

    const renderLeaveButton = (currentTurn)  => {
      if (currentTurn === 16) {
        return (
          <Button onClick={() => send('leave')} margin="medium" style={{ marginTop: '30px' }} primary label="Leave Game" />
        );
      }
    };

    const render = () => {
        const currentTurn = data?.turn?.index || 0;
        const completePlayerNames = data.game.players
                                      .filter(player => !player.isAdmin)
                                      .filter(player => player.curentTurnComplete)
                                      .map(player => player?.name);

        if (currentTurn == 0) {
          return (<p>error</p>);
        } else {
          return (
            <>
              {renderTalkingCharacter(currentTurn)}
              {renderDatingProfiles(currentTurn, data.game.players)}
              {renderCompletedPlayers(completePlayerNames)}
              {renderLeaveButton(currentTurn)}
            </>
          );
        }
    };
    return render();
};

export default AdminScreen;

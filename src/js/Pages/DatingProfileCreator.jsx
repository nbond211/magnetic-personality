import React, { useState } from 'react';
import { Box, Paragraph, TextInput, Button, Image } from 'grommet';
import { Next } from 'grommet-icons';

const DatingProfileCreator = ({ data, send }) => {
    const currentDatingProfileId = data?.player?.currentDatingProfileId;

    const currentDatingProfile = data?.game?.players?.find(
        player => player.playerId === currentDatingProfileId
    )?.datingProfile;

    const [userName, setUsername] = useState('');
    const [isUsernameFormSubmitted, setIsUsernameFormSubmitted] =
        useState(false);

    const renderUsernameForm = () => {
        const handleClick = () => {
            send('setUsername', { userName });
            setIsUsernameFormSubmitted(true);
        };

        return !isUsernameFormSubmitted ? (
            <>
                <Paragraph size="xxlarge">
                    Let's start by choosing a username!
                </Paragraph>
                <TextInput
                    placeholder="username"
                    value={userName}
                    onChange={event => setUsername(event.target.value)}
                    style={{ marginBottom: '24px' }}
                />
                <Button
                    size="xxlarge"
                    disabled={!userName}
                    primary
                    reverse
                    label="Continue"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </>
        ) : (
            <Paragraph size="xxlarge">Username: {userName}</Paragraph>
        );
    };

    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [isProfilePicSubmitted, setIsProfilePicSubmitted] = useState(false);
    const renderProfilePicSelector = () => {
        const handleClick = () => {
            send('setField', {
                fieldName: 'profilePic',
                profilePic: selectedImageUrl,
                datingProfileId: currentDatingProfileId
            });

            setIsProfilePicSubmitted(true);
        };

        return (
            <>
                <Paragraph size="xxlarge">
                    Now we've swapped and you have someone else's dating
                    profile.
                </Paragraph>
                <Paragraph size="xxlarge">
                    The username for this dating profile is{' '}
                    {currentDatingProfile?.userName}
                </Paragraph>
                {isProfilePicSubmitted ? (
                    <>
                        <Paragraph size="xxlarge">You selected:</Paragraph>
                        <Box
                            margin="medium"
                            animation="slideUp"
                            height="small"
                            width="small"
                        >
                            <Image fit="cover" src={selectedImageUrl} />
                        </Box>
                    </>
                ) : (
                    <>
                        <Box direction="row" wrap>
                            {data?.player?.profilePictureOptions.map(
                                imageUrl => (
                                    <Box
                                        margin="medium"
                                        animation="slideUp"
                                        height="small"
                                        width="small"
                                        border={
                                            imageUrl === selectedImageUrl && {
                                                color: 'brand',
                                                size: 'large'
                                            }
                                        }
                                        css={{
                                            cursor: 'pointer;',
                                            '&:hover': {
                                                border: '5px solid #7D4CDB;'
                                            }
                                        }}
                                        onClick={() =>
                                            setSelectedImageUrl(imageUrl)
                                        }
                                    >
                                        <Image fit="cover" src={imageUrl} />
                                    </Box>
                                )
                            )}
                        </Box>
                        <Button
                            size="xxlarge"
                            disabled={!selectedImageUrl}
                            primary
                            reverse
                            label="Continue"
                            onClick={handleClick}
                            icon={<Next />}
                        />
                    </>
                )}
            </>
        );
    };

    const [age, setAge] = useState();
    const [isAgeFormSubmitted, setIsAgeFormSubmitted] = useState(false);
    const renderAgeForm = () => {
        const handleClick = () => {
            send('setField', {
                fieldName: 'age',
                age,
                datingProfileId: currentDatingProfileId
            });
            setIsAgeFormSubmitted(true);
        };

        return !isAgeFormSubmitted ? (
            <>
                <Paragraph size="xxlarge">How old is this person?</Paragraph>
                <Box
                    margin="medium"
                    animation="slideUp"
                    height="small"
                    width="small"
                >
                    <Image fit="cover" src={currentDatingProfile?.profilePic} />
                </Box>
                <TextInput
                    type="number"
                    placeholder="How old is this person?"
                    value={age}
                    onChange={event => setAge(event.target.value)}
                    style={{ marginBottom: '24px' }}
                />
                <Button
                    // disabled={!selectedImageUrl}
                    size="xxlarge"
                    primary
                    reverse
                    label="Continue"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </>
        ) : (
            <Paragraph size="xxlarge">Age: {age}</Paragraph>
        );
    };

    const renderFormStep = () => {
        const currentTurn = data?.turn?.index || 0;
        switch (currentTurn) {
            case 0:
                return <p>error</p>;
            case 1:
                return renderUsernameForm();
            case 2:
                return renderProfilePicSelector();
            case 3:
                return renderAgeForm();
            default:
                return <p>default</p>;
        }
    };

    return (
        <Box direction="column">
            <Paragraph size="xxlarge">Dating Profile Creator</Paragraph>
            {renderFormStep()}
        </Box>
    );
};

export default DatingProfileCreator;

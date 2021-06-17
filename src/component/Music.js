import { dbService } from '../fBase';
import React, { useEffect, useState } from 'react';

const Music = ({ userObj }) => {
    const [music, setMusic] = useState('');
    const [url, setUrl] = useState('');
    const [playlist, setPlaylist] = useState([]);
    const [clear, setClear] = useState(false);

    useEffect(() => {
        dbService
            .collection('musics')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const listArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPlaylist(listArray);
                setClear(true);
            });
    }, []);

    useEffect(() => {
        if (clear) {
            setUrl(`https://www.youtube.com/embed/${playlist[0].musicIndex}?controls=0`);
        }
    }, [clear]);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setMusic(value.split('=')[1]);
    };

    const onSubmit = async (event) => {
        setUrl(`https://www.youtube.com/embed/${music}?controls=0`);

        if (music === '') {
            return;
        }

        const hweetObj = {
            musicIndex: music,
            createdAt: Date.now(),
            displayName: userObj.displayName,
        };
        await dbService.collection('musics').add(hweetObj);
        event.preventDefault();
    };

    return (
        <div
            style={{
                maxWidth: 890,
                width: '100%',
                margin: '0 auto',
                maxWidth: '400px',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}
        >
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    maxWidth: '400px',
                }}
            >
                <iframe
                    style={{ borderRadius: 30 }}
                    width="210"
                    height="115"
                    src={url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <form
                    onSubmit={onSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <input
                        style={{ width: '100%', maxWidth: '180px', maxHeight: '40px' }}
                        className="factoryInput__input"
                        type="text"
                        value={music}
                        onChange={onChange}
                        placeholder="좋아하는 노래 youtube 링크"
                    />
                    <input
                        type="submit"
                        style={{
                            marginTop: '10px',
                            backgroundColor: '#04aaff',
                            width: '40px',
                            height: '40px',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                            borderRadius: '20px',
                        }}
                        value="↓"
                    />
                </form>
            </div>
            {clear && playlist[0].displayName ? (
                <div style={{ marginTop: '15px', fontWeight: '600' }}>
                    이 노래는 "{playlist[0].displayName}"님의 듣고싶은 곡 입니다.
                </div>
            ) : (
                <div style={{ marginTop: '15px', fontWeight: '600' }}>
                    이 노래는 "No Name"님의 듣고싶은 곡 입니다.
                </div>
            )}
        </div>
    );
};

export default Music;

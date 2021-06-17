import Hweet from 'component/Hweet';
import HweetFactory from 'component/HweetFactory';
import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [hweets, setHweets] = useState([]);
    useEffect(() => {
        dbService
            .collection('hweets')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const hweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setHweets(hweetArray);
            });
    }, []);

    return (
        <div className="container">
            <HweetFactory userObj={userObj} />
            <div style={{ marginTop: 30, width: '100%' }}>
                {hweets.map((hweet) => (
                    <Hweet
                        userObj={userObj}
                        key={hweet.id}
                        hweetObj={hweet}
                        isOwner={hweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

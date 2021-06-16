import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fBase';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            // 로그인이나 로그아웃할때 나타남, 혹은 어플리케이션이 초기화 될 때 발생한다.
            if (user) {
                // setUserObj(user);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }

            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    // console.log(userObj);
    // console.log(Boolean(userObj));

    return (
        <>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggenIn={Boolean(userObj)}
                    userObj={userObj}
                />
            ) : (
                'Initializing...'
            )}
        </>
    );
}

export default App;

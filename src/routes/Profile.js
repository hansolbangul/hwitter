import { authService, dbService } from 'fBase';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [hweets, setHweets] = useState({});

    //사용자 이름 변경시 트윗에도 이름 변경
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

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/'); // Redirect와 똑같이 메인으로 돌아가기 위해 사용하는 것 react-router-dom 의 Hook
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;

        const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        const text = value.replace(koreanExp, '');

        setNewDisplayName(text);
    };

    // const getMyHweet = async () => {
    //     const hweets = await dbService
    //         .collection('hweets')
    //         .where('creatorId', '==', userObj.uid)
    //         .orderBy('createdAt', 'desc')
    //         .get();
    //     console.log(hweets.docs.map((doc) => doc.data()));
    // };
    // useEffect(() => {
    //     getMyHweet();
    // }, []); 이렇게 sql을 where을 써서 엮을 수 있음.

    const onSubmit = async (event) => {
        var blank_pattern = /^\s+|\s+$/g;
        if (newDisplayName.replace(blank_pattern, '') === '') {
            alert(' 이름은 공백으로 설정할 수 없습니다. ');
            return false;
        }
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            for (let i = 0; i < hweets.length; i++) {
                if (hweets[i].creatorId === userObj.uid)
                    await dbService.doc(`hweets/${hweets[i].id}`).update({
                        displayName: newDisplayName,
                    });
            }
            refreshUser();
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    placeholder="이름은 영어만 가능합니다. maxlength=12"
                    maxLength="12"
                    onChange={onChange}
                    autoFocus
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};
export default Profile;

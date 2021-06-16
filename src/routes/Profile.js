import { authService } from 'fBase';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/'); // Redirect와 똑같이 메인으로 돌아가기 위해 사용하는 것 react-router-dom 의 Hook
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
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
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    placeholder="Display name"
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

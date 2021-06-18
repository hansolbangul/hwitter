import { dbService, storageService } from 'fBase';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import nullImg from '../Img/nullImg.png';

const Hweet = ({ hweetObj, isOwner, userObj, isDeveloper }) => {
    const day = String(new Date(hweetObj.createdAt)).split(' ');
    const time = day[3] + ' ' + day[1] + ' ' + day[2] + ' ' + day[4];
    const [editing, setEditting] = useState(false);
    const [newHweet, setNewHweet] = useState(hweetObj.text);
    const [order, setOrder] = useState(0);
    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this Hweet?');
        if (ok) {
            await dbService.doc(`hweets/${hweetObj.id}`).delete();
            await storageService.refFromURL(hweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditting((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`hweets/${hweetObj.id}`).update({
            text: newHweet,
        });
        setEditting(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewHweet(value);
    };

    useEffect(() => {
        if (hweetObj.creatorId === userObj.uid) {
            setOrder(0);
        } else {
            setOrder(2);
        }
    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* {hweetObj.creatorId === userObj.uid ?} */}
            <div className="nweet" style={{ order: order }}>
                {editing ? (
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input
                                type="text"
                                placeholder="Edit your hweet"
                                value={newHweet}
                                onChange={onChange}
                                required
                                autoFocus
                                className="formInput"
                            />
                            <input type="submit" className="formBtn" value="Update Hweet" />
                        </form>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">
                            Cancel
                        </span>
                    </>
                ) : (
                    <>
                        <h4>
                            {hweetObj.text}
                            <br />
                            <p
                                style={{
                                    position: 'absolute',
                                    fontSize: '8px',
                                    right: '0',
                                    marginRight: 5,
                                }}
                            >
                                {time}
                            </p>
                        </h4>
                        {hweetObj.attachmentUrl && <img src={hweetObj.attachmentUrl} alt="img" />}
                        {(isOwner || isDeveloper) && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div style={{ order: 1, marginLeft: 0, width: '80px', height: '74px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    {hweetObj.photoURL ? (
                        <img
                            className="profile__img"
                            alt="userImg"
                            src={hweetObj.photoURL}
                            width="30px"
                            height="30px"
                        />
                    ) : (
                        <img
                            className="profile__img"
                            alt="nullimg"
                            src={nullImg}
                            width="30px"
                            height="30px"
                        />
                    )}
                    {hweetObj.displayName ? (
                        <h3
                            style={{
                                marginTop: '20px',
                                fontSize: '12px',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {hweetObj.displayName}
                        </h3>
                    ) : (
                        <h3
                            style={{
                                marginTop: '20px',
                                fontSize: '12px',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            No Name
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hweet;

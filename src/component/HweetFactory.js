import { dbService, storageService } from 'fBase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const HweetFactory = ({ userObj }) => {
    const [hweet, setHweet] = useState('');
    const [attachment, setAttachment] = useState('');
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setHweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onSubmit = async (event) => {
        if (hweet === '') {
            return;
        }
        event.preventDefault();
        let attachmentUrl = '';
        if (attachment !== '') {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const reponse = await attachmentRef.putString(attachment, 'data_url');
            attachmentUrl = await reponse.ref.getDownloadURL(); // 이미지의 다운로드 Url
        }

        console.log(attachmentUrl);

        const hweetObj = {
            text: hweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            photoURL: userObj.photoURL,
            displayName: userObj.displayName,
            attachmentUrl,
        };
        await dbService.collection('hweets').add(hweetObj);
        setHweet('');
        setAttachment('');
    };
    const onClearAttachment = () => setAttachment('');
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={hweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                        alt="img"
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default HweetFactory;

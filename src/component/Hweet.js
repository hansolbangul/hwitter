import { dbService, storageService } from 'fBase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Hweet = ({ hweetObj, isOwner }) => {
    console.log(hweetObj);
    const [editing, setEditting] = useState(false);
    const [newHweet, setNewHweet] = useState(hweetObj.text);
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
    return (
        <div className="nweet">
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
                    <h4>{hweetObj.text}</h4>
                    {hweetObj.attachmentUrl && <img src={hweetObj.attachmentUrl} alt="img" />}
                    {isOwner && (
                        <div class="nweet__actions">
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
    );
};

export default Hweet;
